import type { Meta, StoryObj } from '@storybook/svelte-vite';
import NumberInput from './NumberInput.svelte';
import NumberInputExample from './NumberInputExample.svelte';
import NumberInputWithUnitExample from './NumberInputWithUnitExample.svelte';
import NumberInputWithThresholdsExample from './NumberInputWithThresholdsExample.svelte';
import NumberInputWithStatusExample from './NumberInputWithStatusExample.svelte';

const meta = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Value of the number input'
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value of the number input'
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value of the number input'
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Indicates the whole number input should be disabled'
    },
    validated: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'default'],
      description: 'Value to indicate if the input is modified to show that validation state'
    },
    unit: {
      control: { type: 'text' },
      description: 'Adds the given unit to the number input'
    },
    unitPosition: {
      control: { type: 'select' },
      options: ['before', 'after'],
      description: 'Position of the number input unit in relation to the number input'
    },
    widthChars: {
      control: { type: 'number' },
      description: 'Sets the width of the number input to a number of characters'
    },
    inputAriaLabel: {
      control: { type: 'text' },
      description: 'Aria label of the input'
    },
    inputName: {
      control: { type: 'text' },
      description: 'Name of the input'
    },
    minusBtnAriaLabel: {
      control: { type: 'text' },
      description: 'Aria label of the minus button'
    },
    plusBtnAriaLabel: {
      control: { type: 'text' },
      description: 'Aria label of the plus button'
    }
  }
} satisfies Meta<NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 90,
    inputName: 'input',
    inputAriaLabel: 'number input',
    minusBtnAriaLabel: 'minus',
    plusBtnAriaLabel: 'plus'
  }
};

export const WithUnit: Story = {
  args: {
    value: 90,
    unit: '%',
    inputName: 'input',
    inputAriaLabel: 'number input',
    minusBtnAriaLabel: 'minus',
    plusBtnAriaLabel: 'plus'
  }
};

export const WithUnitBefore: Story = {
  args: {
    value: 90,
    unit: '$',
    unitPosition: 'before',
    inputName: 'input',
    inputAriaLabel: 'number input',
    minusBtnAriaLabel: 'minus',
    plusBtnAriaLabel: 'plus'
  }
};

export const Disabled: Story = {
  args: {
    value: 90,
    unit: '%',
    isDisabled: true,
    inputName: 'input',
    inputAriaLabel: 'number input',
    minusBtnAriaLabel: 'minus',
    plusBtnAriaLabel: 'plus'
  }
};

export const WithStatus: Story = {
  args: {
    value: 5,
    validated: 'success',
    inputName: 'input',
    inputAriaLabel: 'number input',
    minusBtnAriaLabel: 'minus',
    plusBtnAriaLabel: 'plus'
  }
};

export const WithMinMax: Story = {
  args: {
    value: 5,
    min: 0,
    max: 10,
    inputName: 'input',
    inputAriaLabel: 'number input',
    minusBtnAriaLabel: 'minus',
    plusBtnAriaLabel: 'plus'
  }
};

export const Controlled: Story = {
  render: () => ({
    Component: NumberInputExample
  })
};

export const WithUnitControlled: Story = {
  render: () => ({
    Component: NumberInputWithUnitExample
  })
};

export const WithThresholds: Story = {
  render: () => ({
    Component: NumberInputWithThresholdsExample
  })
};

export const WithStatusControlled: Story = {
  render: () => ({
    Component: NumberInputWithStatusExample
  })
};

