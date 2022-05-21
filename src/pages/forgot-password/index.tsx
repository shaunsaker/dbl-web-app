import React, { ReactElement, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
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

const ForgotPassword = (): ReactElement => {
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
        <Image alt="" />

        <Spacer />

        <Typography>Title</Typography>

        <Spacer />

        <Typography>Creating one millionaire a day!</Typography>

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

export default ForgotPassword

const Container = styled('div', {})
