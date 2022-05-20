import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useCallback,
  useState,
} from 'react'
import { styled } from '../styles/stitches.config'

import { VisibilityOffIcon } from './icons/VisibilityOffIcon'
import { VisibilityOnIcon } from './icons/VisibilityOnIcon'
import { TextInput, TextInputProps } from './TextInput'

type PasswordTextInputProps = TextInputProps

export const PasswordTextInput = forwardRef(
  (
    props: PasswordTextInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ): ReactElement => {
    const [passwordHidden, setPasswordHidden] = useState(true)

    const onVisibilityButtonClick = useCallback(() => {
      setPasswordHidden(hidden => !hidden)
    }, [])

    return (
      <Container>
        <TextInput
          {...props}
          type={passwordHidden ? 'password' : 'text'}
          ref={ref}
        >
          <VisibilityButton onClick={onVisibilityButtonClick}>
            {passwordHidden ? <VisibilityOnIcon /> : <VisibilityOffIcon />}
          </VisibilityButton>
        </TextInput>
      </Container>
    )
  },
)

const Container = styled('div', {})

const VisibilityButton = styled('button', {})
