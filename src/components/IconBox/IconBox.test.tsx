import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import IconBox from '../IconBox/IconBox'

describe('IconBox Component', () => {
  test('renders with default props', () => {
    render(
      <IconBox dataAttributes={{ testid: 'fontawesome-icon' }} icon="star">
        Icon content
      </IconBox>,
    )

    const iconBoxElement = screen.getByTestId('fontawesome-icon')

    expect(iconBoxElement).toHaveClass('ta-icon-box')
  })

  test('applies styling props correctly', () => {
    render(
      <IconBox
        icon="home"
        direction="vertical"
        alignment="start"
        size="xl"
        gap="m"
        iconType="solid"
        className="custom-icon-box"
        dataAttributes={{ testid: 'fontawesome-icon' }}
      >
        Styled content
      </IconBox>,
    )

    const iconBoxElement = screen.getByTestId('fontawesome-icon')
    const wrapperElement = iconBoxElement?.querySelector(
      '.ta-icon-box__wrapper',
    )
    const iconElement = wrapperElement?.querySelector('.fas')

    expect(iconBoxElement).toHaveClass(
      'ta-icon-box__vertical',
      'ta-icon-box__align-start',
      'ta-icon-box__gap-m',
      'custom-icon-box',
    )
    expect(wrapperElement).toHaveClass('ta-icon-box__wrapper__xl')
    expect(iconElement).toHaveClass('fa-home')
  })

  test('handles width and data attributes', () => {
    const dataAttributes = { testid: 'fontawesome-icon', priority: '1' }

    render(
      <IconBox icon="check" width="200px" dataAttributes={dataAttributes}>
        Content with attributes
      </IconBox>,
    )

    const iconBoxElement = screen.getByTestId('fontawesome-icon')

    expect(iconBoxElement).toHaveStyle({ width: '200px' })
    expect(iconBoxElement).toHaveAttribute('data-priority', '1')
  })
})
