import type { Meta, StoryObj } from '@storybook/svelte-vite';
import TruncateExample from './TruncateExample.svelte';

const meta = {
  title: 'Components/Truncate',
  component: TruncateExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'start', 'middle', 'middle-custom', 'long-text', 'tooltip-bottom'],
      description: 'Variant of the truncate example'
    }
  }
} satisfies Meta<TruncateExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default'
  }
};

export const TruncateStart: Story = {
  args: {
    variant: 'start'
  }
};

export const TruncateMiddle: Story = {
  args: {
    variant: 'middle'
  }
};

export const TruncateMiddleCustom: Story = {
  args: {
    variant: 'middle-custom'
  }
};

export const LongText: Story = {
  args: {
    variant: 'long-text'
  }
};

export const TooltipBottom: Story = {
  args: {
    variant: 'tooltip-bottom'
  }
};
