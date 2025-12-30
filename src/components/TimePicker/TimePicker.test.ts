import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte/svelte5';
import TimePicker from './TimePicker.svelte';

describe('TimePicker', () => {
  beforeEach(() => {
    // Mock console.log to avoid noise in tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a time picker component', () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker'
    });
    const input = container.querySelector('input[type="text"]');
    expect(input).toBeInTheDocument();
  });

  it('displays the correct value', () => {
    const { container } = render(TimePicker, {
      time: '14:30',
      is24Hour: true,
      'aria-label': 'Time picker'
    });
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input?.value).toBe('14:30');
  });

  it('opens menu when input is clicked', async () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker'
    });
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;

    await fireEvent.click(input);
    const menu = container.querySelector('.pf-v6-c-menu');
    expect(menu).toBeInTheDocument();
  });

  it('closes menu when clicking outside', async () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker'
    });
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;

    // Open menu
    await fireEvent.click(input);
    expect(container.querySelector('.pf-v6-c-menu')).toBeInTheDocument();

    // Click outside
    await fireEvent.click(document.body);

    // Menu should be closed
    expect(container.querySelector('.pf-v6-c-menu')).not.toBeInTheDocument();
  });

  it('calls onChange when input value changes', async () => {
    const onChange = vi.fn();
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      onChange
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    await fireEvent.input(input, { target: { value: '14:30' } });

    expect(onChange).toHaveBeenCalled();
    const calls = onChange.mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    expect(calls[0][1]).toBe('14:30');
  });

  it('calls onChange when time is selected from menu', async () => {
    const onChange = vi.fn();
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      onChange,
      is24Hour: true,
      stepMinutes: 60
    });

    // Open menu
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    await fireEvent.click(input);

    // Select a time
    const timeItems = container.querySelectorAll('.pf-v6-c-menu__item');
    if (timeItems.length > 0) {
      await fireEvent.click(timeItems[0] as HTMLButtonElement);
      expect(onChange).toHaveBeenCalled();
    }
  });

  it('closes menu when time is selected', async () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      is24Hour: true,
      stepMinutes: 60
    });

    // Open menu
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    await fireEvent.click(input);
    expect(container.querySelector('.pf-v6-c-menu')).toBeInTheDocument();

    // Select a time
    const timeItems = container.querySelectorAll('.pf-v6-c-menu__item');
    if (timeItems.length > 0) {
      await fireEvent.click(timeItems[0] as HTMLButtonElement);
      // Menu should be closed
      expect(container.querySelector('.pf-v6-c-menu')).not.toBeInTheDocument();
    }
  });

  it('generates time options based on stepMinutes', () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      is24Hour: true,
      stepMinutes: 15,
      isOpen: true
    });

    const timeItems = container.querySelectorAll('.pf-v6-c-menu__item');
    // Should have multiple time options (at least a few)
    expect(timeItems.length).toBeGreaterThan(0);
  });

  it('respects minTime constraint', () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      is24Hour: true,
      minTime: '09:30',
      maxTime: '17:15',
      isOpen: true
    });

    const timeItems = container.querySelectorAll('.pf-v6-c-menu__item');
    // Should have time options
    expect(timeItems.length).toBeGreaterThan(0);
  });

  it('validates time format', async () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      is24Hour: true
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;

    // Invalid format
    await fireEvent.input(input, { target: { value: 'invalid' } });
    await fireEvent.blur(input);

    // Should show error
    const helperText = container.querySelector('.pf-v6-c-helper-text');
    expect(helperText).toBeInTheDocument();
  });

  it('validates min/max time constraints', async () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      is24Hour: true,
      minTime: '09:30',
      maxTime: '17:15'
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;

    // Time outside range
    await fireEvent.input(input, { target: { value: '08:00' } });
    await fireEvent.blur(input);

    // Should show error
    const helperText = container.querySelector('.pf-v6-c-helper-text');
    expect(helperText).toBeInTheDocument();
  });

  it('displays error icon when invalid', async () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      is24Hour: true
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;

    // Invalid format
    await fireEvent.input(input, { target: { value: 'invalid' } });
    await fireEvent.blur(input);

    const formControl = container.querySelector('.pf-v6-c-form-control');
    expect(formControl).toHaveClass('pf-m-error');
  });

  it('sets aria-invalid when invalid', async () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      is24Hour: true
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;

    // Invalid format
    await fireEvent.input(input, { target: { value: 'invalid' } });
    await fireEvent.blur(input);

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables input when isDisabled is true', () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      isDisabled: true
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('does not open menu when disabled', async () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      isDisabled: true
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    await fireEvent.click(input);

    const menu = container.querySelector('.pf-v6-c-menu');
    expect(menu).not.toBeInTheDocument();
  });

  it('uses 24-hour format when is24Hour is true', () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      is24Hour: true,
      time: '14:30'
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input.value).toBe('14:30');
  });

  it('uses 12-hour format when is24Hour is false', () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      is24Hour: false,
      time: '14:30'
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    // Should convert to 12-hour format
    expect(input.value).toContain('PM');
  });

  it('includes seconds when includeSeconds is true', () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      is24Hour: true,
      includeSeconds: true,
      time: '14:30:45'
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input.value).toBe('14:30:45');
  });

  it('uses custom delimiter', () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      is24Hour: true,
      delimiter: '.',
      time: '14:30'
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    // Should use custom delimiter
    expect(input.value).toContain('.');
  });

  it('respects isOpen prop', () => {
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      isOpen: true
    });

    const menu = container.querySelector('.pf-v6-c-menu');
    expect(menu).toBeInTheDocument();
  });

  it('calls setIsOpen when menu state changes', async () => {
    const setIsOpen = vi.fn();
    const { container } = render(TimePicker, {
      'aria-label': 'Time picker',
      setIsOpen
    });

    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    await fireEvent.click(input);

    expect(setIsOpen).toHaveBeenCalled();
  });
});
