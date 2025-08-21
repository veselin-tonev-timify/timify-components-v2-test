import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Col from './Col'

describe('Col Component', () => {
  it('renders with default classes', () => {
    render(<Col dataAttributes={{ testid: 'col-test' }} />)
    const colElement = screen.getByTestId('col-test')
    expect(colElement).toHaveClass('ta-col')
  })

  it('renders children correctly', () => {
    render(
      <Col dataAttributes={{ testid: 'col-test' }}>
        <span>Test content</span>
      </Col>,
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies size class when size prop is provided', () => {
    render(<Col size={6} dataAttributes={{ testid: 'col-test' }} />)
    const colElement = screen.getByTestId('col-test')
    expect(colElement).toHaveClass('ta-col', 'ta-col__6')
  })

  it('applies custom className when provided', () => {
    render(
      <Col className="custom-class" dataAttributes={{ testid: 'col-test' }} />,
    )
    const colElement = screen.getByTestId('col-test')
    expect(colElement).toHaveClass('ta-col', 'custom-class')
  })

  it('applies both size and custom className together', () => {
    render(
      <Col
        size={4}
        className="custom-class"
        dataAttributes={{ testid: 'col-test' }}
      />,
    )
    const colElement = screen.getByTestId('col-test')
    expect(colElement).toHaveClass('ta-col', 'ta-col__4', 'custom-class')
  })

  it('applies data attributes correctly', () => {
    const dataAttributes = {
      id: 'test-id',
      value: 123,
      category: 'primary',
      testid: 'col-test',
    }
    render(<Col dataAttributes={dataAttributes} />)
    const colElement = screen.getByTestId('col-test')

    expect(colElement).toHaveAttribute('data-id', 'test-id')
    expect(colElement).toHaveAttribute('data-value', '123')
    expect(colElement).toHaveAttribute('data-category', 'primary')
  })

  it('works without any props', () => {
    render(<Col dataAttributes={{ testid: 'col-test' }} />)
    const colElement = screen.getByTestId('col-test')
    expect(colElement).toBeInTheDocument()
    expect(colElement).toHaveClass('ta-col')
  })

  it('handles size 0', () => {
    render(<Col size={0} dataAttributes={{ testid: 'col-test' }} />)
    const colElement = screen.getByTestId('col-test')
    // Size 0 should not add a size class since it's falsy
    expect(colElement).toHaveClass('ta-col')
    expect(colElement).not.toHaveClass('ta-col__0')
  })
})
