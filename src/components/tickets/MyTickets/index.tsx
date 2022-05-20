import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '../../../styles/stitches.config'
import { LotId } from '../../../store/lots/models'
import { ApplicationState } from '../../../store/reducers'
import { selectInvoicesDataLoading } from '../../../store/invoices/selectors'
import { Typography } from '../../Typography'
import { InvoiceTickets } from './InvoiceTickets'
import { selectInvoicesByLotId } from '../../../store/invoices/selectors'

interface MyTicketsProps {
  lotId: LotId
}

export const MyTickets = ({ lotId }: MyTicketsProps): ReactElement => {
  const loading = useSelector(selectInvoicesDataLoading)

  // we use invoices to group the tickets
  const invoices = useSelector((state: ApplicationState) =>
    selectInvoicesByLotId(state, lotId),
  )

  return (
    <Container>
      <Typography>My Tickets</Typography>

      {loading ? (
        <div>Loading</div>
      ) : invoices.length ? (
        invoices.map(invoice => (
          <InvoiceTickets key={invoice.id} {...invoice} />
        ))
      ) : (
        <Typography>You have no tickets, shame on you!</Typography>
      )}
    </Container>
  )
}

const Container = styled('div', {})
