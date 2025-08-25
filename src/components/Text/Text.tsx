import React, { ReactNode, CSSProperties } from 'react'
import './Text.css'

type TextSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
type TextWeight =
  | 'regular'
  | 'extralight'
  | 'light'
  | 'medium'
  | 'semibold'
  | 'bold'
type OffsetSize = 'none' | 'xxs' | 'xs' | 's' | 'm' | 'l'
type LineHeight = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
type LetterSpacing = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
type AlignItems = 'center' | 'start' | 'end' | 'flexStart' | 'flexEnd'
type LinkColor = 'default' | 'red' | 'blue'
type Theme = 'default' | 'secondary' | 'inherit'
type ColorKey =
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'disabled'
  | 'info'
  | 'error'
  | 'warning'
  | 'success'

const SIZES: Record<TextSize, string> = {
  xxs: 'ta-text__size-xxs',
  xs: 'ta-text__size-xs',
  s: 'ta-text__size-s',
  m: '',
  l: 'ta-text__size-l',
  xl: 'ta-text__size-xl',
  xxl: 'ta-text__size-xxl',
}

const WEIGHT: Record<TextWeight, string> = {
  regular: 'ta-text__weight-regular',
  extralight: 'ta-text__weight-extralight',
  light: '',
  medium: 'ta-text__weight-medium',
  semibold: 'ta-text__weight-semibold',
  bold: 'ta-text__weight-bold',
}

const OFFSET_SIZES: Record<OffsetSize, string> = {
  none: 'offset-none',
  xxs: 'offset-xxs',
  xs: 'offset-xs',
  s: '',
  m: 'offset-m',
  l: 'offset-l',
}

const DEFAULT_MAX_WIDTH = '100%'

const LINE_HEIGHT: Record<LineHeight, string> = {
  xxs: 'ta-text__line-height-xxs',
  xs: 'ta-text__line-height-xs',
  s: 'ta-text__line-height-s',
  m: 'ta-text__line-height-m',
  l: 'ta-text__line-height-l',
  xl: 'ta-text__line-height-xl',
  xxl: 'ta-text__line-height-xxl',
}

const LETTER_SPACING: Record<LetterSpacing, string> = {
  xxs: 'ta-text__letter-spacing-xxs',
  xs: 'ta-text__letter-spacing-xs',
  s: 'ta-text__letter-spacing-s',
  m: 'ta-text__letter-spacing-m',
  l: 'ta-text__letter-spacing-l',
  xl: 'ta-text__letter-spacing-xl',
  xxl: 'ta-text__letter-spacing-xxl',
}

const ALIGN_ITEMS: Record<AlignItems, string> = {
  center: '',
  start: 'ta-text__align-items-start',
  end: 'ta-text__align-items-end',
  flexStart: 'ta-text__align-items-flex-start',
  flexEnd: 'ta-text__align-items-flex-end',
}

const COLORS: Record<ColorKey, string> = {
  primary: '#252729',
  accent: '#0E0E0F',
  secondary: 'rgba(37, 39, 41, 0.80)',
  tertiary: 'rgba(37, 39, 41, 0.56)',
  quaternary: 'rgba(37, 39, 41, 0.48)',
  disabled: 'rgba(37, 39, 41, 0.24)',
  info: '#385F87',
  error: '#CB3B43',
  warning: '#D6A551',
  success: '#93AD45',
}

export interface TextProps {
  hasBullet?: boolean
  className?: string
  linkColor?: LinkColor
  children?: ReactNode
  isItalic?: boolean
  isBold?: boolean
  isLinkBold?: boolean
  isFade?: boolean
  isCentered?: boolean
  theme?: Theme
  size?: TextSize
  weight?: TextWeight
  prefix?: string | ReactNode
  bottomOffsetSize?: OffsetSize
  offsetSize?: OffsetSize
  topOffsetSize?: OffsetSize
  maxWidth?: string | number
  truncate?: boolean
  uppercase?: boolean
  color?: string
  lineHeight?: LineHeight
  letterSpacing?: LetterSpacing
  alignItems?: AlignItems
  dataAttributes?: Record<string, string | number>
}

const Text: React.FC<TextProps> = ({
  hasBullet = false,
  className,
  linkColor = 'default',
  children,
  isItalic = false,
  isBold = false,
  isLinkBold = false,
  isFade = false,
  isCentered = false,
  theme = 'default',
  size = 'm',
  weight = 'regular',
  prefix,
  bottomOffsetSize,
  offsetSize,
  topOffsetSize,
  maxWidth,
  truncate = false,
  uppercase = false,
  color,
  lineHeight,
  letterSpacing,
  alignItems,
  dataAttributes,
}) => {
  const finalMaxWidth = maxWidth || DEFAULT_MAX_WIDTH
  const classNames = ['ta-text']
  if (className) classNames.push(className)
  if (isItalic) classNames.push('ta-text__italic')
  if (isBold) classNames.push('ta-text__bold')
  if (hasBullet) classNames.push('ta-text__bullet')
  if (isLinkBold) classNames.push('ta-text__link-bold')
  if (uppercase) classNames.push('ta-text__uppercase')
  if (linkColor === 'red') classNames.push('ta-text__link-red')
  if (linkColor === 'blue') classNames.push('ta-text__link-blue')
  if (isFade) classNames.push('ta-text__fade')
  if (theme === 'secondary') classNames.push('ta-text__secondary')
  if (theme === 'inherit') classNames.push('ta-text__inherit')
  if (size && SIZES[size]) classNames.push(SIZES[size])
  if (weight && WEIGHT[weight]) classNames.push(WEIGHT[weight])
  if (alignItems && ALIGN_ITEMS[alignItems]) {
    classNames.push(ALIGN_ITEMS[alignItems])
  }
  if (bottomOffsetSize && OFFSET_SIZES[bottomOffsetSize]) {
    classNames.push(`ta-text-bottom-${OFFSET_SIZES[bottomOffsetSize]}`)
  }
  if (topOffsetSize && OFFSET_SIZES[topOffsetSize]) {
    classNames.push(`ta-text-top-${OFFSET_SIZES[topOffsetSize]}`)
  }
  if (offsetSize && OFFSET_SIZES[offsetSize]) {
    classNames.push(`ta-text-${OFFSET_SIZES[offsetSize]}`)
  }
  if (finalMaxWidth !== DEFAULT_MAX_WIDTH && truncate) {
    classNames.push('ta-text__truncate')
  }
  if (lineHeight && LINE_HEIGHT[lineHeight]) {
    classNames.push(LINE_HEIGHT[lineHeight])
  }
  if (letterSpacing && LETTER_SPACING[letterSpacing]) {
    classNames.push(LETTER_SPACING[letterSpacing])
  }
  if (isCentered) classNames.push('ta-text__centered')
  const styles: CSSProperties = { maxWidth: finalMaxWidth }
  if (color) {
    if (COLORS[color as ColorKey]) {
      styles.color = COLORS[color as ColorKey]
    } else {
      styles.color = color
    }
  }
  let processedDataAttributes: Record<string, string | number> | undefined
  if (dataAttributes) {
    processedDataAttributes = {}
    Object.keys(dataAttributes).forEach((key) => {
      processedDataAttributes![`data-${key}`] = dataAttributes[key]
    })
  }

  return (
    <div
      className={classNames.join(' ')}
      style={styles}
      {...processedDataAttributes}
    >
      {prefix && <div className="ta-text__prefix">{prefix}</div>}
      {children}
    </div>
  )
}

export default Text
