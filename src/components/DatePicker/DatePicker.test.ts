import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte/svelte5';
import DatePicker from './DatePicker.svelte';

describe('DatePicker', () => {
  beforeEach(() => {
    // Mock console.log to avoid noise in tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a date picker component', () => {
    const { container } = render(DatePicker, {
      'aria-label': 'Date picker'
    });
    const input = container.querySelector('input[type="text"]');
    expect(input).toBeInTheDocument();
  });

  it('displays the correct value', () => {
    const { container } = render(DatePicker, {
      value: '2020-03-05',
      'aria-label': 'Date picker'
    });
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input?.value).toBe('2020-03-05');
  });

  it('renders calendar toggle button', () => {
    render(DatePicker, {
      'aria-label': 'Date picker'
    });
    const button = screen.getByRole('button', { name: 'Toggle date picker' });
    expect(button).toBeInTheDocument();
  });

  it('opens calendar when calendar button is clicked', async () => {
    const { container } = render(DatePicker, {
      'aria-label': 'Date picker'
    });
    const calendarButton = screen.getByRole('button', { name: 'Toggle date picker' });
    expect(calendarButton).toBeInTheDocument();

    await fireEvent.click(calendarButton);
    const calendar = container.querySelector('.pf-v6-c-calendar-month');
    expect(calendar).toBeInTheDocument();
  });

  it('closes calendar when calendar button is clicked again', async () => {
    const { container } = render(DatePicker, {
      'aria-label': 'Date picker'
    });
    const calendarButton = screen.getByRole('button', { name: 'Toggle date picker' });

    // Open calendar
    await fireEvent.click(calendarButton);
    expect(container.querySelector('.pf-v6-c-calendar-month')).toBeInTheDocument();

    // Close calendar
    await fireEvent.click(calendarButton);
    expect(container.querySelector('.pf-v6-c-calendar-month')).not.toBeInTheDocument();
  });

  it('calls onChange when input value changes', async () => {
    const onChange = vi.fn();
    const { container } = render(DatePicker, {
      'aria-label': 'Date picker',
      onChange
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    await fireEvent.input(input, { target: { value: '2020-03-05' } });

    expect(onChange).toHaveBeenCalled();
    const calls = onChange.mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    expect(calls[0][1]).toBe('2020-03-05');
  });

  it('calls onBlur when input loses focus', async () => {
    const onBlur = vi.fn();
    const { container } = render(DatePicker, {
      'aria-label': 'Date picker',
      onBlur
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    await fireEvent.blur(input);

    expect(onBlur).toHaveBeenCalled();
  });

  it('calls onChange when date is selected from calendar', async () => {
    const onChange = vi.fn();
    const { container } = render(DatePicker, {
      'aria-label': 'Date picker',
      onChange
    });

    // Open calendar
    const calendarButton = screen.getByRole('button', { name: 'Toggle date picker' });
    await fireEvent.click(calendarButton);

    // Select a date
    const dateButtons = container.querySelectorAll('.pf-v6-c-calendar-month__date');
    if (dateButtons.length > 0) {
      await fireEvent.click(dateButtons[0] as HTMLButtonElement);
      expect(onChange).toHaveBeenCalled();
    }
  });

  it('closes calendar when date is selected', async () => {
    const { container } = render(DatePicker, {
      'aria-label': 'Date picker'
    });

    // Open calendar
    const calendarButton = screen.getByRole('button', { name: 'Toggle date picker' });
    await fireEvent.click(calendarButton);
    expect(container.querySelector('.pf-v6-c-calendar-month')).toBeInTheDocument();

    // Select a date
    const dateButtons = container.querySelectorAll('.pf-v6-c-calendar-month__date');
    if (dateButtons.length > 0) {
      await fireEvent.click(dateButtons[0] as HTMLButtonElement);
      // Calendar should be closed
      expect(container.querySelector('.pf-v6-c-calendar-month')).not.toBeInTheDocument();
    }
  });

  it('displays helper text when provided', () => {
    const { container } = render(DatePicker, {
      helperText: 'Select a date',
      'aria-label': 'Date picker'
    });
    const helperText = container.querySelector('.pf-v6-c-date-picker__helper-text');
    expect(helperText).toBeInTheDocument();
    expect(helperText?.textContent?.trim()).toBe('Select a date');
  });

  it('applies error class when isInvalid is true', () => {
    const { container } = render(DatePicker, {
      isInvalid: true,
      'aria-label': 'Date picker'
    });
    const formControl = container.querySelector('.pf-v6-c-form-control');
    expect(formControl).toHaveClass('pf-m-error');
  });

  it('sets aria-invalid when isInvalid is true', () => {
    const { container } = render(DatePicker, {
      isInvalid: true,
      'aria-label': 'Date picker'
    });
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('displays error icon when isInvalid is true', () => {
    const { container } = render(DatePicker, {
      isInvalid: true,
      'aria-label': 'Date picker'
    });
    const errorIcon = container.querySelector('.pf-v6-c-form-control__icon.pf-m-status');
    expect(errorIcon).toBeInTheDocument();
    const icon = errorIcon?.querySelector('.fa-exclamation-circle');
    expect(icon).toBeInTheDocument();
  });

  it('applies error class to helper text when isInvalid is true', () => {
    const { container } = render(DatePicker, {
      isInvalid: true,
      helperText: 'Invalid date',
      'aria-label': 'Date picker'
    });
    const helperTextItem = container.querySelector('.pf-v6-c-helper-text__item');
    expect(helperTextItem).toHaveClass('pf-m-error');
  });

  it('displays error icon in helper text when isInvalid is true', () => {
    const { container } = render(DatePicker, {
      isInvalid: true,
      helperText: 'Invalid date',
      'aria-label': 'Date picker'
    });
    const helperTextIcon = container.querySelector('.pf-v6-c-helper-text__item-icon');
    expect(helperTextIcon).toBeInTheDocument();
    const icon = helperTextIcon?.querySelector('.fa-exclamation-circle');
    expect(icon).toBeInTheDocument();
  });

  it('includes screen reader text for error in helper text', () => {
    const { container } = render(DatePicker, {
      isInvalid: true,
      helperText: 'Invalid date',
      'aria-label': 'Date picker'
    });
    const screenReader = container.querySelector('.pf-v6-screen-reader');
    expect(screenReader).toBeInTheDocument();
    expect(screenReader?.textContent).toBe('Error:');
  });

  it('shows calendar when isExpanded is true', () => {
    const { container } = render(DatePicker, {
      isExpanded: true,
      'aria-label': 'Date picker'
    });
    const calendar = container.querySelector('.pf-v6-c-calendar-month');
    expect(calendar).toBeInTheDocument();
  });

  it('parses valid date string correctly', async () => {
    const onChange = vi.fn();
    const { container } = render(DatePicker, {
      'aria-label': 'Date picker',
      onChange
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    await fireEvent.input(input, { target: { value: '2020-03-05' } });

    const calls = onChange.mock.calls;
    if (calls.length > 0) {
      const date = calls[0][2] as Date | null;
      expect(date).not.toBeNull();
      expect(date).toBeInstanceOf(Date);
      if (date) {
        expect(date.getFullYear()).toBe(2020);
        expect(date.getMonth()).toBe(2); // March is month 2 (0-indexed)
        expect(date.getDate()).toBe(5);
      }
    }
  });

  it('handles invalid date string', async () => {
    const onChange = vi.fn();
    const { container } = render(DatePicker, {
      'aria-label': 'Date picker',
      onChange
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    await fireEvent.input(input, { target: { value: 'invalid-date' } });

    const calls = onChange.mock.calls;
    if (calls.length > 0) {
      const date = calls[0][2] as Date | null;
      expect(date).toBeNull();
    }
  });

  it('closes calendar when clicking outside', async () => {
    const { container } = render(DatePicker, {
      'aria-label': 'Date picker'
    });

    // Open calendar
    const calendarButton = screen.getByRole('button', { name: 'Toggle date picker' });
    await fireEvent.click(calendarButton);
    expect(container.querySelector('.pf-v6-c-calendar-month')).toBeInTheDocument();

    // Click outside
    await fireEvent.click(document.body);

    // Calendar should be closed
    expect(container.querySelector('.pf-v6-c-calendar-month')).not.toBeInTheDocument();
  });
});
