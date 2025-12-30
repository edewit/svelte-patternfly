import type { Meta, StoryObj } from '@storybook/svelte-vite';
import NotificationDrawerBasicExample from './NotificationDrawerBasicExample.svelte';

const meta = {
  title: 'Components/NotificationDrawer',
  component: NotificationDrawerBasicExample,
  tags: ['autodocs']
} satisfies Meta<NotificationDrawerBasicExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

