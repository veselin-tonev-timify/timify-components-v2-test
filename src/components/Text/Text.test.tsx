import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Text from '../Text/Text'

describe('Text Component', () => {
  test('renders with default props and children', () => {
    render(<Text>Hello World</Text>)

    const textElement = screen.getByText('Hello World')
    expect(textElement).toBeInTheDocument()
    expect(textElement).toHaveClass('ta-text')
    expect(textElement).toHaveStyle({ maxWidth: '100%' })
  })

  test('applies size, weight, and color props correctly', () => {
    render(
      <Text size="xl" weight="bold" color="primary">
        Styled Text
      </Text>,
    )

    const textElement = screen.getByText('Styled Text')
    expect(textElement).toHaveClass('ta-text__size-xl')
    expect(textElement).toHaveClass('ta-text__weight-bold')
    expect(textElement).toHaveStyle({ color: '#252729' })
  })

  test('handles boolean props and custom styling', () => {
    render(
      <Text
        isItalic
        isBold
        isCentered
        uppercase
        truncate
        maxWidth="200px"
        className="custom-class"
        lineHeight="l"
        letterSpacing="m"
      >
        Complex Text
      </Text>,
    )

    const textElement = screen.getByText('Complex Text')
    expect(textElement).toHaveClass('ta-text__italic')
    expect(textElement).toHaveClass('ta-text__bold')
    expect(textElement).toHaveClass('ta-text__centered')
    expect(textElement).toHaveClass('ta-text__uppercase')
    expect(textElement).toHaveClass('ta-text__truncate')
    expect(textElement).toHaveClass('custom-class')
    expect(textElement).toHaveClass('ta-text__line-height-l')
    expect(textElement).toHaveClass('ta-text__letter-spacing-m')
    expect(textElement).toHaveStyle({ maxWidth: '200px' })
  })

  test('renders prefix', () => {
    render(<Text prefix="Prefix: ">Text with prefix</Text>)

    const prefixElement = screen.getByText('Prefix:')

    expect(prefixElement).toBeInTheDocument()
    expect(prefixElement).toHaveClass('ta-text__prefix')
  })

  test('applies theme and link color classes', () => {
    render(
      <Text theme="secondary" linkColor="blue" isLinkBold>
        Themed Text
      </Text>,
    )

    const textElement = screen.getByText('Themed Text')
    expect(textElement).toHaveClass('ta-text__secondary')
    expect(textElement).toHaveClass('ta-text__link-blue')
    expect(textElement).toHaveClass('ta-text__link-bold')
  })

  test('handles offset sizes correctly', () => {
    render(
      <Text topOffsetSize="l" bottomOffsetSize="m" offsetSize="xs">
        Offset Text
      </Text>,
    )

    const textElement = screen.getByText('Offset Text')
    expect(textElement).toHaveClass('ta-text-top-offset-l')
    expect(textElement).toHaveClass('ta-text-bottom-offset-m')
    expect(textElement).toHaveClass('ta-text-offset-xs')
  })
})
