import React, { ReactElement, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../../styles/stitches.config'
import { InvoiceId, InvoiceStatus } from '../../../store/invoices/models'
import { LotId } from '../../../store/lots/models'
import { fetchPayments } from '../../../store/payments/actions'
import { selectPaymentsByInvoiceId } from '../../../store/payments/selectors'
import { ApplicationState } from '../../../store/reducers'
import { Typography } from '../../Typography'
import { Payment } from './Payment'
import { Card } from '../../Card'
import { Spacer } from '../../Spacer'
import { selectInvoiceById } from '../../../store/invoices/selectors'

interface InvoicePaymentsProps {
  lotId: LotId
  invoiceId: InvoiceId
}

export const InvoicePayments = ({
  lotId,
  invoiceId,
}: InvoicePaymentsProps): ReactElement | null => {
  const dispatch = useDispatch()

  const payments = useSelector((state: ApplicationState) =>
    selectPaymentsByInvoiceId(state, invoiceId),
  )
  const invoice = useSelector((state: ApplicationState) =>
    selectInvoiceById(state, invoiceId),
  )

  const hasExpired = invoice?.status === InvoiceStatus.expired

  useLayoutEffect(
    () => {
      // on mount fetch the payments
      dispatch(fetchPayments.request({ lotId, invoiceId }))
    },
    // only run this once on mount
    // eslint-disable-next-line
    [],
  )

  if (hasExpired) {
    return null
  }

  return (
    <Container kind="primary" disabled>
      <Typography kind="title">Payments</Typography>

      <Spacer />

      {payments && payments.length ? (
        payments.map(payment => (
          <>
            <Payment key={payment.id} {...payment} />

            <Spacer />
          </>
        ))
      ) : (
        <Typography>Waiting for payments...</Typography>
      )}
    </Container>
  )
}

const Container = styled(Card, {})
