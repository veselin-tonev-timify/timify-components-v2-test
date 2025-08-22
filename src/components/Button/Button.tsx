import React, { ReactNode, CSSProperties, MouseEvent } from 'react'
import IconBox, {
  IconBoxAlignment,
  IconBoxDirection,
  IconBoxGap,
  IconBoxJustifyContent,
  IconBoxPosition,
  IconBoxSize,
} from '../IconBox/IconBox'
import ButtonWrapper from './ButtonWrapper'
import { PADDINGS, Paddings } from './settings'
import { FontAwesome5Type } from '../FontAwesome5/FontAwesome5'

import './Button.css'

type ButtonType =
  | 'isGhost'
  | 'isBlock'
  | 'isRounded'
  | 'isDisabled'
  | 'isLabelOnly'
  | 'submit'
type ButtonSize = 's' | 'm' | 'l' | 'xl' | 'xxxs' | 'xxs' | 'xs'
type ButtonTheme =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'blank'
  | 'success'
  | 'white'
  | 'clearLight'
  | 'clearDark'
type BorderSize = 'none' | 's' | 'm' | 'l'
type BorderRadius =
  | 'null'
  | 'xs'
  | 's'
  | 'sm'
  | 'm'
  | 'l'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | 'full'
type PaddingsOptions =
  | Paddings
  | `${Paddings}-${Paddings}`
  | `${Paddings}-${Paddings}-${Paddings}-${Paddings}`

const TYPES: Record<string, string> = {
  isGhost: 'ta-btn-ghost',
  isBlock: 'ta-btn-block',
  isRounded: 'ta-btn-rounded',
  isDisabled: 'ta-btn-disabled',
  isLabelOnly: 'ta-btn-label-only',
}

const THEMES: Record<ButtonTheme, string> = {
  primary: 'ta-btn-primary',
  secondary: 'ta-btn-secondary',
  tertiary: 'ta-btn-tertiary',
  blank: 'ta-btn-blank',
  success: 'ta-btn-success',
  white: 'ta-btn-white',
  clearLight: 'ta-btn-clear-light',
  clearDark: 'ta-btn-clear-dark',
}

const HTML_LEAK_KEYS = ['isGhost', 'isBlock', 'isRounded', 'isLabelOnly']

const preventHTMLKeyLeak = <T extends Record<string, any>>(
  data: T,
  keys: string[],
): Omit<T, string> => {
  const res = { ...data }
  for (const key of HTML_LEAK_KEYS) {
    delete res[key]
  }
  return res
}

const SIZES: Record<ButtonSize, string> = {
  xxxs: 'ta-btn-xxxs',
  xxs: 'ta-btn-xxs',
  xs: 'ta-btn-xs',
  s: 'ta-btn-sm',
  m: 'ta-btn-md',
  l: '',
  xl: 'ta-btn-xl',
}

const BORDER_SIZES: Record<BorderSize, string> = {
  none: 'ta-btn-border-none',
  s: 'ta-btn-border-sm',
  m: 'ta-btn-border-md',
  l: '',
}

const BORDER_RADIUS: Record<BorderRadius, string> = {
  null: 'ta-btn__border-radius-null',
  xs: 'ta-btn__border-radius-xs',
  s: 'ta-btn__border-radius-s',
  sm: 'ta-btn__border-radius-sm',
  m: 'ta-btn__border-radius-m',
  l: 'ta-btn__border-radius-l',
  xl: 'ta-btn__border-radius-xl',
  xxl: 'ta-btn__border-radius-xxl',
  xxxl: 'ta-btn__border-radius-xxxl',
  full: 'ta-btn__border-radius-full',
}

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'onClick'
  > {
  to?: string
  as?: 'button' | 'link'
  type?: ButtonType
  size?: ButtonSize
  style?: CSSProperties
  action?: () => void
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  children?: ReactNode
  label?: string
  external?: boolean
  theme?: ButtonTheme
  iconType?: FontAwesome5Type
  iconSpin?: boolean
  className?: string
  testid?: string
  borderSize?: BorderSize
  icon?: string
  handleRedirect?: (to: string) => void
  ghost?: boolean
  block?: boolean
  rounded?: boolean
  paddings?: PaddingsOptions
  gap?: IconBoxGap
  iconColor?: string
  direction?: IconBoxDirection
  alignment?: IconBoxAlignment
  iconPosition?: IconBoxPosition
  justifyContent?: IconBoxJustifyContent
  boxSize?: IconBoxSize
  borderRadius?: BorderRadius
  dataAttributes?: Record<string, string | number>
  disabled?: boolean
}

