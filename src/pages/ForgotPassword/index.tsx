import React, { ReactElement, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { HeaderBar } from '../../components/HeaderBar'
import { Image } from '../../components/Image'
import { LoadingModal } from '../../components/LoadingModal'
import { Page } from '../../components/Page'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Spacer } from '../../components/Spacer'
import { TextInput } from '../../components/TextInput'
import { Typography } from '../../components/Typography'
import { resetPassword } from '../../store/auth/actions'
import { selectAuthLoading } from '../../store/auth/selectors'
import { validateEmail } from '../../utils/validateEmail'

export const ForgotPassword = (): ReactElement => {
  const dispatch = useDispatch()

  const isAuthLoading = useSelector(selectAuthLoading)

  const [email, setEmail] = useState('')

  const isEmailValid = validateEmail(email)
  const isForgotPasswordDisabled = !isEmailValid

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text)
  }, [])

  const onSubmitClick = useCallback(() => {
    dispatch(resetPassword.request({ email }))
  }, [dispatch, email])

  return (
    <Page>
      <HeaderBar showBack />

      <Container>
        <StyledImage />

        <Spacer />

        <Typography large bold center>
          Title
        </Typography>

        <Spacer size="small" />

        <Typography secondary center>
          Creating one millionaire a day!
        </Typography>

        <Spacer />

        <TextInput
          label="Email*"
          placeholder="Enter your email"
          value={email}
          onChangeText={onChangeEmail}
          onSubmit={onSubmitClick}
        />

        <Spacer />
      </Container>

      <PrimaryButton
        disabled={isForgotPasswordDisabled}
        onClick={onSubmitClick}
      >
        SUBMIT
      </PrimaryButton>

      {isAuthLoading && <LoadingModal />}
    </Page>
  )
}

const Container = styled.div`
  flex: 1;
  justify-content: center;
  text-align: center;
`

const StyledImage = styled(Image)``
