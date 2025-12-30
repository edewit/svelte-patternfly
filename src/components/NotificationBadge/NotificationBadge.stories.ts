import type { Meta, StoryObj } from '@storybook/svelte-vite';
import NotificationBadge from './NotificationBadge.svelte';
import NotificationBadgeBasic from './NotificationBadgeBasic.svelte';
import NotificationBadgeWithAnimation from './NotificationBadgeWithAnimation.svelte';

const meta = {
  title: 'Components/NotificationBadge',
  component: NotificationBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['read', 'unread', 'attention'],
      description: 'Determines the variant of the notification badge.'
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Adds an accessible label to the notification badge.'
    },
    isExpanded: {
      control: { type: 'boolean' },
      description:
        'Flag for applying expanded styling and setting the aria-expanded attribute on the notification badge.'
    },
    count: {
      control: { type: 'number' },
      description: 'A number displayed in the badge alongside the icon.'
    },
    shouldNotify: {
      control: { type: 'boolean' },
      description:
        'Flag indicating whether the notification badge animation should be triggered. Each time this prop is true, the animation will be triggered a single time.'
    },
    onClick: {
      action: 'clicked',
      description: 'Callback for when the notification badge is clicked.'
    },
    onAnimationEnd: {
      action: 'animationEnd',
      description: 'Callback for when the animation of the notification badge icon ends.'
    }
  }
} satisfies Meta<NotificationBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    Component: NotificationBadgeBasic
  })
};

export const Read: Story = {
  args: {
    variant: 'read',
    'aria-label': 'Notification badge with read variant',
    isExpanded: false
  }
};

export const Unread: Story = {
  args: {
    variant: 'unread',
    'aria-label': 'Notification badge with unread variant',
    isExpanded: false
  }
};

export const Attention: Story = {
  args: {
    variant: 'attention',
    'aria-label': 'Notification badge with attention variant',
    isExpanded: false
  }
};

export const WithCount: Story = {
  args: {
    variant: 'read',
    count: 10,
    'aria-label': 'Notification badge with count and read variant',
    isExpanded: false
  }
};

export const WithCountUnread: Story = {
  args: {
    variant: 'unread',
    count: 10,
    'aria-label': 'Notification badge with count and unread variant',
    isExpanded: false
  }
};

export const WithCountAttention: Story = {
  args: {
    variant: 'attention',
    count: 10,
    'aria-label': 'Notification badge with count and attention variant',
    isExpanded: false
  }
};

export const Expanded: Story = {
  args: {
    variant: 'unread',
    isExpanded: true,
    'aria-label': 'Expanded notification badge'
  }
};

export const WithAnimation: Story = {
  render: () => ({
    Component: NotificationBadgeWithAnimation
  })
};

