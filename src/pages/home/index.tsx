import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { HeaderBar } from '../../components/HeaderBar'
import { LotStats } from '../../components/LotStats'
import { Page } from '../../components/Page'
import { PrimaryButton } from '../../components/PrimaryButton'
import { TicketsSummary } from '../../components/TicketsSummary'
import { RoutePath } from '../../router/models'
import { selectHasTicketsForLotId } from '../../store/invoices/selectors'
import { selectActiveLotId } from '../../store/lots/selectors'
import { navigate } from '../../store/navigation/actions'
import { ApplicationState } from '../../store/reducers'
import { YesterdaysResults } from '../../components/home/YesterdaysResults'
import { ProtectedRoute } from '../../components/ProtectedRoute'

interface HomeProps {}

const Home = ({}: HomeProps): ReactElement => {
  const dispatch = useDispatch()

  const activeLotId = useSelector(selectActiveLotId) || ''

  const hasTickets = useSelector((state: ApplicationState) =>
    selectHasTicketsForLotId(state, activeLotId),
  )

  const onBuyTicketsClick = useCallback(() => {
    dispatch(navigate({ route: RoutePath.reserveTickets }))
  }, [dispatch])

  return (
    <ProtectedRoute>
      <Page>
        <HeaderBar />

        <Container>
          <YesterdaysResults />

          <LotStats lotId={activeLotId} />

          <PrimaryButton onClick={onBuyTicketsClick}>BUY TICKETS</PrimaryButton>

          {hasTickets ? <TicketsSummary lotId={activeLotId} /> : null}
        </Container>
      </Page>
    </ProtectedRoute>
  )
}

export default Home

const Container = styled('div', {})
