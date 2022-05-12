import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { CloseButton } from '../../components/CloseButton'
import { MyTickets } from './MyTickets'
import { Page } from '../../components/Page'
import { RouteParams, RouteKey } from '../../router/models'
import { navigateBack } from '../../store/navigation/actions'
import { useParams } from 'react-router-dom'

export const Tickets = (): ReactElement | null => {
  const { lotId } = useParams<RouteParams[RouteKey.tickets]>()

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
        <MyTickets lotId={lotId} />
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
