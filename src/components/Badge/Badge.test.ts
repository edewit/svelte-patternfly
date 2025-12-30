import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import Badge from './Badge.svelte';

describe('Badge', () => {
  it('renders a span element', () => {
    const { container } = render(Badge, {}, { children: '7' });
    const badge = container.querySelector('span.pf-v6-c-badge');
    expect(badge).toBeInTheDocument();
  });

  it('applies read variant by default', () => {
    const { container } = render(Badge, {}, { children: '7' });
    const badge = container.querySelector('.pf-v6-c-badge');
    expect(badge).toHaveClass('pf-v6-c-badge');
    expect(badge).toHaveClass('pf-m-read');
  });

  it('applies variant classes correctly', () => {
    const { container } = render(Badge, { variant: 'unread' }, { children: '7' });
    const badge = container.querySelector('.pf-v6-c-badge');
    expect(badge).toHaveClass('pf-m-unread');
  });

  it('applies disabled variant correctly', () => {
    const { container } = render(Badge, { variant: 'disabled' }, { children: '7' });
    const badge = container.querySelector('.pf-v6-c-badge');
    expect(badge).toHaveClass('pf-m-disabled');
  });

  it('displays children content', () => {
    const { container } = render(Badge, { children: '24' });
    const badge = container.querySelector('.pf-v6-c-badge');
    expect(badge?.textContent).toBe('24');
  });

  it('displays overflow content', () => {
    const { container } = render(Badge, { children: '999+' });
    const badge = container.querySelector('.pf-v6-c-badge');
    expect(badge?.textContent).toBe('999+');
  });

  it('applies custom class', () => {
    const { container } = render(Badge, { class: 'custom-class' }, { children: '7' });
    const badge = container.querySelector('.pf-v6-c-badge');
    expect(badge).toHaveClass('custom-class');
  });
});
