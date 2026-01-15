import type { Meta, StoryObj } from '@storybook/svelte-vite';
import ToggleGroupExample from './ToggleGroupExample.svelte';

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroupExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'single-select',
        'multi-select',
        'disabled',
        'compact',
        'with-icons',
        'icons-only'
      ],
      description: 'Variant of the toggle group example'
    }
  }
} satisfies Meta<ToggleGroupExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelect: Story = {
  args: {
    variant: 'single-select'
  }
};

export const MultiSelect: Story = {
  args: {
    variant: 'multi-select'
  }
};

export const Disabled: Story = {
  args: {
    variant: 'disabled'
  }
};

export const Compact: Story = {
  args: {
    variant: 'compact'
  }
};

export const WithIcons: Story = {
  args: {
    variant: 'with-icons'
  }
};

export const IconsOnly: Story = {
  args: {
    variant: 'icons-only'
  }
};
