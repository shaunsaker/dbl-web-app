import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '../../../styles/stitches.config'
import { LotId } from '../../../store/lots/models'
import { ApplicationState } from '../../../store/reducers'
import { selectInvoicesDataLoading } from '../../../store/invoices/selectors'
import { Typography } from '../../Typography'
import { InvoiceTickets } from './InvoiceTickets'
import { selectInvoicesByLotId } from '../../../store/invoices/selectors'
import { Spacer } from '../../Spacer'
import { LoadingModal } from '../../LoadingModal'

interface MyTicketsProps {
  lotId: LotId
}

export const MyInvoices = ({ lotId }: MyTicketsProps): ReactElement => {
  const loading = useSelector(selectInvoicesDataLoading)

  // we use invoices to group the tickets
  const invoices = useSelector((state: ApplicationState) =>
    selectInvoicesByLotId(state, lotId),
  )

  return (
    <Container>
      {invoices.length ? (
        invoices.map(invoice => (
          <>
            <InvoiceTickets key={invoice.id} {...invoice} />

            <Spacer />
          </>
        ))
      ) : (
        <Typography>You had no tickets, shame on you!</Typography>
      )}

      {loading && <LoadingModal>Fetching tickets...</LoadingModal>}
    </Container>
  )
}

const Container = styled('div', {
  flexCenter: '',
})
