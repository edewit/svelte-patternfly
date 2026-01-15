import type { Meta, StoryObj } from '@storybook/svelte-vite';
import SimpleListExample from './SimpleListExample.svelte';

const meta = {
  title: 'Components/SimpleList',
  component: SimpleListExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'uncontrolled', 'links', 'grouped', 'controlled'],
      description: 'Variant of the simple list example'
    }
  }
} satisfies Meta<SimpleListExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: 'basic'
  }
};

export const Uncontrolled: Story = {
  args: {
    variant: 'uncontrolled'
  }
};

export const WithLinks: Story = {
  args: {
    variant: 'links'
  }
};

export const Grouped: Story = {
  args: {
    variant: 'grouped'
  }
};

export const Controlled: Story = {
  args: {
    variant: 'controlled'
  }
};
