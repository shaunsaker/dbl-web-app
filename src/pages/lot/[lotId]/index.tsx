import React, { ReactElement } from 'react'
import { styled } from '../../../styles/stitches.config'
import { LotStats } from '../../../components/LotStats'
import { TicketsSummary } from '../../../components/TicketsSummary'
import { Lot, LotId } from '../../../store/lots/models'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getInactiveLots } from '../../../server/getInactiveLots'

interface ResultProps {
  lot?: Lot
}

const Result = ({ lot }: ResultProps): ReactElement | null => {
  if (!lot) {
    return null
  }

  return (
    <Container>
      <LotStats lot={lot} />

      <TicketsSummary lot={lot} />
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const lots = await getInactiveLots()

  const paths = lots.map(lot => ({
    params: { lotId: lot.id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<ResultProps> = async ({
  params,
}) => {
  if (!params) {
    return {
      props: {
        lot: undefined,
      },
    }
  }

  const lotId = params.lotId as LotId
  const lots = await getInactiveLots()
  const lot = lots.find(lot => lot.id === lotId)

  return { props: { lot } }
}

export default Result

const Container = styled('div', {})
