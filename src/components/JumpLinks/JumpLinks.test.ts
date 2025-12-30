import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import JumpLinks from './JumpLinks.svelte';
import JumpLinksItem from './JumpLinksItem.svelte';

describe('JumpLinks', () => {
  it('renders a nav element with jump-links class', () => {
    const { container } = render(JumpLinks);
    const nav = container.querySelector('nav.pf-v6-c-jump-links');
    expect(nav).toBeInTheDocument();
  });

  it('renders an unordered list with jump-links list class', () => {
    const { container } = render(JumpLinks);
    const list = container.querySelector('ul.pf-v6-c-jump-links__list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute('role', 'list');
  });

  it('applies default aria-label', () => {
    const { container } = render(JumpLinks, { 'aria-label': 'Jump to sections' });
    const nav = container.querySelector('nav.pf-v6-c-jump-links');
    expect(nav).toHaveAttribute('aria-label', 'Jump to sections');
    const list = container.querySelector('ul.pf-v6-c-jump-links__list');
    expect(list).toHaveAttribute('aria-label', 'Jump to sections');
  });

  it('applies custom class', () => {
    const { container } = render(JumpLinks, { class: 'custom-class' });
    const nav = container.querySelector('nav.pf-v6-c-jump-links');
    expect(nav).toHaveClass('custom-class');
  });
});

describe('JumpLinksItem', () => {
  it('renders a list item with jump-links item class', () => {
    const { container } = render(JumpLinksItem, { href: '#', children: 'Test section' });
    const item = container.querySelector('li.pf-v6-c-jump-links__item');
    expect(item).toBeInTheDocument();
  });

  it('renders a link with button classes', () => {
    const { container } = render(JumpLinksItem, { href: '#', children: 'Test section' });
    const link = container.querySelector('a.pf-v6-c-button.pf-m-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#');
  });

  it('renders link text', () => {
    render(JumpLinksItem, { href: '#', children: 'Test section' });
    expect(screen.getByText('Test section')).toBeInTheDocument();
  });

  it('applies active state with pf-m-current class and aria-current', () => {
    const { container } = render(JumpLinksItem, {
      href: '#',
      isActive: true,
      children: 'Active section'
    });
    const item = container.querySelector('li.pf-v6-c-jump-links__item');
    expect(item).toHaveClass('pf-m-current');
    expect(item).toHaveAttribute('aria-current', 'location');
  });

  it('does not apply active state when isActive is false', () => {
    const { container } = render(JumpLinksItem, {
      href: '#',
      isActive: false,
      children: 'Inactive section'
    });
    const item = container.querySelector('li.pf-v6-c-jump-links__item');
    expect(item).not.toHaveClass('pf-m-current');
    expect(item).not.toHaveAttribute('aria-current');
  });

  it('uses default href when not provided', () => {
    const { container } = render(JumpLinksItem, { children: 'Test section' });
    const link = container.querySelector('a.pf-v6-c-button.pf-m-link');
    expect(link).toHaveAttribute('href', '#');
  });

  it('applies custom class', () => {
    const { container } = render(JumpLinksItem, {
      href: '#',
      class: 'custom-class',
      children: 'Test section'
    });
    const item = container.querySelector('li.pf-v6-c-jump-links__item');
    expect(item).toHaveClass('custom-class');
  });

  it('applies aria-label when provided', () => {
    const { container } = render(JumpLinksItem, {
      href: '#',
      'aria-label': 'Custom label',
      children: 'Test section'
    });
    const link = container.querySelector('a.pf-v6-c-button.pf-m-link');
    expect(link).toHaveAttribute('aria-label', 'Custom label');
  });
});

