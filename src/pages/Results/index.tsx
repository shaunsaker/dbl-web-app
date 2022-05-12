import React, { ReactElement, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { HeaderBar } from '../../components/HeaderBar'
import { LotResult } from '../../components/LotResult'
import { Page } from '../../components/Page'
import { Typography } from '../../components/Typography'
import { fetchInactiveLots } from '../../store/lots/actions'
import { Lot } from '../../store/lots/models'
import {
  selectInactiveLotsSortedByDate,
  selectLotsDataLoading,
} from '../../store/lots/selectors'

interface ResultsProps {}

// TODO: virtualised list
export const Results = ({}: ResultsProps): ReactElement => {
  const dispatch = useDispatch()

  const loading = useSelector(selectLotsDataLoading)
  const lots = useSelector(selectInactiveLotsSortedByDate)

  const [oldestLotDate, setOldestLotDate] = useState('')

  const onEndReached = useCallback(async () => {
    // fetch the results in a paginated fashion
    // based on the lots in the store, get the oldest date and fetch from there
    const oldestDate = lots && lots.length ? lots[lots.length - 1].drawTime : ''
    const hasFetchedAllLots = oldestDate === oldestLotDate

    if (!oldestDate) {
      return
    }

    setOldestLotDate(oldestDate)

    if (hasFetchedAllLots) {
      return
    }

    dispatch(
      fetchInactiveLots.request({
        startAfter: oldestDate,
        limit: 10,
      }),
    )
  }, [lots, dispatch, oldestLotDate])

  const renderLotResult = useCallback(({ item: lot }: { item: Lot }) => {
    return <LotResult lotId={lot.id} />
  }, [])

  return (
    <Page>
      <HeaderBar />

      <Container>
        <Typography bold>Results</Typography>

        {/* {lots && lots.length ? (
          <FlatList
            data={lots}
            keyExtractor={item => item.id}
            renderItem={renderLotResult}
            ListFooterComponent={loading ? <div>Loading</div> : null}
            onEndReached={onEndReached}
          />
        ) : (
          <Typography>No Results Yet</Typography>
        )} */}
      </Container>
    </Page>
  )
}

const Container = styled.div`
  flex: 1;
`
