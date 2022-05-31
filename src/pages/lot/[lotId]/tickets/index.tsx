import React, { ReactElement } from 'react'
import { styled } from '../../../../styles/stitches.config'
import { MyInvoices } from '../../../../components/tickets/MyInvoices'
import { useRouter } from 'next/router'
import { LotId } from '../../../../store/lots/models'

const Tickets = (): ReactElement | null => {
  const router = useRouter()
  const query = router.query
  const lotId = query.lotId as LotId

  if (!lotId) {
    return null
  }

  return (
    <Container>
      <MyInvoices lotId={lotId} />
    </Container>
  )
}

export default Tickets

const Container = styled('div', {})
