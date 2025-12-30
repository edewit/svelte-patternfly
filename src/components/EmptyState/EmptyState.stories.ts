import type { Meta, StoryObj } from '@storybook/svelte-vite';
import EmptyStateExample from './EmptyStateExample.svelte';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyStateExample,
  tags: ['autodocs'],
  argTypes: {
    titleText: {
      control: { type: 'text' },
      description: 'Text of the title inside empty state header'
    },
    headingLevel: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The heading level to use'
    },
    icon: {
      control: { type: 'text' },
      description: 'Empty state icon (Font Awesome class string)'
    },
    variant: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'lg', 'xl', 'full'],
      description: 'Modifies empty state max-width and sizes'
    },
    status: {
      control: { type: 'select' },
      options: ['danger', 'warning', 'success', 'info', 'custom'],
      description: 'Status of the empty state'
    },
    isFullHeight: {
      control: { type: 'boolean' },
      description: 'Cause component to consume the available height'
    }
  }
} satisfies Meta<EmptyStateExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    titleText: 'Empty state',
    headingLevel: 'h4',
    icon: 'fas fa-cubes'
  }
};

export const ExtraSmall: Story = {
  args: {
    titleText: 'Empty state',
    headingLevel: 'h4',
    icon: 'fas fa-cubes',
    variant: 'xs'
  }
};

export const Small: Story = {
  args: {
    titleText: 'Empty state',
    headingLevel: 'h4',
    icon: 'fas fa-cubes',
    variant: 'sm'
  }
};

export const Large: Story = {
  args: {
    titleText: 'Empty state',
    headingLevel: 'h4',
    icon: 'fas fa-cubes',
    variant: 'lg'
  }
};

export const ExtraLarge: Story = {
  args: {
    titleText: 'Empty state',
    headingLevel: 'h4',
    icon: 'fas fa-cubes',
    variant: 'xl'
  }
};

export const WithStatus: Story = {
  args: {
    titleText: "You're all set",
    headingLevel: 'h4',
    status: 'success'
  }
};
