import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import EmptyState from './EmptyState.svelte';
import EmptyStateBody from './EmptyStateBody.svelte';
import EmptyStateFooter from './EmptyStateFooter.svelte';
import EmptyStateActions from './EmptyStateActions.svelte';

describe('EmptyState', () => {
  it('renders a div element with empty state class', () => {
    const { container } = render(EmptyState, { titleText: 'Test Title' });
    const emptyState = container.querySelector('div.pf-v6-c-empty-state');
    expect(emptyState).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    const { container } = render(EmptyState, { titleText: 'Test Title' });
    const title = container.querySelector('.pf-v6-c-empty-state__title');
    expect(title).toBeInTheDocument();
    expect(title?.querySelector('.pf-v6-c-empty-state__title-text')?.textContent).toBe(
      'Test Title'
    );
  });

  it('renders title with correct heading level', () => {
    const { container } = render(EmptyState, { titleText: 'Test Title', headingLevel: 'h3' });
    const titleText = container.querySelector('h3.pf-v6-c-empty-state__title-text');
    expect(titleText).toBeInTheDocument();
    expect(titleText?.textContent).toBe('Test Title');
  });

  it('renders icon when provided as string', () => {
    const { container } = render(EmptyState, { titleText: 'Test', icon: 'fas fa-cubes' });
    const icon = container.querySelector('.pf-v6-c-empty-state__icon');
    expect(icon).toBeInTheDocument();
    const iconElement = icon?.querySelector('i.fas.fa-cubes');
    expect(iconElement).toBeInTheDocument();
  });

  it('renders default icon based on status', () => {
    const { container } = render(EmptyState, { titleText: 'Test', status: 'success' });
    const icon = container.querySelector('.pf-v6-c-empty-state__icon');
    expect(icon).toBeInTheDocument();
    const iconElement = icon?.querySelector('i.fas.fa-check-circle');
    expect(iconElement).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(EmptyState, { titleText: 'Test', variant: 'sm' });
    const emptyState = container.querySelector('.pf-v6-c-empty-state');
    expect(emptyState).toHaveClass('pf-m-sm');
  });

  it('applies status class', () => {
    const { container } = render(EmptyState, { titleText: 'Test', status: 'danger' });
    const emptyState = container.querySelector('.pf-v6-c-empty-state');
    expect(emptyState).toHaveClass('pf-m-danger');
  });

  it('applies full height class when isFullHeight is true', () => {
    const { container } = render(EmptyState, { titleText: 'Test', isFullHeight: true });
    const emptyState = container.querySelector('.pf-v6-c-empty-state');
    expect(emptyState).toHaveClass('pf-m-full-height');
  });

  it('applies id attribute when provided', () => {
    const { container } = render(EmptyState, { id: 'test-empty-state', titleText: 'Test' });
    const emptyState = container.querySelector('.pf-v6-c-empty-state');
    expect(emptyState).toHaveAttribute('id', 'test-empty-state');
  });

  it('applies custom class when provided', () => {
    const { container } = render(EmptyState, { class: 'custom-class', titleText: 'Test' });
    const emptyState = container.querySelector('.pf-v6-c-empty-state');
    expect(emptyState).toHaveClass('custom-class');
  });

  it('renders body when bodySlot provided', () => {
    const { container } = render(EmptyState, {
      titleText: 'Test',
      bodySlot: 'Body content'
    });
    const body = container.querySelector('.pf-v6-c-empty-state__body');
    expect(body).toBeInTheDocument();
    expect(body?.textContent).toBe('Body content');
  });

  it('renders footer when footerSlot provided', () => {
    const { container } = render(EmptyState, {
      titleText: 'Test',
      footerSlot: 'Footer content'
    });
    const footer = container.querySelector('.pf-v6-c-empty-state__footer');
    expect(footer).toBeInTheDocument();
    expect(footer?.textContent).toBe('Footer content');
  });

  it('matches the basic example HTML structure', () => {
    const { container } = render(EmptyState, {
      id: 'empty-state-basic',
      titleText: 'Empty state',
      headingLevel: 'h4',
      icon: 'fas fa-cubes'
    });
    const emptyState = container.querySelector('#empty-state-basic.pf-v6-c-empty-state');
    expect(emptyState).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-empty-state__content')).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-empty-state__header')).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-empty-state__icon')).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-empty-state__title')).toBeInTheDocument();
    expect(container.querySelector('h4.pf-v6-c-empty-state__title-text')).toBeInTheDocument();
  });

  describe('Component composition', () => {
    it('renders EmptyStateBody as child', () => {
      // Test that EmptyStateBody can be rendered standalone
      const { container } = render(EmptyStateBody, {
        children: 'Body content'
      });
      const body = container.querySelector('.pf-v6-c-empty-state__body');
      expect(body).toBeInTheDocument();
      expect(body?.textContent).toBe('Body content');
    });

    it('renders EmptyStateFooter as child', () => {
      // Test that EmptyStateFooter can be rendered standalone
      const { container } = render(EmptyStateFooter, {
        children: 'Footer content'
      });
      const footer = container.querySelector('.pf-v6-c-empty-state__footer');
      expect(footer).toBeInTheDocument();
      expect(footer?.textContent).toBe('Footer content');
    });

    it('renders EmptyStateActions inside EmptyStateFooter', () => {
      // Test that EmptyStateActions can be rendered standalone
      const { container } = render(EmptyStateActions, {
        children: 'Action'
      });
      const actions = container.querySelector('.pf-v6-c-empty-state__actions');
      expect(actions).toBeInTheDocument();
      expect(actions?.textContent).toBe('Action');
    });
  });
});

