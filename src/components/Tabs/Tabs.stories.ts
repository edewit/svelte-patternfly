import type { Meta, StoryObj } from '@storybook/svelte-vite';
import TabsExample from './TabsExample.svelte';

const meta = {
  title: 'Components/Tabs',
  component: TabsExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'box',
        'vertical',
        'filled',
        'disabled',
        'with-content'
      ],
      description: 'Variant of the tabs example'
    }
  }
} satisfies Meta<TabsExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default'
  }
};

export const Box: Story = {
  args: {
    variant: 'box'
  }
};

export const Vertical: Story = {
  args: {
    variant: 'vertical'
  }
};

export const Filled: Story = {
  args: {
    variant: 'filled'
  }
};

export const Disabled: Story = {
  args: {
    variant: 'disabled'
  }
};

export const WithContent: Story = {
  args: {
    variant: 'with-content'
  }
};
