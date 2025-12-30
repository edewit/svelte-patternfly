import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import Avatar from './Avatar.svelte';

describe('Avatar', () => {
  it('renders an img element', () => {
    render(Avatar, { alt: 'Test avatar' });
    const img = screen.getByAltText('Test avatar');
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe('IMG');
  });

  it('applies avatar class by default', () => {
    const { container } = render(Avatar, { alt: 'Test avatar' });
    const img = container.querySelector('.pf-v6-c-avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('pf-v6-c-avatar');
  });

  it('applies size classes correctly', () => {
    const { container } = render(Avatar, { alt: 'Test avatar', size: 'sm' });
    const img = container.querySelector('.pf-v6-c-avatar');
    expect(img).toHaveClass('pf-m-sm');
  });

  it('does not apply md class when size is md (default)', () => {
    const { container } = render(Avatar, { alt: 'Test avatar', size: 'md' });
    const img = container.querySelector('.pf-v6-c-avatar');
    expect(img).not.toHaveClass('pf-m-md');
    expect(img).toHaveClass('pf-v6-c-avatar');
  });

  it('applies large size class', () => {
    const { container } = render(Avatar, { alt: 'Test avatar', size: 'lg' });
    const img = container.querySelector('.pf-v6-c-avatar');
    expect(img).toHaveClass('pf-m-lg');
  });

  it('applies extra large size class', () => {
    const { container } = render(Avatar, { alt: 'Test avatar', size: 'xl' });
    const img = container.querySelector('.pf-v6-c-avatar');
    expect(img).toHaveClass('pf-m-xl');
  });

  it('applies bordered class when isBordered is true', () => {
    const { container } = render(Avatar, { alt: 'Test avatar', isBordered: true });
    const img = container.querySelector('.pf-v6-c-avatar');
    expect(img).toHaveClass('pf-m-bordered');
  });

  it('sets src attribute when provided', () => {
    render(Avatar, { alt: 'Test avatar', src: 'https://example.com/avatar.jpg' });
    const img = screen.getByAltText('Test avatar');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('sets alt attribute (required)', () => {
    render(Avatar, { alt: 'User avatar' });
    const img = screen.getByAltText('User avatar');
    expect(img).toHaveAttribute('alt', 'User avatar');
  });

  it('applies custom class when provided', () => {
    const { container } = render(Avatar, { alt: 'Test avatar', class: 'custom-class' });
    const img = container.querySelector('.pf-v6-c-avatar');
    expect(img).toHaveClass('custom-class');
  });
});
