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
import { signUp } from '../../store/auth/actions'
import { selectAuthLoading } from '../../store/auth/selectors'
import { navigate } from '../../store/navigation/actions'
import { colors } from '../../theme/colors'
import { RHYTHM } from '../../theme/rhythm'
import { validateEmail } from '../../utils/validateEmail'
import { validatePassword } from '../../utils/validatePassword'

interface SignUpProps {}

// FIXME: could reuse SignIn
export const SignUp = ({}: SignUpProps): ReactElement => {
  const dispatch = useDispatch()
  const isAuthLoading = useSelector(selectAuthLoading)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isUsernameValid = username.length > 2
  const isEmailValid = validateEmail(email)
  const isPasswordValid = validatePassword(password)
  const isSignUpDisabled = !isUsernameValid || !isEmailValid || !isPasswordValid

  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const onChangeUsername = useCallback((text: string) => {
    setUsername(text)
  }, [])

  const onSubmitUsername = useCallback(() => {
    emailInputRef.current?.focus()
  }, [emailInputRef])

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text)
  }, [])

  const onSubmitEmail = useCallback(() => {
    passwordInputRef.current?.focus()
  }, [passwordInputRef])

  const onChangePassword = useCallback((text: string) => {
    setPassword(text)
  }, [])

  const onSubmit = useCallback(() => {
    if (!isSignUpDisabled) {
      dispatch(signUp.request({ username, email, password }))
    }
  }, [dispatch, username, email, password, isSignUpDisabled])

  const onSignInInsteadClick = useCallback(() => {
    dispatch(navigate({ route: RouteKey.signIn }))
  }, [dispatch])

  return (
    <Page>
      <InputContainer>
        <Container>
          <StyledImage src="" />

          <Typography large bold center>
            Welcome to the Daily Bitcoin Lottery
          </Typography>

          <Typography center>Creating one millionaire a day!</Typography>

          <TextInput
            ref={emailInputRef}
            label="Email*"
            placeholder="Enter your email"
            value={email}
            onChangeText={onChangeEmail}
            onSubmit={onSubmitEmail}
          />

          <TextInput
            label="What should we call you?*"
            placeholder="E.g. Nighthawk, Sandra, Xolisi, Kobus"
            value={username}
            onChangeText={onChangeUsername}
            onSubmit={onSubmitUsername}
          />

          <PasswordTextInput
            ref={passwordInputRef}
            label="Password*"
            placeholder="Enter your password"
            value={password}
            onChangeText={onChangePassword}
            onSubmit={onSubmit}
          />

          <PrimaryButton disabled={isSignUpDisabled} onClick={onSubmit}>
            SIGN UP
          </PrimaryButton>

          <TextButton onClick={onSignInInsteadClick}>
            Sign in instead?
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
