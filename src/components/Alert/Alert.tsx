import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  CSSProperties,
  MouseEvent,
} from 'react'
import Row from '../Row/Row'
import Col from '../Col/Col'
import FontAwesome5 from '../FontAwesome5/FontAwesome5'

import './Alert.css'

type AlertTheme = 'success' | 'alert' | 'error' | 'info' | 'no-content'
type AlertType = 'default' | 'center'
export type BorderRadius =
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

const BORDER_RADIUS: Record<BorderRadius, string> = {
  null: 'ta-alert__border-radius-null',
  xs: 'ta-alert__border-radius-xs',
  s: 'ta-alert__border-radius-s',
  sm: 'ta-alert__border-radius-sm',
  m: 'ta-alert__border-radius-m',
  l: 'ta-alert__border-radius-l',
  xl: 'ta-alert__border-radius-xl',
  xxl: 'ta-alert__border-radius-xxl',
  xxxl: 'ta-alert__border-radius-xxxl',
  full: 'ta-alert__border-radius-full',
}

export interface AlertProps {
  type?: AlertType
  theme?: AlertTheme
  label?: ReactNode | string
  noIcon?: boolean
  noBorder?: boolean
  autoHide?: boolean
  children?: ReactNode | string
  noOffset?: boolean
  isCompact?: boolean
  className?: string
  hasCloseButton?: boolean
  onCloseCallback?: () => void
  autoHideDuration?: number
  dataAttributes?: Record<string, string | number>
  borderRadius?: BorderRadius
}

const Alert: React.FC<AlertProps> = ({
  type = 'default',
  theme = 'success',
  label,
  noIcon = false,
  noBorder = false,
  autoHide = false,
  children,
  noOffset = false,
  isCompact = false,
  className,
  hasCloseButton = false,
  onCloseCallback,
  autoHideDuration = 0,
  dataAttributes,
  borderRadius = 'm',
}) => {
  const [isActive, setIsActive] = useState<boolean>(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    if (autoHide) {
      timeoutRef.current = setTimeout(
        () => {
          setIsActive(false)
        },
        Number(autoHideDuration || 5) * 1000,
      )
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [autoHide, autoHideDuration])
  const availableThemes: AlertTheme[] = [
    'success',
    'alert',
    'error',
    'info',
    'no-content',
  ]
  const classNames = ['ta-alert']
  const contentClassNames = ['ta-alert__content']
  classNames.push(
    availableThemes.indexOf(theme) > -1 ? theme : availableThemes[0],
  )
  if (className) classNames.push(className)
  if (autoHide) classNames.push('ta-alert__auto-hide')
  if (noBorder) classNames.push('ta-alert__no-border')
  if (isCompact) classNames.push('ta-alert__compact')
  let icon = 'check-square'
  if (theme === 'alert') icon = 'lightbulb'
  if (theme === 'error') icon = 'exclamation-triangle'
  if (theme === 'info') icon = 'info-circle'
  const isNoContent = theme === 'no-content'
  if (type === 'center' || isNoContent) classNames.push('ta-alert__center')
  if (!isActive) return null
  const styles: CSSProperties = { animation: 'alert-show 0.3s 1' }
  if (autoHide) {
    styles.animation = `alert-hide ${autoHideDuration || 5}s 1`
  }
  if (borderRadius) {
    classNames.push(BORDER_RADIUS[borderRadius])
  }
  if (!label) contentClassNames.push('no-label')
  if (noIcon) contentClassNames.push('no-icon')
  let processedDataAttributes: Record<string, string | number> | undefined
  if (dataAttributes) {
    processedDataAttributes = {}
    Object.keys(dataAttributes).forEach((key) => {
      processedDataAttributes![`data-${key}`] = dataAttributes[key]
    })
  }

  const handleCloseClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setIsActive(false)
    onCloseCallback && onCloseCallback()
  }

  return (
    <Row noOffset={noOffset}>
      <Col>
        <div
          className={classNames.join(' ')}
          style={styles}
          data-testid="alert"
          {...processedDataAttributes}
        >
          {label && (
            <div className="ta-alert__title" data-testid="alert-title">
              <div className="ta-alert__title-text">
                {!noIcon && !isNoContent && (
                  <FontAwesome5
                    className="ta-alert__title-text-icon"
                    icon={icon}
                    type="solid"
                  />
                )}
                {label}
              </div>
              {hasCloseButton && (
                <FontAwesome5
                  onClick={handleCloseClick}
                  className="ta-alert__close-btn"
                  icon="times"
                  data-testid="alert-close"
                />
              )}
            </div>
          )}
          {!noIcon && !label && (
            <div className="ta-alert__icon" data-testid="alert-icon">
              <FontAwesome5 icon={icon} type="solid" />
            </div>
          )}
          {children && (
            <div
              className={contentClassNames.join(' ')}
              data-testid="alert-children"
            >
              {children}
            </div>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default Alert
