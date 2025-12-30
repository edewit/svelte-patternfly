import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import MenuToggle from './MenuToggle.svelte';

describe('MenuToggle', () => {
  it('renders a menu toggle button', () => {
    const { container } = render(MenuToggle, {
      children: 'Collapsed'
    });
    const toggle = container.querySelector('.pf-v6-c-menu-toggle');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders the text content', () => {
    const { container } = render(MenuToggle, {
      children: 'Collapsed'
    });
    const textSpan = container.querySelector('.pf-v6-c-menu-toggle__text');
    expect(textSpan).toBeInTheDocument();
    expect(textSpan?.textContent).toBe('Collapsed');
  });

  it('renders the toggle icon', () => {
    const { container } = render(MenuToggle, {
      children: 'Toggle'
    });
    const iconSpan = container.querySelector('.pf-v6-c-menu-toggle__toggle-icon');
    expect(iconSpan).toBeInTheDocument();
  });

  it('shows expanded state when isExpanded is true', () => {
    const { container } = render(MenuToggle, {
      isExpanded: true,
      children: 'Expanded'
    });
    const toggle = container.querySelector('.pf-v6-c-menu-toggle');
    expect(toggle).toHaveClass('pf-m-expanded');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('can be disabled', () => {
    render(MenuToggle, {
      isDisabled: true,
      children: 'Disabled'
    });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies variant classes correctly', () => {
    const { container } = render(MenuToggle, {
      variant: 'primary',
      children: 'Primary'
    });
    const toggle = container.querySelector('.pf-v6-c-menu-toggle');
    expect(toggle).toHaveClass('pf-m-primary');
  });

  it('applies size classes correctly', () => {
    const { container } = render(MenuToggle, {
      size: 'sm',
      children: 'Small'
    });
    const toggle = container.querySelector('.pf-v6-c-menu-toggle');
    expect(toggle).toHaveClass('pf-m-sm');
  });

  it('applies plain class when isPlain is true', () => {
    const { container } = render(MenuToggle, {
      isPlain: true,
      children: 'Plain'
    });
    const toggle = container.querySelector('.pf-v6-c-menu-toggle');
    expect(toggle).toHaveClass('pf-m-plain');
  });

  it('applies full height class when isFullHeight is true', () => {
    const { container } = render(MenuToggle, {
      isFullHeight: true,
      children: 'Full Height'
    });
    const toggle = container.querySelector('.pf-v6-c-menu-toggle');
    expect(toggle).toHaveClass('pf-m-full-height');
  });

  it('applies full width class when isFullWidth is true', () => {
    const { container } = render(MenuToggle, {
      isFullWidth: true,
      children: 'Full Width'
    });
    const toggle = container.querySelector('.pf-v6-c-menu-toggle');
    expect(toggle).toHaveClass('pf-m-full-width');
  });

  it('applies placeholder class when isPlaceholder is true', () => {
    const { container } = render(MenuToggle, {
      isPlaceholder: true,
      children: 'Placeholder'
    });
    const toggle = container.querySelector('.pf-v6-c-menu-toggle');
    expect(toggle).toHaveClass('pf-m-placeholder');
  });

  it('applies settings class when isSettings is true', () => {
    const { container } = render(MenuToggle, {
      isSettings: true,
      children: 'Settings'
    });
    const toggle = container.querySelector('.pf-v6-c-menu-toggle');
    expect(toggle).toHaveClass('pf-m-settings');
  });

  it('displays badge when provided as number', () => {
    const { container } = render(MenuToggle, {
      badge: 4,
      children: 'Toggle'
    });
    const badgeSpan = container.querySelector('.pf-v6-c-menu-toggle__badge');
    expect(badgeSpan).toBeInTheDocument();
    expect(badgeSpan?.textContent).toBe('4');
  });

  it('displays badge when provided as string', () => {
    const { container } = render(MenuToggle, {
      badge: 'New',
      children: 'Toggle'
    });
    const badgeSpan = container.querySelector('.pf-v6-c-menu-toggle__badge');
    expect(badgeSpan).toBeInTheDocument();
    expect(badgeSpan?.textContent).toBe('New');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { container } = render(MenuToggle, {
      onClick: handleClick,
      children: 'Clickable'
    });
    const button = container.querySelector('button');
    button?.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    const { container } = render(MenuToggle, {
      isDisabled: true,
      onClick: handleClick,
      children: 'Disabled'
    });
    const button = container.querySelector('button');
    button?.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('sets aria-haspopup attribute', () => {
    render(MenuToggle, {
      'aria-haspopup': 'menu',
      children: 'Toggle'
    });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('sets aria-controls attribute', () => {
    render(MenuToggle, {
      'aria-controls': 'menu-1',
      children: 'Toggle'
    });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-controls', 'menu-1');
  });

  it('sets aria-label attribute', () => {
    render(MenuToggle, {
      'aria-label': 'Custom label',
      children: 'Toggle'
    });
    const button = screen.getByRole('button', { name: 'Custom label' });
    expect(button).toBeInTheDocument();
  });
});

