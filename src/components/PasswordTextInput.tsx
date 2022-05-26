import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useCallback,
  useState,
} from 'react'
import { styled } from '../styles/stitches.config'

import { EyeSlashIcon } from './icons/EyeSlashIcon'
import { EyeIcon } from './icons/EyeIcon'
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
      <TextInput
        {...props}
        type={passwordHidden ? 'password' : 'text'}
        ref={ref}
      >
        <VisibilityButton onClick={onVisibilityButtonClick}>
          {passwordHidden ? <StyledEyeIcon /> : <StyledEyeSlashIcon />}
        </VisibilityButton>
      </TextInput>
    )
  },
)

const VisibilityButton = styled('button', {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  flexCenter: '',
  paddingRight: '$default',
  cursor: 'pointer',
  transition: '$default',

  '&:hover > svg': {
    color: '$turquoise',
  },
})

const StyledEyeIcon = styled(EyeIcon, {
  fontSize: '$icon',
  color: '$white',
})

const StyledEyeSlashIcon = styled(EyeSlashIcon, {
  fontSize: '$icon',
  color: '$white',
})
