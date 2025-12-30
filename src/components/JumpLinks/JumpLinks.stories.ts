import type { Meta, StoryObj } from '@storybook/svelte-vite';
import JumpLinksExample from './JumpLinksExample.svelte';

const meta = {
  title: 'Components/JumpLinks',
  component: JumpLinksExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'centered', 'with-label', 'vertical', 'vertical-with-label'],
      description: 'Variant of the jump links example'
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'ARIA label for the jump links navigation'
    }
  }
} satisfies Meta<JumpLinksExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: 'basic',
    'aria-label': 'Jump to basic example sections'
  }
};

export const WithCenteredList: Story = {
  args: {
    variant: 'centered',
    'aria-label': 'Jump to centered example sections'
  }
};

export const WithLabel: Story = {
  args: {
    variant: 'with-label',
    'aria-label': 'Jump to first section in jump links with label example'
  }
};

export const Vertical: Story = {
  args: {
    variant: 'vertical',
    'aria-label': 'Jump to vertical example sections'
  }
};

export const VerticalWithLabel: Story = {
  args: {
    variant: 'vertical-with-label',
    'aria-label': 'Jump to vertical example sections with labels'
  }
};

