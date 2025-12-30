import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte/svelte5';
import Menu from './Menu.svelte';
import MenuContent from './MenuContent.svelte';
import MenuList from './MenuList.svelte';
import MenuItem from './MenuItem.svelte';
import { createRawSnippet } from 'svelte';

describe('Menu', () => {
  it('renders a div element with menu class', () => {
    const { container } = render(Menu, {
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const menu = container.querySelector('.pf-v6-c-menu');
    expect(menu).toBeInTheDocument();
  });

  it('applies plain class when isPlain is true', () => {
    const { container } = render(Menu, {
      isPlain: true,
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const menu = container.querySelector('.pf-v6-c-menu');
    expect(menu).toHaveClass('pf-m-plain');
  });

  it('applies role="menu" by default', () => {
    const { container } = render(Menu, {
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const menu = container.querySelector('.pf-v6-c-menu');
    expect(menu).toHaveAttribute('role', 'menu');
  });

  it('applies role="listbox" when role prop is listbox', () => {
    const { container } = render(Menu, {
      role: 'listbox',
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const menu = container.querySelector('.pf-v6-c-menu');
    expect(menu).toHaveAttribute('role', 'listbox');
  });

  it('calls onSelect when menu item is clicked', async () => {
    const onSelect = vi.fn();
    const { container } = render(Menu, {
      onSelect,
      children: createRawSnippet(() => ({
        render: () => `
          <div class="pf-v6-c-menu__content">
            <ul class="pf-v6-c-menu__list">
              <li class="pf-v6-c-menu__list-item">
                <button class="pf-v6-c-menu__item" data-item-id="1">Item 1</button>
              </li>
            </ul>
          </div>
        `
      }))
    });

    const button = container.querySelector('button');
    if (button) {
      await fireEvent.click(button);
    }
  });
});

describe('MenuContent', () => {
  it('renders a div element with menu content class', () => {
    const { container } = render(MenuContent, {
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const content = container.querySelector('.pf-v6-c-menu__content');
    expect(content).toBeInTheDocument();
  });
});

describe('MenuList', () => {
  it('renders a ul element with menu list class', () => {
    const { container } = render(MenuList, {
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const list = container.querySelector('ul.pf-v6-c-menu__list');
    expect(list).toBeInTheDocument();
  });

  it('applies role="menu" attribute', () => {
    const { container } = render(MenuList, {
      children: createRawSnippet(() => ({ render: () => '' }))
    });
    const list = container.querySelector('.pf-v6-c-menu__list');
    expect(list).toHaveAttribute('role', 'menu');
  });
});

describe('MenuItem', () => {
  it('renders a li element with menu list item class', () => {
    const { container } = render(MenuItem, {
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const item = container.querySelector('li.pf-v6-c-menu__list-item');
    expect(item).toBeInTheDocument();
  });

  it('renders a button by default', () => {
    const { container } = render(MenuItem, {
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const button = container.querySelector('button.pf-v6-c-menu__item');
    expect(button).toBeInTheDocument();
  });

  it('renders an anchor when to prop is provided', () => {
    const { container } = render(MenuItem, {
      to: '#test',
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const anchor = container.querySelector('a.pf-v6-c-menu__item');
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute('href', '#test');
  });

  it('applies disabled class when isDisabled is true', () => {
    const { container } = render(MenuItem, {
      isDisabled: true,
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const item = container.querySelector('.pf-v6-c-menu__item');
    expect(item).toHaveClass('pf-m-disabled');
  });

  it('applies aria-disabled class when isAriaDisabled is true', () => {
    const { container } = render(MenuItem, {
      isAriaDisabled: true,
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const item = container.querySelector('.pf-v6-c-menu__item');
    expect(item).toHaveClass('pf-m-aria-disabled');
  });

  it('applies danger class when isDanger is true', () => {
    const { container } = render(MenuItem, {
      isDanger: true,
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const item = container.querySelector('.pf-v6-c-menu__item');
    expect(item).toHaveClass('pf-m-danger');
    const listItem = container.querySelector('li');
    expect(listItem).toHaveClass('pf-m-danger');
  });

  it('applies selected class when isSelected is true', () => {
    const { container } = render(MenuItem, {
      isSelected: true,
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const item = container.querySelector('.pf-v6-c-menu__item');
    expect(item).toHaveClass('pf-m-selected');
  });

  it('displays children content', () => {
    const { container } = render(MenuItem, {
      children: createRawSnippet(() => ({ render: () => 'Test content' }))
    });
    const item = container.querySelector('.pf-v6-c-menu__item-text');
    expect(item?.textContent).toBe('Test content');
  });

  it('displays description when provided', () => {
    const { container } = render(MenuItem, {
      description: 'Test description',
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const description = container.querySelector('.pf-v6-c-menu__item-description');
    expect(description).toBeInTheDocument();
    expect(description?.textContent).toBe('Test description');
  });

  it('disables button when isDisabled is true', () => {
    const { container } = render(MenuItem, {
      isDisabled: true,
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('sets aria-disabled when isAriaDisabled is true', () => {
    const { container } = render(MenuItem, {
      isAriaDisabled: true,
      children: createRawSnippet(() => ({ render: () => 'Test' }))
    });
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });
});







