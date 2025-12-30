import type { Meta, StoryObj } from '@storybook/svelte-vite';
import FormSelect from './FormSelect.svelte';
import FormSelectBasicStory from './FormSelectBasicStory.svelte';
import FormSelectGroupedStory from './FormSelectGroupedStory.svelte';
import FormSelectValidatedStory from './FormSelectValidatedStory.svelte';
import FormSelectExample from './FormSelectExample.svelte';

const meta = {
  title: 'Components/FormSelect',
  component: FormSelect,
  tags: ['autodocs'],
  argTypes: {
    'aria-label': {
      control: { type: 'text' },
      description: 'Aria-label. The form select requires an associated id or aria-label.'
    },
    value: {
      control: { type: 'text' },
      description: 'Value of selected option.'
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Flag indicating the FormSelect is disabled.'
    },
    isRequired: {
      control: { type: 'boolean' },
      description: 'Sets the FormSelect required.'
    },
    validated: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'default'],
      description: 'Value to indicate if the select is modified to show that validation state.'
    },
    ouiaId: {
      control: { type: 'text' },
      description: 'Value to overwrite the randomly generated data-ouia-component-id.'
    },
    ouiaSafe: {
      control: { type: 'boolean' },
      description: 'Set the value of data-ouia-safe.'
    }
  }
} satisfies Meta<FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    Component: FormSelectBasicStory,
    props: {
      'aria-label': 'FormSelect Input',
      value: 'mrs',
      ouiaId: 'BasicFormSelect'
    }
  })
};

export const Validated: Story = {
  render: () => ({
    Component: FormSelectValidatedStory,
    props: {
      'aria-label': 'FormSelect Input',
      value: '',
      validated: 'error',
      ouiaId: 'ValidatedFormSelect'
    }
  })
};

export const Disabled: Story = {
  render: () => ({
    Component: FormSelectBasicStory,
    props: {
      'aria-label': 'FormSelect Input',
      value: 'mrs',
      isDisabled: true,
      ouiaId: 'DisabledFormSelect'
    }
  })
};

export const Grouped: Story = {
  render: () => ({
    Component: FormSelectGroupedStory
  })
};

export const Required: Story = {
  render: () => ({
    Component: FormSelectBasicStory,
    props: {
      'aria-label': 'FormSelect Input',
      value: '',
      isRequired: true,
      ouiaId: 'RequiredFormSelect'
    }
  })
};

export const Success: Story = {
  render: () => ({
    Component: FormSelectBasicStory,
    props: {
      'aria-label': 'FormSelect Input',
      value: 'mrs',
      validated: 'success',
      ouiaId: 'SuccessFormSelect'
    }
  })
};

export const Warning: Story = {
  render: () => ({
    Component: FormSelectBasicStory,
    props: {
      'aria-label': 'FormSelect Input',
      value: 'mrs',
      validated: 'warning',
      ouiaId: 'WarningFormSelect'
    }
  })
};

export const Error: Story = {
  render: () => ({
    Component: FormSelectBasicStory,
    props: {
      'aria-label': 'FormSelect Input',
      value: 'mrs',
      validated: 'error',
      ouiaId: 'ErrorFormSelect'
    }
  })
};

export const Controlled: Story = {
  render: () => ({
    Component: FormSelectExample
  })
};
