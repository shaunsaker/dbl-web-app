import React, { ReactElement, useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { LoadingModal } from '../../components/LoadingModal'
import { Page } from '../../components/Page'
import { PasswordTextInput } from '../../components/PasswordTextInput'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Spacer } from '../../components/Spacer'
import { TextButton } from '../../components/TextButton'
import { TextInput } from '../../components/TextInput'
import { RoutePath } from '../../router/models'
import { signIn } from '../../store/auth/actions'
import { selectAuthLoading } from '../../store/auth/selectors'
import { navigate } from '../../store/navigation/actions'
import { selectUsername } from '../../store/userProfile/selectors'
import { validateEmail } from '../../utils/validateEmail'
import { validatePassword } from '../../utils/validatePassword'
import { Explainer } from '../../components/Explainer'

interface SignInProps {}

const SignIn = ({}: SignInProps): ReactElement => {
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
    dispatch(navigate({ route: RoutePath.forgotPassword }))
  }, [dispatch])

  const onSubmit = useCallback(() => {
    if (!isSignInDisabled) {
      dispatch(signIn.request({ email, password }))
    }
  }, [dispatch, email, password, isSignInDisabled])

  const onSignUpInsteadClick = useCallback(() => {
    dispatch(navigate({ route: RoutePath.signUp }))
  }, [dispatch])

  return (
    <Page>
      <Container>
        <Explainer
          title={`Welcome back to the Daily Bitcoin Lottery${
            existingUsername ? `, ${existingUsername}` : ''
          }`}
          description="Creating one millionaire a day!"
        />

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

export default SignIn

const Container = styled('div', {})
