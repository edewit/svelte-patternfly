import type { Meta, StoryObj } from '@storybook/svelte-vite';
import ListExample from './ListExample.svelte';

const meta = {
  title: 'Components/List',
  component: ListExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'inline', 'ordered', 'plain', 'bordered', 'with-icons', 'with-large-icons'],
      description: 'Variant of the list example'
    }
  }
} satisfies Meta<ListExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: 'basic'
  }
};

export const Inline: Story = {
  args: {
    variant: 'inline'
  }
};

export const Ordered: Story = {
  args: {
    variant: 'ordered'
  }
};

export const Plain: Story = {
  args: {
    variant: 'plain'
  }
};

export const WithHorizontalRules: Story = {
  args: {
    variant: 'bordered'
  }
};

export const WithIcons: Story = {
  args: {
    variant: 'with-icons'
  }
};

export const WithLargeIcons: Story = {
  args: {
    variant: 'with-large-icons'
  }
};

