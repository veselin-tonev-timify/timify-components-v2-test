import React, { ReactNode } from 'react'
import './Col.css'

export interface ColProps {
  children?: ReactNode
  size?: number
  className?: string
  dataAttributes?: Record<string, string | number>
}

const Col: React.FC<ColProps> = ({
  children,
  size,
  className,
  dataAttributes,
}) => {
  const classNames = ['ta-col']
  if (size) classNames.push(`ta-col__${size}`)
  if (className) classNames.push(className)

  let processedDataAttributes: Record<string, string | number> | undefined
  if (dataAttributes) {
    processedDataAttributes = {}
    Object.keys(dataAttributes).forEach((key) => {
      processedDataAttributes![`data-${key}`] = dataAttributes[key]
    })
  }

  return (
    <div className={classNames.join(' ')} {...processedDataAttributes}>
      {children}
    </div>
  )
}

export default Col
