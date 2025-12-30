import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Radio from './Radio.svelte';
import { createRawSnippet } from 'svelte';
import RadioExample from './RadioExample.svelte';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: { type: 'text' },
      description: 'Id of the radio (required)'
    },
    name: {
      control: { type: 'text' },
      description: 'Name for group of radios (required)'
    },
    label: {
      control: { type: 'text' },
      description: 'Label text of the radio'
    },
    isChecked: {
      control: { type: 'boolean' },
      description: 'Flag to show if the radio is checked.'
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Flag to show if the radio is checked (alternative to isChecked).'
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Flag to show if the radio is disabled'
    },
    isValid: {
      control: { type: 'boolean' },
      description: 'Flag to show if the radio is valid'
    },
    isLabelWrapped: {
      control: { type: 'boolean' },
      description: 'Flag to indicate whether the radio wrapper element is a <label> element'
    },
    description: {
      control: { type: 'text' },
      description: 'Description text of the radio'
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Aria-label of the radio'
    }
  }
} satisfies Meta<Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create text snippets for Storybook
const textSnippet = (text: string) => createRawSnippet(() => ({ render: () => text }));

export const Basic: Story = {
  args: {
    id: 'basic-radio',
    name: 'radio-group',
    label: 'Basic radio'
  },
  render: (args: any) => ({
    Component: Radio,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const Checked: Story = {
  args: {
    id: 'checked-radio',
    name: 'radio-group',
    label: 'Checked radio',
    isChecked: true
  },
  render: (args: any) => ({
    Component: Radio,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const Uncontrolled: Story = {
  args: {
    id: 'uncontrolled-radio-1',
    name: 'radio-group',
    label: 'Uncontrolled Radio 1'
  },
  render: (args: any) => ({
    Component: Radio,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const Disabled: Story = {
  args: {
    id: 'disabled-radio-1',
    name: 'radio-group',
    label: 'Disabled Radio 1',
    isDisabled: true
  },
  render: (args: any) => ({
    Component: Radio,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const DisabledChecked: Story = {
  args: {
    id: 'disabled-radio-2',
    name: 'radio-group',
    label: 'Disabled and checked radio',
    isDisabled: true,
    isChecked: true
  },
  render: (args: any) => ({
    Component: Radio,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const WithDescription: Story = {
  args: {
    id: 'radio-with-description',
    name: 'radio-group',
    label: 'Radio with description',
    description:
      'Single-tenant cloud service hosted and managed by Red Hat that offers high-availability enterprise-grade clusters in a virtual private cloud on AWS or GCP.'
  },
  render: (args: any) => ({
    Component: Radio,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined,
      description: args.description ? textSnippet(args.description) : undefined
    }
  })
};

export const WithBody: Story = {
  args: {
    id: 'radio-with-body',
    name: 'radio-group',
    label: 'Radio with body'
  },
  render: (args: any) => ({
    Component: Radio,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined,
      body: createRawSnippet(() => ({ render: () => 'This is where custom content goes.' }))
    }
  })
};

export const WithDescriptionAndBody: Story = {
  args: {
    id: 'radio-with-description-body',
    name: 'radio-group',
    label: 'Radio with description and body',
    description:
      'Single-tenant cloud service hosted and managed by Red Hat that offers high-availability enterprise-grade clusters in a virtual private cloud on AWS or GCP.'
  },
  render: (args: any) => ({
    Component: Radio,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined,
      description: args.description ? textSnippet(args.description) : undefined,
      body: createRawSnippet(() => ({ render: () => 'This is where custom content goes.' }))
    }
  })
};

export const Invalid: Story = {
  args: {
    id: 'invalid-radio',
    name: 'radio-group',
    label: 'Invalid radio',
    isValid: false
  },
  render: (args: any) => ({
    Component: Radio,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const LabelWrapped: Story = {
  args: {
    id: 'label-wrapped-radio',
    name: 'radio-group',
    label: 'Label wraps input example',
    isLabelWrapped: true
  },
  render: (args: any) => ({
    Component: Radio,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const Standalone: Story = {
  args: {
    id: 'standalone-radio',
    name: 'radio-group',
    'aria-label': 'Standalone radio'
  },
  render: (args: any) => ({
    Component: Radio,
    props: args
  })
};

export const Controlled: Story = {
  render: () => ({
    Component: RadioExample
  })
};
