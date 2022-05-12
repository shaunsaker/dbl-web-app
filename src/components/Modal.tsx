import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { colors } from '../theme/colors'
import { RHYTHM } from '../theme/rhythm'
import { HEADER_BAR_HEIGHT } from './HeaderBar'
import { BORDER_RADIUS } from '../theme/borderRadius'
import { Typography } from './Typography'
import { CloseButton } from './CloseButton'

const CLOSE_ICON_SIZE = 24

const BACKDROP_COLOR = colors.backdrop

export interface ModalProps {
  title: string
  subtitle?: string
  isVisible: boolean
  disableSwipeAway?: boolean // useful for when you have a ScrollView in the Modal
  children: ReactNode
  onClose: () => void
}

// TODO:
export const Modal = ({
  title,
  subtitle,
  isVisible,
  disableSwipeAway,
  children,
  onClose,
}: ModalProps): ReactElement => {
  return (
    <StyledModal
    // isVisible={isVisible}
    // backdropColor={BACKDROP_COLOR}
    // backdropOpacity={1}
    // useNativeDriver
    // useNativeDriverForBackdrop
    // hideModalContentWhileAnimating
    // coverScreen={false}
    // swipeDirection={disableSwipeAway ? undefined : 'down'}
    // propagateSwipe={disableSwipeAway}
    // onBackdropClick={onClose}
    // onBackButtonClick={onClose}
    >
      <ContentContainer>
        <Typography large bold>
          {title}
        </Typography>

        {subtitle && <Typography>{subtitle}</Typography>}

        {children}

        <StyledCloseButton onClick={onClose} />
      </ContentContainer>
    </StyledModal>
  )
}

const StyledModal = styled.div`
  margin: 0;
  flex: 1;
  margin-top: ${HEADER_BAR_HEIGHT + RHYTHM * 4}px;
  border-top-left-radius: ${BORDER_RADIUS}px;
  border-top-right-radius: ${BORDER_RADIUS}px;
`

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
`

const ContentContainer = styled.div`
  background-color: ${colors.white};
  flex: 1;
  border-top-left-radius: ${BORDER_RADIUS}px;
  border-top-right-radius: ${BORDER_RADIUS}px;
  padding: ${RHYTHM}px;
`
