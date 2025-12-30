import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Label from './Label.svelte';
import { createRawSnippet } from 'svelte';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['grey', 'blue', 'green', 'orange', 'red', 'orangered', 'purple', 'teal', 'yellow'],
      description: 'Label color'
    },
    status: {
      control: { type: 'select' },
      options: ['success', 'warning', 'danger', 'info', 'custom'],
      description: 'Label status (overrides color)'
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined'],
      description: 'Label variant'
    },
    isCompact: {
      control: { type: 'boolean' },
      description: 'Compact label'
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Disabled label'
    },
    textMaxWidth: {
      control: { type: 'text' },
      description: 'Maximum width for text truncation'
    }
  }
} satisfies Meta<Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create text snippets
const textSnippet = (text: string) => createRawSnippet(() => ({ render: () => text }));

export const Default: Story = {
  args: {
    children: textSnippet('Grey')
  }
};

export const WithIcon: Story = {
  args: {
    icon: 'fas fa-fw fa-cube',
    children: textSnippet('Grey icon')
  }
};

export const Removable: Story = {
  args: {
    children: textSnippet('Grey removable'),
    onClose: () => console.log('Close clicked')
  }
};

export const IconRemovable: Story = {
  args: {
    icon: 'fas fa-fw fa-cube',
    children: textSnippet('Grey icon removable'),
    onClose: () => console.log('Close clicked')
  }
};

export const Link: Story = {
  args: {
    href: '#filled',
    children: textSnippet('Grey link')
  }
};

export const LinkRemovable: Story = {
  args: {
    href: '#filled',
    children: textSnippet('Grey link removable'),
    onClose: () => console.log('Close clicked')
  }
};

export const Clickable: Story = {
  args: {
    onClick: () => console.log('Label clicked'),
    children: textSnippet('Grey clickable')
  }
};

export const ClickableRemovable: Story = {
  args: {
    onClick: () => console.log('Label clicked'),
    children: textSnippet('Grey clickable removable'),
    onClose: () => console.log('Close clicked')
  }
};

export const WithTextMaxWidth: Story = {
  args: {
    icon: 'fas fa-fw fa-cube',
    children: textSnippet('Grey label with icon that overflows'),
    textMaxWidth: '16ch',
    onClose: () => console.log('Close clicked')
  }
};

export const DisabledLinkRemovable: Story = {
  args: {
    isDisabled: true,
    icon: 'fas fa-fw fa-cube',
    href: '#filled',
    children: textSnippet('Grey link removable (disabled)'),
    onClose: () => console.log('Close clicked')
  }
};

export const DisabledClickableRemovable: Story = {
  args: {
    isDisabled: true,
    icon: 'fas fa-fw fa-cube',
    onClick: () => console.log('Label clicked'),
    children: textSnippet('Grey clickable removable (disabled)'),
    onClose: () => console.log('Close clicked')
  }
};

export const Blue: Story = {
  args: {
    color: 'blue',
    children: textSnippet('Blue')
  }
};

export const Green: Story = {
  args: {
    color: 'green',
    children: textSnippet('Green')
  }
};

export const Orange: Story = {
  args: {
    color: 'orange',
    children: textSnippet('Orange')
  }
};

export const Red: Story = {
  args: {
    color: 'red',
    children: textSnippet('Red')
  }
};

export const OrangeRed: Story = {
  args: {
    color: 'orangered',
    children: textSnippet('Orange red')
  }
};

export const Purple: Story = {
  args: {
    color: 'purple',
    children: textSnippet('Purple')
  }
};

export const Teal: Story = {
  args: {
    color: 'teal',
    children: textSnippet('Teal')
  }
};

export const Yellow: Story = {
  args: {
    color: 'yellow',
    children: textSnippet('Yellow')
  }
};

export const SuccessStatus: Story = {
  args: {
    status: 'success',
    children: textSnippet('Success')
  }
};

export const WarningStatus: Story = {
  args: {
    status: 'warning',
    children: textSnippet('Warning')
  }
};

export const DangerStatus: Story = {
  args: {
    status: 'danger',
    children: textSnippet('Danger')
  }
};

export const InfoStatus: Story = {
  args: {
    status: 'info',
    children: textSnippet('Info')
  }
};

export const CustomStatus: Story = {
  args: {
    status: 'custom',
    children: textSnippet('Custom')
  }
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: textSnippet('Outlined label')
  }
};

export const OutlinedWithColor: Story = {
  args: {
    variant: 'outlined',
    color: 'blue',
    children: textSnippet('Outlined blue label')
  }
};

export const Compact: Story = {
  args: {
    isCompact: true,
    children: textSnippet('Compact label')
  }
};

