import React, { ReactElement, useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { InputContainer } from '../../components/InputContainer'
import { LoadingModal } from '../../components/LoadingModal'
import { Page } from '../../components/Page'
import { PasswordTextInput } from '../../components/PasswordTextInput'
import { PrimaryButton } from '../../components/PrimaryButton'
import { TextButton } from '../../components/TextButton'
import { TextInput } from '../../components/TextInput'
import { Typography } from '../../components/Typography'
import { RouteKey } from '../../router/models'
import { signIn } from '../../store/auth/actions'
import { selectAuthLoading } from '../../store/auth/selectors'
import { navigate } from '../../store/navigation/actions'
import { selectUsername } from '../../store/userProfile/selectors'
import { colors } from '../../theme/colors'
import { RHYTHM } from '../../theme/rhythm'
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
    dispatch(navigate({ route: RouteKey.forgotPassword, props: { email } }))
  }, [dispatch, email])

  const onSubmit = useCallback(() => {
    if (!isSignInDisabled) {
      dispatch(signIn.request({ email, password }))
    }
  }, [dispatch, email, password, isSignInDisabled])

  const onSignUpInsteadClick = useCallback(() => {
    dispatch(navigate({ route: RouteKey.signUp }))
  }, [dispatch])

  return (
    <Page>
      <InputContainer>
        <Container>
          <StyledImage src="" />

          <Typography large bold center>
            {`Welcome back to the Daily Bitcoin Lottery${
              existingUsername ? `, ${existingUsername}` : ''
            }`}
          </Typography>

          <Typography center>Creating one millionaire a day!</Typography>

          <TextInput
            label="Email*"
            placeholder="Enter your email"
            value={email}
            onChangeText={onChangeEmail}
            onSubmit={onSubmitEmail}
          />

          <PasswordTextInput
            ref={passwordInputRef}
            label="Password*"
            placeholder="Enter your password"
            value={password}
            onChangeText={onChangePassword}
            onSubmit={onSubmit}
          />

          <TextButton onClick={onForgotPasswordClick}>
            Forgot Password?
          </TextButton>

          <PrimaryButton disabled={isSignInDisabled} onClick={onSubmit}>
            SIGN IN
          </PrimaryButton>

          <TextButton onClick={onSignUpInsteadClick}>
            Sign up instead?
          </TextButton>
        </Container>
      </InputContainer>

      {isAuthLoading && <LoadingModal />}
    </Page>
  )
}

const Container = styled.div`
  flex: 1;
  justify-content: center;
  padding: ${RHYTHM}px;
`

const StyledImage = styled.img`
  width: 120px;
  height: 120px;
  background-color: ${colors.border};
  align-self: center;
`
