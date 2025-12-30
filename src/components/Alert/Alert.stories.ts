import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Alert from './Alert.svelte';
import { createRawSnippet } from 'svelte';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['custom', 'info', 'success', 'warning', 'danger'],
      description: 'Alert variant style'
    },
    isInline: {
      control: { type: 'boolean' },
      description: 'Whether the alert is inline'
    },
    isPlain: {
      control: { type: 'boolean' },
      description: 'Whether the alert is plain (no background)'
    },
    isExpandable: {
      control: { type: 'boolean' },
      description: 'Whether the alert is expandable'
    },
    isExpanded: {
      control: { type: 'boolean' },
      description: 'Whether the alert is expanded (for expandable alerts)'
    },
    isTruncate: {
      control: { type: 'boolean' },
      description: 'Whether the alert title should truncate'
    },
    title: {
      control: { type: 'text' },
      description: 'Alert title'
    },
    customIcon: {
      control: { type: 'text' },
      description: 'Custom icon class'
    },
    showClose: {
      control: { type: 'boolean' },
      description: 'Whether to show close button'
    },
    'aria-live': {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
      description: 'ARIA live region setting'
    }
  }
} satisfies Meta<Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create text snippets for Storybook
const textSnippet = (text: string) => createRawSnippet(() => ({ render: () => text }));

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Info alert: Info alert title'
  }
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success alert: Success alert title'
  }
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning alert: Warning alert title'
  }
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Danger alert: Danger alert title'
  }
};

export const Custom: Story = {
  args: {
    variant: 'custom',
    title: 'Custom alert: Custom alert title'
  }
};

export const WithDescription: Story = {
  args: {
    variant: 'success',
    title: 'Success alert: Success alert title',
    descriptionSlot: textSnippet(
      'Success alert description. This should tell the user more information about the alert.'
    )
  }
};

export const WithActions: Story = {
  args: {
    variant: 'success',
    title: 'Success alert: Success alert title',
    descriptionSlot: textSnippet(
      'Success alert description. This should tell the user more information about the alert.'
    ),
    actionSlot: textSnippet('<a href="#">View details</a> <a href="#">Ignore</a>')
  }
};

export const WithCloseButton: Story = {
  args: {
    variant: 'success',
    title: 'Success alert: Success alert title',
    showClose: true
  }
};

export const Inline: Story = {
  args: {
    variant: 'success',
    title: 'Success alert: Success inline alert title',
    isInline: true
  }
};

export const Plain: Story = {
  args: {
    variant: 'success',
    title: 'Success alert: Success alert title',
    isPlain: true
  }
};

export const Expandable: Story = {
  args: {
    variant: 'success',
    title: 'Success alert title',
    titleScreenReader: 'Success alert:',
    isExpandable: true,
    showClose: true,
    descriptionSlot: textSnippet(
      'Success alert description. This should tell the user more information about the alert.'
    ),
    actionGroupSlot: textSnippet(`
      <button class="pf-v6-c-button pf-m-inline pf-m-link" type="button">
        <span class="pf-v6-c-button__text">View details</span>
      </button>
      <button class="pf-v6-c-button pf-m-inline pf-m-link" type="button">
        <span class="pf-v6-c-button__text">Ignore</span>
      </button>
    `)
  }
};

export const ExpandableExpanded: Story = {
  args: {
    variant: 'success',
    title: 'Success alert title',
    titleScreenReader: 'Success alert:',
    isExpandable: true,
    isExpanded: true,
    showClose: true,
    descriptionSlot: textSnippet(
      'Success alert description. This should tell the user more information about the alert.'
    ),
    actionGroupSlot: textSnippet(`
      <button class="pf-v6-c-button pf-m-inline pf-m-link" type="button">
        <span class="pf-v6-c-button__text">View details</span>
      </button>
      <button class="pf-v6-c-button pf-m-inline pf-m-link" type="button">
        <span class="pf-v6-c-button__text">Ignore</span>
      </button>
    `)
  }
};

export const Truncate: Story = {
  args: {
    variant: 'success',
    title:
      'Success alert: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pellentesque neque cursus enim fringilla tincidunt. Proin lobortis aliquam dictum. Nam vel ullamcorper nulla, nec blandit dolor. Vivamus pellentesque neque justo, nec accumsan nulla rhoncus id.',
    isTruncate: true
  }
};

export const WithCustomIcon: Story = {
  args: {
    variant: 'success',
    title: 'Success alert: Success alert title',
    customIcon: 'fas fa-check-circle'
  }
};
