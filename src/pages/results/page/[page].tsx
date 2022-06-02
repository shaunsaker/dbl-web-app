import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '../../../styles/stitches.config'
import { LotResult } from '../../../components/LotResult'
import { Typography } from '../../../components/Typography'
import { pageParam, RoutePath } from '../../../router/models'
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
          route: RoutePath.results.replace(pageParam, newPage.toString()),
        }),
      )
    },
    [dispatch],
  )

  return (
    <ProtectedRoute>
      <Container>
        <Typography kind="title">Results</Typography>

        <Spacer size="large" />

        <ContentContainer>
          {lots && lots.length ? (
            lots.map(lot => (
              <>
                <LotResult key={lot.id} lot={lot} />

                <Spacer size="large" />
              </>
            ))
          ) : (
            <Typography>No results yet.</Typography>
          )}
        </ContentContainer>

        <Spacer size="large" />

        <PaginationContainer>
          <Pagination
            page={page}
            count={totalPages}
            onChange={onPaginationClick}
          />
        </PaginationContainer>
      </Container>
    </ProtectedRoute>
  )
}

const Container = styled('div', {
  // necessary for ContentContainer scrolling
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: -32, // TODO: use theme
  left: -32, // TODO: use theme
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const ContentContainer = styled('div', {
  width: '100%',
  height: '100%',
  overflow: 'auto',
  padding: '0 $large',
})

const PaginationContainer = styled('div', {
  padding: '0 $large',
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
