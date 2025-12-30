import type { Meta, StoryObj } from '@storybook/svelte-vite';
import PopoverExample from './PopoverExample.svelte';

const meta = {
  title: 'Components/Popover',
  component: PopoverExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'with-header-footer', 'with-close', 'hover', 'no-padding', 'width-auto'],
      description: 'Variant of the popover example'
    }
  }
} satisfies Meta<PopoverExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: 'basic'
  }
};

export const WithHeaderFooter: Story = {
  args: {
    variant: 'with-header-footer'
  }
};

export const WithClose: Story = {
  args: {
    variant: 'with-close'
  }
};

export const Hover: Story = {
  args: {
    variant: 'hover'
  }
};

export const NoPadding: Story = {
  args: {
    variant: 'no-padding'
  }
};

export const WidthAuto: Story = {
  args: {
    variant: 'width-auto'
  }
};
