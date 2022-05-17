import React, { ReactElement, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Card } from '../../components/Card'
import { CloseButton } from '../../components/CloseButton'
import { DataSummary } from '../../components/DataSummary'
import { Divider } from '../../components/Divider'
import { CopyIcon } from '../../components/icons/CopyIcon'
import { InfoBox } from '../../components/InfoBox'
import { Page } from '../../components/Page'
import { TextInput } from '../../components/TextInput'
import { Typography } from '../../components/Typography'
import { RouteParams } from '../../router/models'
import { selectLotById } from '../../store/lots/selectors'
import { navigateBack } from '../../store/navigation/actions'
import { ApplicationState } from '../../store/reducers'
import { blockHashToRandomNumber } from '../../utils/blockHashToRandomNumber'
import { floatToIndex } from '../../utils/floatToIndex'

export const VerifyResultCalculator = (): ReactElement | null => {
  const { lotId } = useParams<RouteParams['verifyResultCalculator']>()

  const dispatch = useDispatch()

  const lot = useSelector((state: ApplicationState) =>
    lotId ? selectLotById(state, lotId) : null,
  )

  const [blockHash, setBlockHash] = useState(
    lot?.latestBlockHashAtDrawTime || '',
  )
  const [ticketCount, setTicketCount] = useState(
    lot?.totalConfirmedTickets.toString() || '',
  )

  const onCloseClick = useCallback(() => {
    dispatch(navigateBack())
  }, [dispatch])

  const onChangeBlockHash = useCallback((text: string) => {
    setBlockHash(text)
  }, [])

  const onChangeTicketCount = useCallback((text: string) => {
    setTicketCount(text)
  }, [])

  if (!lotId || !lot) {
    return null
  }

  const randomNumber = blockHash ? blockHashToRandomNumber(blockHash) : ''
  const ticketIndex =
    randomNumber && ticketCount
      ? floatToIndex({ float: randomNumber, count: parseInt(ticketCount) })
      : ''

  return (
    <Page>
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

      <CloseButtonContainer>
        <CloseButton onClick={onCloseClick} />
      </CloseButtonContainer>
    </Page>
  )
}

const Container = styled.div`
  flex: 1;
`

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
