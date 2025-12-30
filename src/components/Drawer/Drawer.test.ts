import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import DrawerExample from './DrawerExample.svelte';

describe('Drawer', () => {
  it('renders drawer component', () => {
    render(DrawerExample, { isExpanded: false });
    expect(screen.getByText('Toggle drawer')).toBeInTheDocument();
  });

  it('renders drawer content when expanded', () => {
    render(DrawerExample, { isExpanded: true });
    expect(screen.getByText('Drawer panel header content')).toBeInTheDocument();
    expect(screen.getByText('Drawer panel body content')).toBeInTheDocument();
  });

  it('hides drawer panel when not expanded', () => {
    const { container } = render(DrawerExample, { isExpanded: false });
    const panel = container.querySelector('.pf-v6-c-drawer__panel');
    expect(panel).toHaveAttribute('hidden');
  });
});
