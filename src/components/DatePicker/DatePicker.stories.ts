import type { Meta, StoryObj } from '@storybook/svelte-vite';
import DatePicker from './DatePicker.svelte';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Date value in YYYY-MM-DD format'
    },
    onChange: {
      action: 'onChange',
      description: 'Callback fired when date changes'
    },
    onBlur: {
      action: 'onBlur',
      description: 'Callback fired when input loses focus'
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessibility label for the input'
    },
    id: {
      control: { type: 'text' },
      description: 'ID for the date picker'
    },
    name: {
      control: { type: 'text' },
      description: 'Name attribute for the input'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text to display below the input'
    },
    isInvalid: {
      control: { type: 'boolean' },
      description: 'Whether the input is invalid'
    },
    isExpanded: {
      control: { type: 'boolean' },
      description: 'Whether the calendar is expanded by default'
    },
    calendarPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom'],
      description: 'Position of the calendar relative to the input'
    },
    calendarAlign: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Alignment of the calendar'
    }
  }
} satisfies Meta<DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    'aria-label': 'Date picker'
  },
  render: (args: any) => ({
    Component: DatePicker,
    props: {
      ...args,
      onChange: (event: Event, value: string, date: Date | null) => {
        console.log('onChange', value, date);
        args.onChange?.(event, value, date);
      },
      onBlur: (event: Event, value: string, date: Date | null) => {
        console.log('onBlur', value, date);
        args.onBlur?.(event, value, date);
      }
    }
  })
};

export const WithValue: Story = {
  args: {
    value: '2020-03-05',
    'aria-label': 'Date picker'
  },
  render: (args: any) => ({
    Component: DatePicker,
    props: {
      ...args,
      onChange: (event: Event, value: string, date: Date | null) => {
        console.log('onChange', value, date);
        args.onChange?.(event, value, date);
      },
      onBlur: (event: Event, value: string, date: Date | null) => {
        console.log('onBlur', value, date);
        args.onBlur?.(event, value, date);
      }
    }
  })
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Select a date',
    'aria-label': 'Date picker'
  },
  render: (args: any) => ({
    Component: DatePicker,
    props: {
      ...args,
      onChange: (event: Event, value: string, date: Date | null) => {
        console.log('onChange', value, date);
        args.onChange?.(event, value, date);
      },
      onBlur: (event: Event, value: string, date: Date | null) => {
        console.log('onBlur', value, date);
        args.onBlur?.(event, value, date);
      }
    }
  })
};

export const Invalid: Story = {
  args: {
    value: 'invalid-date',
    isInvalid: true,
    helperText: 'Error: Invalid date',
    'aria-label': 'Date picker'
  },
  render: (args: any) => ({
    Component: DatePicker,
    props: {
      ...args,
      onChange: (event: Event, value: string, date: Date | null) => {
        console.log('onChange', value, date);
        args.onChange?.(event, value, date);
      },
      onBlur: (event: Event, value: string, date: Date | null) => {
        console.log('onBlur', value, date);
        args.onBlur?.(event, value, date);
      }
    }
  })
};

export const Expanded: Story = {
  args: {
    isExpanded: true,
    value: '2020-03-05',
    'aria-label': 'Date picker'
  },
  render: (args: any) => ({
    Component: DatePicker,
    props: {
      ...args,
      onChange: (event: Event, value: string, date: Date | null) => {
        console.log('onChange', value, date);
        args.onChange?.(event, value, date);
      },
      onBlur: (event: Event, value: string, date: Date | null) => {
        console.log('onBlur', value, date);
        args.onBlur?.(event, value, date);
      }
    }
  })
};

export const CalendarTop: Story = {
  args: {
    calendarPosition: 'top',
    value: '2020-03-05',
    'aria-label': 'Date picker'
  },
  render: (args: any) => ({
    Component: DatePicker,
    props: {
      ...args,
      onChange: (event: Event, value: string, date: Date | null) => {
        console.log('onChange', value, date);
        args.onChange?.(event, value, date);
      },
      onBlur: (event: Event, value: string, date: Date | null) => {
        console.log('onBlur', value, date);
        args.onBlur?.(event, value, date);
      }
    }
  })
};

export const CalendarRight: Story = {
  args: {
    calendarAlign: 'right',
    value: '2020-03-05',
    'aria-label': 'Date picker'
  },
  render: (args: any) => ({
    Component: DatePicker,
    props: {
      ...args,
      onChange: (event: Event, value: string, date: Date | null) => {
        console.log('onChange', value, date);
        args.onChange?.(event, value, date);
      },
      onBlur: (event: Event, value: string, date: Date | null) => {
        console.log('onBlur', value, date);
        args.onBlur?.(event, value, date);
      }
    }
  })
};
