import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useCallback,
  useState,
} from 'react'
import styled from 'styled-components'

import { colors } from '../theme/colors'
import { VisibilityOffIcon } from './icons/VisibilityOffIcon'
import { VisibilityOnIcon } from './icons/VisibilityOnIcon'
import { TextInputProps } from './TextInput'

const VISIBILITY_ICON_SIZE = 24

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
        <input {...props} ref={ref} />

        <VisibilityButton onClick={onVisibilityButtonClick}>
          {passwordHidden ? (
            <VisibilityOnIcon
              width={VISIBILITY_ICON_SIZE}
              height={VISIBILITY_ICON_SIZE}
              fill={colors.primaryText}
            />
          ) : (
            <VisibilityOffIcon
              width={VISIBILITY_ICON_SIZE}
              height={VISIBILITY_ICON_SIZE}
              fill={colors.primaryText}
            />
          )}
        </VisibilityButton>
      </Container>
    )
  },
)

const Container = styled.div``

const VisibilityButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`
