import type { Meta, StoryObj } from '@storybook/svelte-vite';
import TimePicker from './TimePicker.svelte';

const meta = {
  title: 'Components/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  argTypes: {
    time: {
      control: { type: 'text' },
      description: 'Time value in HH:MM or HH:MM:SS format'
    },
    is24Hour: {
      control: { type: 'boolean' },
      description: 'True if the time is 24 hour time. False if the time is 12 hour time'
    },
    minTime: {
      control: { type: 'text' },
      description: 'A time string indicating the minimum value allowed'
    },
    maxTime: {
      control: { type: 'text' },
      description: 'A time string indicating the maximum value allowed'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'String to display in the empty time picker field'
    },
    delimiter: {
      control: { type: 'text' },
      description: 'Character to display between the hour and minute'
    },
    includeSeconds: {
      control: { type: 'boolean' },
      description: 'Includes number of seconds with the chosen time'
    },
    stepMinutes: {
      control: { type: 'number' },
      description: 'Size of step between time options in minutes'
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Flag indicating the time picker is disabled'
    },
    isOpen: {
      control: { type: 'boolean' },
      description: 'Flag to control the opened state of the time picker menu'
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the time picker'
    },
    onChange: {
      action: 'onChange',
      description: 'Callback fired when time changes'
    }
  }
} satisfies Meta<TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic12Hour: Story = {
  args: {
    'aria-label': 'Time picker'
  },
  render: (args: any) => ({
    Component: TimePicker,
    props: {
      ...args,
      onChange: (
        event: Event,
        time: string,
        hour?: number,
        minute?: number,
        seconds?: number,
        isValid?: boolean
      ) => {
        console.log('onChange', time, hour, minute, seconds, isValid);
        args.onChange?.(event, time, hour, minute, seconds, isValid);
      }
    }
  })
};

export const Basic24Hour: Story = {
  args: {
    is24Hour: true,
    'aria-label': 'Time picker'
  },
  render: (args: any) => ({
    Component: TimePicker,
    props: {
      ...args,
      onChange: (
        event: Event,
        time: string,
        hour?: number,
        minute?: number,
        seconds?: number,
        isValid?: boolean
      ) => {
        console.log('onChange', time, hour, minute, seconds, isValid);
        args.onChange?.(event, time, hour, minute, seconds, isValid);
      }
    }
  })
};

export const MinMaxTimes: Story = {
  args: {
    is24Hour: true,
    minTime: '9:30',
    maxTime: '17:15',
    placeholder: '14:00',
    'aria-label': 'Time picker'
  },
  render: (args: any) => ({
    Component: TimePicker,
    props: {
      ...args,
      onChange: (
        event: Event,
        time: string,
        hour?: number,
        minute?: number,
        seconds?: number,
        isValid?: boolean
      ) => {
        console.log('onChange', time, hour, minute, seconds, isValid);
        args.onChange?.(event, time, hour, minute, seconds, isValid);
      }
    }
  })
};

export const CustomDelimiter: Story = {
  args: {
    delimiter: '.',
    'aria-label': 'Time picker'
  },
  render: (args: any) => ({
    Component: TimePicker,
    props: {
      ...args,
      onChange: (
        event: Event,
        time: string,
        hour?: number,
        minute?: number,
        seconds?: number,
        isValid?: boolean
      ) => {
        console.log('onChange', time, hour, minute, seconds, isValid);
        args.onChange?.(event, time, hour, minute, seconds, isValid);
      }
    }
  })
};

export const WithSeconds: Story = {
  args: {
    includeSeconds: true,
    'aria-label': 'Time picker'
  },
  render: (args: any) => ({
    Component: TimePicker,
    props: {
      ...args,
      onChange: (
        event: Event,
        time: string,
        hour?: number,
        minute?: number,
        seconds?: number,
        isValid?: boolean
      ) => {
        console.log('onChange', time, hour, minute, seconds, isValid);
        args.onChange?.(event, time, hour, minute, seconds, isValid);
      }
    }
  })
};

export const Basic24HoursWithSeconds: Story = {
  args: {
    is24Hour: true,
    includeSeconds: true,
    'aria-label': 'Time picker'
  },
  render: (args: any) => ({
    Component: TimePicker,
    props: {
      ...args,
      onChange: (
        event: Event,
        time: string,
        hour?: number,
        minute?: number,
        seconds?: number,
        isValid?: boolean
      ) => {
        console.log('onChange', time, hour, minute, seconds, isValid);
        args.onChange?.(event, time, hour, minute, seconds, isValid);
      }
    }
  })
};

export const WithValue: Story = {
  args: {
    time: '14:30',
    is24Hour: true,
    'aria-label': 'Time picker'
  },
  render: (args: any) => ({
    Component: TimePicker,
    props: {
      ...args,
      onChange: (
        event: Event,
        time: string,
        hour?: number,
        minute?: number,
        seconds?: number,
        isValid?: boolean
      ) => {
        console.log('onChange', time, hour, minute, seconds, isValid);
        args.onChange?.(event, time, hour, minute, seconds, isValid);
      }
    }
  })
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    time: '14:30',
    is24Hour: true,
    'aria-label': 'Time picker'
  },
  render: (args: any) => ({
    Component: TimePicker,
    props: {
      ...args,
      onChange: (
        event: Event,
        time: string,
        hour?: number,
        minute?: number,
        seconds?: number,
        isValid?: boolean
      ) => {
        console.log('onChange', time, hour, minute, seconds, isValid);
        args.onChange?.(event, time, hour, minute, seconds, isValid);
      }
    }
  })
};

export const CustomStepMinutes: Story = {
  args: {
    stepMinutes: 15,
    is24Hour: true,
    'aria-label': 'Time picker'
  },
  render: (args: any) => ({
    Component: TimePicker,
    props: {
      ...args,
      onChange: (
        event: Event,
        time: string,
        hour?: number,
        minute?: number,
        seconds?: number,
        isValid?: boolean
      ) => {
        console.log('onChange', time, hour, minute, seconds, isValid);
        args.onChange?.(event, time, hour, minute, seconds, isValid);
      }
    }
  })
};
