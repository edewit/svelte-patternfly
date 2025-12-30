import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Panel from './Panel.svelte';
import PanelBasicExample from './PanelBasicExample.svelte';
import PanelHeaderExample from './PanelHeaderExample.svelte';
import PanelFooterExample from './PanelFooterExample.svelte';
import PanelHeaderFooterExample from './PanelHeaderFooterExample.svelte';
import PanelScrollableExample from './PanelScrollableExample.svelte';

const meta = {
  title: 'Components/Panel',
  component: Panel,
  tags: ['autodocs'],
  argTypes: {
    isScrollable: {
      control: { type: 'boolean' },
      description: 'Flag to add scrollable styling to the panel'
    },
    variant: {
      control: { type: 'select' },
      options: [undefined, 'raised', 'bordered', 'secondary'],
      description: 'Adds panel variant styles'
    }
  }
} satisfies Meta<Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    Component: PanelBasicExample
  })
};

export const Header: Story = {
  render: () => ({
    Component: PanelHeaderExample
  })
};

export const Footer: Story = {
  render: () => ({
    Component: PanelFooterExample
  })
};

export const HeaderAndFooter: Story = {
  render: () => ({
    Component: PanelHeaderFooterExample
  })
};

export const Raised: Story = {
  render: () => ({
    Component: PanelBasicExample,
    props: {
      variant: 'raised'
    }
  })
};

export const Bordered: Story = {
  render: () => ({
    Component: PanelBasicExample,
    props: {
      variant: 'bordered'
    }
  })
};

export const Secondary: Story = {
  render: () => ({
    Component: PanelBasicExample,
    props: {
      variant: 'secondary'
    }
  })
};

export const Scrollable: Story = {
  render: () => ({
    Component: PanelScrollableExample
  })
};

