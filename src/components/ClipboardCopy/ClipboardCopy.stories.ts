import type { Meta, StoryObj } from '@storybook/svelte-vite';
import ClipboardCopy from './ClipboardCopy.svelte';

const meta = {
  title: 'Components/ClipboardCopy',
  component: ClipboardCopy,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'expanded', 'inline-compact'],
      description: 'Clipboard copy variant'
    },
    children: {
      control: { type: 'text' },
      description: 'Text to copy'
    },
    isReadOnly: {
      control: { type: 'boolean' },
      description: 'Whether the input is read-only'
    },
    isExpanded: {
      control: { type: 'boolean' },
      description: 'Whether the expanded content is shown (controlled)'
    },
    isExpandedByDefault: {
      control: { type: 'boolean' },
      description: 'Whether the expanded content is shown by default (uncontrolled)'
    },
    isCode: {
      control: { type: 'boolean' },
      description: 'Whether to apply code styling'
    },
    isEditable: {
      control: { type: 'boolean' },
      description: 'Whether the expanded content is editable'
    },
    isCompact: {
      control: { type: 'boolean' },
      description: 'Whether to use compact styling'
    },
    clickTip: {
      control: { type: 'text' },
      description: 'Message to show after copying'
    },
    hoverTip: {
      control: { type: 'text' },
      description: 'Tooltip text on hover'
    },
    maxWidth: {
      control: { type: 'text' },
      description: 'Maximum width of the input'
    },
    minWidth: {
      control: { type: 'text' },
      description: 'Minimum width of the input'
    }
  }
} satisfies Meta<ClipboardCopy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'This is a basic clipboard copy component'
  }
};

export const ReadOnly: Story = {
  args: {
    children: 'This is a read-only clipboard copy component',
    isReadOnly: true
  }
};

export const Expanded: Story = {
  args: {
    variant: 'expanded',
    children:
      'This is an expanded version of the copy to clipboard component. Got a lot of text here, need to see all of it? Click that arrow on the left side and check out the resulting expansion.'
  }
};

export const ReadOnlyExpanded: Story = {
  args: {
    variant: 'expanded',
    isReadOnly: true,
    children:
      'This is a read-only expanded version of the copy to clipboard component. Got a lot of text here, need to see all of it? Click that arrow on the left side and check out the resulting expansion.'
  }
};

export const ReadOnlyExpandedByDefault: Story = {
  args: {
    variant: 'expanded',
    isReadOnly: true,
    isExpandedByDefault: true,
    children:
      'Got a lot of text here, need to see all of it? Click that arrow on the left side and check out the resulting expansion.'
  }
};

export const ExpandedWithArray: Story = {
  args: {
    variant: 'expanded',
    children: ['Line 1 of the array', 'Line 2 of the array', 'Line 3 of the array']
  }
};

export const ExpandedEditable: Story = {
  args: {
    variant: 'expanded',
    isEditable: true,
    children:
      'This is an editable version of the copy to clipboard component that has an expandable section. Got a lot of text here, need to see all of it? Click that arrow on the left side and check out the resulting expansion.'
  }
};

export const InlineCompact: Story = {
  args: {
    variant: 'inline-compact',
    children: '2.3.4-2-redhat'
  }
};

export const InlineCompactCode: Story = {
  args: {
    variant: 'inline-compact',
    isCode: true,
    children: '2.3.4-2-redhat'
  }
};

export const InlineCompactWithTruncation: Story = {
  args: {
    variant: 'inline-compact',
    truncation: true,
    children:
      'This lengthy, copyable content will be truncated with default settings when the truncation prop is simply set to true.'
  }
};

export const InlineCompactWithCustomTruncation: Story = {
  args: {
    variant: 'inline-compact',
    truncation: {
      position: 'middle',
      numChars: 30
    },
    children:
      'This lengthy, copyable content will be truncated with customized settings when the truncation prop is passed an object.'
  }
};

export const Code: Story = {
  args: {
    isCode: true,
    children: 'const example = "code snippet";'
  }
};

export const LongText: Story = {
  args: {
    variant: 'expanded',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  }
};
