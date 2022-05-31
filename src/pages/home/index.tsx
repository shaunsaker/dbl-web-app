import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { LotStats } from '../../components/LotStats'
import { PrimaryButton } from '../../components/PrimaryButton'
import { TicketsSummary } from '../../components/TicketsSummary'
import { pageParam, RoutePath } from '../../router/models'
import { selectHasTicketsForLotId } from '../../store/invoices/selectors'
import { selectActiveLot } from '../../store/lots/selectors'
import { navigate } from '../../store/navigation/actions'
import { ApplicationState } from '../../store/reducers'
import { ProtectedRoute } from '../../components/ProtectedRoute'
import { GetStaticProps } from 'next'
import { getInactiveLots } from '../../server/getInactiveLots'
import { Lot } from '../../store/lots/models'
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey'
import { LotResult } from '../../components/LotResult'
import { Typography } from '../../components/Typography'

interface HomeProps {
  latestInactiveLot?: Lot
}

const Home = ({ latestInactiveLot }: HomeProps): ReactElement => {
  const dispatch = useDispatch()

  const activeLot = useSelector(selectActiveLot)

  const hasTickets = useSelector(
    (state: ApplicationState) =>
      activeLot && selectHasTicketsForLotId(state, activeLot.id),
  )

  const onViewMoreResultsClick = useCallback(() => {
    const route = RoutePath.results.replace(pageParam, '1')

    dispatch(navigate({ route }))
  }, [dispatch])

  const onBuyTicketsClick = useCallback(() => {
    dispatch(navigate({ route: RoutePath.reserveTickets }))
  }, [dispatch])

  return (
    <ProtectedRoute>
      <Container>
        {latestInactiveLot && <LotResult lot={latestInactiveLot} />}

        <PrimaryButton onClick={onViewMoreResultsClick}>
          <Typography>View More Results</Typography>
        </PrimaryButton>

        {activeLot && <LotStats lot={activeLot} />}

        <PrimaryButton onClick={onBuyTicketsClick}>BUY TICKETS</PrimaryButton>

        {activeLot && hasTickets ? <TicketsSummary lot={activeLot} /> : null}
      </Container>
    </ProtectedRoute>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const lots = await getInactiveLots()
  const reverseSortedLots = sortArrayOfObjectsByKey(lots, 'drawTime', true)
  const latestInactiveLot = reverseSortedLots[0]

  return { props: { latestInactiveLot } }
}

export default Home

const Container = styled('div', {})
