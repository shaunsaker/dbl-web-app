import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../../styles/stitches.config'
import { CustomPagination } from '../../../components/CustomPagination'
import { HeaderBar } from '../../../components/HeaderBar'
import { LotResult } from '../../../components/LotResult'
import { Page } from '../../../components/Page'
import { Typography } from '../../../components/Typography'
import { pageParam, RoutePath } from '../../../router/models'
import {
  selectInactiveLotsCount,
  selectLotsDataLoading,
  selectSortedInactiveLotsByPage,
} from '../../../store/lots/selectors'
import { navigate } from '../../../store/navigation/actions'
import { ApplicationState } from '../../../store/reducers'
import { useRouter } from 'next/router'

export const LOT_RESULTS_PER_PAGE = 10

interface ResultsProps {}

const Results = ({}: ResultsProps): ReactElement => {
  const router = useRouter()
  const query = router.query
  const pageString = query.page as string
  const page = parseInt(pageString)

  const dispatch = useDispatch()

  const loading = useSelector(selectLotsDataLoading)
  const lots = useSelector((state: ApplicationState) =>
    selectSortedInactiveLotsByPage(state, page),
  )
  const totalLots = useSelector(selectInactiveLotsCount)
  const totalPages = Math.floor(totalLots / LOT_RESULTS_PER_PAGE) || 1

  const onPaginationClick = useCallback(
    (_: any, newPage: number) => {
      dispatch(
        navigate({
          route: RoutePath.results.replace(pageParam, newPage.toString()),
        }),
      )
    },
    [dispatch],
  )

  return (
    <Page>
      <HeaderBar />

      <Container>
        <Typography>Results</Typography>

        {loading ? (
          <div>Loading</div>
        ) : lots && lots.length ? (
          lots.map(lot => <LotResult key={lot.id} lotId={lot.id} />)
        ) : (
          <Typography>No Results Yet</Typography>
        )}

        <CustomPagination
          count={totalPages}
          page={page}
          onChange={onPaginationClick}
        />
      </Container>
    </Page>
  )
}

export default Results

const Container = styled('div', {})
