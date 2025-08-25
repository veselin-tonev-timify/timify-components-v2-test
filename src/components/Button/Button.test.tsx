import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../Button/Button'

jest.mock('../../functions', () => ({
  dangerousHTML: jest.fn((html) => html),
}))

// Mock ButtonWrapper for Button tests
jest.mock('./ButtonWrapper', () => {
  return ({ children, ...props }: any) => (
    <div data-testid="button-wrapper" {...props}>
      {children}
    </div>
  )
})

// Mock PADDINGS from settings
jest.mock('./settings', () => ({
  PADDINGS: {
    xs: 'ta-btn-padding-xs',
    s: 'ta-btn-padding-s',
    m: 'ta-btn-padding-m',
    l: 'ta-btn-padding-l',
  },
}))

describe('Button Component', () => {
  test('renders as button with default props', () => {
    render(<Button>Click me</Button>)

    const buttonElement = screen.getByTestId('button')

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement.tagName).toBe('BUTTON')
    expect(buttonElement).toHaveClass('ta-btn', 'ta-btn-primary')
    expect(buttonElement).toHaveTextContent('Click me')
    expect(buttonElement).toHaveAttribute('type', 'button')
  })

  test('applies theme, size, and styling props', () => {
    const mockClick = jest.fn()

    render(
      <Button
        theme="secondary"
        size="s"
        ghost
        rounded
        className="custom-button"
        onClick={mockClick}
        testid="custom-btn"
      >
        Styled Button
      </Button>,
    )

    const buttonElement = screen.getByTestId('custom-btn')

    expect(buttonElement).toHaveClass(
      'ta-btn-secondary',
      'ta-btn-sm',
      'ta-btn-ghost',
      'ta-btn-rounded',
      'custom-button',
    )

    fireEvent.click(buttonElement)
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  test('renders as link and handles icon', () => {
    const mockRedirect = jest.fn()

    render(
      <Button
        as="link"
        to="/test-page"
        handleRedirect={mockRedirect}
        icon="arrow-right"
        iconType="solid"
        theme="tertiary"
      >
        Link Button
      </Button>,
    )

    const linkElement = screen.getByTestId('link')
    const iconElement = screen.getByTestId('fontawesome-icon')

    expect(linkElement.tagName).toBe('A')
    expect(linkElement).toHaveClass('ta-btn-tertiary', 'ta-btn-with-icon')
    expect(linkElement).toHaveAttribute('href', '/test-page')
    expect(iconElement).toHaveAttribute('data-icon', 'arrow-right')

    fireEvent.click(linkElement)
    expect(mockRedirect).toHaveBeenCalledWith('/test-page')
  })
})

// Mock dependencies for Alert component
jest.mock('../Row/Row', () => {
  return ({ children, noOffset, ...props }: any) => (
    <div data-testid="row" data-no-offset={noOffset} {...props}>
      {children}
    </div>
  )
})

jest.mock('../Col/Col', () => {
  return ({ children, ...props }: any) => (
    <div data-testid="col" {...props}>
      {children}
    </div>
  )
})

jest.mock('../FontAwesome5/FontAwesome5', () => {
  return ({ icon, type, className, onClick, ...props }: any) => (
    <i
      data-testid="fontawesome-icon"
      data-icon={icon}
      data-type={type}
      className={className}
      onClick={onClick}
      {...props}
    />
  )
})
