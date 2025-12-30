import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import Sidebar from './Sidebar.svelte';
import SidebarPanel from './SidebarPanel.svelte';
import SidebarContent from './SidebarContent.svelte';

describe('Sidebar', () => {
  it('renders with default props', () => {
    const { container } = render(Sidebar);
    const sidebar = container.querySelector('.pf-v6-c-sidebar');
    expect(sidebar).toBeInTheDocument();
  });

  it('renders main container', () => {
    const { container } = render(Sidebar);
    const main = container.querySelector('.pf-v6-c-sidebar__main');
    expect(main).toBeInTheDocument();
  });

  it('applies gutter class when hasGutter is true', () => {
    const { container } = render(Sidebar, { props: { hasGutter: true } });
    const sidebar = container.querySelector('.pf-v6-c-sidebar');
    expect(sidebar).toHaveClass('pf-m-gutter');
  });

  it('applies no-background class when hasNoBackground is true', () => {
    const { container } = render(Sidebar, { props: { hasNoBackground: true } });
    const sidebar = container.querySelector('.pf-v6-c-sidebar');
    expect(sidebar).toHaveClass('pf-m-no-background');
  });

  it('applies panel-right class when isPanelRight is true', () => {
    const { container } = render(Sidebar, { props: { isPanelRight: true } });
    const sidebar = container.querySelector('.pf-v6-c-sidebar');
    expect(sidebar).toHaveClass('pf-m-panel-right');
  });

  it('applies stack class when orientation is stack', () => {
    const { container } = render(Sidebar, { props: { orientation: 'stack' } });
    const sidebar = container.querySelector('.pf-v6-c-sidebar');
    expect(sidebar).toHaveClass('pf-m-stack');
  });

  it('applies custom class', () => {
    const { container } = render(Sidebar, { props: { class: 'custom-class' } });
    const sidebar = container.querySelector('.pf-v6-c-sidebar');
    expect(sidebar).toHaveClass('custom-class');
  });

  it('applies aria-label', () => {
    const { container } = render(Sidebar, { props: { 'aria-label': 'Test sidebar' } });
    const sidebar = container.querySelector('.pf-v6-c-sidebar');
    expect(sidebar).toHaveAttribute('aria-label', 'Test sidebar');
  });

  it('applies tabIndex', () => {
    const { container } = render(Sidebar, { props: { tabIndex: 0 } });
    const sidebar = container.querySelector('.pf-v6-c-sidebar');
    expect(sidebar).toHaveAttribute('tabindex', '0');
  });
});

describe('SidebarPanel', () => {
  it('renders with default props', () => {
    const { container } = render(SidebarPanel);
    const panel = container.querySelector('.pf-v6-c-sidebar__panel');
    expect(panel).toBeInTheDocument();
  });

  it('applies sticky class when isSticky is true', () => {
    const { container } = render(SidebarPanel, { props: { isSticky: true } });
    const panel = container.querySelector('.pf-v6-c-sidebar__panel');
    expect(panel).toHaveClass('pf-m-sticky');
  });

  it('applies static class when isStatic is true', () => {
    const { container } = render(SidebarPanel, { props: { isStatic: true } });
    const panel = container.querySelector('.pf-v6-c-sidebar__panel');
    expect(panel).toHaveClass('pf-m-static');
  });

  it('applies border class when hasBorder is true', () => {
    const { container } = render(SidebarPanel, { props: { hasBorder: true } });
    const panel = container.querySelector('.pf-v6-c-sidebar__panel');
    expect(panel).toHaveClass('pf-m-border');
  });

  it('applies padding class when hasPadding is true', () => {
    const { container } = render(SidebarPanel, { props: { hasPadding: true } });
    const panel = container.querySelector('.pf-v6-c-sidebar__panel');
    expect(panel).toHaveClass('pf-m-padding');
  });

  it('applies no-flex class when hasNoFlex is true', () => {
    const { container } = render(SidebarPanel, { props: { hasNoFlex: true } });
    const panel = container.querySelector('.pf-v6-c-sidebar__panel');
    expect(panel).toHaveClass('pf-m-no-flex');
  });

  it('applies width class when width is set', () => {
    const { container } = render(SidebarPanel, { props: { width: '25' } });
    const panel = container.querySelector('.pf-v6-c-sidebar__panel');
    expect(panel).toHaveClass('pf-m-width-25');
  });

  it('applies custom class', () => {
    const { container } = render(SidebarPanel, { props: { class: 'custom-class' } });
    const panel = container.querySelector('.pf-v6-c-sidebar__panel');
    expect(panel).toHaveClass('custom-class');
  });
});

describe('SidebarContent', () => {
  it('renders with default props', () => {
    const { container } = render(SidebarContent);
    const content = container.querySelector('.pf-v6-c-sidebar__content');
    expect(content).toBeInTheDocument();
  });

  it('applies no-background class when hasNoBackground is true', () => {
    const { container } = render(SidebarContent, { props: { hasNoBackground: true } });
    const content = container.querySelector('.pf-v6-c-sidebar__content');
    expect(content).toHaveClass('pf-m-no-background');
  });

  it('applies padding class when hasPadding is true', () => {
    const { container } = render(SidebarContent, { props: { hasPadding: true } });
    const content = container.querySelector('.pf-v6-c-sidebar__content');
    expect(content).toHaveClass('pf-m-padding');
  });

  it('applies secondary class when isSecondary is true', () => {
    const { container } = render(SidebarContent, { props: { isSecondary: true } });
    const content = container.querySelector('.pf-v6-c-sidebar__content');
    expect(content).toHaveClass('pf-m-secondary');
  });

  it('applies custom class', () => {
    const { container } = render(SidebarContent, { props: { class: 'custom-class' } });
    const content = container.querySelector('.pf-v6-c-sidebar__content');
    expect(content).toHaveClass('custom-class');
  });
});

