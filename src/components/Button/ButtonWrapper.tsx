import React, { ReactNode, CSSProperties, MouseEvent } from 'react'

type ButtonWrapperType = 'default' | 'space-between'

export interface ButtonWrapperProps {
  type?: ButtonWrapperType
  children?: ReactNode
  className?: string
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  className,
  children,
  type = 'default',
}) => {
  const classNames = ['ta-btn-wrapper']

  if (className) classNames.push(className)
  if (type === 'space-between') {
    classNames.push('ta-btn-wrapper__space-between')
  }

  return <div className={classNames.join(' ')}>{children}</div>
}

export default ButtonWrapper