const Button: React.FC<ButtonProps> & { Wrapper: typeof ButtonWrapper } = ({
  to,
  as = 'button',
  type,
  size = 'l',
  style,
  action,
  onClick,
  children,
  label,
  external = false,
  theme = 'primary',
  iconType = 's',
  iconSpin = false,
  className,
  testid,
  borderSize,
  icon,
  handleRedirect = () => {},
  ghost = false,
  block = false,
  rounded = false,
  paddings,
  gap,
  iconColor,
  direction,
  alignment,
  iconPosition,
  justifyContent = 'center',
  boxSize,
  borderRadius = 'm',
  dataAttributes,
  disabled = false,
  ...rest
}) => {
  let C: ReactNode = label || children

  const classNames = [
    'ta-btn',
    ...(className ? [className] : []),
    ...((label || children) && icon
      ? ['ta-btn-with-icon']
      : !label && !children && icon
        ? ['ta-btn-icon-only']
        : []),
    ...(size && SIZES[size] ? [SIZES[size]] : []),
    ...(type && TYPES[type] ? [TYPES[type]] : []),
    ...(borderSize && BORDER_SIZES[borderSize]
      ? [BORDER_SIZES[borderSize]]
      : []),
  ]

  if (theme) classNames.push(THEMES[theme] ?? '')
  if (ghost && TYPES.isGhost) classNames.push(TYPES.isGhost)
  if (block && TYPES.isBlock) classNames.push(TYPES.isBlock)
  if (rounded && TYPES.isRounded) classNames.push(TYPES.isRounded)
  if (disabled && TYPES.isDisabled) classNames.push(TYPES.isDisabled)

  let processedDataAttributes: Record<string, string | number> | undefined
  if (dataAttributes) {
    processedDataAttributes = {}
    Object.keys(dataAttributes).forEach((key) => {
      processedDataAttributes![`data-${key}`] = dataAttributes[key]
    })
  }

  if (paddings) {
    const paddingArray: Paddings[] = paddings.split('-') as Paddings[]
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = paddingArray

    if (
      paddingTop &&
      PADDINGS[paddingTop] &&
      paddingRight &&
      PADDINGS[paddingRight] &&
      paddingBottom &&
      PADDINGS[paddingBottom] &&
      paddingLeft &&
      PADDINGS[paddingLeft]
    ) {
      // all paddings are provided
      classNames.push(`${PADDINGS[paddingTop]}-top`)
      classNames.push(`${PADDINGS[paddingRight]}-right`)
      classNames.push(`${PADDINGS[paddingBottom]}-bottom`)
      classNames.push(`${PADDINGS[paddingLeft]}-left`)
    } else if (
      paddingTop &&
      PADDINGS[paddingTop] &&
      paddingRight &&
      PADDINGS[paddingRight]
    ) {
      // vertical and horizontal paddings are provided
      classNames.push(`${PADDINGS[paddingTop]}-top`)
      classNames.push(`${PADDINGS[paddingRight]}-right`)
      classNames.push(`${PADDINGS[paddingTop]}-bottom`)
      classNames.push(`${PADDINGS[paddingRight]}-left`)
    }
  }

  if (icon) {
    // if size is provided to button, IconBox should be 1 size smaller
    const iconSizeMap: Record<ButtonSize, IconBoxSize> = {
      xxxs: '2xs',
      xxs: '2xs',
      xs: '2xs',
      s: 'xs',
      m: 's',
      l: 'm',
      xl: 'l',
    }
    const iconSize: IconBoxSize = boxSize || iconSizeMap[size]
    C = (
      <IconBox
        icon={icon}
        iconType={iconType}
        iconSpin={iconSpin}
        gap={gap}
        size={iconSize}
        iconColor={iconColor}
        direction={direction}
        iconPosition={iconPosition}
        alignment={alignment}
        justifyContent={justifyContent}
      >
        {label || children}
      </IconBox>
    )
  }

  if (borderRadius && !rounded) {
    classNames.push(BORDER_RADIUS[borderRadius])
  }

  const handleOnClick = (
    e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    if (disabled) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    if (onClick) {
      if (as === 'link') {
        e.preventDefault()
        e.stopPropagation()
        if (to && to.length !== 0) {
          external ? window.open(to, '_blank') : handleRedirect(to)
        }
      }
      onClick(e)
    } else if (as === 'link' && !disabled) {
      if (action) action()
      if (external) return null
      e.preventDefault()
      e.stopPropagation()
      if (!to || to.length === 0) return null
      external ? window.open(to, '_blank') : handleRedirect(to)
    }
  }

  if (as === 'link') {
    return (
      <a
        className={classNames.join(' ')}
        onClick={handleOnClick}
        href={disabled ? undefined : to}
        data-testid={testid || 'link'}
        style={style}
        rel="noreferrer"
        target={external ? '_blank' : '_self'}
        {...processedDataAttributes}
        {...preventHTMLKeyLeak(rest, HTML_LEAK_KEYS)}
      >
        {C}
      </a>
    )
  }

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      data-testid={testid || 'button'}
      onClick={handleOnClick}
      className={classNames.join(' ')}
      disabled={disabled}
      style={style}
      {...processedDataAttributes}
      {...preventHTMLKeyLeak(rest, HTML_LEAK_KEYS)}
    >
      {C}
    </button>
  )
}

Button.Wrapper = ButtonWrapper

export default Button
