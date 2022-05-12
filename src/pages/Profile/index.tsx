import React, { ReactElement, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { HeaderBar } from '../../components/HeaderBar'
import { InputContainer } from '../../components/InputContainer'
import { Page } from '../../components/Page'
import { PrimaryButton } from '../../components/PrimaryButton'
import { TextButton } from '../../components/TextButton'
import { TextInput } from '../../components/TextInput'
import { Typography } from '../../components/Typography'
import { signOut } from '../../store/auth/actions'
import { updateUserProfile } from '../../store/userProfile/actions'
import {
  selectUserEmail,
  selectUsername,
} from '../../store/userProfile/selectors'
import { RHYTHM } from '../../theme/rhythm'

interface ProfileProps {}

export const Profile = ({}: ProfileProps): ReactElement => {
  const dispatch = useDispatch()

  const savedUsername = useSelector(selectUsername)
  const userEmail = useSelector(selectUserEmail)

  const [username, setUsername] = useState(savedUsername || '')

  const isUsernameValid = username.length
  const usernameChanged = username !== savedUsername
  const isSaveDisabled = !(usernameChanged && isUsernameValid)

  const onChangeUsername = useCallback((text: string) => {
    setUsername(text)
  }, [])

  const onSignOutClick = useCallback(() => {
    dispatch(signOut.request())
  }, [dispatch])

  const onSubmit = useCallback(() => {
    dispatch(
      updateUserProfile.request({ data: { username }, showSnackbar: true }),
    )
  }, [dispatch, username])

  return (
    <Page>
      <HeaderBar />

      <InputContainer>
        <Container>
          <Typography>Email</Typography>

          <Typography bold>{userEmail}</Typography>

          <TextInput
            label="What should we call you?"
            placeholder="E.g. Nighthawk"
            value={username}
            onChangeText={onChangeUsername}
            onSubmit={!isSaveDisabled ? onSubmit : undefined}
          />

          <TextButton onClick={onSignOutClick}>Sign Out</TextButton>

          <ButtonsContainer>
            <PrimaryButton disabled={isSaveDisabled} onClick={onSubmit}>
              SAVE
            </PrimaryButton>
          </ButtonsContainer>
        </Container>
      </InputContainer>
    </Page>
  )
}

const Container = styled.div`
  flex: 1;
  padding: ${RHYTHM}px;
`

const ButtonsContainer = styled.div`
  flex: 1;
  justify-content: flex-end;
`
