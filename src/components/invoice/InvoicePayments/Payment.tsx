import React, { ReactElement, useCallback } from 'react'
import { styled } from '../../../styles/stitches.config'
import { Payment as PaymentType } from '../../../store/payments/models'
import { getFormattedTime } from '../../../utils/getFormattedTime'
import { Typography } from '../../Typography'
import { useLinking } from '../../useLinking'
import { OpenIcon } from '../../icons/OpenIcon'

type PaymentProps = PaymentType

export const Payment = ({
  txId,
  amountBTC,
  receivedDate,
}: PaymentProps): ReactElement => {
  const { openLink } = useLinking()

  const onClick = useCallback(() => {
    const url = `${process.env.NEXT_PUBLIC_BLOCKCHAIN_TRANSACTION_EXPLORER_URL}/${txId}`

    openLink(url)
  }, [openLink, txId])

  return (
    <Container onClick={onClick}>
      <Typography>{getFormattedTime(receivedDate)}</Typography>

      <Typography>{amountBTC} BTC</Typography>

      <OpenIcon width={16} height={16} style={{}} />
    </Container>
  )
}

const Container = styled('button', {})