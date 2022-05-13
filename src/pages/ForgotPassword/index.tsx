import React, { ReactElement, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { BackButton } from '../../components/BackButton'
import { LoadingModal } from '../../components/LoadingModal'
import { Page } from '../../components/Page'
import { PrimaryButton } from '../../components/PrimaryButton'
import { TextInput } from '../../components/TextInput'
import { Typography } from '../../components/Typography'
import { RouteParams } from '../../router/models'
import { resetPassword } from '../../store/auth/actions'
import { selectAuthLoading } from '../../store/auth/selectors'
import { navigateBack } from '../../store/navigation/actions'
import { colors } from '../../theme/colors'
import { RHYTHM } from '../../theme/rhythm'
import { validateEmail } from '../../utils/validateEmail'

export const ForgotPassword = (): ReactElement => {
  const dispatch = useDispatch()

  const { email: initialEmail = '' } =
    useParams<RouteParams['forgotPassword']>()

  const isAuthLoading = useSelector(selectAuthLoading)

  const [email, setEmail] = useState(initialEmail)

  const isEmailValid = validateEmail(email)
  const isForgotPasswordDisabled = !isEmailValid

  const onBackClick = useCallback(() => {
    dispatch(navigateBack())
  }, [dispatch])

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text)
  }, [])

  const onSubmitClick = useCallback(() => {
    dispatch(resetPassword.request({ email }))
  }, [dispatch, email])

  return (
    <Page>
      <Container>
        <StyledImage src="" />

        <Typography large bold center>
          Title
        </Typography>

        <Typography center>Creating one millionaire a day!</Typography>

        <TextInput
          label="Email*"
          placeholder="Enter your email"
          value={email}
          onChangeText={onChangeEmail}
          onSubmit={onSubmitClick}
        />

        <PrimaryButton
          disabled={isForgotPasswordDisabled}
          onClick={onSubmitClick}
        >
          SUBMIT
        </PrimaryButton>
      </Container>

      <BackButtonContainer>
        <BackButton onClick={onBackClick} />
      </BackButtonContainer>

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

const BackButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`
