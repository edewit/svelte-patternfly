import type { Meta, StoryObj } from '@storybook/svelte-vite';
import SliderExample from './SliderExample.svelte';

const meta = {
  title: 'Components/Slider',
  component: SliderExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'continuous',
        'continuous-with-tooltip',
        'discrete',
        'custom-steps',
        'with-input',
        'with-input-above-thumb',
        'disabled',
        'with-steps'
      ],
      description: 'Variant of the slider example'
    }
  }
} satisfies Meta<SliderExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Continuous: Story = {
  args: {
    variant: 'continuous'
  }
};

export const ContinuousWithTooltip: Story = {
  args: {
    variant: 'continuous-with-tooltip'
  }
};

export const Discrete: Story = {
  args: {
    variant: 'discrete'
  }
};

export const CustomSteps: Story = {
  args: {
    variant: 'custom-steps'
  }
};

export const WithInput: Story = {
  args: {
    variant: 'with-input'
  }
};

export const WithInputAboveThumb: Story = {
  args: {
    variant: 'with-input-above-thumb'
  }
};

export const Disabled: Story = {
  args: {
    variant: 'disabled'
  }
};

export const WithSteps: Story = {
  args: {
    variant: 'with-steps'
  }
};
