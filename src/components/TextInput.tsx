import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  useCallback,
} from 'react'
import styled from 'styled-components'
import { BORDER_RADIUS } from '../theme/borderRadius'
import { colors } from '../theme/colors'
import { RHYTHM } from '../theme/rhythm'
import { Spacer } from './Spacer'
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

        <Spacer size="small" />

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
  border: none;
  outline: none;
  width: 100%;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${colors.primaryText};
  padding: ${RHYTHM / 2}px;
  background-color: ${colors.lightTransWhite};
  border-radius: ${BORDER_RADIUS}px;
  caret-color: ${colors.primary};

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${colors.placeholder};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${colors.placeholder};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${colors.placeholder};
  }
`
