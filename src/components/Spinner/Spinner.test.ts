import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import Spinner from './Spinner.svelte';

describe('Spinner', () => {
  it('renders with default props', () => {
    const { container } = render(Spinner);
    const spinner = container.querySelector('svg');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('pf-v6-c-spinner');
    expect(spinner).toHaveAttribute('role', 'progressbar');
    expect(spinner).toHaveAttribute('aria-label', 'Loading...');
  });

  it('renders with custom aria-label', () => {
    const { container } = render(Spinner, {
      'aria-label': 'Custom loading'
    });
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveAttribute('aria-label', 'Custom loading');
  });

  it('renders with size sm', () => {
    const { container } = render(Spinner, { size: 'sm' });
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('pf-m-sm');
  });

  it('renders with size md', () => {
    const { container } = render(Spinner, { size: 'md' });
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('pf-m-md');
  });

  it('renders with size lg', () => {
    const { container } = render(Spinner, { size: 'lg' });
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('pf-m-lg');
  });

  it('renders with size xl', () => {
    const { container } = render(Spinner, { size: 'xl' });
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('pf-m-xl');
  });

  it('renders with custom diameter', () => {
    const { container } = render(Spinner, { diameter: '80px' });
    const spinner = container.querySelector('svg');
    expect(spinner?.getAttribute('style')).toContain('--pf-v6-c-spinner--diameter: 80px');
  });

  it('renders inline variant', () => {
    const { container } = render(Spinner, { isInline: true });
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('pf-m-inline');
  });

  it('renders with custom class', () => {
    const { container } = render(Spinner, { class: 'custom-class' });
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('custom-class');
  });

  it('renders circle element', () => {
    const { container } = render(Spinner);
    const circle = container.querySelector('circle');
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveClass('pf-v6-c-spinner__path');
    expect(circle).toHaveAttribute('cx', '50');
    expect(circle).toHaveAttribute('cy', '50');
    expect(circle).toHaveAttribute('r', '45');
    expect(circle).toHaveAttribute('fill', 'none');
  });

  it('uses aria-labelledby instead of aria-label when provided', () => {
    const { container } = render(Spinner, {
      'aria-labelledby': 'spinner-label'
    });
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveAttribute('aria-labelledby', 'spinner-label');
    expect(spinner).not.toHaveAttribute('aria-label');
  });
});
