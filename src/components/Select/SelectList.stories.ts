import type { Meta, StoryObj } from '@storybook/svelte-vite';
import SelectListExample from './SelectListExample.svelte';

const meta = {
  title: 'Components/Menu/SelectList',
  component: SelectListExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'with-groups', 'multiselect', 'with-checkboxes'],
      description: 'Variant of the SelectList example'
    },
    isOpen: {
      control: { type: 'boolean' },
      description: 'Whether the select is open'
    },
    selected: {
      control: { type: 'text' },
      description: 'Selected option value(s)'
    }
  }
} satisfies Meta<typeof SelectListExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    Component: SelectListExample,
    props: {
      variant: 'basic'
    }
  })
};

export const WithGroups: Story = {
  render: () => ({
    Component: SelectListExample,
    props: {
      variant: 'with-groups'
    }
  })
};

export const Multiselect: Story = {
  render: () => ({
    Component: SelectListExample,
    props: {
      variant: 'multiselect',
      selected: []
    }
  })
};

export const WithCheckboxes: Story = {
  render: () => ({
    Component: SelectListExample,
    props: {
      variant: 'with-checkboxes'
    }
  })
};

export const WithSelectedOption: Story = {
  render: () => ({
    Component: SelectListExample,
    props: {
      variant: 'basic',
      selected: '1'
    }
  })
};

export const Open: Story = {
  render: () => ({
    Component: SelectListExample,
    props: {
      variant: 'basic',
      isOpen: true
    }
  })
};

