import type { Meta, StoryObj } from '@storybook/svelte-vite';
import NavExample from './NavExample.svelte';
import NavGroupedExample from './NavGroupedExample.svelte';
import NavExpandableExample from './NavExpandableExample.svelte';
import NavHorizontalExample from './NavHorizontalExample.svelte';
import NavHorizontalSubnavExample from './NavHorizontalSubnavExample.svelte';
import NavHorizontalScrollableExample from './NavHorizontalScrollableExample.svelte';
import NavHorizontalSubnavScrollableExample from './NavHorizontalSubnavScrollableExample.svelte';
import NavFlyoutExample from './NavFlyoutExample.svelte';

const meta = {
  title: 'Components/Navigation',
  component: NavExample,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<NavExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const Grouped: Story = {
  render: () => ({
    Component: NavGroupedExample
  })
};

export const Expandable: Story = {
  render: () => ({
    Component: NavExpandableExample
  })
};

export const Horizontal: Story = {
  render: () => ({
    Component: NavHorizontalExample
  })
};

export const HorizontalSubnav: Story = {
  render: () => ({
    Component: NavHorizontalSubnavExample
  })
};

export const HorizontalScrollable: Story = {
  render: () => ({
    Component: NavHorizontalScrollableExample
  })
};

export const HorizontalSubnavScrollable: Story = {
  render: () => ({
    Component: NavHorizontalSubnavScrollableExample
  })
};

export const Flyout: Story = {
  render: () => ({
    Component: NavFlyoutExample
  })
};

