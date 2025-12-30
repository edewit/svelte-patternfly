import type { Meta, StoryObj } from '@storybook/svelte-vite';
import CalendarMonth from './CalendarMonth.svelte';
import CalendarMonthExample from './CalendarMonthExample.svelte';

const meta = {
  title: 'Components/CalendarMonth',
  component: CalendarMonth,
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: { type: 'date' },
      description: 'Selected date'
    },
    rangeStart: {
      control: { type: 'date' },
      description: 'Start date for date range selection'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    },
    title: {
      table: {
        disable: true
      }
    },
    inlineProps: {
      table: {
        disable: true
      }
    }
  }
} satisfies Meta<CalendarMonth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectableDate: Story = {
  args: {
    date: new Date(2020, 10, 24).getTime()
  },
  render: (args: any) => ({
    Component: CalendarMonth,
    props: {
      ...args,
      onChange: (event: MouseEvent, date: Date) => {
        console.log('Date selected:', date);
      },
      onMonthChange: (event: MouseEvent | Event | undefined, newDate: Date) => {
        console.log(`updated month: ${newDate.getMonth()}, updated year: ${newDate.getFullYear()}`);
      }
    }
  })
};

export const WithInlineProps: Story = {
  render: () => ({
    Component: CalendarMonthExample
  })
};

export const DateRange: Story = {
  args: {
    date: new Date(2020, 10, 29).getTime(),
    rangeStart: new Date(2020, 10, 11).getTime(),
    validators: [
      (date: Date) => {
        const rangeStart = new Date(2020, 10, 11);
        return date >= rangeStart;
      }
    ]
  },
  render: (args: any) => ({
    Component: CalendarMonth,
    props: {
      ...args,
      onChange: (event: MouseEvent, date: Date) => {
        console.log('Date selected:', date);
      },
      onMonthChange: (event: MouseEvent | Event | undefined, newDate: Date) => {
        console.log(`updated month: ${newDate.getMonth()}, updated year: ${newDate.getFullYear()}`);
      }
    }
  })
};
