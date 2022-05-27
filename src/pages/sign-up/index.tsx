import React, { ReactElement, useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { Explainer } from '../../components/Explainer'
import { LoadingModal } from '../../components/LoadingModal'
import { PasswordTextInput } from '../../components/PasswordTextInput'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Spacer } from '../../components/Spacer'
import { TextButton } from '../../components/TextButton'
import { TextInput } from '../../components/TextInput'
import { RoutePath } from '../../router/models'
import { signUp } from '../../store/auth/actions'
import { selectAuthLoading } from '../../store/auth/selectors'
import { navigate } from '../../store/navigation/actions'
import { validateEmail } from '../../utils/validateEmail'
import { validatePassword } from '../../utils/validatePassword'

interface SignUpProps {}

// FIXME: could reuse SignIn
const SignUp = ({}: SignUpProps): ReactElement => {
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
    dispatch(navigate({ route: RoutePath.signIn }))
  }, [dispatch])

  return (
    <>
      <Container>
        <Explainer
          imageProps={{
            src: '/images/cyberpunk-city-4.webp',
            alt: '',
          }}
          title="Welcome"
          description="Physics-defying Explanation."
        />

        <Spacer size="large" />

        <TextInput
          ref={emailInputRef}
          label="Email*"
          placeholder="Enter your email"
          value={email}
          onChangeText={onChangeEmail}
          onSubmit={onSubmitEmail}
        />

        <Spacer />

        <TextInput
          label="Username*"
          placeholder="E.g. lootkid47"
          value={username}
          onChangeText={onChangeUsername}
          onSubmit={onSubmitUsername}
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
      </Container>

      <Spacer size="large" />

      <PrimaryButton disabled={isSignUpDisabled} onClick={onSubmit}>
        SIGN UP
      </PrimaryButton>

      <Spacer />

      <TextButton onClick={onSignInInsteadClick}>Sign in instead?</TextButton>

      {isAuthLoading && <LoadingModal />}
    </>
  )
}

export default SignUp

const Container = styled('div', {
  width: '100%',
  flex: 1,
  flexCenter: '',
})
