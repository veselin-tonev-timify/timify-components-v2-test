import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import Col from './Col'

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

// Col Stories
const ColMeta: Meta<typeof Col> = {
  title: 'Components/Col',
  component: Col,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible column component for grid layouts. Supports sizing from 1-12 and custom styling.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: 'Column size (1-12)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    dataAttributes: {
      control: 'object',
      description: 'Data attributes to add to the element',
    },
    children: {
      control: 'text',
      description: 'Content to display inside the column',
    },
  },
  args: {
    children: 'Column Content',
  },
}

export default ColMeta

type ColStory = StoryObj<typeof Col>

export const Default: ColStory = {
  args: {},
}

export const WithSize: ColStory = {
  args: {
    size: 6,
    children: 'Half Width Column (size=6)',
  },
}

export const SmallColumn: ColStory = {
  args: {
    size: 3,
    children: 'Quarter Width (size=3)',
  },
}

export const LargeColumn: ColStory = {
  args: {
    size: 9,
    children: 'Three Quarters Width (size=9)',
  },
}

export const FullWidth: ColStory = {
  args: {
    size: 12,
    children: 'Full Width Column (size=12)',
  },
}

export const WithCustomClass: ColStory = {
  args: {
    size: 6,
    className: 'custom-column-class',
    children: 'Column with custom class',
  },
}

export const WithDataAttributes: ColStory = {
  args: {
    size: 4,
    dataAttributes: {
      id: 'col-123',
      category: 'primary',
      index: 1,
    },
    children: 'Column with data attributes',
  },
  parameters: {
    docs: {
      description: {
        story:
          'This column has data-id="col-123", data-category="primary", and data-index="1" attributes.',
      },
    },
  },
}

export const ComplexContent: ColStory = {
  args: {
    size: 8,
    children: (
      <div>
        <h3>Complex Content</h3>
        <p>
          This column contains more complex JSX content including headings and
          paragraphs.
        </p>
        <button>Action Button</button>
      </div>
    ),
  },
}
