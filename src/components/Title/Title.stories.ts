import type { Meta, StoryObj } from '@storybook/svelte-vite';
import TitleExample from './TitleExample.svelte';

const meta = {
  title: 'Components/Title',
  component: TitleExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default-sizes', 'custom-sizes', 'all-sizes'],
      description: 'Variant of the title example'
    }
  }
} satisfies Meta<TitleExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSizes: Story = {
  args: {
    variant: 'default-sizes'
  }
};

export const CustomSizes: Story = {
  args: {
    variant: 'custom-sizes'
  }
};

export const AllSizes: Story = {
  args: {
    variant: 'all-sizes'
  }
};
