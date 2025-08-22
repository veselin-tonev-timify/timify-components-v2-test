import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import Row from './Row'
import Col from '../Col/Col'

// Mock CSS styles for better visual representation in Storybook
const mockStyles = `  
  .ta-col {
    flex: 1;
    padding: 0 15px;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    margin: 5px 0;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .ta-col__1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
  .ta-col__2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
  .ta-col__3 { flex: 0 0 25%; max-width: 25%; }
  .ta-col__4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
  .ta-col__5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
  .ta-col__6 { flex: 0 0 50%; max-width: 50%; }
  .ta-col__7 { flex: 0 0 58.333333%; max-width: 58.333333%; }
  .ta-col__8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
  .ta-col__9 { flex: 0 0 75%; max-width: 75%; }
  .ta-col__10 { flex: 0 0 83.333333%; max-width: 83.333333%; }
  .ta-col__11 { flex: 0 0 91.666667%; max-width: 91.666667%; }
  .ta-col__12 { flex: 0 0 100%; max-width: 100%; }
`

// Add styles to document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = mockStyles
  document.head.appendChild(style)
}

const RowMeta: Meta<typeof Row> = {
  title: 'Components/Row',
  component: Row,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A container component for organizing columns in a grid layout. Supports custom styling and offset control.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    noOffset: {
      control: 'boolean',
      description: 'Remove default margins',
    },
    dataAttributes: {
      control: 'object',
      description: 'Data attributes to add to the element',
    },
    children: {
      control: false,
      description: 'Column components or other content',
    },
  },
}

export { RowMeta as default }

type RowStory = StoryObj<typeof Row>

export const BasicRow: RowStory = {
  args: {
    children: (
      <>
        <Col size={6}>First Column</Col>
        <Col size={6}>Second Column</Col>
      </>
    ),
  },
}

export const RowWithoutOffset: RowStory = {
  args: {
    noOffset: true,
    children: (
      <>
        <Col size={4}>Column 1</Col>
        <Col size={4}>Column 2</Col>
        <Col size={4}>Column 3</Col>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Row with noOffset=true removes default margins.',
      },
    },
  },
}

export const RowWithCustomClass: RowStory = {
  args: {
    className: 'custom-row-class',
    children: (
      <>
        <Col size={8}>Main Content</Col>
        <Col size={4}>Sidebar</Col>
      </>
    ),
  },
}

export const RowWithDataAttributes: RowStory = {
  args: {
    dataAttributes: {
      section: 'header',
      priority: 'high',
      index: 0,
    },
    children: (
      <>
        <Col size={12}>Header Row with Data Attributes</Col>
      </>
    ),
  },
}

export const ComplexGridLayout: RowStory = {
  args: {
    children: (
      <>
        <Col size={12}>Header (Full Width)</Col>
        <Col size={3}>Sidebar</Col>
        <Col size={6}>Main Content</Col>
        <Col size={3}>Right Sidebar</Col>
        <Col size={12}>Footer (Full Width)</Col>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'A complex grid layout demonstrating various column sizes.',
      },
    },
  },
}

export const NestedRows: RowStory = {
  render: () => (
    <Row>
      <Col size={6}>
        <div
          style={{
            padding: '10px',
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
          }}
        >
          <h4>Left Section</h4>
          <Row noOffset>
            <Col size={6}>Nested Col 1</Col>
            <Col size={6}>Nested Col 2</Col>
          </Row>
        </div>
      </Col>
      <Col size={6}>
        <div
          style={{
            padding: '10px',
            background: '#d4edda',
            border: '1px solid #c3e6cb',
          }}
        >
          <h4>Right Section</h4>
          <Row noOffset>
            <Col size={4}>Nested A</Col>
            <Col size={4}>Nested B</Col>
            <Col size={4}>Nested C</Col>
          </Row>
        </div>
      </Col>
    </Row>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates nesting rows within columns for complex layouts.',
      },
    },
  },
}

export const ResponsiveExample: RowStory = {
  render: () => (
    <>
      <h3>Different Column Combinations</h3>
      <Row>
        <Col size={1}>1</Col>
        <Col size={11}>11</Col>
      </Row>
      <Row>
        <Col size={2}>2</Col>
        <Col size={10}>10</Col>
      </Row>
      <Row>
        <Col size={3}>3</Col>
        <Col size={9}>9</Col>
      </Row>
      <Row>
        <Col size={4}>4</Col>
        <Col size={8}>8</Col>
      </Row>
      <Row>
        <Col size={5}>5</Col>
        <Col size={7}>7</Col>
      </Row>
      <Row>
        <Col size={6}>6</Col>
        <Col size={6}>6</Col>
      </Row>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows all possible column size combinations that add up to 12.',
      },
    },
  },
}
