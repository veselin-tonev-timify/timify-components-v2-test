import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import FontAwesome5 from '../FontAwesome5/FontAwesome5'

// FontAwesome5 Component Tests
describe('FontAwesome5 Component', () => {
  test('renders with default props and icon', () => {
    render(<FontAwesome5 icon="star" />)

    const iconElement = screen.getByTestId('font-awesome')

    expect(iconElement).toBeInTheDocument()
    expect(iconElement.tagName).toBe('I')
    expect(iconElement).toHaveClass('far', 'fa-star')
  })

  test('applies different types and styling props', () => {
    render(
      <FontAwesome5
        type="solid"
        icon="home"
        color="#ff0000"
        spin
        className="custom-icon"
      />,
    )

    const iconElement = screen.getByTestId('font-awesome')

    expect(iconElement).toHaveClass('fas', 'fa-home', 'fa-spin', 'custom-icon')
    expect(iconElement).toHaveStyle({ color: '#ff0000' })
  })

  test('handles duotone type with custom colors and data attributes', () => {
    const dataAttributes = { iconId: 'custom-icon', priority: 1 }

    render(
      <FontAwesome5
        type="duotone"
        icon="user"
        primaryColor="#blue"
        secondaryColor="#red"
        primaryOpacity="0.8"
        secondaryOpacity="0.4"
        dataAttributes={dataAttributes}
      />,
    )

    const iconElement = screen.getByTestId('font-awesome')

    expect(iconElement).toHaveClass('fad', 'fa-user')
    expect(iconElement).toHaveStyle({
      '--fa-primary-color': '#blue',
      '--fa-secondary-color': '#red',
      '--fa-primary-opacity': '0.8',
      '--fa-secondary-opacity': '0.4',
    })
    expect(iconElement).toHaveAttribute('data-iconId', 'custom-icon')
    expect(iconElement).toHaveAttribute('data-priority', '1')
  })
})
