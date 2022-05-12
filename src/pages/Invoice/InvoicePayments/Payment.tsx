import React, { ReactElement, useCallback } from 'react'
import styled from 'styled-components'
import { Payment as PaymentType } from '../../../store/payments/models'
import { getFormattedTime } from '../../../utils/getFormattedTime'
import { Typography } from '../../../components/Typography'
import { useLinking } from '../../../components/useLinking'
import OpenIcon from '../../../icons/open.svg'

type PaymentProps = PaymentType

export const Payment = ({
  txId,
  amountBTC,
  receivedDate,
}: PaymentProps): ReactElement => {
  const { openLink } = useLinking()

  const onClick = useCallback(() => {
    const url = `${process.env.BLOCKCHAIN_EXPLORER_URL}/${txId}`

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

const Container = styled.button`
  flex-direction: row;
  justify-content: space-between;
`
