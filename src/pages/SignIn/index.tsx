import React, { ReactElement, useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { Image } from '../../components/Image'
import { LoadingModal } from '../../components/LoadingModal'
import { Page } from '../../components/Page'
import { PasswordTextInput } from '../../components/PasswordTextInput'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Spacer } from '../../components/Spacer'
import { TextButton } from '../../components/TextButton'
import { TextInput } from '../../components/TextInput'
import { Typography } from '../../components/Typography'
import { RoutePath } from '../../router/models'
import { signIn } from '../../store/auth/actions'
import { selectAuthLoading } from '../../store/auth/selectors'
import { navigate } from '../../store/navigation/actions'
import { selectUsername } from '../../store/userProfile/selectors'
import { validateEmail } from '../../utils/validateEmail'
import { validatePassword } from '../../utils/validatePassword'

interface SignInProps {}

export const SignIn = ({}: SignInProps): ReactElement => {
  const dispatch = useDispatch()
  const existingUsername = useSelector(selectUsername)
  const isAuthLoading = useSelector(selectAuthLoading)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isEmailValid = validateEmail(email)
  const isPasswordValid = validatePassword(password)
  const isSignInDisabled = !isEmailValid || !isPasswordValid

  const passwordInputRef = useRef<HTMLInputElement>(null)

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text)
  }, [])

  const onSubmitEmail = useCallback(() => {
    passwordInputRef.current?.focus()
  }, [passwordInputRef])

  const onChangePassword = useCallback((text: string) => {
    setPassword(text)
  }, [])

  const onForgotPasswordClick = useCallback(() => {
    dispatch(navigate(RoutePath.forgotPassword))
  }, [dispatch])

  const onSubmit = useCallback(() => {
    if (!isSignInDisabled) {
      dispatch(signIn.request({ email, password }))
    }
  }, [dispatch, email, password, isSignInDisabled])

  const onSignUpInsteadClick = useCallback(() => {
    dispatch(navigate(RoutePath.signUp))
  }, [dispatch])

  return (
    <Page>
      <Container>
        <Image />

        <Spacer />

        <Typography>
          {`Welcome back to the Daily Bitcoin Lottery${
            existingUsername ? `, ${existingUsername}` : ''
          }`}
        </Typography>

        <Spacer />

        <Typography>Creating one millionaire a day!</Typography>

        <Spacer />

        <TextInput
          label="Email*"
          placeholder="Enter your email"
          value={email}
          onChangeText={onChangeEmail}
          onSubmit={onSubmitEmail}
        />

        <Spacer />

        <PasswordTextInput
          ref={passwordInputRef}
          label="Password*"
          placeholder="Enter your password"
          value={password}
          onChangeText={onChangePassword}
          onSubmit={onSubmit}
        />

        <Spacer />

        <TextButton onClick={onForgotPasswordClick}>
          Forgot Password?
        </TextButton>
      </Container>

      <PrimaryButton disabled={isSignInDisabled} onClick={onSubmit}>
        SIGN IN
      </PrimaryButton>

      <Spacer />

      <TextButton onClick={onSignUpInsteadClick}>Sign up instead?</TextButton>

      {isAuthLoading && <LoadingModal />}
    </Page>
  )
}

const Container = styled('div', {})
