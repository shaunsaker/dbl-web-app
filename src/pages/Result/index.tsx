import React, { ReactElement, useCallback, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CloseButton } from '../../components/CloseButton'
import { LotStats } from '../../components/LotStats'
import { Page } from '../../components/Page'
import { ShareLot } from '../../components/ShareLot'
import { TicketsSummary } from '../../components/TicketsSummary'
import { RouteParams } from '../../router/models'
import { fetchInvoices } from '../../store/invoices/actions'
import { navigateBack } from '../../store/navigation/actions'

export const Result = (): ReactElement | null => {
  const { lotId } = useParams<RouteParams['result']>()

  const dispatch = useDispatch()

  useLayoutEffect(
    () => {
      if (!lotId) {
        return
      }

      // on mount fetch the invoices for this lot
      dispatch(fetchInvoices.request({ lotId }))
    },
    // only run this once on mount
    // eslint-disable-next-line
    [],
  )

  const onCloseClick = useCallback(() => {
    dispatch(navigateBack())
  }, [dispatch])

  if (!lotId) {
    return null
  }

  return (
    <Page>
      <Container>
        <LotStats lotId={lotId} />

        <TicketsSummary lotId={lotId} />

        <ShareLotContainer>
          <ShareLot lotId={lotId} />
        </ShareLotContainer>
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

const ShareLotContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
