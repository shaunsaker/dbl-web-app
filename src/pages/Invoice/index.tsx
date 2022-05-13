import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { CloseButton } from '../../components/CloseButton'
import { Page } from '../../components/Page'
import { InvoicePayments } from './InvoicePayments'
import { RouteParams } from '../../router/models'
import { navigateBack } from '../../store/navigation/actions'
import { InvoiceDetails } from './InvoiceDetails'
import { InvoiceStatus } from './InvoiceStatus'
import { useParams } from 'react-router-dom'

export const Invoice = (): ReactElement | null => {
  const dispatch = useDispatch()

  const { lotId, invoiceId } = useParams<RouteParams['invoice']>()

  const onCloseClick = useCallback(() => {
    dispatch(navigateBack())
  }, [dispatch])

  if (!lotId || !invoiceId) {
    return null
  }

  return (
    <Page>
      <Container>
        <InvoiceStatus invoiceId={invoiceId} />

        <InvoiceDetails invoiceId={invoiceId} />

        <InvoicePayments lotId={lotId} invoiceId={invoiceId} />
      </Container>

      <CloseButtonContainer>
        <CloseButton onClick={onCloseClick} />
      </CloseButtonContainer>
    </Page>
  )
}

const Container = styled.div``

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
