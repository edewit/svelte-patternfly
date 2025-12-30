import type { Meta, StoryObj } from '@storybook/svelte-vite';
import ExpandableSectionExample from './ExpandableSectionExample.svelte';

const meta = {
  title: 'Components/ExpandableSection',
  component: ExpandableSectionExample,
  tags: ['autodocs'],
  argTypes: {
    toggleText: {
      control: { type: 'text' },
      description: 'Text displayed on the toggle button'
    },
    isExpanded: {
      control: { type: 'boolean' },
      description: 'Whether the section is expanded'
    },
    displaySize: {
      control: { type: 'select' },
      options: ['default', 'lg'],
      description: 'Display size variant. Set to "lg" for disclosure styling.'
    },
    isIndented: {
      control: { type: 'boolean' },
      description: 'Indent the expandable content'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'truncate'],
      description: 'Variant style. Use "truncate" for truncate expansion.'
    },
    direction: {
      control: { type: 'select' },
      options: ['up', 'down'],
      description: 'Direction of the expandable animation when isDetached is true'
    }
  }
} satisfies Meta<ExpandableSectionExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    toggleText: 'Show more basic example content'
  }
};

export const Uncontrolled: Story = {
  args: {
    toggleText: 'Show more uncontrolled example content'
  }
};

export const UncontrolledWithDynamicToggleText: Story = {
  args: {
    toggleText: 'Show more uncontrolled dynamic toggle example content'
  }
};

export const DisclosureVariation: Story = {
  args: {
    toggleText: 'Show more disclosure variation example content',
    displaySize: 'lg'
  }
};

export const IndentedExpandableContent: Story = {
  args: {
    toggleText: 'Show less indented example content',
    isExpanded: true,
    isIndented: true,
    displaySize: 'lg'
  }
};

export const TruncateExpansion: Story = {
  args: {
    toggleText: 'Show more truncated content',
    variant: 'truncate'
  }
};
