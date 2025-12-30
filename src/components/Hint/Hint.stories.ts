import type { Meta, StoryObj } from '@storybook/svelte-vite';
import HintExample from './HintExample.svelte';

const meta = {
  title: 'Components/Hint',
  component: HintExample,
  tags: ['autodocs'],
  argTypes: {
    hasActions: {
      control: { type: 'boolean' },
      description: 'Whether to show actions (kebab menu)'
    },
    hasNoActionsOffset: {
      control: { type: 'boolean' },
      description: 'Flag indicating that the actions have no offset'
    },
    hasTitle: {
      control: { type: 'boolean' },
      description: 'Whether to show the title'
    },
    hasBody: {
      control: { type: 'boolean' },
      description: 'Whether to show the body'
    },
    hasFooter: {
      control: { type: 'boolean' },
      description: 'Whether to show the footer'
    }
  }
} satisfies Meta<HintExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicWithTitle: Story = {
  args: {
    hasTitle: true,
    hasBody: true,
    hasFooter: false,
    hasActions: false
  }
};

export const BasicWithoutTitle: Story = {
  args: {
    hasTitle: false,
    hasBody: true,
    hasFooter: false,
    hasActions: false
  }
};

export const WithActions: Story = {
  args: {
    hasTitle: true,
    hasBody: true,
    hasFooter: false,
    hasActions: true,
    hasNoActionsOffset: false
  }
};

export const WithActionsNoOffset: Story = {
  args: {
    hasTitle: true,
    hasBody: true,
    hasFooter: false,
    hasActions: true,
    hasNoActionsOffset: true
  }
};

export const WithTitleAndFooter: Story = {
  args: {
    hasTitle: true,
    hasBody: true,
    hasFooter: true,
    hasActions: false
  }
};

export const Complete: Story = {
  args: {
    hasTitle: true,
    hasBody: true,
    hasFooter: true,
    hasActions: true,
    hasNoActionsOffset: false
  }
};

export const TitleOnly: Story = {
  args: {
    hasTitle: true,
    hasBody: false,
    hasFooter: false,
    hasActions: false
  }
};

export const BodyOnly: Story = {
  args: {
    hasTitle: false,
    hasBody: true,
    hasFooter: false,
    hasActions: false
  }
};
