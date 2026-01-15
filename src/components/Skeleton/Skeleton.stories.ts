import type { Meta, StoryObj } from '@storybook/svelte-vite';
import SkeletonExample from './SkeletonExample.svelte';

const meta = {
  title: 'Components/Skeleton',
  component: SkeletonExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'percentage-width',
        'percentage-height',
        'fixed-width',
        'fixed-height',
        'text-sm',
        'text-md',
        'text-lg',
        'text-xl',
        'text-2xl',
        'text-3xl',
        'text-4xl',
        'circle',
        'square'
      ],
      description: 'Variant of the skeleton example'
    }
  }
} satisfies Meta<SkeletonExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default'
  }
};

export const PercentageWidth: Story = {
  args: {
    variant: 'percentage-width'
  }
};

export const PercentageHeight: Story = {
  args: {
    variant: 'percentage-height'
  }
};

export const FixedWidth: Story = {
  args: {
    variant: 'fixed-width'
  }
};

export const FixedHeight: Story = {
  args: {
    variant: 'fixed-height'
  }
};

export const TextSmall: Story = {
  args: {
    variant: 'text-sm'
  }
};

export const TextMedium: Story = {
  args: {
    variant: 'text-md'
  }
};

export const TextLarge: Story = {
  args: {
    variant: 'text-lg'
  }
};

export const TextExtraLarge: Story = {
  args: {
    variant: 'text-xl'
  }
};

export const Text2xl: Story = {
  args: {
    variant: 'text-2xl'
  }
};

export const Text3xl: Story = {
  args: {
    variant: 'text-3xl'
  }
};

export const Text4xl: Story = {
  args: {
    variant: 'text-4xl'
  }
};

export const Circle: Story = {
  args: {
    variant: 'circle'
  }
};

export const Square: Story = {
  args: {
    variant: 'square'
  }
};
