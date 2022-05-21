import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '../../../../styles/stitches.config'
import { CloseButton } from '../../../../components/CloseButton'
import { MyInvoices } from '../../../../components/tickets/MyInvoices'
import { Page } from '../../../../components/Page'
import { navigateBack } from '../../../../store/navigation/actions'
import { useRouter } from 'next/router'
import { LotId } from '../../../../store/lots/models'

const Tickets = (): ReactElement | null => {
  const router = useRouter()
  const query = router.query
  const lotId = query.lotId as LotId

  const dispatch = useDispatch()

  const onCloseClick = useCallback(() => {
    dispatch(navigateBack())
  }, [dispatch])

  if (!lotId) {
    return null
  }

  return (
    <Page>
      <Container>
        <MyInvoices lotId={lotId} />
      </Container>

      <CloseButtonContainer>
        <CloseButton onClick={onCloseClick} />
      </CloseButtonContainer>
    </Page>
  )
}

export default Tickets

const Container = styled('div', {})

const CloseButtonContainer = styled('div', {})
