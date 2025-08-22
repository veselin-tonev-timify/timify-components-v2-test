import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Button from './Button'

describe('Button Component', () => {
  test('renders button with correct label', () => {
    const { getByRole } = render(<Button label="Test Button" />)

    const button = getByRole('button', { name: /test button/i })
    expect(button).toBeInTheDocument()
  })

  test('renders button with provided label text', () => {
    const label = 'Click me!'
    const { getByText } = render(<Button label={label} />)

    expect(getByText(label)).toBeInTheDocument()
  })
})
