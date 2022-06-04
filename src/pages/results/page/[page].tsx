import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '../../../styles/stitches.config'
import { LotResult } from '../../../components/LotResult'
import { Typography } from '../../../components/Typography'
import { pageParam, Routes } from '../../../router/models'
import { navigate } from '../../../store/navigation/actions'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getInactiveLots } from '../../../server/getInactiveLots'
import { sortArrayOfObjectsByKey } from '../../../utils/sortArrayOfObjectsByKey'
import { Lot } from '../../../store/lots/models'
import { arrayFromNumber } from '../../../utils/arrayFromNumber'
import { ProtectedRoute } from '../../../components/ProtectedRoute'
import { Pagination } from '../../../components/Pagination'
import { Spacer } from '../../../components/Spacer'

export const LOT_RESULTS_PER_PAGE = 10

interface ResultsProps {
  lots: Lot[]
  page: number
  totalPages: number
}

const Results = ({ lots, page, totalPages }: ResultsProps): ReactElement => {
  const dispatch = useDispatch()

  const onPaginationClick = useCallback(
    (newPage: number | string | null) => {
      if (!newPage) {
        return
      }

      dispatch(
        navigate({
          route: Routes.results.path.replace(pageParam, newPage.toString()),
        }),
      )
    },
    [dispatch],
  )

  return (
    <ProtectedRoute>
      <Container>
        <PaginationContainer>
          <Pagination
            page={page}
            count={totalPages}
            onChange={onPaginationClick}
          />
        </PaginationContainer>

        <Spacer size="large" />

        {lots && lots.length ? (
          lots.map(lot => (
            <>
              <LotResult key={lot.id} lot={lot} />

              <Spacer />
            </>
          ))
        ) : (
          <Typography>No results yet.</Typography>
        )}

        <Spacer size="large" />
      </Container>
    </ProtectedRoute>
  )
}

const Container = styled('div', {})

const PaginationContainer = styled('div', {
  padding: '0 $large',
  display: 'flex',
  justifyContent: 'center',
})

export const getStaticPaths: GetStaticPaths = async () => {
  const lots = await getInactiveLots()
  const totalLots = lots.length
  const totalPages = Math.floor(totalLots / LOT_RESULTS_PER_PAGE) || 1

  const paths = arrayFromNumber(totalPages).map((_, index) => ({
    params: { page: (index + 1).toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<ResultsProps> = async ({
  params,
}) => {
  const allLots = await getInactiveLots()
  const reverseSortedLots = sortArrayOfObjectsByKey(allLots, 'drawTime', true)

  const page = params ? parseInt(params.page as string) : 1
  const startIndex = (page - 1) * LOT_RESULTS_PER_PAGE
  const endIndex = startIndex + LOT_RESULTS_PER_PAGE
  const lots = reverseSortedLots.slice(startIndex, endIndex)

  const totalLots = allLots.length
  const totalPages = Math.floor(totalLots / LOT_RESULTS_PER_PAGE) || 1

  return { props: { lots, page, totalPages } }
}

export default Results
