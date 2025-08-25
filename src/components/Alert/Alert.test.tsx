import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Alert from '../Alert/Alert'

describe('Alert Component', () => {
  it('renders with custom borderRadius and dataAttributes', () => {
    render(
      <Alert borderRadius="xl" dataAttributes={{ foo: 'bar', num: 42 }}>
        Custom border radius and data attributes
      </Alert>,
    )
    const alertElement = screen.getByTestId('alert')
    expect(alertElement).toHaveClass('ta-alert__border-radius-xl')
    expect(alertElement).toHaveAttribute('data-foo', 'bar')
    expect(alertElement).toHaveAttribute('data-num', '42')
  })

  it('renders with custom theme', () => {
    render(
      <Alert theme="success">Custom border radius and data attributes</Alert>,
    )
    const alertElement = screen.getByTestId('alert')
    expect(alertElement).toHaveClass('success')
  })

  it('renders without icon and label', () => {
    render(<Alert noIcon>Alert without icon</Alert>)
    const iconElement = screen.queryByTestId('fontawesome-icon')
    expect(iconElement).not.toBeInTheDocument()
    const contentElement = screen.getByTestId('alert-children')
    expect(contentElement).toHaveClass('no-icon')
  })
})
