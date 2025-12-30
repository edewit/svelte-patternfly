import type { Meta, StoryObj } from '@storybook/svelte-vite';
import DropdownExample from './DropdownExample.svelte';

const meta = {
  title: 'Components/Menu/Dropdown',
  component: DropdownExample,
  tags: ['autodocs']
} satisfies Meta<DropdownExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
