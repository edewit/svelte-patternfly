import type { Meta, StoryObj } from '@storybook/svelte-vite';
import PaginationExample from './PaginationExample.svelte';
import PaginationBottomExample from './PaginationBottomExample.svelte';
import PaginationIndeterminateExample from './PaginationIndeterminateExample.svelte';
import PaginationCompactExample from './PaginationCompactExample.svelte';
import PaginationOffsetExample from './PaginationOffsetExample.svelte';
import Pagination from './Pagination.svelte';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    itemCount: {
      control: { type: 'number' },
      description: 'Total number of items'
    },
    perPage: {
      control: { type: 'number' },
      description: 'Number of items per page'
    },
    page: {
      control: { type: 'number' },
      description: 'Current page number'
    },
    isCompact: {
      control: { type: 'boolean' },
      description: 'Whether pagination is compact'
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Whether pagination is disabled'
    },
    isStatic: {
      control: { type: 'boolean' },
      description: 'Whether to show static pagination (no per-page selector)'
    },
    isSticky: {
      control: { type: 'boolean' },
      description: 'Whether pagination is sticky'
    },
    variant: {
      control: { type: 'select' },
      options: ['top', 'bottom'],
      description: 'Pagination variant'
    },
    widgetId: {
      control: { type: 'text' },
      description: 'Unique ID for the pagination widget'
    }
  }
} satisfies Meta<Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  render: () => ({
    Component: PaginationExample
  })
};

export const Bottom: Story = {
  render: () => ({
    Component: PaginationBottomExample
  })
};

export const Indeterminate: Story = {
  render: () => ({
    Component: PaginationIndeterminateExample
  })
};

export const Disabled: Story = {
  render: () => ({
    Component: Pagination,
    props: {
      itemCount: 523,
      perPage: 20,
      page: 1,
      widgetId: 'disabled-example',
      isDisabled: true
    }
  })
};

export const NoItems: Story = {
  render: () => ({
    Component: Pagination,
    props: {
      itemCount: 0,
      perPage: 20,
      page: 1,
      widgetId: 'no-items-example'
    }
  })
};

export const OnePage: Story = {
  render: () => ({
    Component: Pagination,
    props: {
      itemCount: 15,
      perPage: 20,
      page: 1,
      widgetId: 'one-page-example'
    }
  })
};

export const Compact: Story = {
  render: () => ({
    Component: PaginationCompactExample
  })
};

export const Offset: Story = {
  render: () => ({
    Component: PaginationOffsetExample
  })
};

