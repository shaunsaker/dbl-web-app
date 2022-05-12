import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  useCallback,
} from 'react'
import styled from 'styled-components'
import { colors } from '../theme/colors'
import { Typography } from './Typography'

export interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  label: string
  value: string
  onChangeText: (text: string) => void
}

export const TextInput = forwardRef(
  (
    { label, onChangeText, ...props }: TextInputProps,
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
        <Typography small>{label}</Typography>

        <StyledTextInput onChange={onChange} {...props} ref={ref} />
      </Container>
    )
  },
)

const Container = styled.div`
  border-bottom-width: 1px;
  border-color: ${colors.border};
`

const StyledTextInput = styled.input`
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${colors.primaryText};
`
