import type { Meta, StoryObj } from '@storybook/svelte-vite';
import MenuToggle from './MenuToggle.svelte';
import { createRawSnippet } from 'svelte';

const meta = {
  title: 'Components/Menu/MenuToggle',
  component: MenuToggle,
  tags: ['autodocs'],
  argTypes: {
    isExpanded: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is expanded'
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is disabled'
    },
    isPlain: {
      control: { type: 'boolean' },
      description: 'Whether to apply plain styling'
    },
    isFullHeight: {
      control: { type: 'boolean' },
      description: 'Whether the toggle fills the height of its parent'
    },
    isFullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the toggle fills the width of its parent'
    },
    isPlaceholder: {
      control: { type: 'boolean' },
      description: 'Whether the toggle contains placeholder text'
    },
    isSettings: {
      control: { type: 'boolean' },
      description: 'Whether to show settings icon with animations'
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm'],
      description: 'Size of the toggle'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'tertiary', 'plain', 'plainText', 'typeahead'],
      description: 'Variant style of the toggle'
    },
    status: {
      control: { type: 'select' },
      options: ['default', 'warning', 'danger', 'success'],
      description: 'Status of the toggle'
    }
  }
} satisfies Meta<MenuToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create text snippets for Storybook
const textSnippet = (text: string) => createRawSnippet(() => ({ render: () => text }));

export const Collapsed: Story = {
  args: {},
  render: (args: any) => ({
    Component: MenuToggle,
    props: {
      ...args,
      children: textSnippet('Collapsed')
    }
  })
};

export const Expanded: Story = {
  args: {
    isExpanded: true
  },
  render: (args: any) => ({
    Component: MenuToggle,
    props: {
      ...args,
      children: textSnippet('Expanded')
    }
  })
};

export const Small: Story = {
  args: {
    size: 'sm'
  },
  render: (args: any) => ({
    Component: MenuToggle,
    props: {
      ...args,
      children: textSnippet('Small toggle')
    }
  })
};

export const Disabled: Story = {
  args: {
    isDisabled: true
  },
  render: (args: any) => ({
    Component: MenuToggle,
    props: {
      ...args,
      children: textSnippet('Disabled')
    }
  })
};

export const WithBadge: Story = {
  args: {
    badge: 4
  },
  render: (args: any) => ({
    Component: MenuToggle,
    props: {
      ...args,
      children: textSnippet('4 selected')
    }
  })
};

export const Primary: Story = {
  args: {
    variant: 'primary'
  },
  render: (args: any) => ({
    Component: MenuToggle,
    props: {
      ...args,
      children: textSnippet('Primary toggle')
    }
  })
};

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  },
  render: (args: any) => ({
    Component: MenuToggle,
    props: {
      ...args,
      children: textSnippet('Secondary toggle')
    }
  })
};

export const Plain: Story = {
  args: {
    variant: 'plain'
  },
  render: (args: any) => ({
    Component: MenuToggle,
    props: {
      ...args,
      children: textSnippet('Plain toggle')
    }
  })
};

export const PlainText: Story = {
  args: {
    variant: 'plainText'
  },
  render: (args: any) => ({
    Component: MenuToggle,
    props: {
      ...args,
      children: textSnippet('Plain text toggle')
    }
  })
};

export const FullWidth: Story = {
  args: {
    isFullWidth: true
  },
  render: (args: any) => ({
    Component: MenuToggle,
    props: {
      ...args,
      children: textSnippet('Full width toggle')
    }
  })
};

export const Placeholder: Story = {
  args: {
    isPlaceholder: true
  },
  render: (args: any) => ({
    Component: MenuToggle,
    props: {
      ...args,
      children: textSnippet('Placeholder text')
    }
  })
};

