import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  useCallback,
} from 'react'
import { styled } from '../styles/stitches.config'
import { Spacer } from './Spacer'
import { Typography } from './Typography'

export interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password'
  label: string
  value: string
  onChangeText: (text: string) => void
  children?: React.ReactNode
}

export const TextInput = forwardRef(
  (
    { type = 'text', label, onChangeText, children, ...props }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ): ReactElement => {
    const onChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChangeText(event.target.value)
      },
      [onChangeText],
    )

    return (
      <Container>
        <Typography>{label}</Typography>

        <Spacer />

        <InputContainer>
          <StyledTextInput
            type={type}
            onChange={onChange}
            {...props}
            ref={ref}
          />

          {children}
        </InputContainer>
      </Container>
    )
  },
)

const Container = styled('div', {})

const InputContainer = styled('div', {})

const StyledTextInput = styled('input', {})
