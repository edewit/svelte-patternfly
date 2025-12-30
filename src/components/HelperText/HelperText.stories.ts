import type { Meta, StoryObj } from '@storybook/svelte-vite';
import HelperText from './HelperText.svelte';
import HelperTextItem from './HelperTextItem.svelte';
import { createRawSnippet } from 'svelte';

const meta = {
  title: 'Components/HelperText',
  component: HelperText,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional classes added to the helper text'
    }
  }
} satisfies Meta<HelperText>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create text snippets for Storybook
const textSnippet = (text: string) => createRawSnippet(() => ({ render: () => text }));

export const Basic: Story = {
  render: () => ({
    Component: HelperText,
    props: {
      children: createRawSnippet(() => ({
        render: () => `
          <HelperTextItem>This is helper text</HelperTextItem>
        `
      }))
    }
  })
};

export const Default: Story = {
  render: () => ({
    Component: HelperText,
    props: {
      children: createRawSnippet(() => ({
        render: () => `
          <HelperTextItem variant="default">Default helper text</HelperTextItem>
        `
      }))
    }
  })
};

export const Success: Story = {
  render: () => ({
    Component: HelperText,
    props: {
      children: createRawSnippet(() => ({
        render: () => `
          <HelperTextItem variant="success">Success helper text</HelperTextItem>
        `
      }))
    }
  })
};

export const Warning: Story = {
  render: () => ({
    Component: HelperText,
    props: {
      children: createRawSnippet(() => ({
        render: () => `
          <HelperTextItem variant="warning">Warning helper text</HelperTextItem>
        `
      }))
    }
  })
};

export const Error: Story = {
  render: () => ({
    Component: HelperText,
    props: {
      children: createRawSnippet(() => ({
        render: () => `
          <HelperTextItem variant="error">Error helper text</HelperTextItem>
        `
      }))
    }
  })
};

export const MultipleItems: Story = {
  render: () => ({
    Component: HelperText,
    props: {
      children: createRawSnippet(() => ({
        render: () => `
          <HelperTextItem>First helper text item</HelperTextItem>
          <HelperTextItem variant="success">Second helper text item</HelperTextItem>
          <HelperTextItem variant="warning">Third helper text item</HelperTextItem>
        `
      }))
    }
  })
};

export const Dynamic: Story = {
  render: () => ({
    Component: HelperText,
    props: {
      children: createRawSnippet(() => ({
        render: () => `
          <HelperTextItem isDynamic>Dynamic helper text</HelperTextItem>
        `
      }))
    }
  })
};
