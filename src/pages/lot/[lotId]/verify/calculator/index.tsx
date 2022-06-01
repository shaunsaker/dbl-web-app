import React, { ReactElement, useCallback, useState } from 'react'
import { styled } from '../../../../../styles/stitches.config'
import { Card } from '../../../../../components/Card'
import { DataSummary } from '../../../../../components/DataSummary'
import { Divider } from '../../../../../components/Divider'
import { CopyIcon } from '../../../../../components/icons/CopyIcon'
import { InfoBox } from '../../../../../components/InfoBox'
import { TextInput } from '../../../../../components/TextInput'
import { Typography } from '../../../../../components/Typography'
import { blockHashToRandomNumber } from '../../../../../utils/blockHashToRandomNumber'
import { floatToIndex } from '../../../../../utils/floatToIndex'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getInactiveLots } from '../../../../../server/getInactiveLots'
import { Lot, LotId } from '../../../../../store/lots/models'
import { ProtectedRoute } from '../../../../../components/ProtectedRoute'

interface VerifyResultCalculatorProps {
  lot?: Lot
}

const VerifyResultCalculator = ({
  lot,
}: VerifyResultCalculatorProps): ReactElement | null => {
  const [blockHash, setBlockHash] = useState(
    lot?.latestBlockHashAtDrawTime || '',
  )
  const [ticketCount, setTicketCount] = useState(
    lot?.totalConfirmedTickets.toString() || '',
  )

  const onChangeBlockHash = useCallback((text: string) => {
    setBlockHash(text)
  }, [])

  const onChangeTicketCount = useCallback((text: string) => {
    setTicketCount(text)
  }, [])

  if (!lot) {
    return null
  }

  const randomNumber = blockHash ? blockHashToRandomNumber(blockHash) : ''
  const ticketIndex =
    randomNumber && ticketCount
      ? floatToIndex({ float: randomNumber, count: parseInt(ticketCount) })
      : ''

  return (
    <ProtectedRoute>
      <Container>
        <Card>
          <DataSummary
            icon={<CopyIcon />}
            title="Random Number"
            value={randomNumber}
          >
            <Typography>=</Typography>

            <InfoBox>
              <Typography>parseInt(</Typography>

              <TextInput
                label="Block Hash"
                placeholder="Enter block hash"
                value={blockHash}
                onChangeText={onChangeBlockHash}
              />

              <Typography>, 16) / Math.pow(2, 256)</Typography>
            </InfoBox>
          </DataSummary>

          <Divider />

          <DataSummary
            icon={<CopyIcon />}
            title="Ticket Index"
            value={ticketIndex}
          >
            <Typography>=</Typography>

            <InfoBox>
              <Typography>Math.floor({randomNumber} * </Typography>

              <TextInput
                label="Ticket Count"
                placeholder="Enter ticket count"
                value={ticketCount}
                onChangeText={onChangeTicketCount}
              />

              <Typography>)</Typography>
            </InfoBox>
          </DataSummary>
        </Card>
      </Container>
    </ProtectedRoute>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const lots = await getInactiveLots()

  const paths = lots.map(lot => ({
    params: { lotId: lot.id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<
  VerifyResultCalculatorProps
> = async ({ params }) => {
  if (!params) {
    return {
      props: {
        lot: undefined,
      },
    }
  }

  const lotId = params.lotId as LotId
  const lots = await getInactiveLots()
  const lot = lots.find(lot => lot.id === lotId)

  return { props: { lot } }
}

export default VerifyResultCalculator

const Container = styled('div', {})