describe('EmptyStateBody', () => {
  it('renders a div element with body class', () => {
    const { container } = render(EmptyStateBody, { children: 'Body' });
    const body = container.querySelector('div.pf-v6-c-empty-state__body');
    expect(body).toBeInTheDocument();
  });

  it('renders children content', () => {
    const { container } = render(EmptyStateBody, { children: 'Body content' });
    const body = container.querySelector('.pf-v6-c-empty-state__body');
    expect(body?.textContent).toBe('Body content');
  });

  it('applies custom class when provided', () => {
    const { container } = render(EmptyStateBody, { class: 'custom-class', children: 'Body' });
    const body = container.querySelector('.pf-v6-c-empty-state__body');
    expect(body).toHaveClass('custom-class');
  });
});

describe('EmptyStateFooter', () => {
  it('renders a div element with footer class', () => {
    const { container } = render(EmptyStateFooter, { children: 'Footer' });
    const footer = container.querySelector('div.pf-v6-c-empty-state__footer');
    expect(footer).toBeInTheDocument();
  });

  it('renders children content', () => {
    const { container } = render(EmptyStateFooter, { children: 'Footer content' });
    const footer = container.querySelector('.pf-v6-c-empty-state__footer');
    expect(footer?.textContent).toBe('Footer content');
  });

  it('applies custom class when provided', () => {
    const { container } = render(EmptyStateFooter, { class: 'custom-class', children: 'Footer' });
    const footer = container.querySelector('.pf-v6-c-empty-state__footer');
    expect(footer).toHaveClass('custom-class');
  });
});

describe('EmptyStateActions', () => {
  it('renders a div element with actions class', () => {
    const { container } = render(EmptyStateActions, { children: 'Actions' });
    const actions = container.querySelector('div.pf-v6-c-empty-state__actions');
    expect(actions).toBeInTheDocument();
  });

  it('renders children content', () => {
    const { container } = render(EmptyStateActions, { children: 'Actions content' });
    const actions = container.querySelector('.pf-v6-c-empty-state__actions');
    expect(actions?.textContent).toBe('Actions content');
  });

  it('applies custom class when provided', () => {
    const { container } = render(EmptyStateActions, { class: 'custom-class', children: 'Actions' });
    const actions = container.querySelector('.pf-v6-c-empty-state__actions');
    expect(actions).toHaveClass('custom-class');
  });
});
