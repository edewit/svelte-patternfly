import type { Meta, StoryObj } from '@storybook/svelte-vite';
import OptionsMenuExample from './OptionsMenuExample.svelte';

const meta = {
  title: 'Components/Menu/OptionsMenu',
  component: OptionsMenuExample,
  tags: ['autodocs']
} satisfies Meta<typeof OptionsMenuExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    Component: OptionsMenuExample
  })
};

export const WithSelectedOption: Story = {
  render: () => ({
    Component: OptionsMenuExample,
    props: {
      selected: '0'
    }
  })
};

export const WithGroupSelected: Story = {
  render: () => ({
    Component: OptionsMenuExample,
    props: {
      selected: '2'
    }
  })
};

export const Open: Story = {
  render: () => ({
    Component: OptionsMenuExample,
    props: {
      isOpen: true
    }
  })
};

