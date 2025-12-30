import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Breadcrumb from './Breadcrumb.svelte';
import type { BreadcrumbItem } from './types';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array of breadcrumb items'
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'ARIA label for the breadcrumb navigation'
    }
  }
} satisfies Meta<Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems: BreadcrumbItem[] = [
  { href: '#', text: 'Section home' },
  { href: '#', text: 'Section title' },
  { href: '#', text: 'Section title' },
  { href: '#', text: 'Section landing', isCurrent: true }
];

export const Basic: Story = {
  args: {
    items: basicItems
  }
};

export const WithoutHomeLink: Story = {
  args: {
    items: [
      { href: '#', text: 'Section home' },
      { href: '#', text: 'Section title' },
      { href: '#', text: 'Section title' },
      { href: '#', text: 'Section title' },
      { href: '#', text: 'Section title' },
      { href: '#', text: 'Section landing', isCurrent: true }
    ]
  }
};

export const WithHeading: Story = {
  args: {
    items: [
      { href: '#', text: 'Section home' },
      { href: '#', text: 'Section title' },
      { href: '#', text: 'Section title' },
      { href: '#', text: 'Section title' },
      { text: 'Section title', isCurrent: true }
    ]
  }
};

export const WithDropdownMenu: Story = {
  args: {
    items: [
      { href: '#', text: 'Section home' },
      { href: '#', text: 'Section title' },
      {
        type: 'dropdown',
        dropdownCount: 3,
        isExpanded: false,
        dropdownItems: [
          { text: 'Edit', href: '#' },
          { text: 'Deployment', href: '#' },
          { text: 'Applications', href: '#' }
        ]
      },
      { type: 'heading', href: '#', text: 'Section title', isCurrent: true, headingLevel: 1 }
    ]
  }
};

export const SingleItem: Story = {
  args: {
    items: [{ text: 'Current page', isCurrent: true }]
  }
};

export const CustomAriaLabel: Story = {
  args: {
    items: basicItems,
    'aria-label': 'Navigation breadcrumb'
  }
};
