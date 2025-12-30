import type { Meta, StoryObj } from '@storybook/svelte-vite';
import TextArea from './TextArea.svelte';
import { createRawSnippet } from 'svelte';
import TextAreaExample from './TextAreaExample.svelte';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    'aria-label': {
      control: { type: 'text' },
      description: 'Aria-label. The text area requires an associated id or aria-label.'
    },
    value: {
      control: { type: 'text' },
      description: 'Value of the text area.'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder of the text area when there is no value'
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Flag to show if the text area is disabled.'
    },
    isRequired: {
      control: { type: 'boolean' },
      description: 'Flag indicating whether the text area is required'
    },
    validated: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'default'],
      description: 'Value to indicate if the text area is modified to show that validation state.'
    },
    readOnlyVariant: {
      control: { type: 'select' },
      options: ['plain', 'default'],
      description: 'Sets the text area as readonly and determines the readonly styling.'
    },
    resizeOrientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical', 'both', 'none'],
      description: 'Sets the orientation to limit the resize to.'
    },
    autoResize: {
      control: { type: 'boolean' },
      description: 'Flag to modify height based on contents.'
    }
  }
} satisfies Meta<TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    'aria-label': 'text area example',
    value: ''
  }
};

export const WithValue: Story = {
  args: {
    'aria-label': 'text area with value',
    value: 'Sample text'
  }
};

export const Invalid: Story = {
  args: {
    'aria-label': 'invalid text area example',
    value: '',
    isRequired: true,
    validated: 'error'
  }
};

export const Validated: Story = {
  args: {
    'aria-label': 'validated text area',
    value: 'Valid content',
    validated: 'success'
  }
};

export const Warning: Story = {
  args: {
    'aria-label': 'warning text area',
    value: 'Warning content',
    validated: 'warning'
  }
};

export const VerticallyResizable: Story = {
  args: {
    'aria-label': 'vertically resizable text area',
    value: 'This text area can only be resized vertically',
    resizeOrientation: 'vertical'
  }
};

export const HorizontallyResizable: Story = {
  args: {
    'aria-label': 'horizontally resizable text area',
    value: 'This text area can only be resized horizontally',
    resizeOrientation: 'horizontal'
  }
};

export const NotResizable: Story = {
  args: {
    'aria-label': 'not resizable text area',
    value: 'This text area cannot be resized',
    resizeOrientation: 'none'
  }
};

export const Disabled: Story = {
  args: {
    'aria-label': 'disabled text area',
    value: 'Disabled text area',
    isDisabled: true
  }
};

export const ReadOnly: Story = {
  args: {
    'aria-label': 'read only text area',
    value: 'Read only text area example',
    readOnlyVariant: 'default'
  }
};

export const ReadOnlyPlain: Story = {
  args: {
    'aria-label': 'read only plain text area',
    value: 'Plain read only variant',
    readOnlyVariant: 'plain'
  }
};

export const AutoResizing: Story = {
  args: {
    'aria-label': 'auto resizing text area',
    value: 'This text area will automatically resize based on its contents.',
    autoResize: true
  }
};

export const WithPlaceholder: Story = {
  args: {
    'aria-label': 'text area with placeholder',
    placeholder: 'Enter your comments here...'
  }
};

export const Required: Story = {
  args: {
    'aria-label': 'required text area',
    isRequired: true
  }
};

export const CustomIcon: Story = {
  args: {
    'aria-label': 'text area with custom icon',
    value: 'With custom icon',
    customIcon: createRawSnippet(() => ({
      render: () => '<i class="fas fa-user" aria-hidden="true"></i>'
    }))
  }
};

export const CustomIconAndInvalid: Story = {
  args: {
    'aria-label': 'text area with custom icon and invalid',
    value: 'Invalid with custom icon',
    validated: 'error',
    customIcon: createRawSnippet(() => ({
      render: () => '<i class="fas fa-user" aria-hidden="true"></i>'
    }))
  }
};

export const Controlled: Story = {
  render: () => ({
    Component: TextAreaExample
  })
};
