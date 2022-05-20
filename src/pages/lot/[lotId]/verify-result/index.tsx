import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../../../styles/stitches.config'
import { Card } from '../../../../components/Card'
import { CloseButton } from '../../../../components/CloseButton'
import { DataSummary } from '../../../../components/DataSummary'
import { Divider } from '../../../../components/Divider'
import { CopyIcon } from '../../../../components/icons/CopyIcon'
import { InfoBox } from '../../../../components/InfoBox'
import { Page } from '../../../../components/Page'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { TextButton } from '../../../../components/TextButton'
import { useLinking } from '../../../../components/useLinking'
import { lotIdParam, RoutePath } from '../../../../router/models'
import { selectLotById } from '../../../../store/lots/selectors'
import { navigate, navigateBack } from '../../../../store/navigation/actions'
import { ApplicationState } from '../../../../store/reducers'
import { useRouter } from 'next/router'
import { LotId } from '../../../../store/lots/models'

const VerifyResult = (): ReactElement | null => {
  const router = useRouter()
  const query = router.query
  const lotId = query.lotId as LotId

  const dispatch = useDispatch()
  const { openLink } = useLinking()

  const lot = useSelector(
    (state: ApplicationState) => lotId && selectLotById(state, lotId),
  )

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

  const onCloseClick = useCallback(() => {
    dispatch(navigateBack())
  }, [dispatch])

  if (!lotId || !lot) {
    return null
  }

  return (
    <Page>
      <Container>
        <InfoBox>
          Every lot result is 100% transparent and provable. Read more in{' '}
          <a href="/">our blog post</a>.
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

      <CloseButtonContainer>
        <CloseButton onClick={onCloseClick} />
      </CloseButtonContainer>
    </Page>
  )
}

export default VerifyResult

const Container = styled('div', {})

const CloseButtonContainer = styled('div', {})
