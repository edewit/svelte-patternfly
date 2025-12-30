import type { Meta, StoryObj } from '@storybook/svelte-vite';
import DescriptionListExample from './DescriptionListExample.svelte';

const meta = {
  title: 'Components/DescriptionList',
  component: DescriptionListExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['horizontal-two-col', 'default', 'compact', 'compact-horizontal', 'term-help-text'],
      description: 'Variant of the description list example'
    }
  }
} satisfies Meta<DescriptionListExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalTwoCol: Story = {
  args: {
    variant: 'horizontal-two-col'
  }
};

export const Default: Story = {
  args: {
    variant: 'default'
  }
};

export const Compact: Story = {
  args: {
    variant: 'compact'
  }
};

export const CompactHorizontal: Story = {
  args: {
    variant: 'compact-horizontal'
  }
};

export const TermHelpText: Story = {
  args: {
    variant: 'term-help-text'
  }
};
