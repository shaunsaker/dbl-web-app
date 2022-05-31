import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '../../../../styles/stitches.config'
import { Card } from '../../../../components/Card'
import { DataSummary } from '../../../../components/DataSummary'
import { Divider } from '../../../../components/Divider'
import { CopyIcon } from '../../../../components/icons/CopyIcon'
import { InfoBox } from '../../../../components/InfoBox'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { TextButton } from '../../../../components/TextButton'
import { useLinking } from '../../../../components/useLinking'
import { lotIdParam, RoutePath } from '../../../../router/models'
import { navigate } from '../../../../store/navigation/actions'
import { Lot, LotId } from '../../../../store/lots/models'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getInactiveLots } from '../../../../server/getInactiveLots'

interface VerifyResultProps {
  lot?: Lot
}

const VerifyResult = ({ lot }: VerifyResultProps): ReactElement | null => {
  const dispatch = useDispatch()
  const { openLink } = useLinking()

  const onViewLatestBlockHashClick = useCallback(() => {
    if (!lot) {
      return
    }

    const url = `${process.env.NEXT_PUBLIC_BLOCKCHAIN_BLOCK_HASH_EXPLORER_URL}/${lot.latestBlockHashAtDrawTime}`
    openLink(url)
  }, [openLink, lot])

  const onViewCalculationClick = useCallback(() => {
    if (!lot) {
      return
    }

    dispatch(
      navigate({
        route: RoutePath.verifyResultCalculator.replace(lotIdParam, lot.id),
      }),
    )
  }, [dispatch, lot])

  const onViewWinningBlockHashClick = useCallback(() => {
    if (!lot) {
      return
    }

    const url = `${process.env.NEXT_PUBLIC_BLOCKCHAIN_BLOCK_HASH_EXPLORER_URL}/${lot.winningTicketId}`
    openLink(url)
  }, [openLink, lot])

  const onViewAllTicketsClick = useCallback(() => {}, [])

  if (!lot) {
    return null
  }

  return (
    <Container>
      <InfoBox>
        Every lot result is 100% transparent and provable. Read more in{' '}
        <a href="https://blog.com">our blog post</a>.
      </InfoBox>

      <Card>
        <DataSummary
          icon={<CopyIcon />}
          title="LATEST BLOCK HASH AT TIME OF DRAW"
          value={lot.latestBlockHashAtDrawTime}
        >
          <TextButton onClick={onViewLatestBlockHashClick}>
            View on Blockchain
          </TextButton>
        </DataSummary>

        <Divider />

        <DataSummary
          icon={<CopyIcon />}
          title="WINNING TICKET INDEX"
          value={lot.winningTicketIndex}
        >
          <TextButton onClick={onViewCalculationClick}>
            See how we calculated this
          </TextButton>
        </DataSummary>

        <Divider />

        <DataSummary
          icon={<CopyIcon />}
          title="WINNING BLOCK HASH (TICKET ID)"
          value={lot.winningTicketId}
        >
          <TextButton onClick={onViewWinningBlockHashClick}>
            View on Blockchain
          </TextButton>
        </DataSummary>
      </Card>

      <PrimaryButton onClick={onViewAllTicketsClick}>
        View All Tickets
      </PrimaryButton>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const lots = await getInactiveLots()

  const paths = lots.map(lot => ({
    params: { lotId: lot.id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<VerifyResultProps> = async ({
  params,
}) => {
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

export default VerifyResult

const Container = styled('div', {})
