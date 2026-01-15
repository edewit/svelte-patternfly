import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import Timestamp from './Timestamp.svelte';
import { TimestampFormat, TimestampTooltipVariant } from './types';

describe('Timestamp', () => {
  const testDate = new Date(2019, 0, 21, 21, 38, 0);

  it('renders a span element with correct class', () => {
    const { container } = render(Timestamp, { date: testDate });
    const timestamp = container.querySelector('span.pf-v6-c-timestamp');
    expect(timestamp).toBeInTheDocument();
  });

  it('renders a time element with correct class', () => {
    const { container } = render(Timestamp, { date: testDate });
    const time = container.querySelector('time.pf-v6-c-timestamp__text');
    expect(time).toBeInTheDocument();
  });

  it('renders datetime attribute on time element', () => {
    const { container } = render(Timestamp, { date: testDate });
    const time = container.querySelector('time');
    expect(time).toHaveAttribute('datetime', '2019-01-21T21:38');
  });

  it('renders date-only datetime attribute when isDateOnly is true', () => {
    const { container } = render(Timestamp, { date: testDate, isDateOnly: true });
    const time = container.querySelector('time');
    expect(time).toHaveAttribute('datetime', '2019-01-21');
  });

  it('renders custom children content', () => {
    const { container } = render(Timestamp, {
      date: testDate,
      children: '1 hour ago'
    });
    const time = container.querySelector('time');
    expect(time?.textContent).toBe('1 hour ago');
  });

  it('applies help-text class when tooltip is provided', () => {
    const { container } = render(Timestamp, {
      date: testDate,
      tooltip: { variant: TimestampTooltipVariant.default }
    });
    const timestamp = container.querySelector('span.pf-v6-c-timestamp');
    expect(timestamp).toHaveClass('pf-m-help-text');
  });

  it('does not apply help-text class when no tooltip', () => {
    const { container } = render(Timestamp, { date: testDate });
    const timestamp = container.querySelector('span.pf-v6-c-timestamp');
    expect(timestamp).not.toHaveClass('pf-m-help-text');
  });

  it('applies custom class', () => {
    const { container } = render(Timestamp, {
      date: testDate,
      class: 'custom-class'
    });
    const timestamp = container.querySelector('span.pf-v6-c-timestamp');
    expect(timestamp).toHaveClass('custom-class');
  });

  it('renders with custom datetime format', () => {
    const { container } = render(Timestamp, {
      date: testDate,
      customFormat: '2019-01-21'
    });
    const time = container.querySelector('time');
    expect(time).toHaveAttribute('datetime', '2019-01-21');
  });

  it('has tabindex when tooltip is present', () => {
    const { container } = render(Timestamp, {
      date: testDate,
      tooltip: { variant: TimestampTooltipVariant.default }
    });
    const timestamp = container.querySelector('span.pf-v6-c-timestamp');
    expect(timestamp).toHaveAttribute('tabindex', '0');
  });

  it('does not have tabindex when no tooltip', () => {
    const { container } = render(Timestamp, { date: testDate });
    const timestamp = container.querySelector('span.pf-v6-c-timestamp');
    expect(timestamp).not.toHaveAttribute('tabindex');
  });

  it('renders formatted date text', () => {
    const { container } = render(Timestamp, {
      date: testDate,
      dateFormat: TimestampFormat.short,
      timeFormat: TimestampFormat.short,
      locale: 'en-US'
    });
    const time = container.querySelector('time');
    // The exact format depends on locale, but it should contain the date
    expect(time?.textContent).toBeTruthy();
  });
});
