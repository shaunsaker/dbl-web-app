import React, { ReactElement, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '../../../../styles/stitches.config'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { Typography } from '../../../../components/Typography'
import { useLinking } from '../../../../components/useLinking'
import { ApplicationState } from '../../../../store/reducers'
import { selectUserWinningByLotId } from '../../../../store/userProfile/selectors'
import { LotId } from '../../../../store/lots/models'
import { getInactiveLots } from '../../../../server/getInactiveLots'
import { GetStaticPaths, GetStaticProps } from 'next'

interface WinnerProps {
  lotId?: LotId
}

const Winner = ({ lotId }: WinnerProps): ReactElement => {
  const { openLink } = useLinking()

  const winning = useSelector(
    (state: ApplicationState) =>
      lotId && selectUserWinningByLotId(state, lotId),
  )

  const onWithdrawClick = useCallback(() => {
    if (!winning) {
      return
    }

    openLink(winning.link)
  }, [openLink, winning])

  return (
    <Container>
      <Typography>Holy shit, you just won 🎉</Typography>

      <Typography>Follow the link below to withdraw your BTC...</Typography>

      <PrimaryButton onClick={onWithdrawClick}>SET UP WITHDRAWAL</PrimaryButton>
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

export const getStaticProps: GetStaticProps<WinnerProps> = async ({
  params,
}) => {
  if (!params) {
    return {
      props: {
        lotId: undefined,
      },
    }
  }

  const lotId = params.lotId as LotId

  return { props: { lotId } }
}

export default Winner

const Container = styled('div', {})
