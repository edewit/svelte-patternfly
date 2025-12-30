import type { Meta, StoryObj } from '@storybook/svelte-vite';
import ActionListExample from './ActionListExample.svelte';

const meta = {
  title: 'Components/ActionList',
  component: ActionListExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['single-group', 'with-kebab', 'multiple-groups', 'with-icons'],
      description: 'Variant of the action list example'
    },
    isIcons: {
      control: { type: 'boolean' },
      description: 'Whether the action list supports icon buttons'
    }
  }
} satisfies Meta<ActionListExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleGroup: Story = {
  args: {
    variant: 'single-group'
  }
};

export const WithKebab: Story = {
  args: {
    variant: 'with-kebab'
  }
};

export const MultipleGroups: Story = {
  args: {
    variant: 'multiple-groups'
  }
};

export const WithIcons: Story = {
  args: {
    variant: 'with-icons',
    isIcons: true
  }
};
