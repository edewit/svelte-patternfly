import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import Button from './Button.svelte';

describe('Button', () => {
  it('renders a button element by default', () => {
    render(Button, { children: 'Click me' });
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('applies primary variant by default', () => {
    const { container } = render(Button, { children: 'Primary' });
    const button = container.querySelector('.pf-v6-c-button');
    expect(button).toHaveClass('pf-v6-c-button');
  });

  it('applies variant classes correctly', () => {
    const { container } = render(Button, { variant: 'secondary', children: 'Secondary' });
    const button = container.querySelector('.pf-v6-c-button');
    expect(button).toHaveClass('pf-m-secondary');
  });

  it('applies size classes correctly', () => {
    const { container } = render(Button, { size: 'sm' }, { children: 'Small' });
    const button = container.querySelector('.pf-v6-c-button');
    expect(button).toHaveClass('pf-m-sm');
  });

  it('can be disabled', () => {
    render(Button, { isDisabled: true }, { children: 'Disabled' });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('can be aria-disabled', () => {
    render(Button, { isAriaDisabled: true }, { children: 'Aria Disabled' });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).not.toBeDisabled();
  });

  it('renders as an anchor when component is "a" and href is provided', () => {
    render(Button, { component: 'a', href: 'https://example.com' }, { children: 'Link' });
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders as a span when component is "span"', () => {
    const { container } = render(Button, { component: 'span' }, { children: 'Span' });
    const span = container.querySelector('span.pf-v6-c-button');
    expect(span).toBeInTheDocument();
  });

  it('applies block class when isBlock is true', () => {
    const { container } = render(Button, { isBlock: true }, { children: 'Block' });
    const button = container.querySelector('.pf-v6-c-button');
    expect(button).toHaveClass('pf-m-block');
  });

  it('applies inline class when isInline is true', () => {
    const { container } = render(Button, { isInline: true }, { children: 'Inline' });
    const button = container.querySelector('.pf-v6-c-button');
    expect(button).toHaveClass('pf-m-inline');
  });

  it('applies danger class when isDanger is true', () => {
    const { container } = render(Button, { isDanger: true }, { children: 'Danger' });
    const button = container.querySelector('.pf-v6-c-button');
    expect(button).toHaveClass('pf-m-danger');
  });

  it('shows progress indicator when inProgress is true', () => {
    const { container } = render(Button, { inProgress: true }, { children: 'Loading' });
    const spinner = container.querySelector('.pf-v6-c-spinner');
    expect(spinner).toBeInTheDocument();
    const button = container.querySelector('.pf-v6-c-button');
    expect(button).toHaveClass('pf-m-in-progress');
  });

  it('displays count when provided', () => {
    const { container } = render(Button, { count: 5 }, { children: 'Button' });
    const countElement = container.querySelector('.pf-v6-c-button__count');
    expect(countElement).toBeInTheDocument();
    expect(countElement?.textContent).toBe('5');
  });

  it('applies stateful state classes', () => {
    const { container } = render(
      Button,
      { variant: 'stateful', statefulState: 'unread' },
      { children: 'Stateful' }
    );
    const button = container.querySelector('.pf-v6-c-button');
    expect(button).toHaveClass('pf-m-stateful');
    expect(button).toHaveClass('pf-m-unread');
  });
});
