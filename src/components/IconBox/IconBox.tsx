import React, { ReactNode, CSSProperties } from 'react'
import FontAwesome5, { FontAwesome5Type } from '../FontAwesome5/FontAwesome5'

import './IconBox.css'

const ICON_BOX_DIRECTIONS = {
  horizontal: '',
  vertical: 'ta-icon-box__vertical',
}

const ICON_BOX_ALIGNMENT = {
  center: '',
  start: 'ta-icon-box__align-start',
  end: 'ta-icon-box__align-end',
}

const ICON_BOX_JUSTIFY_CONTENT = {
  start: '',
  center: 'ta-icon-box__justify-center',
  end: 'ta-icon-box__justify-end',
}

const ICON_BOX_SIZES = {
  '3xs': 'ta-icon-box__wrapper__3xs',
  '2xs': 'ta-icon-box__wrapper__2xs',
  xs: 'ta-icon-box__wrapper__xs',
  s: 'ta-icon-box__wrapper__s',
  m: 'ta-icon-box__wrapper__m',
  l: '',
  xl: 'ta-icon-box__wrapper__xl',
  '2xl': 'ta-icon-box__wrapper__2xl',
  '3xl': 'ta-icon-box__wrapper__3xl',
}

const ICON_BOX_GAP = {
  none: 'ta-icon-box__gap-none',
  '2xs': 'ta-icon-box__gap-2xs',
  xs: 'ta-icon-box__gap-xs',
  s: '',
  m: 'ta-icon-box__gap-m',
  l: 'ta-icon-box__gap-l',
  xl: 'ta-icon-box__gap-xl',
  '2xl': 'ta-icon-box__gap-2xl',
}

export type IconBoxDirection = keyof typeof ICON_BOX_DIRECTIONS
export type IconBoxAlignment = keyof typeof ICON_BOX_ALIGNMENT
export type IconBoxJustifyContent = keyof typeof ICON_BOX_JUSTIFY_CONTENT
export type IconBoxPosition = 'left' | 'right'
export type IconBoxSize = keyof typeof ICON_BOX_SIZES
export type IconBoxGap = keyof typeof ICON_BOX_GAP

export interface IconBoxProps {
  className?: string
  iconType?: FontAwesome5Type
  iconColor?: string
  direction?: IconBoxDirection
  alignment?: IconBoxAlignment
  size?: IconBoxSize
  justifyContent?: IconBoxJustifyContent
  gap?: IconBoxGap
  icon: string
  children?: ReactNode
  isIconLast?: boolean
  iconSpin?: boolean
  dataAttributes?: Record<string, string>
  width?: string | number
  iconPosition?: IconBoxPosition
}

const IconBox: React.FC<IconBoxProps> = ({
  className,
  icon,
  iconType = 's',
  iconColor,
  children,
  direction = 'horizontal',
  alignment,
  width = 'auto',
  size,
  gap,
  justifyContent,
  iconPosition = 'left',
  iconSpin,
  dataAttributes,
}) => {
  const classNames = ['ta-icon-box']
  const wrapperClassNames = ['ta-icon-box__wrapper']

  if (className) classNames.push(className)
  if (direction && ICON_BOX_DIRECTIONS[direction]) {
    classNames.push(ICON_BOX_DIRECTIONS[direction])
  }
  if (alignment && ICON_BOX_ALIGNMENT[alignment]) {
    classNames.push(ICON_BOX_ALIGNMENT[alignment])
  }
  if (gap && ICON_BOX_GAP[gap]) classNames.push(ICON_BOX_GAP[gap])
  if (size && ICON_BOX_SIZES[size]) {
    wrapperClassNames.push(ICON_BOX_SIZES[size])
  }
  if (justifyContent && ICON_BOX_JUSTIFY_CONTENT[justifyContent]) {
    classNames.push(ICON_BOX_JUSTIFY_CONTENT[justifyContent])
  }
  if (iconPosition === 'right') {
    classNames.push('ta-icon-box__icon-right')
  }

  let dataAttrs: Record<string, string> | undefined = undefined
  if (dataAttributes) {
    dataAttrs = {}
    Object.keys(dataAttributes).forEach((key) => {
      dataAttrs![`data-${key}`] = dataAttributes[key]
    })
  }

  const styles: CSSProperties = { width }

  return (
    <div className={classNames.join(' ')} style={styles} {...dataAttrs}>
      <div className={wrapperClassNames.join(' ')}>
        <FontAwesome5
          icon={icon}
          type={iconType}
          spin={iconSpin}
          color={iconColor}
        />
      </div>
      {children}
    </div>
  )
}

export default IconBox
