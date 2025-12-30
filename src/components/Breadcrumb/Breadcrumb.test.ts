import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import Breadcrumb from './Breadcrumb.svelte';
import type { BreadcrumbItem } from './types';

describe('Breadcrumb', () => {
  const basicItems: BreadcrumbItem[] = [
    { href: '#', text: 'Section home' },
    { href: '#', text: 'Section title' },
    { href: '#', text: 'Section landing', isCurrent: true }
  ];

  it('renders a nav element with breadcrumb class', () => {
    const { container } = render(Breadcrumb, { items: basicItems });
    const nav = container.querySelector('nav.pf-v6-c-breadcrumb');
    expect(nav).toBeInTheDocument();
  });

  it('renders an ordered list with breadcrumb list class', () => {
    const { container } = render(Breadcrumb, { items: basicItems });
    const list = container.querySelector('ol.pf-v6-c-breadcrumb__list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute('role', 'list');
  });

  it('renders all breadcrumb items', () => {
    render(Breadcrumb, { items: basicItems });
    expect(screen.getByText('Section home')).toBeInTheDocument();
    expect(screen.getByText('Section title')).toBeInTheDocument();
    expect(screen.getByText('Section landing')).toBeInTheDocument();
  });

  it('renders links for non-current items', () => {
    const { container } = render(Breadcrumb, { items: basicItems });
    const links = container.querySelectorAll('a.pf-v6-c-breadcrumb__link');
    expect(links.length).toBe(3);
    expect(links[0]).toHaveAttribute('href', '#');
    expect(links[1]).toHaveAttribute('href', '#');
  });

  it('marks current item with pf-m-current class and aria-current', () => {
    const { container } = render(Breadcrumb, { items: basicItems });
    const currentLink = container.querySelector('a.pf-m-current');
    expect(currentLink).toBeInTheDocument();
    expect(currentLink).toHaveAttribute('aria-current', 'page');
    expect(currentLink?.textContent).toBe('Section landing');
  });

  it('renders dividers for all items', () => {
    const { container } = render(Breadcrumb, { items: basicItems });
    const dividers = container.querySelectorAll('.pf-v6-c-breadcrumb__item-divider');
    // All items have dividers
    expect(dividers.length).toBe(3);
  });

  it('renders divider before first item', () => {
    const { container } = render(Breadcrumb, { items: basicItems });
    const firstItem = container.querySelector('li.pf-v6-c-breadcrumb__item:first-child');
    const divider = firstItem?.querySelector('.pf-v6-c-breadcrumb__item-divider');
    expect(divider).toBeInTheDocument();
  });

  it('applies default aria-label', () => {
    const { container } = render(Breadcrumb, { items: basicItems });
    const nav = container.querySelector('nav.pf-v6-c-breadcrumb');
    expect(nav).toHaveAttribute('aria-label', 'breadcrumb');
  });

  it('applies custom aria-label', () => {
    const { container } = render(Breadcrumb, {
      items: basicItems,
      'aria-label': 'Navigation breadcrumb'
    });
    const nav = container.querySelector('nav.pf-v6-c-breadcrumb');
    expect(nav).toHaveAttribute('aria-label', 'Navigation breadcrumb');
  });

  it('handles items without href', () => {
    const items: BreadcrumbItem[] = [
      { text: 'No link item' },
      { text: 'Current page', isCurrent: true }
    ];
    const { container } = render(Breadcrumb, { items });
    const spans = container.querySelectorAll('span.pf-v6-c-breadcrumb__link');
    expect(spans.length).toBeGreaterThan(0);
  });

  it('handles empty items array', () => {
    const { container } = render(Breadcrumb, { items: [] });
    const list = container.querySelector('ol.pf-v6-c-breadcrumb__list');
    expect(list).toBeInTheDocument();
    expect(list?.children.length).toBe(0);
  });

  it('applies custom class', () => {
    const { container } = render(Breadcrumb, {
      items: basicItems,
      class: 'custom-class'
    });
    const nav = container.querySelector('nav.pf-v6-c-breadcrumb');
    expect(nav).toHaveClass('custom-class');
  });

  it('renders dropdown item with menu toggle', () => {
    const items: BreadcrumbItem[] = [
      { href: '#', text: 'Section home' },
      { type: 'dropdown', dropdownCount: 4, isExpanded: false }
    ];
    const { container } = render(Breadcrumb, { items });
    const dropdown = container.querySelector('.pf-v6-c-breadcrumb__dropdown');
    expect(dropdown).toBeInTheDocument();
    const button = container.querySelector('button.pf-v6-c-menu-toggle');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('pf-m-text', 'pf-m-small', 'pf-m-plain');
  });

  it('renders dropdown count badge', () => {
    const items: BreadcrumbItem[] = [{ type: 'dropdown', dropdownCount: 4, isExpanded: false }];
    const { container } = render(Breadcrumb, { items });
    const badge = container.querySelector('.pf-v6-c-badge');
    expect(badge).toBeInTheDocument();
    expect(badge?.textContent).toContain('4');
  });

  it('sets aria-expanded on dropdown button', () => {
    const items: BreadcrumbItem[] = [{ type: 'dropdown', dropdownCount: 4, isExpanded: true }];
    const { container } = render(Breadcrumb, { items });
    const button = container.querySelector('button.pf-v6-c-menu-toggle');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders heading item with h1 tag', () => {
    const items: BreadcrumbItem[] = [
      { type: 'heading', text: 'Page Title', headingLevel: 1, isCurrent: true }
    ];
    const { container } = render(Breadcrumb, { items });
    const heading = container.querySelector('h1.pf-v6-c-breadcrumb__heading');
    expect(heading).toBeInTheDocument();
  });

  it('renders heading with different heading levels', () => {
    const items: BreadcrumbItem[] = [{ type: 'heading', text: 'Title', headingLevel: 2 }];
    const { container } = render(Breadcrumb, { items });
    const heading = container.querySelector('h2.pf-v6-c-breadcrumb__heading');
    expect(heading).toBeInTheDocument();
  });

  it('renders heading with link inside', () => {
    const items: BreadcrumbItem[] = [
      { type: 'heading', href: '#', text: 'Page Title', headingLevel: 1, isCurrent: true }
    ];
    const { container } = render(Breadcrumb, { items });
    const heading = container.querySelector('h1.pf-v6-c-breadcrumb__heading');
    const link = heading?.querySelector('a.pf-v6-c-breadcrumb__link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('pf-m-current');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('renders complete dropdown example', () => {
    const items: BreadcrumbItem[] = [
      { href: '#', text: 'Section home' },
      { href: '#', text: 'Section title' },
      { type: 'dropdown', dropdownCount: 4, isExpanded: false },
      { type: 'heading', href: '#', text: 'Section title', isCurrent: true, headingLevel: 1 }
    ];
    const { container } = render(Breadcrumb, { items });
    expect(screen.getByText('Section home')).toBeInTheDocument();
    // Use getAllByText since 'Section title' appears twice
    const sectionTitles = screen.getAllByText('Section title');
    expect(sectionTitles.length).toBeGreaterThan(0);
    const dropdown = container.querySelector('.pf-v6-c-breadcrumb__dropdown');
    expect(dropdown).toBeInTheDocument();
    const heading = container.querySelector('h1.pf-v6-c-breadcrumb__heading');
    expect(heading).toBeInTheDocument();
  });

  it('renders dropdown menu items when dropdown is opened', async () => {
    const items: BreadcrumbItem[] = [
      {
        type: 'dropdown',
        dropdownCount: 3,
        dropdownItems: [
          { text: 'Edit', href: '#' },
          { text: 'Deployment', href: '#' },
          { text: 'Applications', href: '#' }
        ]
      }
    ];
    const { container } = render(Breadcrumb, { items });
    const button = container.querySelector('button.pf-v6-c-menu-toggle');
    expect(button).toBeInTheDocument();

    // Menu should not be visible initially
    let menu = container.querySelector('.pf-v6-c-menu');
    expect(menu).not.toBeInTheDocument();

    // Click to open dropdown
    if (button) {
      button.click();
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    // Menu should now be visible
    menu = container.querySelector('.pf-v6-c-menu');
    expect(menu).toBeInTheDocument();

    // Menu items should be rendered
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Deployment')).toBeInTheDocument();
    expect(screen.getByText('Applications')).toBeInTheDocument();
  });

  it('renders menu items as links when href is provided', () => {
    const items: BreadcrumbItem[] = [
      {
        type: 'dropdown',
        dropdownCount: 2,
        isExpanded: true,
        dropdownItems: [
          { text: 'Edit', href: '/edit' },
          { text: 'Delete', href: '/delete' }
        ]
      }
    ];
    const { container } = render(Breadcrumb, { items });
    const menuLinks = container.querySelectorAll('a.pf-v6-c-menu__item');
    expect(menuLinks.length).toBe(2);
    expect(menuLinks[0]).toHaveAttribute('href', '/edit');
    expect(menuLinks[1]).toHaveAttribute('href', '/delete');
  });

  it('renders menu items as buttons when href is not provided', () => {
    const items: BreadcrumbItem[] = [
      {
        type: 'dropdown',
        dropdownCount: 1,
        isExpanded: true,
        dropdownItems: [{ text: 'Action', onClick: () => {} }]
      }
    ];
    const { container } = render(Breadcrumb, { items });
    const menuButton = container.querySelector('button.pf-v6-c-menu__item');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton?.textContent?.trim()).toBe('Action');
  });
});
