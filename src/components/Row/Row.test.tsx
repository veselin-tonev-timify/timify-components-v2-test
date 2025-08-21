import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Row from './Row'
import Col from '../Col/Col'

describe('Row Component', () => {
  it('renders with default classes', () => {
    render(<Row dataAttributes={{ testid: 'row-test' }} />)
    const rowElement = screen.getByTestId('row-test')
    expect(rowElement).toHaveClass('ta-row')
  })

  it('renders children correctly', () => {
    render(
      <Row dataAttributes={{ testid: 'row-test' }}>
        <div>Child content</div>
      </Row>,
    )
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    render(
      <Row className="custom-row" dataAttributes={{ testid: 'row-test' }} />,
    )
    const rowElement = screen.getByTestId('row-test')
    expect(rowElement).toHaveClass('ta-row', 'custom-row')
  })

  it('applies noOffset class when noOffset prop is true', () => {
    render(<Row noOffset={true} dataAttributes={{ testid: 'row-test' }} />)
    const rowElement = screen.getByTestId('row-test')
    expect(rowElement).toHaveClass('ta-row', 'ta-row__no-offset')
  })

  it('does not apply noOffset class when noOffset prop is false', () => {
    render(<Row noOffset={false} dataAttributes={{ testid: 'row-test' }} />)
    const rowElement = screen.getByTestId('row-test')
    expect(rowElement).toHaveClass('ta-row')
    expect(rowElement).not.toHaveClass('ta-row__no-offset')
  })

  it('applies both custom className and noOffset class', () => {
    render(
      <Row
        className="custom-row"
        noOffset={true}
        dataAttributes={{ testid: 'row-test' }}
      />,
    )
    const rowElement = screen.getByTestId('row-test')
    expect(rowElement).toHaveClass('ta-row', 'custom-row', 'ta-row__no-offset')
  })

  it('applies data attributes correctly', () => {
    const dataAttributes = {
      index: 0,
      type: 'container',
      testid: 'row-test',
    }
    render(<Row dataAttributes={dataAttributes} />)
    const rowElement = screen.getByTestId('row-test')

    expect(rowElement).toHaveAttribute('data-index', '0')
    expect(rowElement).toHaveAttribute('data-type', 'container')
  })

  it('works without any props', () => {
    render(<Row dataAttributes={{ testid: 'row-test' }} />)
    const rowElement = screen.getByTestId('row-test')
    expect(rowElement).toBeInTheDocument()
    expect(rowElement).toHaveClass('ta-row')
  })
})

describe('Col and Row Integration', () => {
  it('renders nested Col components within Row', () => {
    render(
      <Row dataAttributes={{ testid: 'row-test' }}>
        <Col size={6} dataAttributes={{ testid: 'col-1' }}>
          Column 1
        </Col>
        <Col size={6} dataAttributes={{ testid: 'col-2' }}>
          Column 2
        </Col>
      </Row>,
    )

    const rowElement = screen.getByTestId('row-test')
    const col1Element = screen.getByTestId('col-1')
    const col2Element = screen.getByTestId('col-2')

    expect(rowElement).toHaveClass('ta-row')
    expect(col1Element).toHaveClass('ta-col', 'ta-col__6')
    expect(col2Element).toHaveClass('ta-col', 'ta-col__6')
    expect(screen.getByText('Column 1')).toBeInTheDocument()
    expect(screen.getByText('Column 2')).toBeInTheDocument()
  })
})
