import React, { ReactElement, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '../../styles/stitches.config'
import { LoadingModal } from '../../components/LoadingModal'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Spacer } from '../../components/Spacer'
import { TextInput } from '../../components/TextInput'
import { resetPassword } from '../../store/auth/actions'
import { selectAuthLoading } from '../../store/auth/selectors'
import { validateEmail } from '../../utils/validateEmail'
import { Explainer } from '../../components/Explainer'

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
          label="Email*"
          placeholder="Enter your email"
          value={email}
          onChangeText={onChangeEmail}
          onSubmit={onSubmitClick}
        />
      </Container>

      <Spacer size="large" />

      <PrimaryButton
        disabled={isForgotPasswordDisabled}
        onClick={onSubmitClick}
      >
        SUBMIT
      </PrimaryButton>

      {isAuthLoading && <LoadingModal />}
    </>
  )
}

export default ForgotPassword

const Container = styled('div', {
  width: '100%',
  flex: 1,
  flexCenter: '',
})
