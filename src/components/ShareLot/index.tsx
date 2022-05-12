import React, { ReactElement, useCallback } from 'react'
import styled from 'styled-components'
import { LotId } from '../../store/lots/models'
import { colors } from '../../theme/colors'
import { getTicketOdds } from '../../utils/getTicketOdds'
import { useSharing } from '../useSharing'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../store/reducers'
import { selectLotById } from '../../store/lots/selectors'
import { maybePluralise } from '../../utils/maybePluralise'
import { ShareIcon } from '../icons/ShareIcon'

interface ShareLotProps {
  lotId: LotId
}

export const ShareLot = ({ lotId }: ShareLotProps): ReactElement => {
  const lot = useSelector((state: ApplicationState) =>
    selectLotById(state, lotId),
  )

  const { share } = useSharing()

  const onClick = useCallback(() => {
    const title = 'Get money fam!'
    const subject = title
    const ticketOdds = getTicketOdds({
      newUserTicketCount: 1,
      existingUserTicketCount: 0,
      totalLotTicketCount: lot?.totalConfirmedTickets || 0,
    })
    const url = process.env.APP_DOWNLOAD_URL

    // FIXME: this is gross, abstract and test it
    const isLotActive = lot?.active
    const message = `Lot total ${isLotActive ? 'is' : 'was'} at ${
      lot?.totalBTC
    } BTC and ${maybePluralise(lot?.totalConfirmedTickets || 0, 'ticket')} ${
      isLotActive ? 'has been' : 'was'
    } purchased. Your odds of winning would ${
      isLotActive ? 'be' : 'have been'
    } ${ticketOdds}%!`

    share({ title, subject, message, url })
  }, [share, lot])

  return (
    <Container onClick={onClick}>
      <ShareIcon width={24} height={24} fill={colors.primaryText} />
    </Container>
  )
}

const Container = styled.button``
