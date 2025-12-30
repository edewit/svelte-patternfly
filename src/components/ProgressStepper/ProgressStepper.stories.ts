import type { Meta, StoryObj } from '@storybook/svelte-vite';
import ProgressStepper from './ProgressStepper.svelte';
import ProgressStepperBasicExample from './ProgressStepperBasicExample.svelte';
import ProgressStepperDescriptionsExample from './ProgressStepperDescriptionsExample.svelte';
import ProgressStepperVerticalExample from './ProgressStepperVerticalExample.svelte';
import ProgressStepperCompactExample from './ProgressStepperCompactExample.svelte';
import ProgressStepperIssueExample from './ProgressStepperIssueExample.svelte';
import ProgressStepperFailureExample from './ProgressStepperFailureExample.svelte';

const meta = {
  title: 'Components/ProgressStepper',
  component: ProgressStepper,
  tags: ['autodocs'],
  argTypes: {
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible label for the progress stepper'
    },
    isCenterAligned: {
      control: { type: 'boolean' },
      description: 'Flag indicating the progress stepper should be centered'
    },
    isCompact: {
      control: { type: 'boolean' },
      description: 'Flag indicating the progress stepper should be rendered compactly'
    },
    isVertical: {
      control: { type: 'boolean' },
      description: 'Flag indicating the progress stepper has a vertical layout'
    }
  }
} satisfies Meta<ProgressStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    Component: ProgressStepperBasicExample
  })
};

export const WithDescriptions: Story = {
  render: () => ({
    Component: ProgressStepperDescriptionsExample
  })
};

export const Vertical: Story = {
  render: () => ({
    Component: ProgressStepperVerticalExample
  })
};

export const Compact: Story = {
  render: () => ({
    Component: ProgressStepperCompactExample
  })
};

export const WithIssue: Story = {
  render: () => ({
    Component: ProgressStepperIssueExample
  })
};

export const WithFailure: Story = {
  render: () => ({
    Component: ProgressStepperFailureExample
  })
};

