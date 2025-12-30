import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import List from './List.svelte';
import ListItem from './ListItem.svelte';
import { createRawSnippet } from 'svelte';

describe('List', () => {
  it('renders a ul element by default', () => {
    const { container } = render(List, {
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const list = container.querySelector('ul.pf-v6-c-list');
    expect(list).toBeInTheDocument();
  });

  it('renders an ol element when component is ol', () => {
    const { container } = render(List, {
      component: 'ol',
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const list = container.querySelector('ol.pf-v6-c-list');
    expect(list).toBeInTheDocument();
  });

  it('applies bordered class when isBordered is true', () => {
    const { container } = render(List, {
      isBordered: true,
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const list = container.querySelector('.pf-v6-c-list');
    expect(list).toHaveClass('pf-m-bordered');
  });

  it('applies plain class when isPlain is true', () => {
    const { container } = render(List, {
      isPlain: true,
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const list = container.querySelector('.pf-v6-c-list');
    expect(list).toHaveClass('pf-m-plain');
  });

  it('applies inline variant class when variant is inline', () => {
    const { container } = render(List, {
      variant: 'inline',
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const list = container.querySelector('.pf-v6-c-list');
    expect(list).toHaveClass('pf-m-inline');
  });

  it('applies icon-lg class when iconSize is large', () => {
    const { container } = render(List, {
      iconSize: 'large',
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const list = container.querySelector('.pf-v6-c-list');
    expect(list).toHaveClass('pf-m-icon-lg');
  });

  it('applies type attribute to ol element', () => {
    const { container } = render(List, {
      component: 'ol',
      type: 'a',
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const list = container.querySelector('ol.pf-v6-c-list');
    expect(list).toHaveAttribute('type', 'a');
  });

  it('applies aria-label attribute', () => {
    const { container } = render(List, {
      'aria-label': 'Test list',
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const list = container.querySelector('.pf-v6-c-list');
    expect(list).toHaveAttribute('aria-label', 'Test list');
  });

  it('applies role="list" attribute', () => {
    const { container } = render(List, {
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const list = container.querySelector('.pf-v6-c-list');
    expect(list).toHaveAttribute('role', 'list');
  });

  it('applies custom class', () => {
    const { container } = render(List, {
      class: 'custom-class',
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const list = container.querySelector('.pf-v6-c-list');
    expect(list).toHaveClass('custom-class');
  });
});

describe('ListItem', () => {
  it('renders a li element', () => {
    const { container } = render(ListItem, {
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const item = container.querySelector('li');
    expect(item).toBeInTheDocument();
  });

  it('does not add pf-v6-c-list__item class when there is no icon', () => {
    const { container } = render(ListItem, {
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const item = container.querySelector('li');
    expect(item).not.toHaveClass('pf-v6-c-list__item');
  });

  it('adds pf-v6-c-list__item class when there is an icon', () => {
    const iconSnippet = createRawSnippet(() => ({
      render: () => '<span>Icon</span>'
    }));
    const { container } = render(ListItem, {
      icon: iconSnippet,
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const item = container.querySelector('li');
    expect(item).toHaveClass('pf-v6-c-list__item');
  });

  it('displays children content', () => {
    const { container } = render(ListItem, {
      children: createRawSnippet(() => ({ render: () => 'Test content' }))
    });
    const item = container.querySelector('li');
    expect(item?.textContent).toBe('Test content');
  });

  it('renders icon when provided', () => {
    const iconSnippet = createRawSnippet(() => ({
      render: () => '<span>Icon</span>'
    }));
    const { container } = render(ListItem, {
      icon: iconSnippet,
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const icon = container.querySelector('.pf-v6-c-list__item-icon');
    expect(icon).toBeInTheDocument();
  });

  it('applies custom class', () => {
    const { container } = render(ListItem, {
      class: 'custom-class',
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const item = container.querySelector('li');
    expect(item).toHaveClass('custom-class');
  });
});

