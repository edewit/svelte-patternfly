import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Button from './Button.svelte';
import { createRawSnippet } from 'svelte';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'tertiary',
        'danger',
        'warning',
        'link',
        'plain',
        'control',
        'stateful'
      ],
      description: 'Button variant style'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size'
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled'
    },
    isDanger: {
      control: { type: 'boolean' },
      description: 'Whether the button has danger styling'
    },
    isBlock: {
      control: { type: 'boolean' },
      description: 'Whether the button spans full width'
    },
    isInline: {
      control: { type: 'boolean' },
      description: 'Whether the button is inline (for link variant)'
    },
    isAriaDisabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is aria-disabled (for links)'
    },
    component: {
      control: { type: 'select' },
      options: ['button', 'a', 'span'],
      description: 'HTML element to render'
    },
    href: {
      control: { type: 'text' },
      description: 'URL for link buttons'
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Button type (for button elements)'
    },
    inProgress: {
      control: { type: 'boolean' },
      description: 'Whether to show progress indicator'
    },
    statefulState: {
      control: { type: 'select' },
      options: ['read', 'unread', 'attention'],
      description: 'State for stateful variant'
    },
    count: {
      control: { type: 'number' },
      description: 'Count badge to display'
    }
  }
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create text snippets for Storybook
const textSnippet = (text: string) => createRawSnippet(() => ({ render: () => text }));

export const Primary: Story = {
  args: {},
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Primary button')
    }
  })
};

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Secondary button')
    }
  })
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Tertiary button')
    }
  })
};

export const Danger: Story = {
  args: {
    variant: 'danger'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Danger button')
    }
  })
};

export const Warning: Story = {
  args: {
    variant: 'warning'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Warning button')
    }
  })
};

export const Link: Story = {
  args: {
    variant: 'link'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Link button')
    }
  })
};

export const Plain: Story = {
  args: {
    variant: 'plain'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Plain button')
    }
  })
};

export const Control: Story = {
  args: {
    variant: 'control'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Control button')
    }
  })
};

export const Stateful: Story = {
  args: {
    variant: 'stateful',
    statefulState: 'unread'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Stateful button')
    }
  })
};

export const Small: Story = {
  args: {
    size: 'sm'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Small button')
    }
  })
};

export const Large: Story = {
  args: {
    size: 'lg'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Large (CTA) button')
    }
  })
};

export const Disabled: Story = {
  args: {
    isDisabled: true
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Disabled button')
    }
  })
};

export const AriaDisabled: Story = {
  args: {
    isAriaDisabled: true
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Aria-disabled button')
    }
  })
};

export const Block: Story = {
  args: {
    isBlock: true
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Block level button')
    }
  })
};

export const InProgress: Story = {
  args: {
    inProgress: true
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Loading button')
    }
  })
};

export const WithCount: Story = {
  args: {
    count: 5
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Button with count')
    }
  })
};

export const AsLink: Story = {
  args: {
    component: 'a',
    href: 'https://patternfly.org'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Link to PatternFly')
    }
  })
};

export const InlineLink: Story = {
  args: {
    variant: 'link',
    component: 'span',
    isInline: true
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Inline link button')
    }
  })
};

export const DangerSecondary: Story = {
  args: {
    variant: 'secondary',
    isDanger: true
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Danger secondary button')
    }
  })
};

export const StatefulRead: Story = {
  args: {
    variant: 'stateful',
    statefulState: 'read'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Stateful read')
    }
  })
};

export const StatefulUnread: Story = {
  args: {
    variant: 'stateful',
    statefulState: 'unread'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Stateful unread')
    }
  })
};

export const StatefulAttention: Story = {
  args: {
    variant: 'stateful',
    statefulState: 'attention'
  },
  render: (args: any) => ({
    Component: Button,
    props: {
      ...args,
      children: textSnippet('Stateful attention')
    }
  })
};
