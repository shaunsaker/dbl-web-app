import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pageParam, RoutePath } from '../../../router/models'
import {
  selectLatestInactiveLotId,
  selectLotsDataLoading,
} from '../../../store/lots/selectors'
import { navigate } from '../../../store/navigation/actions'
import { LotResult } from '../../LotResult'
import { Typography } from '../../Typography'
import { styled } from '../../../styles/stitches.config'

interface YesterdaysResultsProps {}

export const YesterdaysResults =
  ({}: YesterdaysResultsProps): ReactElement | null => {
    const dispatch = useDispatch()

    const loading = useSelector(selectLotsDataLoading)
    const yesterdaysLotId = useSelector(selectLatestInactiveLotId)

    const onViewMoreResultsClick = useCallback(() => {
      const route = RoutePath.results.replace(pageParam, '1')

      dispatch(navigate({ route }))
    }, [dispatch])

    return (
      <Container>
        <Typography>Yesterday&apo;s Results</Typography>

        {loading ? (
          <div>Loading</div>
        ) : yesterdaysLotId ? (
          <>
            <LotResult lotId={yesterdaysLotId} />

            <button onClick={onViewMoreResultsClick}>
              <Typography>View More Results</Typography>
            </button>
          </>
        ) : (
          <Typography>No Results Yet</Typography>
        )}
      </Container>
    )
  }

const Container = styled('div', {})
