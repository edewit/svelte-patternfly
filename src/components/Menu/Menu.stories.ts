import type { Meta, StoryObj } from '@storybook/svelte-vite';
import MenuExample from './MenuExample.svelte';

const meta = {
  title: 'Components/Menu/Menu',
  component: MenuExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'danger', 'flyout'],
      description: 'Variant of the menu example'
    }
  }
} satisfies Meta<MenuExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: 'basic'
  }
};

export const Danger: Story = {
  args: {
    variant: 'danger'
  }
};

export const Flyout: Story = {
  args: {
    variant: 'flyout'
  }
};

