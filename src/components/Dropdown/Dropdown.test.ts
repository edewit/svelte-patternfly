import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import Dropdown from './Dropdown.svelte';
import DropdownList from './DropdownList.svelte';
import DropdownItem from './DropdownItem.svelte';
import MenuToggle from './MenuToggle.svelte';

describe('Dropdown', () => {
  it('renders a dropdown element', () => {
    const { container } = render(Dropdown, {
      toggle: 'Dropdown',
      children: () => {}
    });
    const dropdown = container.querySelector('.pf-v6-c-dropdown');
    expect(dropdown).toBeInTheDocument();
  });

  it('renders menu toggle when provided as string', () => {
    const { container } = render(Dropdown, {
      toggle: 'Dropdown',
      children: () => {}
    });
    const toggle = container.querySelector('.pf-v6-c-menu-toggle');
    expect(toggle).toBeInTheDocument();
  });

  it('shows menu when isOpen is true', () => {
    const { container } = render(Dropdown, {
      isOpen: true,
      toggle: 'Dropdown',
      children: () => {}
    });
    const menu = container.querySelector('.pf-v6-c-menu');
    expect(menu).toBeInTheDocument();
  });

  it('hides menu when isOpen is false', () => {
    const { container } = render(Dropdown, {
      isOpen: false,
      toggle: 'Dropdown',
      children: () => {}
    });
    const menu = container.querySelector('.pf-v6-c-menu');
    expect(menu).not.toBeInTheDocument();
  });
});

describe('DropdownList', () => {
  it('renders a menu list', () => {
    const { container } = render(DropdownList, {
      children: () => {}
    });
    const list = container.querySelector('.pf-v6-c-menu__list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute('role', 'menu');
  });
});

describe('DropdownItem', () => {
  it('renders a menu item', () => {
    const { container } = render(DropdownItem, {
      children: 'Action'
    });
    const item = container.querySelector('.pf-v6-c-menu__item');
    expect(item).toBeInTheDocument();
  });

  it('can be disabled', () => {
    const { container } = render(DropdownItem, {
      isDisabled: true,
      children: 'Disabled'
    });
    const item = container.querySelector('.pf-v6-c-menu__item');
    expect(item).toHaveClass('pf-m-disabled');
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('can be aria-disabled', () => {
    const { container } = render(DropdownItem, {
      isAriaDisabled: true,
      children: 'Aria Disabled'
    });
    const item = container.querySelector('.pf-v6-c-menu__item');
    expect(item).toHaveClass('pf-m-aria-disabled');
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders as link when to prop is provided', () => {
    const { container } = render(DropdownItem, {
      to: '#link',
      children: 'Link'
    });
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#link');
  });
});

describe('MenuToggle', () => {
  it('renders a menu toggle button', () => {
    const { container } = render(MenuToggle, {
      children: 'Toggle'
    });
    const toggle = container.querySelector('.pf-v6-c-menu-toggle');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows expanded state when isExpanded is true', () => {
    const { container } = render(MenuToggle, {
      isExpanded: true,
      children: 'Toggle'
    });
    const toggle = container.querySelector('.pf-v6-c-menu-toggle');
    expect(toggle).toHaveClass('pf-m-expanded');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('can be disabled', () => {
    render(MenuToggle, {
      isDisabled: true,
      children: 'Toggle'
    });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});

