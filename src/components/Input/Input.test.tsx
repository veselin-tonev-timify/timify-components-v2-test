import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Input from './Input'

// Mock dependencies
jest.mock('../../components', () => ({
  FontAwesome5: (props: any) => <i data-testid="fontawesome-icon" {...props} />,
  Error: ({ errors }: any) => (
    <div data-testid="error">{errors && errors.join(',')}</div>
  ),
  Button: ({ onClick, ...props }: any) => (
    <button data-testid="clear-btn" onClick={onClick} {...props} />
  ),
  Text: ({ children, ...props }: any) => (
    <span data-testid="text" {...props}>
      {children}
    </span>
  ),
  Alert: ({ children, ...props }: any) => (
    <div data-testid="alert" {...props}>
      {children}
    </div>
  ),
}))

describe('Input Component', () => {
  test('renders with label and value', () => {
    render(<Input label="Username" value="john" />)
    expect(screen.getByText('Username')).toBeInTheDocument()
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('john')
    expect(input).toHaveClass('ta-input__control')
    expect(screen.getByText('Username').closest('label')).toHaveClass(
      'ta-input__label',
    )
  })

  test('number input: increase and decrease buttons call onChange', () => {
    const handleChange = jest.fn()
    render(
      <Input
        type="number"
        value={5}
        minValue={3}
        maxValue={7}
        onChange={handleChange}
      />,
    )
    const incBtn = screen
      .getAllByRole('button')
      .find((btn) => btn.classList.contains('ta-input__btn-increase'))
    const decBtn = screen
      .getAllByRole('button')
      .find((btn) => btn.classList.contains('ta-input__btn-decrease'))
    fireEvent.click(incBtn!)
    expect(handleChange).toHaveBeenCalledWith(undefined, 6)
    fireEvent.click(decBtn!)
    expect(handleChange).toHaveBeenCalledWith(undefined, 4)
  })

  test('clear button calls onReset', () => {
    const handleReset = jest.fn()
    render(<Input value="clearme" isClearable onReset={handleReset} />)
    const clearBtn = screen.getByTestId('clear-btn')
    fireEvent.click(clearBtn)
    expect(handleReset).toHaveBeenCalled()
  })
})
