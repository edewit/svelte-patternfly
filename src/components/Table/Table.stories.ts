import type { Meta, StoryObj } from '@storybook/svelte-vite';
import TableExample from './TableExample.svelte';

const meta = {
  title: 'Components/Table',
  component: TableExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'basic',
        'compact',
        'striped',
        'bordered',
        'sortable',
        'selectable',
        'expandable',
        'text-center'
      ],
      description: 'Variant of the table example'
    }
  }
} satisfies Meta<TableExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: 'basic'
  }
};

export const Compact: Story = {
  args: {
    variant: 'compact'
  }
};

export const Striped: Story = {
  args: {
    variant: 'striped'
  }
};

export const Bordered: Story = {
  args: {
    variant: 'bordered'
  }
};

export const Sortable: Story = {
  args: {
    variant: 'sortable'
  }
};

export const Selectable: Story = {
  args: {
    variant: 'selectable'
  }
};

export const Expandable: Story = {
  args: {
    variant: 'expandable'
  }
};

export const TextCenter: Story = {
  args: {
    variant: 'text-center'
  }
};
