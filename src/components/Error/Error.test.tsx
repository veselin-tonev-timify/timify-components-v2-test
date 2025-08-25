import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Error from '../Error/Error'

// Mock the dangerousHTML function and Alert component
jest.mock('../../functions', () => ({
  dangerousHTML: jest.fn((html) => html),
}))

jest.mock('../Alert/Alert', () => {
  return {
    __esModule: true,
    default: ({
      children,
      theme,
      noOffset,
      noBorder,
      isCompact,
      borderRadius,
      ...props
    }: any) => (
      <div
        data-testid="alert"
        data-theme={theme}
        data-no-offset={noOffset}
        data-no-border={noBorder}
        data-is-compact={isCompact}
        data-border-radius={borderRadius}
        {...props}
      >
        {children}
      </div>
    ),
  }
})

describe('Error Component', () => {
  test('renders nothing when no errors are provided', () => {
    const { container } = render(<Error />)
    expect(container.firstChild).toBeNull()
  })

  test('renders single error message with default props', () => {
    const errors = ['This is an error message']
    render(<Error errors={errors} />)

    const errorElement = screen.getByText('This is an error message')
    const alertElement = screen.getByTestId('alert')

    expect(errorElement).toBeInTheDocument()
    expect(alertElement).toHaveAttribute('data-theme', 'error')
    expect(alertElement).toHaveAttribute('data-no-offset', 'true')
    expect(alertElement).toHaveAttribute('data-no-border', 'true')
    expect(alertElement).toHaveAttribute('data-is-compact', 'true')
  })

  test('renders multiple error messages', () => {
    const errors = ['First error', 'Second error', 'Third error']
    render(<Error errors={errors} />)

    errors.forEach((error) => {
      expect(screen.getByText(error)).toBeInTheDocument()
    })
  })

  test('applies styling props correctly', () => {
    const errors = ['Error with styling']
    const { container } = render(
      <Error
        errors={errors}
        hasTopOffset
        hasBottomOffset
        hasBorder
        normal
        borderRadius="l"
      />,
    )

    const errorContainer = container.firstChild
    const alertElement = screen.getByTestId('alert')

    expect(errorContainer).toHaveClass('ta-error')
    expect(errorContainer).toHaveClass('ta-error__has-top-offset')
    expect(alertElement).toHaveAttribute('data-no-offset', 'false')
    expect(alertElement).toHaveAttribute('data-no-border', 'false')
    expect(alertElement).toHaveAttribute('data-is-compact', 'false')
    expect(alertElement).toHaveAttribute('data-border-radius', 'l')
  })

  test('handles half top offset and data attributes', () => {
    const errors = ['Error with attributes']
    const dataAttributes = { errorId: 'custom-error', priority: 1 }

    const { container } = render(
      <Error
        errors={errors}
        hasHalfTopOffset
        dataAttributes={dataAttributes}
      />,
    )

    const errorContainer = container.firstChild
    const alertElement = screen.getByTestId('alert')

    expect(errorContainer).toHaveClass('ta-error__has-half-top-offset')
    expect(alertElement).toHaveAttribute('data-errorId', 'custom-error')
    expect(alertElement).toHaveAttribute('data-priority', '1')
  })

  test('handles empty errors array', () => {
    const { container } = render(<Error errors={[]} />)
    expect(container.firstChild).toBeNull()
  })

  test('processes HTML content in error messages', () => {
    const errors = ['<strong>Bold error</strong>']
    render(<Error errors={errors} />)

    // The dangerousHTML mock should be called with the error content
    const { dangerousHTML } = require('../../functions')
    expect(dangerousHTML).toHaveBeenCalledWith('<strong>Bold error</strong>')
  })
})
