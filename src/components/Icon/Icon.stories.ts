import type { Meta, StoryObj } from '@storybook/svelte';
import Icon from './Icon.svelte';
import IconBasic from './IconBasic.svelte';
import IconStandaloneSizes from './IconStandaloneSizes.svelte';
import IconStatusColors from './IconStatusColors.svelte';
import IconInline from './IconInline.svelte';
import IconInProgress from './IconInProgress.svelte';
import IconWithComponentExample from './IconWithComponentExample.svelte';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An icon component is a container that supports icons of varying dimensions and styles, as well as spinners.'
      }
    }
  }
} satisfies Meta<Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    Component: IconBasic
  })
};

export const StandaloneSizes: Story = {
  render: () => ({
    Component: IconStandaloneSizes
  })
};

export const StatusColors: Story = {
  render: () => ({
    Component: IconStatusColors
  })
};

export const Inline: Story = {
  render: () => ({
    Component: IconInline
  })
};

export const InProgress: Story = {
  render: () => ({
    Component: IconInProgress
  })
};

export const WithIconClass: Story = {
  render: () => ({
    Component: Icon,
    props: {
      icon: 'fas fa-long-arrow-alt-down'
    }
  })
};

export const WithIconComponent: Story = {
  render: () => ({
    Component: IconWithComponentExample
  })
};


