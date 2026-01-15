import type { Meta, StoryObj } from '@storybook/svelte-vite';
import SpinnerExample from './SpinnerExample.svelte';

const meta = {
  title: 'Components/Spinner',
  component: SpinnerExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'basic',
        'size-sm',
        'size-md',
        'size-lg',
        'size-xl',
        'custom-size',
        'inline'
      ],
      description: 'Variant of the spinner example'
    }
  }
} satisfies Meta<SpinnerExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: 'basic'
  }
};

export const SizeSmall: Story = {
  args: {
    variant: 'size-sm'
  }
};

export const SizeMedium: Story = {
  args: {
    variant: 'size-md'
  }
};

export const SizeLarge: Story = {
  args: {
    variant: 'size-lg'
  }
};

export const SizeExtraLarge: Story = {
  args: {
    variant: 'size-xl'
  }
};

export const CustomSize: Story = {
  args: {
    variant: 'custom-size'
  }
};

export const Inline: Story = {
  args: {
    variant: 'inline'
  }
};
