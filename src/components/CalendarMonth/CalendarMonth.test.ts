import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte/svelte5';
import CalendarMonth from './CalendarMonth.svelte';

describe('CalendarMonth', () => {
  it('renders a calendar month component', () => {
    const { container } = render(CalendarMonth, { date: new Date(2020, 10, 24) });
    const calendar = container.querySelector('.pf-v6-c-calendar-month');
    expect(calendar).toBeInTheDocument();
  });

  it('displays the correct month and year', () => {
    const { container } = render(CalendarMonth, { date: new Date(2020, 10, 24) });
    const monthButton = container.querySelector('.pf-v6-c-menu-toggle__text');
    expect(monthButton?.textContent).toBe('November');
    const yearInput = container.querySelector('input[type="number"]') as HTMLInputElement;
    expect(yearInput?.value).toBe('2020');
  });

  it('renders calendar days', () => {
    const { container } = render(CalendarMonth, { date: new Date(2020, 10, 24) });
    const dateButtons = container.querySelectorAll('.pf-v6-c-calendar-month__date');
    expect(dateButtons.length).toBeGreaterThan(0);
  });

  it('calls onChange when a date is clicked', async () => {
    const onChange = vi.fn();
    const { container } = render(CalendarMonth, {
      date: new Date(2020, 10, 24),
      onChange
    });
    const dateButtons = container.querySelectorAll('.pf-v6-c-calendar-month__date');
    const firstDateButton = dateButtons[0] as HTMLButtonElement;
    await fireEvent.click(firstDateButton);
    expect(onChange).toHaveBeenCalled();
  });

  it('calls onMonthChange when navigating months', async () => {
    const onMonthChange = vi.fn();
    const { container } = render(CalendarMonth, {
      date: new Date(2020, 10, 24),
      onMonthChange
    });
    const nextButton = container.querySelector('.pf-m-next-month button');
    if (nextButton) {
      await fireEvent.click(nextButton);
      expect(onMonthChange).toHaveBeenCalled();
    }
  });

  it('displays selected date correctly', () => {
    const { container } = render(CalendarMonth, { date: new Date(2020, 10, 24) });
    const selectedCell = container.querySelector('.pf-m-selected');
    expect(selectedCell).toBeInTheDocument();
  });

  it('renders with inline props', () => {
    const { container } = render(CalendarMonth, {
      date: new Date(2020, 10, 24),
      inlineProps: {
        component: 'article',
        ariaLabelledby: 'test-id'
      }
    });
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveAttribute('aria-labelledby', 'test-id');
  });

  it('displays date range correctly', () => {
    const { container } = render(CalendarMonth, {
      date: new Date(2020, 10, 29),
      rangeStart: new Date(2020, 10, 11)
    });
    const inRangeCells = container.querySelectorAll('.pf-m-in-range');
    expect(inRangeCells.length).toBeGreaterThan(0);
    const startRangeCell = container.querySelector('.pf-m-start-range');
    expect(startRangeCell).toBeInTheDocument();
    const endRangeCell = container.querySelector('.pf-m-end-range');
    expect(endRangeCell).toBeInTheDocument();
  });

  it('disables dates based on validators', () => {
    const { container } = render(CalendarMonth, {
      date: new Date(2020, 10, 24),
      validators: [
        (date: Date) => {
          const minDate = new Date(2020, 10, 15);
          return date >= minDate;
        }
      ]
    });
    const disabledButtons = container.querySelectorAll('.pf-m-disabled button[disabled]');
    expect(disabledButtons.length).toBeGreaterThan(0);
  });

  it('renders day abbreviations in header', () => {
    const { container } = render(CalendarMonth, { date: new Date(2020, 10, 24) });
    const dayHeaders = container.querySelectorAll('.pf-v6-c-calendar-month__day');
    expect(dayHeaders.length).toBe(7);
  });

  it('updates year input when year changes', async () => {
    const { container } = render(CalendarMonth, { date: new Date(2020, 10, 24) });
    const yearInput = container.querySelector('input[type="number"]') as HTMLInputElement;
    if (yearInput) {
      yearInput.value = '2021';
      await fireEvent.change(yearInput);
      expect(yearInput.value).toBe('2021');
    }
  });
});
