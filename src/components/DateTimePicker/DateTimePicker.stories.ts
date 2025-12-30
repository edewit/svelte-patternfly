import type { Meta, StoryObj } from '@storybook/svelte-vite';
import DateTimePicker from './DateTimePicker.svelte';

const meta = {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: { type: 'date' },
      description: 'Selected date'
    },
    time: {
      control: { type: 'text' },
      description: 'Selected time'
    },
    times: {
      control: { type: 'object' },
      description: 'Array of hour numbers for time options'
    },
    defaultTime: {
      control: { type: 'text' },
      description: 'Default time to set when date is selected'
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the date time picker'
    }
  }
} satisfies Meta<DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date(2020, 10, 24),
    time: 'HH:MM',
    times: Array.from(new Array(10), (_, i) => i + 8),
    defaultTime: '0:00',
    width: '300px'
  },
  render: (args: any) => ({
    Component: DateTimePicker,
    props: {
      ...args,
      onChange: (date: Date, time: string) => {
        console.log('Date and time selected:', date, time);
      }
    }
  })
};

export const WithCustomTimes: Story = {
  args: {
    date: new Date(2020, 10, 24),
    time: 'HH:MM',
    times: Array.from(new Array(12), (_, i) => i + 6), // 6:00 to 17:00
    defaultTime: '9:00',
    width: '300px'
  },
  render: (args: any) => ({
    Component: DateTimePicker,
    props: {
      ...args,
      onChange: (date: Date, time: string) => {
        console.log('Date and time selected:', date, time);
      }
    }
  })
};

export const WithSelectedTime: Story = {
  args: {
    date: new Date(2020, 10, 24),
    time: '10:00',
    times: Array.from(new Array(10), (_, i) => i + 8),
    defaultTime: '0:00',
    width: '300px'
  },
  render: (args: any) => ({
    Component: DateTimePicker,
    props: {
      ...args,
      onChange: (date: Date, time: string) => {
        console.log('Date and time selected:', date, time);
      }
    }
  })
};
