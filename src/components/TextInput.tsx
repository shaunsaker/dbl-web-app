import React, {
  ChangeEvent,
  ForwardedRef,
  HTMLAttributes,
  ReactElement,
  useCallback,
} from 'react'
import { styled, theme } from '../styles/stitches.config'
import { ElementContainer } from './ElementContainer'
import { Typography } from './Typography'

export interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  inputRef?: ForwardedRef<HTMLInputElement>
  type?: 'text' | 'email' | 'password'
  label: string
  value: string
  onChangeText: (text: string) => void
  children?: React.ReactNode
}

export const TextInput = ({
  inputRef,
  type = 'text',
  label,
  onChangeText,
  children,
  ...props
}: TextInputProps): ReactElement => {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChangeText(event.target.value)
    },
    [onChangeText],
  )

  return (
    <Container>
      <LabelContainer>
        <Typography kind="small">{label}</Typography>
      </LabelContainer>

      <InputContainer>
        <StyledTextInput
          type={type}
          onChange={onChange}
          {...props}
          ref={inputRef}
        />

        {children}
      </InputContainer>
    </Container>
  )
}

const Container = styled('div', {})

const LabelContainer = styled('div', {
  marginLeft: 2,
  marginBottom: theme.space.verySmall,
})

const InputContainer = styled('div', {
  position: 'relative',
  width: '100%',
  border: '2px solid $transWhite',
  borderRadius: '$borderRadius$default',
})

const StyledTextInput = styled('input', {
  width: '100%',
  height: 48,
  padding: '0 $default',
  backgroundColor: '$black',
  fontSize: '$regular',
  fontWeight: 700,
  color: '$white',
  caretColor: '$turquoise',
  cursor: 'pointer',

  '&:focus, &:hover': {
    backgroundColor: '$transWhite',
  },
})
