import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Checkbox from './Checkbox.svelte';
import { createRawSnippet } from 'svelte';
import CheckboxExample from './CheckboxExample.svelte';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: { type: 'text' },
      description: 'Id of the checkbox (required)'
    },
    label: {
      control: { type: 'text' },
      description: 'Label text of the checkbox'
    },
    isChecked: {
      control: { type: 'boolean' },
      description:
        'Flag to show if the checkbox is checked. If null, the checkbox will be indeterminate (partially checked).'
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Flag to show if the checkbox is disabled'
    },
    isRequired: {
      control: { type: 'boolean' },
      description: 'Flag to show if the checkbox is required'
    },
    isValid: {
      control: { type: 'boolean' },
      description: 'Flag to show if the checkbox is valid'
    },
    isLabelWrapped: {
      control: { type: 'boolean' },
      description: 'Flag to indicate whether the checkbox wrapper element is a <label> element'
    },
    description: {
      control: { type: 'text' },
      description: 'Description text of the checkbox'
    },
    name: {
      control: { type: 'text' },
      description: 'Name attribute of the checkbox input'
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Aria-label of the checkbox'
    }
  }
} satisfies Meta<Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create text snippets for Storybook
const textSnippet = (text: string) => createRawSnippet(() => ({ render: () => text }));

export const Basic: Story = {
  args: {
    id: 'basic-checkbox',
    label: 'Check'
  },
  render: (args: any) => ({
    Component: Checkbox,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const Checked: Story = {
  args: {
    id: 'checked-checkbox',
    label: 'Checked checkbox',
    isChecked: true
  },
  render: (args: any) => ({
    Component: Checkbox,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const Uncontrolled: Story = {
  args: {
    id: 'uncontrolled-checkbox-1',
    label: 'Uncontrolled CheckBox 1'
  },
  render: (args: any) => ({
    Component: Checkbox,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const Disabled: Story = {
  args: {
    id: 'disabled-checkbox-1',
    label: 'Disabled CheckBox 1',
    isDisabled: true
  },
  render: (args: any) => ({
    Component: Checkbox,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const DisabledChecked: Story = {
  args: {
    id: 'disabled-checkbox-2',
    label: 'Disabled CheckBox 2',
    isDisabled: true,
    isChecked: true
  },
  render: (args: any) => ({
    Component: Checkbox,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const WithDescription: Story = {
  args: {
    id: 'checkbox-with-description',
    label: 'Checkbox with description',
    description:
      'Single-tenant cloud service hosted and managed by Red Hat that offers high-availability enterprise-grade clusters in a virtual private cloud on AWS or GCP.'
  },
  render: (args: any) => ({
    Component: Checkbox,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined,
      description: args.description ? textSnippet(args.description) : undefined
    }
  })
};

export const Required: Story = {
  args: {
    id: 'required-checkbox',
    label: 'Required checkbox',
    isRequired: true
  },
  render: (args: any) => ({
    Component: Checkbox,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const Invalid: Story = {
  args: {
    id: 'invalid-checkbox',
    label: 'Invalid checkbox',
    isValid: false
  },
  render: (args: any) => ({
    Component: Checkbox,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const LabelWrapped: Story = {
  args: {
    id: 'label-wrapped-checkbox',
    label: 'Label wraps input example',
    isLabelWrapped: true
  },
  render: (args: any) => ({
    Component: Checkbox,
    props: {
      ...args,
      label: args.label ? textSnippet(args.label) : undefined
    }
  })
};

export const Standalone: Story = {
  args: {
    id: 'standalone-checkbox',
    'aria-label': 'Standalone checkbox'
  },
  render: (args: any) => ({
    Component: Checkbox,
    props: args
  })
};

export const Controlled: Story = {
  render: () => ({
    Component: CheckboxExample
  })
};
