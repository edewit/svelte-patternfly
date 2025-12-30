import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Card from './Card.svelte';
import { createRawSnippet } from 'svelte';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: { type: 'text' },
      description: 'ID attribute for the card'
    },
    title: {
      control: { type: 'text' },
      description: 'Card title text'
    }
  }
} satisfies Meta<Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create text snippets for Storybook
const textSnippet = (text: string) => createRawSnippet(() => ({ render: () => text }));

export const Basic: Story = {
  args: {
    id: 'card-basic-example',
    title: 'Title',
    children: textSnippet('Body'),
    footerSlot: textSnippet('Footer')
  }
};

export const WithTitleSlot: Story = {
  args: {
    id: 'card-title-slot-example',
    titleSlot: textSnippet('Custom Title'),
    children: textSnippet('Body'),
    footerSlot: textSnippet('Footer')
  }
};

export const WithBodySlot: Story = {
  args: {
    id: 'card-body-slot-example',
    title: 'Title',
    bodySlot: textSnippet('Custom Body Content'),
    footerSlot: textSnippet('Footer')
  }
};

export const WithFooterSlot: Story = {
  args: {
    id: 'card-footer-slot-example',
    title: 'Title',
    children: textSnippet('Body'),
    footerSlot: textSnippet('Custom Footer')
  }
};

export const NoTitle: Story = {
  args: {
    id: 'card-no-title-example',
    children: textSnippet('This card has no title'),
    footerSlot: textSnippet('Footer')
  }
};

export const NoFooter: Story = {
  args: {
    id: 'card-no-footer-example',
    title: 'Title',
    children: textSnippet('This card has no footer')
  }
};

export const OnlyBody: Story = {
  args: {
    id: 'card-only-body-example',
    children: textSnippet('Body')
  }
};

export const OnlyTitle: Story = {
  args: {
    id: 'card-only-title-example',
    title: 'Title'
  }
};

export const SelectableSecondary: Story = {
  args: {
    id: 'card-selectable-secondary-example',
    variant: 'secondary',
    isSelectable: true,
    title: 'Title',
    children: textSnippet('Body'),
    footerSlot: textSnippet('Footer')
  }
};

export const SelectableSecondaryDisabled: Story = {
  args: {
    id: 'card-selectable-secondary-example-disabled',
    variant: 'secondary',
    isSelectable: true,
    isDisabled: true,
    title: 'Disabled card',
    children: textSnippet('Body'),
    footerSlot: textSnippet('Footer')
  }
};

export const SelectableSecondarySelectedDisabled: Story = {
  args: {
    id: 'card-selectable-secondary-example-selected-disabled',
    variant: 'secondary',
    isSelectable: true,
    isSelected: true,
    isDisabled: true,
    title: 'Selected but disabled card',
    children: textSnippet('Body'),
    footerSlot: textSnippet('Footer')
  }
};

export const SingleSelectable: Story = {
  args: {
    id: 'card-single-selectable-example',
    isSelectable: true,
    selectType: 'radio',
    radioName: 'card-group',
    title: 'Title',
    children: textSnippet('Body'),
    footerSlot: textSnippet('Footer')
  }
};

export const SingleSelectableSecondary: Story = {
  args: {
    id: 'card-single-selectable-secondary-example',
    variant: 'secondary',
    isSelectable: true,
    selectType: 'radio',
    radioName: 'card-group',
    title: 'Title',
    children: textSnippet('Body'),
    footerSlot: textSnippet('Footer')
  }
};

export const SingleSelectableSelected: Story = {
  args: {
    id: 'card-single-selectable-selected-example',
    isSelectable: true,
    selectType: 'radio',
    radioName: 'card-group',
    isSelected: true,
    title: 'Selected card',
    children: textSnippet('Body'),
    footerSlot: textSnippet('Footer')
  }
};

export const SingleSelectableDisabled: Story = {
  args: {
    id: 'card-single-selectable-disabled-example',
    isSelectable: true,
    selectType: 'radio',
    radioName: 'card-group',
    isDisabled: true,
    title: 'Disabled card',
    children: textSnippet('Body'),
    footerSlot: textSnippet('Footer')
  }
};

export const SingleSelectableSelectedDisabled: Story = {
  args: {
    id: 'card-single-selectable-selected-disabled-example',
    isSelectable: true,
    selectType: 'radio',
    radioName: 'card-group',
    isSelected: true,
    isDisabled: true,
    title: 'Selected but disabled card',
    children: textSnippet('Body'),
    footerSlot: textSnippet('Footer')
  }
};
