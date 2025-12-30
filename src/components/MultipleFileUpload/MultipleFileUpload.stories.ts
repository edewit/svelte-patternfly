import type { Meta, StoryObj } from '@storybook/svelte-vite';
import MultipleFileUploadExample from './MultipleFileUploadExample.svelte';

const meta = {
  title: 'Components/MultipleFileUpload',
  component: MultipleFileUploadExample,
  tags: ['autodocs'],
  argTypes: {
    isHorizontal: {
      control: { type: 'boolean' },
      description: 'Show as horizontal layout'
    }
  }
} satisfies Meta<MultipleFileUploadExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {}
};

export const Horizontal: Story = {
  args: {
    isHorizontal: true
  }
};
