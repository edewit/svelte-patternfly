import type { Meta, StoryObj } from '@storybook/svelte-vite';
import MastheadExample from './MastheadExample.svelte';

const meta = {
  title: 'Components/Masthead',
  component: MastheadExample,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: { type: 'text' },
      description: 'ID for the masthead element'
    },
    display: {
      control: { type: 'object' },
      description: 'Display type at various breakpoints'
    },
    inset: {
      control: { type: 'object' },
      description: 'Insets at various breakpoints'
    },
    useBrand: {
      control: { type: 'boolean' },
      description: 'Use Brand component instead of text logo'
    },
    logoText: {
      control: { type: 'text' },
      description: 'Text for the logo'
    },
    contentText: {
      control: { type: 'text' },
      description: 'Text for the content area'
    },
    useMixedContent: {
      control: { type: 'boolean' },
      description: 'Use mixed content (buttons) instead of text'
    }
  }
} satisfies Meta<MastheadExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    id: 'basic-example'
  }
};

export const BasicWithBrand: Story = {
  args: {
    id: 'basic-brand-example',
    useBrand: true
  }
};

export const DisplayInline: Story = {
  args: {
    id: 'display-inline-example',
    display: { default: 'inline' }
  }
};

export const DisplayStack: Story = {
  args: {
    id: 'display-stack-example',
    display: { default: 'stack' }
  }
};

export const DisplayStackInlineResponsive: Story = {
  args: {
    id: 'display-stack-inline-responsive-example',
    display: { default: 'stack', md: 'inline' }
  }
};

export const WithInset: Story = {
  args: {
    id: 'inset-example',
    inset: { default: 'insetMd' }
  }
};

export const BasicWithMixedContent: Story = {
  args: {
    id: 'basic-mixed-content-example',
    useMixedContent: true
  }
};

