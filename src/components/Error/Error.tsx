import React from 'react'
import Alert, { BorderRadius as AlertBorderRadius } from '../Alert/Alert'
import { dangerousHTML } from '../../functions'

import './Error.css'

export interface ErrorProps {
  errors?: string[]
  hasTopOffset?: boolean
  hasHalfTopOffset?: boolean
  hasBottomOffset?: boolean
  hasBorder?: boolean
  borderRadius?: AlertBorderRadius
  normal?: boolean
  dataAttributes?: Record<string, string | number>
}

const Error: React.FC<ErrorProps> = ({
  errors = [],
  hasTopOffset = false,
  hasHalfTopOffset = false,
  hasBottomOffset = false,
  hasBorder = false,
  borderRadius,
  normal = false,
  dataAttributes,
}) => {
  if (errors.length < 1) return null

  const classNames = ['ta-error']
  if (hasTopOffset) classNames.push('ta-error__has-top-offset')
  if (hasHalfTopOffset) classNames.push('ta-error__has-half-top-offset')

  // Process data attributes
  let processedDataAttributes: Record<string, string | number> | undefined
  if (dataAttributes) {
    processedDataAttributes = {}
    Object.keys(dataAttributes).forEach((key) => {
      processedDataAttributes![`data-${key}`] = dataAttributes[key]
    })
  }

  return (
    <div className={classNames.join(' ')}>
      <Alert
        theme="error"
        noOffset={!hasBottomOffset}
        noBorder={!hasBorder}
        isCompact={!normal}
        borderRadius={borderRadius}
        {...processedDataAttributes}
      >
        {errors.map((error, index) => (
          <div key={index}>{dangerousHTML(error)}</div>
        ))}
      </Alert>
    </div>
  )
}

export default Error
