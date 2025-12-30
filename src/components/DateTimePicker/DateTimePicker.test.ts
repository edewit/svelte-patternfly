import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte/svelte5';
import { tick } from 'svelte';
import DateTimePicker from './DateTimePicker.svelte';

describe('DateTimePicker', () => {
  beforeEach(() => {
    // Mock console.log to avoid noise in tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a date time picker component', () => {
    const { container } = render(DateTimePicker, {
      date: new Date(2020, 10, 24)
    });
    const input = container.querySelector('input[type="text"]');
    expect(input).toBeInTheDocument();
  });

  it('displays the correct date and time format', () => {
    const { container } = render(DateTimePicker, {
      date: new Date(2020, 10, 24),
      time: '10:00'
    });
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input?.value).toContain('11-24-2020');
    expect(input?.value).toContain('10:00');
  });

  it('shows default time placeholder when time is not selected', () => {
    const { container } = render(DateTimePicker, {
      date: new Date(2020, 10, 24),
      time: 'HH:MM'
    });
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input?.value).toContain('HH:MM');
  });

  it('opens calendar when calendar button is clicked', async () => {
    const { container } = render(DateTimePicker, {
      date: new Date(2020, 10, 24)
    });
    const calendarButton = container.querySelector('button[aria-label="Toggle the calendar"]');
    expect(calendarButton).toBeInTheDocument();

    await fireEvent.click(calendarButton!);
    const calendar = container.querySelector('.pf-v6-c-calendar-month');
    expect(calendar).toBeInTheDocument();
  });

  it('opens time dropdown when time button is clicked', async () => {
    const { container } = render(DateTimePicker, {
      date: new Date(2020, 10, 24),
      times: [8, 9, 10]
    });
    const timeButton = container.querySelector('button[aria-label="Time picker"]');
    expect(timeButton).toBeInTheDocument();

    await fireEvent.click(timeButton!);
    const timeMenu = container.querySelector('.pf-v6-c-menu');
    expect(timeMenu).toBeInTheDocument();
  });

  it('calls onChange when date is selected', async () => {
    const onChange = vi.fn();
    const { container } = render(DateTimePicker, {
      date: new Date(2020, 10, 24),
      onChange
    });

    // Open calendar
    const calendarButton = container.querySelector('button[aria-label="Toggle the calendar"]');
    await fireEvent.click(calendarButton!);

    // Select a date
    const dateButtons = container.querySelectorAll('.pf-v6-c-calendar-month__date');
    if (dateButtons.length > 0) {
      await fireEvent.click(dateButtons[0] as HTMLButtonElement);
      expect(onChange).toHaveBeenCalled();
    }
  });

  it('calls onChange when time is selected', async () => {
    const onChange = vi.fn();
    const { container } = render(DateTimePicker, {
      date: new Date(2020, 10, 24),
      times: [8, 9, 10],
      onChange
    });

    // Open time dropdown
    const timeButton = container.querySelector('button[aria-label="Time picker"]');
    await fireEvent.click(timeButton!);

    // Select a time
    const timeItems = container.querySelectorAll('.pf-v6-c-menu__item');
    if (timeItems.length > 0) {
      await fireEvent.click(timeItems[0] as HTMLButtonElement);
      expect(onChange).toHaveBeenCalled();
    }
  });

  it('closes calendar when time dropdown is opened', async () => {
    const { container } = render(DateTimePicker, {
      date: new Date(2020, 10, 24)
    });

    // Open calendar
    const calendarButton = container.querySelector('button[aria-label="Toggle the calendar"]');
    await fireEvent.click(calendarButton!);
    expect(container.querySelector('.pf-v6-c-calendar-month')).toBeInTheDocument();

    // Open time dropdown
    const timeButton = container.querySelector('button[aria-label="Time picker"]');
    await fireEvent.click(timeButton!);

    // Calendar should be closed
    expect(container.querySelector('.pf-v6-c-calendar-month')).not.toBeInTheDocument();
  });

  it('closes time dropdown when calendar is opened', async () => {
    const { container } = render(DateTimePicker, {
      date: new Date(2020, 10, 24),
      times: [8, 9, 10]
    });

    // Open time dropdown
    const timeButton = container.querySelector('button[aria-label="Time picker"]');
    await fireEvent.click(timeButton!);
    expect(container.querySelector('.pf-v6-c-menu')).toBeInTheDocument();

    // Open calendar
    const calendarButton = container.querySelector('button[aria-label="Toggle the calendar"]');
    await fireEvent.click(calendarButton!);

    // Time dropdown should be closed
    const timeMenu = container.querySelector('.pf-v6-c-menu');
    expect(timeMenu).not.toBeInTheDocument();
  });

  it('sets default time when date is selected and time is not set', async () => {
    const onChange = vi.fn();
    const { container } = render(DateTimePicker, {
      date: new Date(2020, 10, 24),
      time: 'HH:MM',
      defaultTime: '9:00',
      onChange
    });

    // Open calendar
    const calendarButton = container.querySelector('button[aria-label="Toggle the calendar"]');
    await fireEvent.click(calendarButton!);

    // Select a date
    const dateButtons = container.querySelectorAll('.pf-v6-c-calendar-month__date');
    if (dateButtons.length > 0) {
      await fireEvent.click(dateButtons[0] as HTMLButtonElement);

      // Check that onChange was called with default time
      expect(onChange).toHaveBeenCalled();
      const calls = onChange.mock.calls;
      if (calls.length > 0) {
        expect(calls[0][1]).toBe('9:00');
      }
    }
  });

  it('renders custom time options', async () => {
    const { container } = render(DateTimePicker, {
      date: new Date(2020, 10, 24),
      times: [6, 7, 8, 9, 10]
    });

    // Open time dropdown
    const timeButton = container.querySelector('button[aria-label="Time picker"]');
    if (timeButton) {
      fireEvent.click(timeButton);
      await tick();
    }

    await waitFor(() => {
      const timeItems = container.querySelectorAll('.pf-v6-c-menu__item-text');
      expect(timeItems.length).toBe(5);
      expect(timeItems[0]?.textContent).toBe('6:00');
      expect(timeItems[4]?.textContent).toBe('10:00');
    });
  });
});
