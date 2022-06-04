import React, { ReactElement, useCallback } from 'react'
import { styled } from '../../../styles/stitches.config'
import { Payment as PaymentType } from '../../../store/payments/models'
import { getFormattedTime } from '../../../utils/getFormattedTime'
import { Typography } from '../../Typography'
import { useLinking } from '../../useLinking'
import { Card } from '../../Card'
import { Spacer } from '../../Spacer'

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
      <Typography kind="small">Date</Typography>

      <Typography kind="paragraph" bold>
        {getFormattedTime(receivedDate)}
      </Typography>

      <Spacer />

      <Typography kind="small">Amount</Typography>

      <Typography kind="paragraph" bold>
        {amountBTC} BTC
      </Typography>
    </Container>
  )
}

const Container = styled(Card, {})
