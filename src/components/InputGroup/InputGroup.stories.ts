import type { Meta, StoryObj } from '@storybook/svelte-vite';
import InputGroup from './InputGroup.svelte';
import InputGroupExample from './InputGroupExample.svelte';
import InputGroupWithTextareaExample from './InputGroupWithTextareaExample.svelte';
import InputGroupWithDropdownExample from './InputGroupWithDropdownExample.svelte';
import InputGroupWithIconExample from './InputGroupWithIconExample.svelte';
import InputGroupWithPlainTextExample from './InputGroupWithPlainTextExample.svelte';
import InputGroupDisabledExample from './InputGroupDisabledExample.svelte';
import InputGroupWithBoxExample from './InputGroupWithBoxExample.svelte';

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional classes added to the input group.'
    }
  }
} satisfies Meta<InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    Component: InputGroupExample
  })
};

export const WithTextarea: Story = {
  render: () => ({
    Component: InputGroupWithTextareaExample
  })
};

export const WithDropdown: Story = {
  render: () => ({
    Component: InputGroupWithDropdownExample
  })
};

export const WithIcon: Story = {
  render: () => ({
    Component: InputGroupWithIconExample
  })
};

export const WithPlainText: Story = {
  render: () => ({
    Component: InputGroupWithPlainTextExample
  })
};

export const Disabled: Story = {
  render: () => ({
    Component: InputGroupDisabledExample
  })
};

export const WithBox: Story = {
  render: () => ({
    Component: InputGroupWithBoxExample
  })
};

