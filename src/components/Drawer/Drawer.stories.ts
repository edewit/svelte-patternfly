import type { Meta, StoryObj } from '@storybook/svelte-vite';
import DrawerExample from './DrawerExample.svelte';

const meta = {
  title: 'Components/Drawer',
  component: DrawerExample,
  tags: ['autodocs'],
  argTypes: {
    isExpanded: {
      control: { type: 'boolean' },
      description: 'Whether the drawer panel is expanded'
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'bottom'],
      description: 'Position of the drawer panel'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'inline', 'static'],
      description: 'Variant of the drawer'
    },
    isInline: {
      control: { type: 'boolean' },
      description: 'Whether the drawer is inline'
    },
    isStatic: {
      control: { type: 'boolean' },
      description: 'Whether the drawer is static'
    }
  }
} satisfies Meta<DrawerExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    isExpanded: false
  }
};

export const Expanded: Story = {
  args: {
    isExpanded: true
  }
};

export const LeftPosition: Story = {
  args: {
    isExpanded: true,
    position: 'left'
  }
};

export const BottomPosition: Story = {
  args: {
    isExpanded: true,
    position: 'bottom'
  }
};

export const Inline: Story = {
  args: {
    isExpanded: true,
    variant: 'inline'
  }
};

export const Static: Story = {
  args: {
    isExpanded: true,
    variant: 'static'
  }
};
