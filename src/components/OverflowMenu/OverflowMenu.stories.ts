import type { Meta, StoryObj } from '@storybook/svelte-vite';
import OverflowMenuSimpleExample from './OverflowMenuSimpleExample.svelte';
import OverflowMenuGroupTypesExample from './OverflowMenuGroupTypesExample.svelte';
import OverflowMenuMultipleGroupsExample from './OverflowMenuMultipleGroupsExample.svelte';
import OverflowMenuPersistentExample from './OverflowMenuPersistentExample.svelte';
import OverflowMenuExample from './OverflowMenuExample.svelte';

const meta = {
  title: 'Components/Menu/OverflowMenu',
  tags: ['autodocs']
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  render: () => ({
    Component: OverflowMenuSimpleExample
  })
};

export const GroupTypes: Story = {
  render: () => ({
    Component: OverflowMenuGroupTypesExample
  })
};

export const MultipleGroups: Story = {
  render: () => ({
    Component: OverflowMenuMultipleGroupsExample
  })
};

export const Persistent: Story = {
  render: () => ({
    Component: OverflowMenuPersistentExample
  })
};

export const BreakpointOnContainer: Story = {
  render: () => ({
    Component: OverflowMenuExample
  })
};

