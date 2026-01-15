import type { Meta, StoryObj } from '@storybook/svelte-vite';
import TimestampExample from './TimestampExample.svelte';

const meta = {
  title: 'Components/Timestamp',
  component: TimestampExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'long',
        'medium',
        'short',
        'custom-content',
        'custom-content-detailed',
        'date-only',
        'time-only',
        'with-tooltip',
        'custom-tooltip',
        '24-hour',
        'all-formats'
      ],
      description: 'Variant of the timestamp example'
    }
  }
} satisfies Meta<TimestampExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default'
  }
};

export const LongFormat: Story = {
  args: {
    variant: 'long'
  }
};

export const MediumFormat: Story = {
  args: {
    variant: 'medium'
  }
};

export const ShortFormat: Story = {
  args: {
    variant: 'short'
  }
};

export const CustomContent: Story = {
  args: {
    variant: 'custom-content'
  }
};

export const CustomContentDetailed: Story = {
  args: {
    variant: 'custom-content-detailed'
  }
};

export const DateOnly: Story = {
  args: {
    variant: 'date-only'
  }
};

export const TimeOnly: Story = {
  args: {
    variant: 'time-only'
  }
};

export const WithTooltip: Story = {
  args: {
    variant: 'with-tooltip'
  }
};

export const CustomTooltip: Story = {
  args: {
    variant: 'custom-tooltip'
  }
};

export const TwentyFourHour: Story = {
  args: {
    variant: '24-hour'
  }
};

export const AllFormats: Story = {
  args: {
    variant: 'all-formats'
  }
};
