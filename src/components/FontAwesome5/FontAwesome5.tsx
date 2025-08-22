// FontAwesome5.tsx
import React, { CSSProperties } from 'react'

export type FontAwesome5Type =
  | 'regular'
  | 'r'
  | 'solid'
  | 's'
  | 'light'
  | 'l'
  | 'brand'
  | 'b'
  | 'duotone'
  | 'd'

export interface FontAwesome5Props extends React.HTMLAttributes<HTMLElement> {
  type?: FontAwesome5Type
  icon?: string
  color?: string
  className?: string
  spin?: boolean
  dataAttributes?: Record<string, string | number>
  primaryColor?: string
  secondaryColor?: string
  secondaryOpacity?: string
  primaryOpacity?: string
}

interface StyleProps extends CSSProperties {
  '--fa-primary-color'?: string
  '--fa-secondary-color'?: string
  '--fa-secondary-opacity'?: string
  '--fa-primary-opacity'?: string
}

const FontAwesome5: React.FC<FontAwesome5Props> = ({
  type,
  icon,
  color,
  className,
  spin = false,
  dataAttributes,
  primaryColor,
  secondaryColor,
  secondaryOpacity,
  primaryOpacity,
  ...rest
}) => {
  const isDuotone = type === 'duotone' || type === 'd'
  let suffix = 'r'

  if (type === 'regular' || type === 'r') suffix = 'r'
  if (type === 'solid' || type === 's') suffix = 's'
  if (type === 'light' || type === 'l') suffix = 'l'
  if (type === 'brand' || type === 'b') suffix = 'b'
  if (isDuotone) suffix = 'd'
  const classNames = [`fa${suffix}`]
  if (icon) classNames.push(`fa-${icon}`)
  if (className) classNames.push(className)
  if (spin) classNames.push('fa-spin')
  const styles: StyleProps = {}
  if (color) styles.color = color
  if (isDuotone) {
    if (primaryColor) styles['--fa-primary-color'] = primaryColor
    if (secondaryColor) styles['--fa-secondary-color'] = secondaryColor
    if (secondaryOpacity) styles['--fa-secondary-opacity'] = secondaryOpacity
    if (primaryOpacity) styles['--fa-primary-opacity'] = primaryOpacity
  }
  let processedDataAttributes: Record<string, string | number> | undefined
  if (dataAttributes) {
    processedDataAttributes = {}
    Object.keys(dataAttributes).forEach((key) => {
      processedDataAttributes![`data-${key}`] = dataAttributes[key]
    })
  }
  return (
    <i
      className={classNames.join(' ')}
      style={styles}
      data-testid="font-awesome"
      {...processedDataAttributes}
      {...rest}
    />
  )
}

export default FontAwesome5
