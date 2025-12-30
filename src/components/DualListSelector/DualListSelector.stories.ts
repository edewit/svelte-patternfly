import type { Meta, StoryObj } from '@storybook/svelte-vite';
import DualListSelectorExample from './DualListSelectorExample.svelte';

const meta = {
  title: 'Components/DualListSelector',
  component: DualListSelectorExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'withSearch', 'withTooltips'],
      description: 'Variant of the dual list selector example'
    }
  }
} satisfies Meta<DualListSelectorExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: 'basic'
  }
};

export const WithSearch: Story = {
  args: {
    variant: 'withSearch'
  }
};

export const WithTooltips: Story = {
  args: {
    variant: 'withTooltips'
  }
};
