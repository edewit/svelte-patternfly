import type { Meta, StoryObj } from '@storybook/svelte-vite';
import DataListExample from './DataListExample.svelte';

const meta = {
  title: 'Components/DataList',
  component: DataListExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'compact', 'checkboxes', 'expandable'],
      description: 'Variant of the data list example'
    }
  }
} satisfies Meta<DataListExample>;

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

export const Checkboxes: Story = {
  args: {
    variant: 'checkboxes'
  }
};

export const Expandable: Story = {
  args: {
    variant: 'expandable'
  }
};
