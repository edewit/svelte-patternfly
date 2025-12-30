import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Badge from './Badge.svelte';
import { createRawSnippet } from 'svelte';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['read', 'unread', 'disabled'],
      description: 'Badge variant style'
    }
  }
} satisfies Meta<Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create text snippets for Storybook
const textSnippet = (text: string | number) =>
  createRawSnippet(() => ({ render: () => String(text) }));

export const Read: Story = {
  args: {
    variant: 'read'
  },
  render: (args: any) => ({
    Component: Badge,
    props: {
      ...args,
      children: textSnippet('7')
    }
  })
};

export const ReadLarge: Story = {
  args: {
    variant: 'read'
  },
  render: (args: any) => ({
    Component: Badge,
    props: {
      ...args,
      children: textSnippet('24')
    }
  })
};

export const ReadVeryLarge: Story = {
  args: {
    variant: 'read'
  },
  render: (args: any) => ({
    Component: Badge,
    props: {
      ...args,
      children: textSnippet('240')
    }
  })
};

export const ReadOverflow: Story = {
  args: {
    variant: 'read'
  },
  render: (args: any) => ({
    Component: Badge,
    props: {
      ...args,
      children: textSnippet('999+')
    }
  })
};

export const Unread: Story = {
  args: {
    variant: 'unread'
  },
  render: (args: any) => ({
    Component: Badge,
    props: {
      ...args,
      children: textSnippet('7')
    }
  })
};

export const UnreadLarge: Story = {
  args: {
    variant: 'unread'
  },
  render: (args: any) => ({
    Component: Badge,
    props: {
      ...args,
      children: textSnippet('24')
    }
  })
};

export const UnreadVeryLarge: Story = {
  args: {
    variant: 'unread'
  },
  render: (args: any) => ({
    Component: Badge,
    props: {
      ...args,
      children: textSnippet('240')
    }
  })
};

export const UnreadOverflow: Story = {
  args: {
    variant: 'unread'
  },
  render: (args: any) => ({
    Component: Badge,
    props: {
      ...args,
      children: textSnippet('999+')
    }
  })
};

export const Disabled: Story = {
  args: {
    variant: 'disabled'
  },
  render: (args: any) => ({
    Component: Badge,
    props: {
      ...args,
      children: textSnippet('7')
    }
  })
};

export const DisabledLarge: Story = {
  args: {
    variant: 'disabled'
  },
  render: (args: any) => ({
    Component: Badge,
    props: {
      ...args,
      children: textSnippet('24')
    }
  })
};

export const DisabledVeryLarge: Story = {
  args: {
    variant: 'disabled'
  },
  render: (args: any) => ({
    Component: Badge,
    props: {
      ...args,
      children: textSnippet('240')
    }
  })
};

export const DisabledOverflow: Story = {
  args: {
    variant: 'disabled'
  },
  render: (args: any) => ({
    Component: Badge,
    props: {
      ...args,
      children: textSnippet('999+')
    }
  })
};
