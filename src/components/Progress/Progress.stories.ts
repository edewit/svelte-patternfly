import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Progress from './Progress.svelte';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Actual progress value'
    },
    title: {
      control: { type: 'text' },
      description: 'Title above progress bar'
    },
    label: {
      control: { type: 'text' },
      description: 'Custom label instead of percentage'
    },
    size: {
      control: { type: 'select' },
      options: [undefined, 'sm', 'lg'],
      description: 'Size of the progress bar'
    },
    measureLocation: {
      control: { type: 'select' },
      options: ['top', 'outside', 'inside', 'none'],
      description: 'Where to display the measure'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger'],
      description: 'Status variant'
    },
    isTitleTruncated: {
      control: { type: 'boolean' },
      description: 'Whether to truncate the title'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text below progress bar'
    }
  }
} satisfies Meta<Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: 33,
    title: 'Title',
    id: 'progress-basic-example'
  }
};

export const Small: Story = {
  args: {
    value: 33,
    title: 'Title',
    size: 'sm',
    id: 'progress-small-example'
  }
};

export const Large: Story = {
  args: {
    value: 33,
    title: 'Title',
    size: 'lg',
    id: 'progress-large-example'
  }
};

export const Outside: Story = {
  args: {
    value: 33,
    title: 'Title',
    measureLocation: 'outside',
    id: 'progress-outside-example'
  }
};

export const Inside: Story = {
  args: {
    value: 33,
    title: 'Title',
    measureLocation: 'inside',
    id: 'progress-inside-example'
  }
};

export const SingleLine: Story = {
  args: {
    value: 33,
    measureLocation: 'none',
    'aria-label': 'Progress value',
    id: 'progress-singleline-example'
  }
};

export const WithoutMeasure: Story = {
  args: {
    value: 33,
    title: 'Title',
    measureLocation: 'none',
    id: 'progress-without-measure-example'
  }
};

export const FiniteStep: Story = {
  args: {
    value: 2,
    min: 0,
    max: 5,
    title: 'Title',
    label: '2 of 5',
    id: 'progress-finite-step-example'
  }
};

export const StepInstructions: Story = {
  args: {
    value: 2,
    min: 0,
    max: 5,
    title: 'Title',
    label: 'Step 2: Copying files',
    id: 'progress-step-instructions-example'
  }
};

export const TruncateTitle: Story = {
  args: {
    value: 33,
    title: 'Very very very very very very very very very very very long title which should be truncated if it does not fit onto one line above the progress bar',
    isTitleTruncated: true,
    id: 'progress-truncate-example'
  }
};

export const Success: Story = {
  args: {
    value: 100,
    title: 'Title',
    variant: 'success',
    id: 'progress-success-example'
  }
};

export const Warning: Story = {
  args: {
    value: 90,
    title: 'Title',
    variant: 'warning',
    id: 'progress-warning-example'
  }
};

export const Danger: Story = {
  args: {
    value: 33,
    title: 'Title',
    variant: 'danger',
    id: 'progress-danger-example'
  }
};

export const InsideSuccess: Story = {
  args: {
    value: 100,
    title: 'Title',
    variant: 'success',
    measureLocation: 'inside',
    id: 'progress-inside-success-example'
  }
};

export const OutsideFailure: Story = {
  args: {
    value: 33,
    title: 'Title',
    variant: 'danger',
    measureLocation: 'outside',
    id: 'progress-outside-failure-example'
  }
};

export const WithHelperText: Story = {
  args: {
    value: 33,
    title: 'Title',
    helperText: 'Default variant is being displayed',
    id: 'progress-helper-text-example'
  }
};

