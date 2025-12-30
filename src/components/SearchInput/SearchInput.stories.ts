import type { Meta, StoryObj } from '@storybook/svelte';
import SearchInputBasicExample from './SearchInputBasicExample.svelte';
import SearchInputWithResultCountExample from './SearchInputWithResultCountExample.svelte';
import SearchInputDisabledExample from './SearchInputDisabledExample.svelte';

const meta: Meta = {
  title: 'Components/SearchInput',
  component: SearchInputBasicExample,
  parameters: {
    docs: {
      description: {
        component:
          'A search input is a type of input field that can be used to search, find, or filter.'
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Value of the search input.'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input.'
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the search input.'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Flag indicating if the search input is disabled.',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    resultsCount: {
      control: 'text',
      description: 'The number of results returned.'
    },
    class: {
      control: 'text',
      description: 'Additional classes applied to the search input container.'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    Component: SearchInputBasicExample
  }),
  parameters: {
    docs: {
      description: {
        story: 'A basic search input with placeholder and clear button.'
      }
    }
  }
};

export const WithResultCount: Story = {
  render: () => ({
    Component: SearchInputWithResultCountExample
  }),
  parameters: {
    docs: {
      description: {
        story: 'Search input with a badge showing the number of results found.'
      }
    }
  }
};

export const Disabled: Story = {
  render: () => ({
    Component: SearchInputDisabledExample
  }),
  parameters: {
    docs: {
      description: {
        story: 'A disabled search input.'
      }
    }
  }
};

