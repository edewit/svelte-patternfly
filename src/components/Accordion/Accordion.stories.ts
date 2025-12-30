import type { Meta, StoryObj } from '@storybook/svelte-vite';
import AccordionExample from './AccordionExample.svelte';

const meta = {
  title: 'Components/Accordion',
  component: AccordionExample,
  tags: ['autodocs'],
  argTypes: {
    asDefinitionList: {
      control: { type: 'boolean' },
      description: 'Render as definition list (dl) instead of div'
    },
    isBordered: {
      control: { type: 'boolean' },
      description: 'Add borders between items'
    },
    displaySize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Display size variant'
    },
    toggleIconPosition: {
      control: { type: 'select' },
      options: ['start', 'end'],
      description: 'Position of toggle icon'
    },
    isMultipleExpandable: {
      control: { type: 'boolean' },
      description: 'Allow multiple items to be expanded simultaneously'
    },
    isFixed: {
      control: { type: 'boolean' },
      description: 'Use fixed height for expandable content'
    }
  }
} satisfies Meta<AccordionExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {}
};

export const DefinitionList: Story = {
  args: {
    asDefinitionList: true
  }
};

export const SingleExpand: Story = {
  args: {
    isMultipleExpandable: false
  }
};

export const MultipleExpandable: Story = {
  args: {
    isMultipleExpandable: true
  }
};

export const Bordered: Story = {
  args: {
    isBordered: true
  }
};

export const ToggleIconAtStart: Story = {
  args: {
    toggleIconPosition: 'start'
  }
};

export const Fixed: Story = {
  args: {
    isFixed: true
  }
};

export const LargeDisplay: Story = {
  args: {
    displaySize: 'lg'
  }
};
