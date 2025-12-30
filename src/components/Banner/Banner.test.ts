import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import Banner from './Banner.svelte';

describe('Banner', () => {
  it('renders a banner element', () => {
    const { container } = render(Banner, { children: 'Test banner' });
    const banner = container.querySelector('.pf-v6-c-banner');
    expect(banner).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(Banner, { children: 'Test banner content' });
    expect(screen.getByText('Test banner content')).toBeInTheDocument();
  });

  it('applies color variant classes correctly', () => {
    const { container } = render(Banner, {
      colorVariant: 'red',
      children: 'Red banner'
    });
    const banner = container.querySelector('.pf-v6-c-banner');
    expect(banner).toHaveClass('pf-m-red');
  });

  it('applies status variant classes correctly', () => {
    const { container } = render(Banner, {
      statusVariant: 'success',
      children: 'Success banner'
    });
    const banner = container.querySelector('.pf-v6-c-banner');
    expect(banner).toHaveClass('pf-m-success');
  });

  it('applies sticky class when isSticky is true', () => {
    const { container } = render(Banner, {
      isSticky: true,
      children: 'Sticky banner'
    });
    const banner = container.querySelector('.pf-v6-c-banner');
    expect(banner).toHaveClass('pf-m-sticky');
  });

  it('does not apply color variant class for default', () => {
    const { container } = render(Banner, {
      colorVariant: 'default',
      children: 'Default banner'
    });
    const banner = container.querySelector('.pf-v6-c-banner');
    expect(banner).not.toHaveClass('pf-m-default');
  });

  it('renders screen reader text when provided', () => {
    render(Banner, {
      screenReaderText: 'Success banner:',
      children: 'Success banner'
    });
    const screenReader = screen.getByText('Success banner:');
    expect(screenReader).toBeInTheDocument();
    expect(screenReader).toHaveClass('pf-v6-screen-reader');
  });

  it('renders default icon for success status', () => {
    const { container } = render(Banner, {
      statusVariant: 'success',
      children: 'Success banner'
    });
    const icon = container.querySelector('.pf-v6-c-banner__icon i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('fas', 'fa-fw', 'fa-check-circle');
  });

  it('renders default icon for warning status', () => {
    const { container } = render(Banner, {
      statusVariant: 'warning',
      children: 'Warning banner'
    });
    const icon = container.querySelector('.pf-v6-c-banner__icon i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('fas', 'fa-fw', 'fa-exclamation-triangle');
  });

  it('renders default icon for danger status', () => {
    const { container } = render(Banner, {
      statusVariant: 'danger',
      children: 'Danger banner'
    });
    const icon = container.querySelector('.pf-v6-c-banner__icon i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('fas', 'fa-fw', 'fa-exclamation-circle');
  });

  it('renders default icon for info status', () => {
    const { container } = render(Banner, {
      statusVariant: 'info',
      children: 'Info banner'
    });
    const icon = container.querySelector('.pf-v6-c-banner__icon i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('fas', 'fa-fw', 'fa-info-circle');
  });

  it('renders custom icon when provided', () => {
    const { container } = render(Banner, {
      customIcon: 'fas fa-bell',
      children: 'Custom banner'
    });
    const icon = container.querySelector('.pf-v6-c-banner__icon i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('fas', 'fa-bell');
  });

  it('does not render icon when no status variant or custom icon', () => {
    const { container } = render(Banner, {
      children: 'Default banner'
    });
    const icon = container.querySelector('.pf-v6-c-banner__icon');
    expect(icon).not.toBeInTheDocument();
  });

  it('does not render icon for custom status variant without custom icon', () => {
    const { container } = render(Banner, {
      statusVariant: 'custom',
      children: 'Custom banner'
    });
    const icon = container.querySelector('.pf-v6-c-banner__icon');
    expect(icon).not.toBeInTheDocument();
  });

  it('applies custom class name', () => {
    const { container } = render(Banner, {
      class: 'custom-class',
      children: 'Banner'
    });
    const banner = container.querySelector('.pf-v6-c-banner');
    expect(banner).toHaveClass('custom-class');
  });

  it('generates unique id when not provided', () => {
    const { container } = render(Banner, {
      children: 'Banner'
    });
    const banner = container.querySelector('.pf-v6-c-banner');
    expect(banner).toHaveAttribute('id');
    expect(banner?.getAttribute('id')).toMatch(/^banner-/);
  });

  it('uses provided id', () => {
    const { container } = render(Banner, {
      id: 'custom-banner-id',
      children: 'Banner'
    });
    const banner = container.querySelector('.pf-v6-c-banner');
    expect(banner).toHaveAttribute('id', 'custom-banner-id');
  });
});
