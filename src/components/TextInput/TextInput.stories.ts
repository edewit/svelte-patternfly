import type { Meta, StoryObj } from '@storybook/svelte-vite';
import TextInput from './TextInput.svelte';
import { createRawSnippet } from 'svelte';
import TextInputExample from './TextInputExample.svelte';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    'aria-label': {
      control: { type: 'text' },
      description: 'Aria-label. The text input requires an associated id or aria-label.'
    },
    type: {
      control: { type: 'select' },
      options: [
        'text',
        'date',
        'datetime-local',
        'email',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'time',
        'url'
      ],
      description: 'Type that the text input accepts.'
    },
    value: {
      control: { type: 'text' },
      description: 'Value of the text input.'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder of the text input when there is no value'
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Flag to show if the text input is disabled.'
    },
    isRequired: {
      control: { type: 'boolean' },
      description: 'Flag indicating whether the input is required'
    },
    isStartTruncated: {
      control: { type: 'boolean' },
      description: 'Trim text at start'
    },
    validated: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'default'],
      description: 'Value to indicate if the text input is modified to show that validation state.'
    },
    readOnlyVariant: {
      control: { type: 'select' },
      options: ['plain', 'default'],
      description: 'Sets the input as readonly and determines the readonly styling.'
    }
  }
} satisfies Meta<TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    'aria-label': 'text input example',
    type: 'text',
    value: ''
  }
};

export const WithValue: Story = {
  args: {
    'aria-label': 'text input with value',
    type: 'text',
    value: 'Sample text'
  }
};

export const Disabled: Story = {
  args: {
    'aria-label': 'disabled text input',
    type: 'text',
    value: 'Disabled input',
    isDisabled: true
  }
};

export const WithPlaceholder: Story = {
  args: {
    'aria-label': 'text input with placeholder',
    type: 'text',
    placeholder: 'Enter text here'
  }
};

export const Required: Story = {
  args: {
    'aria-label': 'required text input',
    type: 'text',
    isRequired: true
  }
};

export const Invalid: Story = {
  args: {
    'aria-label': 'invalid text input',
    type: 'text',
    value: 'Invalid value',
    validated: 'error'
  }
};

export const Success: Story = {
  args: {
    'aria-label': 'success text input',
    type: 'text',
    value: 'Valid value',
    validated: 'success'
  }
};

export const Warning: Story = {
  args: {
    'aria-label': 'warning text input',
    type: 'text',
    value: 'Warning value',
    validated: 'warning'
  }
};

export const ReadOnly: Story = {
  args: {
    'aria-label': 'read only text input',
    type: 'text',
    value: 'Read only value',
    readOnlyVariant: 'default'
  }
};

export const ReadOnlyPlain: Story = {
  args: {
    'aria-label': 'read only plain text input',
    type: 'text',
    value: 'Read only plain value',
    readOnlyVariant: 'plain'
  }
};

export const StartTruncated: Story = {
  args: {
    'aria-label': 'truncated text input',
    type: 'text',
    value: 'This is a very long text that will be truncated at the start',
    isStartTruncated: true
  }
};

export const Password: Story = {
  args: {
    'aria-label': 'password input',
    type: 'password',
    placeholder: 'Enter password'
  }
};

export const Email: Story = {
  args: {
    'aria-label': 'email input',
    type: 'email',
    placeholder: 'Enter email'
  }
};

export const Number: Story = {
  args: {
    'aria-label': 'number input',
    type: 'number',
    placeholder: 'Enter number'
  }
};

export const Search: Story = {
  args: {
    'aria-label': 'search input',
    type: 'search',
    placeholder: 'Search...'
  }
};

export const CustomIcon: Story = {
  args: {
    'aria-label': 'text input with custom icon',
    type: 'text',
    value: 'With custom icon',
    customIcon: createRawSnippet(() => ({
      render: () => '<i class="fas fa-user" aria-hidden="true"></i>'
    }))
  }
};

export const CustomIconAndInvalid: Story = {
  args: {
    'aria-label': 'text input with custom icon and invalid',
    type: 'text',
    value: 'Invalid with custom icon',
    validated: 'error',
    customIcon: createRawSnippet(() => ({
      render: () => '<i class="fas fa-user" aria-hidden="true"></i>'
    }))
  }
};

export const Controlled: Story = {
  render: () => ({
    Component: TextInputExample
  })
};
