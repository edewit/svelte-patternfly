import type { Meta, StoryObj } from '@storybook/svelte-vite';
import ModalExample from './ModalExample.svelte';

const meta = {
  title: 'Components/Modal',
  component: ModalExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'basic',
        'small',
        'medium',
        'large',
        'custom-width',
        'top-aligned',
        'no-header-footer',
        'title-icon',
        'custom-title-icon',
        'scrollable'
      ],
      description: 'Modal variant/style'
    },
    isOpen: {
      control: { type: 'boolean' },
      description: 'Whether the modal is open'
    }
  }
} satisfies Meta<typeof ModalExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    Component: ModalExample,
    props: {
      variant: 'basic'
    }
  })
};

export const Small: Story = {
  render: () => ({
    Component: ModalExample,
    props: {
      variant: 'small'
    }
  })
};

export const Medium: Story = {
  render: () => ({
    Component: ModalExample,
    props: {
      variant: 'medium'
    }
  })
};

export const Large: Story = {
  render: () => ({
    Component: ModalExample,
    props: {
      variant: 'large'
    }
  })
};

export const CustomWidth: Story = {
  render: () => ({
    Component: ModalExample,
    props: {
      variant: 'custom-width'
    }
  })
};

export const TopAligned: Story = {
  render: () => ({
    Component: ModalExample,
    props: {
      variant: 'top-aligned'
    }
  })
};

export const NoHeaderFooter: Story = {
  render: () => ({
    Component: ModalExample,
    props: {
      variant: 'no-header-footer'
    }
  })
};

export const TitleIcon: Story = {
  render: () => ({
    Component: ModalExample,
    props: {
      variant: 'title-icon'
    }
  })
};

export const CustomTitleIcon: Story = {
  render: () => ({
    Component: ModalExample,
    props: {
      variant: 'custom-title-icon'
    }
  })
};

export const Scrollable: Story = {
  render: () => ({
    Component: ModalExample,
    props: {
      variant: 'scrollable'
    }
  })
};

export const Open: Story = {
  render: () => ({
    Component: ModalExample,
    props: {
      variant: 'basic',
      isOpen: true
    }
  })
};

