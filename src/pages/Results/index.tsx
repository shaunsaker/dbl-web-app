import React, { ReactElement, useCallback, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CustomPagination } from '../../components/CustomPagination'
import { HeaderBar } from '../../components/HeaderBar'
import { LotResult } from '../../components/LotResult'
import { Page } from '../../components/Page'
import { Typography } from '../../components/Typography'
import { pageParam, RouteParams, RoutePath } from '../../router/models'
import { fetchInactiveLots } from '../../store/lots/actions'
import {
  selectLotsDataLoading,
  selectSortedInactiveLotsByPage,
} from '../../store/lots/selectors'
import { navigate } from '../../store/navigation/actions'
import { ApplicationState } from '../../store/reducers'
import { selectStatsData } from '../../store/stats/selectors'

export const LOT_RESULTS_PER_PAGE = 10

interface ResultsProps {}

export const Results = ({}: ResultsProps): ReactElement => {
  const { page: pageString = '1' } = useParams<RouteParams['results']>()
  const page = parseInt(pageString)

  const dispatch = useDispatch()

  const loading = useSelector(selectLotsDataLoading)
  const lots = useSelector((state: ApplicationState) =>
    selectSortedInactiveLotsByPage(state, page),
  )
  const stats = useSelector(selectStatsData)

  useLayoutEffect(
    () => {
      // this will fetch the latest n + 1 lots (we already fetch the latest inactive lot by default)
      const earliestDate = lots && lots.length ? lots[0].drawTime : ''

      dispatch(
        fetchInactiveLots.request({
          startAfter: earliestDate,
          limit: LOT_RESULTS_PER_PAGE,
        }),
      )
    },
    // eslint-disable-next-line
    [page],
  )

  const onPaginationClick = useCallback(
    (_: any, newPage: number) => {
      dispatch(
        navigate(RoutePath.results.replace(pageParam, newPage.toString())),
      )
    },
    [dispatch],
  )

  return (
    <Page>
      <HeaderBar />

      <Container>
        <Typography bold>Results</Typography>

        {loading ? (
          <div>Loading</div>
        ) : lots && lots.length ? (
          lots.map(lot => <LotResult key={lot.id} lotId={lot.id} />)
        ) : (
          <Typography>No Results Yet</Typography>
        )}

        <CustomPagination
          count={
            stats?.resultsCount ? stats?.resultsCount / LOT_RESULTS_PER_PAGE : 1
          }
          page={page}
          onChange={onPaginationClick}
        />
      </Container>
    </Page>
  )
}

const Container = styled.div`
  flex: 1;
`
