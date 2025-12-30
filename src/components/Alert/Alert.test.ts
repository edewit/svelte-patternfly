import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import { fireEvent } from '@testing-library/dom';
import Alert from './Alert.svelte';

describe('Alert', () => {
  it('renders an alert element', () => {
    const { container } = render(Alert, { title: 'Test alert' });
    const alert = container.querySelector('.pf-v6-c-alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute('role', 'alert');
  });

  it('applies info variant by default', () => {
    const { container } = render(Alert, { title: 'Info alert' });
    const alert = container.querySelector('.pf-v6-c-alert');
    expect(alert).toHaveClass('pf-m-info');
  });

  it('applies variant classes correctly', () => {
    const { container } = render(Alert, { variant: 'success', title: 'Success alert' });
    const alert = container.querySelector('.pf-v6-c-alert');
    expect(alert).toHaveClass('pf-m-success');
  });

  it('displays title when provided', () => {
    render(Alert, { title: 'Test alert title' });
    const title = screen.getByText('Test alert title');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('P');
  });

  it('applies inline class when isInline is true', () => {
    const { container } = render(Alert, { isInline: true, title: 'Inline alert' });
    const alert = container.querySelector('.pf-v6-c-alert');
    expect(alert).toHaveClass('pf-m-inline');
  });

  it('applies plain class when isPlain is true', () => {
    const { container } = render(Alert, { isPlain: true, title: 'Plain alert' });
    const alert = container.querySelector('.pf-v6-c-alert');
    expect(alert).toHaveClass('pf-m-plain');
  });

  it('applies expandable class when isExpandable is true', () => {
    const { container } = render(Alert, { isExpandable: true, title: 'Expandable alert' });
    const alert = container.querySelector('.pf-v6-c-alert');
    expect(alert).toHaveClass('pf-m-expandable');
  });

  it('applies expanded class when isExpanded is true', () => {
    const { container } = render(Alert, {
      isExpandable: true,
      isExpanded: true,
      title: 'Expanded alert'
    });
    const alert = container.querySelector('.pf-v6-c-alert');
    expect(alert).toHaveClass('pf-m-expanded');
  });

  it('applies truncate class when isTruncate is true', () => {
    const { container } = render(Alert, { isTruncate: true, title: 'Truncated alert' });
    const alert = container.querySelector('.pf-v6-c-alert');
    expect(alert).toHaveClass('pf-m-truncate');
  });

  it('shows close button when showClose is true', () => {
    render(Alert, { showClose: true, title: 'Alert with close' });
    const closeButton = screen.getByLabelText(/Close.*alert/i);
    expect(closeButton).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(Alert, { showClose: true, title: 'Alert', onClose });
    const closeButton = screen.getByLabelText(/Close.*alert/i);
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows expand toggle when isExpandable is true', () => {
    render(Alert, { isExpandable: true, title: 'Expandable alert' });
    const expandButton = screen.getByLabelText('Details');
    expect(expandButton).toBeInTheDocument();
  });

  it('toggles expansion when expand button is clicked', () => {
    const onExpand = vi.fn();
    render(Alert, { isExpandable: true, title: 'Expandable alert', onExpand });
    const expandButton = screen.getByLabelText('Details');
    fireEvent.click(expandButton);
    expect(onExpand).toHaveBeenCalledWith(true);
    // Note: aria-label stays as "Details" even when expanded
  });

  it('sets aria-live attribute correctly', () => {
    const { container } = render(Alert, { 'aria-live': 'assertive', title: 'Alert' });
    const alert = container.querySelector('.pf-v6-c-alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('sets aria-atomic attribute correctly', () => {
    const { container } = render(Alert, { 'aria-atomic': false, title: 'Alert' });
    const alert = container.querySelector('.pf-v6-c-alert');
    expect(alert).toHaveAttribute('aria-atomic', 'false');
  });

  it('renders custom icon when customIcon is provided', () => {
    const { container } = render(Alert, { customIcon: 'fas fa-check', title: 'Alert' });
    const icon = container.querySelector('.pf-v6-c-alert__icon i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('fas', 'fa-check');
  });

  it('does not apply variant class for custom variant', () => {
    const { container } = render(Alert, { variant: 'custom', title: 'Custom alert' });
    const alert = container.querySelector('.pf-v6-c-alert');
    expect(alert).not.toHaveClass('pf-m-custom');
  });
});
