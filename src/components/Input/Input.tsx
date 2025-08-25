import React, {
  useState,
  forwardRef,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { FontAwesome5, Error, Button, Text, Alert } from '../../components'

import './Input.css'

type ResetBorderRadius =
  | 'all'
  | 'bottom'
  | 'top'
  | 'right-top'
  | 'left-top'
  | 'left-bottom'
  | 'right-bottom'
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
type InputType = 'text' | 'password' | 'number' | 'email'

const RESET_BORDER_RADIUS: Record<ResetBorderRadius, string> = {
  all: 'ta-input__reset-radius',
  bottom: 'ta-input__reset-bottom-radius',
  top: 'ta-input__reset-top-radius',
  'right-top': 'ta-input__reset-right-top-radius',
  'left-top': 'ta-input__reset-left-top-radius',
  'left-bottom': 'ta-input__reset-left-bottom-radius',
  'right-bottom': 'ta-input__reset-right-bottom-radius',
}

const BORDER_RADIUS: Record<BorderRadius, string> = {
  null: 'ta-input__border-radius-null',
  xs: 'ta-input__border-radius-xs',
  s: 'ta-input__border-radius-s',
  sm: 'ta-input__border-radius-sm',
  m: 'ta-input__border-radius-m',
  l: 'ta-input__border-radius-l',
  xl: 'ta-input__border-radius-xl',
  xxl: 'ta-input__border-radius-xxl',
  xxxl: 'ta-input__border-radius-xxxl',
  full: 'ta-input__border-radius-full',
}

export interface InputProps {
  name?: string
  prefix?: string
  addon?: ReactNode
  limit?: number
  type?: InputType
  value?: string | number
  isDisabled?: boolean
  isClearable?: boolean
  onFocus?: () => void
  onBlur?: () => void
  onChange?: (name: string | undefined, value: string | number) => void
  onChangeAddon?: (name: string | undefined, value: string | number) => void
  onReset?: () => void
  label?: ReactNode | string
  isMandatory?: boolean
  isOnMobile?: boolean
  hideError?: boolean
  errors?: string[]
  className?: string
  autoFocus?: boolean
  isPasswordToggleHidden?: boolean
  isAddonText?: boolean
  maxValue?: number
  minValue?: number
  placeholder?: string
  stepSize?: number
  isNumberControlHidden?: boolean
  resetBorderRadius?: ResetBorderRadius
  borderRadius?: BorderRadius
  hintText?: string
  dataAttributes?: Record<string, string | number>
}

const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      name,
      prefix,
      addon,
      limit,
      type = 'text',
      value = '',
      isDisabled = false,
      isClearable = false,
      onFocus,
      onBlur,
      onChange,
      onChangeAddon,
      onReset,
      label,
      isMandatory = false,
      isOnMobile = false,
      hideError = false,
      errors = [],
      className,
      autoFocus = false,
      isPasswordToggleHidden = false,
      isAddonText = false,
      maxValue,
      minValue,
      placeholder,
      stepSize = 1,
      isNumberControlHidden = false,
      resetBorderRadius,
      borderRadius = 'm',
      hintText,
      dataAttributes,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [inputType, setInputType] = useState<InputType>(type)

    const classNames = ['ta-input']
    const prefixRef = useRef<HTMLLabelElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const addonRef = useRef<HTMLDivElement>(null)
    const labelRef = useRef<HTMLLabelElement>(null)
    const placeholderRef = useRef<HTMLLabelElement>(null)

    const hasClearButton = isClearable && value

    if (className) classNames.push(className)
    if (isFocused) classNames.push('ta-input__is-focused')
    if (value || value === 0) classNames.push('ta-input__is-filled')
    if (isDisabled) classNames.push('ta-input__is-disabled')
    if (errors.length > 0) classNames.push('ta-input__has-error')
    if (isOnMobile) classNames.push('ta-input__is-on-mobile')
    if (prefix) classNames.push('ta-input__has-prefix')
    if (placeholder) classNames.push('ta-input__has-placeholder')
    if (hasClearButton) classNames.push('ta-input__has-clear-btn')

    const inputClassNames = ['ta-input__control']
    if (addon || limit) inputClassNames.push('ta-input__has-addon')
    if (type === 'password') inputClassNames.push('ta-input__type-password')

    const addonClassNames = ['ta-input__addon']
    if (isAddonText || limit) addonClassNames.push('ta-input__addon__is-text')

    const placeholderClassNames = ['ta-input__placeholder']
    const prefixClassNames = ['ta-input__prefix']

    const increaseButtonClassNames = ['ta-input__btn']
    if (isDisabled || (maxValue !== undefined && Number(value) === maxValue)) {
      increaseButtonClassNames.push('ta-input__btn-disabled')
    }

    const decreaseButtonClassNames = ['ta-input__btn']
    if (isDisabled || (minValue !== undefined && Number(value) === minValue)) {
      decreaseButtonClassNames.push('ta-input__btn-disabled')
    }

    if (resetBorderRadius && RESET_BORDER_RADIUS[resetBorderRadius]) {
      inputClassNames.push(RESET_BORDER_RADIUS[resetBorderRadius])
    }

    if (borderRadius) {
      inputClassNames.push(BORDER_RADIUS[borderRadius])
    }

    let processedDataAttributes: Record<string, string | number> | undefined
    if (dataAttributes) {
      processedDataAttributes = {}
      Object.keys(dataAttributes).forEach((key) => {
        processedDataAttributes![`data-${key}`] = dataAttributes[key]
      })
    }

    useEffect(() => {
      if (prefix && inputRef.current && prefixRef.current) {
        const standardPadding = 8
        const marginAfterPrefix = 4
        const prefixWidth = prefixRef.current.offsetWidth
        inputRef.current.style.paddingLeft = `${standardPadding + prefixWidth + marginAfterPrefix}px`
      }

      if (
        placeholder &&
        prefix &&
        inputRef.current &&
        prefixRef.current &&
        placeholderRef.current
      ) {
        const standardPadding = 8
        const marginAfterPrefix = 4
        const prefixWidth = prefixRef.current.offsetWidth
        inputRef.current.style.paddingLeft = `${standardPadding + prefixWidth + marginAfterPrefix}px`
        placeholderRef.current.style.paddingLeft = `${prefixWidth + marginAfterPrefix}px`
      }
    }, [placeholder, prefix])

    useEffect(() => {
      if (
        (addon || limit) &&
        addonRef.current &&
        labelRef.current &&
        inputRef.current
      ) {
        const addonWidth = addonRef.current.offsetWidth
        const defaultLabelOffset = 20 // set in css selector
        const defaultInputPadding = 8 // set in css selector
        const marginFromAddon = 8
        // limit label width in order to prevent it overlapping the addon
        labelRef.current.style.width = `calc(100% - ${addonWidth + defaultLabelOffset + marginFromAddon}px)`
        if (placeholder && placeholderRef.current) {
          placeholderRef.current.style.width = `calc(100% - ${addonWidth + defaultLabelOffset + marginFromAddon}px)`
        }
        // limit input width in order to prevent it overlapping the addon
        inputRef.current.style.paddingRight = `${addonWidth + defaultInputPadding + marginFromAddon}px`
      }
    }, [value, addon, limit, placeholder])

    const preventDefault = useCallback((e: WheelEvent) => {
      e.preventDefault()
    }, [])

    const preventScroll = (
      e: React.FocusEvent<HTMLInputElement>,
      add: boolean,
    ) => {
      const { target } = e
      if (add) {
        target.addEventListener('wheel', preventDefault as EventListener, {
          passive: false,
        })
      } else {
        target.removeEventListener('wheel', preventDefault as EventListener)
      }
    }

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      if (type === 'number') preventScroll(e, true)
      onFocus && onFocus()
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      if (type === 'number') preventScroll(e, false)
      onBlur && onBlur()
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = e
      let targetValue: string = target.value || ''
      if (type === 'number') {
        const numValue = Number(targetValue)
        if (minValue !== undefined && numValue < minValue) {
          return
        }
        if (maxValue !== undefined && numValue > maxValue) {
          return
        }
      }
      onChange && onChange(name, targetValue)
      onChangeAddon && onChangeAddon(name, targetValue)
    }

    const handleOnIncrease = () => {
      if (isDisabled) return
      let nextValue = Number(value) + stepSize
      if (maxValue !== undefined && nextValue > maxValue) {
        nextValue = maxValue
      }
      onChange && onChange(name, nextValue)
      onChangeAddon && onChangeAddon(name, nextValue)
    }

    const handleOnDecrease = () => {
      if (isDisabled) return
      let nextValue = Number(value) - stepSize
      if (minValue !== undefined && nextValue < minValue) {
        nextValue = minValue
      }
      onChange && onChange(name, nextValue)
      onChangeAddon && onChangeAddon(name, nextValue)
    }

    const handlePasswordFieldTypeToggle = () => {
      setInputType(inputType === 'password' ? 'text' : 'password')
    }

    return (
      <div
        className={classNames.join(' ')}
        ref={ref}
        {...processedDataAttributes}
      >
        <div className="ta-input__control-wrapper">
          <div className="ta-input__control-inner-wrapper">
            {prefix && (
              <label ref={prefixRef} className={prefixClassNames.join(' ')}>
                {prefix}
              </label>
            )}
            {placeholder && (
              <label
                ref={placeholderRef}
                className={placeholderClassNames.join(' ')}
              >
                {placeholder}
              </label>
            )}
            {label && (
              <label ref={labelRef} className="ta-input__label">
                <span className="ta-input__label__text">{label}</span>
                {isMandatory && (
                  <span className="ta-input__label__asterisk">&nbsp;*</span>
                )}
              </label>
            )}
            <input
              ref={inputRef}
              className={inputClassNames.join(' ')}
              type={inputType}
              name={name}
              value={value}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              maxLength={limit}
              disabled={isDisabled}
              autoComplete="off"
              autoFocus={autoFocus}
            />
          </div>
        </div>
        {(addon || limit) && !hasClearButton && (
          <div ref={addonRef} className={addonClassNames.join(' ')}>
            {limit ? (
              <Text
                weight="medium"
                size="xs"
                color={`rgba(37,39,41,${isDisabled ? '0.16' : '0.40'})`}
              >
                {`${String(value).length} / ${limit}`}
              </Text>
            ) : (
              addon
            )}
          </div>
        )}
        {type === 'number' && !isNumberControlHidden && (
          <div className="ta-input__number-controls">
            <div
              className={decreaseButtonClassNames.join(' ')}
              onClick={handleOnDecrease}
            >
              <FontAwesome5 icon="minus" type="solid" />
            </div>
            <div
              className={increaseButtonClassNames.join(' ')}
              onClick={handleOnIncrease}
            >
              <FontAwesome5 icon="plus" type="solid" />
            </div>
          </div>
        )}
        {hasClearButton && (
          <Button
            className="ta-input__clear-btn"
            rounded
            onClick={(
              e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
            ) => {
              e.preventDefault()
              onReset && onReset()
            }}
            icon="times"
            size="s"
            iconType="r"
            boxSize="l"
            disabled={isDisabled}
            theme="clearDark"
          />
        )}
        {type === 'password' && !isPasswordToggleHidden && (
          <div
            className="ta-input__password-toggle-btn"
            onClick={handlePasswordFieldTypeToggle}
          >
            <FontAwesome5
              icon={inputType === 'password' ? 'eye' : 'eye-slash'}
            />
          </div>
        )}
        {!hideError && (
          <Error borderRadius={borderRadius} errors={errors} hasHalfTopOffset />
        )}
        {hintText && (
          <div className="ta-input__hint-text">
            <Alert theme="info" noBorder isCompact noOffset>
              {hintText}
            </Alert>
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
