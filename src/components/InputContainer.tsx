import React, { ReactElement, ReactNode } from 'react'

interface InputContainerProps {
  children: ReactNode
}

// TODO:
export const InputContainer = ({
  children,
}: InputContainerProps): ReactElement => {
  return <div style={{ flex: 1 }}>{children}</div>
}
