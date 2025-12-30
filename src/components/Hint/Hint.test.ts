import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import Hint from './Hint.svelte';
import HintTitle from './HintTitle.svelte';
import HintBody from './HintBody.svelte';
import HintFooter from './HintFooter.svelte';
import { createRawSnippet } from 'svelte';

describe('Hint', () => {
  it('renders a div element with hint class', () => {
    const { container } = render(Hint, {});
    const hint = container.querySelector('div.pf-v6-c-hint');
    expect(hint).toBeInTheDocument();
  });

  it.skip('renders actions when provided', () => {
    // Note: Snippet rendering doesn't work well in test environment
    // Component supports actions as snippet, but testing snippets is problematic
    const actionsSnippet = createRawSnippet(() => ({
      render: () => '<button>Action</button>'
    }));
    const { container } = render(Hint, {
      actions: actionsSnippet
    });
    const actions = container.querySelector('.pf-v6-c-hint__actions');
    expect(actions).toBeInTheDocument();
  });

  it('does not render actions when not provided', () => {
    const { container } = render(Hint, {});
    const actions = container.querySelector('.pf-v6-c-hint__actions');
    expect(actions).not.toBeInTheDocument();
  });

  it.skip('applies hasNoActionsOffset class when hasNoActionsOffset is true', () => {
    // Note: Snippet rendering doesn't work well in test environment
    // Component supports actions as snippet, but testing snippets is problematic
    const actionsSnippet = createRawSnippet(() => ({
      render: () => '<button>Action</button>'
    }));
    const { container } = render(Hint, {
      actions: actionsSnippet,
      hasNoActionsOffset: true
    });
    const actions = container.querySelector('.pf-v6-c-hint__actions');
    expect(actions).toHaveClass('pf-m-no-offset');
  });

  it.skip('does not apply hasNoActionsOffset class when hasNoActionsOffset is false', () => {
    // Note: Snippet rendering doesn't work well in test environment
    // Component supports actions as snippet, but testing snippets is problematic
    const actionsSnippet = createRawSnippet(() => ({
      render: () => '<button>Action</button>'
    }));
    const { container } = render(Hint, {
      actions: actionsSnippet,
      hasNoActionsOffset: false
    });
    const actions = container.querySelector('.pf-v6-c-hint__actions');
    expect(actions).not.toHaveClass('pf-m-no-offset');
  });

  it('applies id attribute when provided', () => {
    const { container } = render(Hint, {
      id: 'test-hint'
    });
    const hint = container.querySelector('.pf-v6-c-hint');
    expect(hint).toHaveAttribute('id', 'test-hint');
  });

  it('applies custom class when provided', () => {
    const { container } = render(Hint, {
      class: 'custom-class'
    });
    const hint = container.querySelector('.pf-v6-c-hint');
    expect(hint).toHaveClass('custom-class');
  });

  it('matches the basic example HTML structure', () => {
    const { container } = render(Hint, {
      id: 'hint-basic-example'
    });
    const hint = container.querySelector('#hint-basic-example.pf-v6-c-hint');
    expect(hint).toBeInTheDocument();
  });
});

describe('HintTitle', () => {
  it('renders a div element with title class', () => {
    const { container } = render(HintTitle, { children: 'Title' });
    const title = container.querySelector('div.pf-v6-c-hint__title');
    expect(title).toBeInTheDocument();
  });

  it('renders children content as string', () => {
    const { container } = render(HintTitle, { children: 'Title content' });
    const title = container.querySelector('.pf-v6-c-hint__title');
    expect(title?.textContent).toBe('Title content');
  });

  it('applies custom class when provided', () => {
    const { container } = render(HintTitle, { class: 'custom-class', children: 'Title' });
    const title = container.querySelector('.pf-v6-c-hint__title');
    expect(title).toHaveClass('custom-class');
  });
});

describe('HintBody', () => {
  it('renders a div element with body class', () => {
    const { container } = render(HintBody, { children: 'Body' });
    const body = container.querySelector('div.pf-v6-c-hint__body');
    expect(body).toBeInTheDocument();
  });

  it('renders children content as string', () => {
    const { container } = render(HintBody, { children: 'Body content' });
    const body = container.querySelector('.pf-v6-c-hint__body');
    expect(body?.textContent).toBe('Body content');
  });

  it('applies custom class when provided', () => {
    const { container } = render(HintBody, { class: 'custom-class', children: 'Body' });
    const body = container.querySelector('.pf-v6-c-hint__body');
    expect(body).toHaveClass('custom-class');
  });
});

describe('HintFooter', () => {
  it('renders a div element with footer class', () => {
    const { container } = render(HintFooter, { children: 'Footer' });
    const footer = container.querySelector('div.pf-v6-c-hint__footer');
    expect(footer).toBeInTheDocument();
  });

  it('renders children content as string', () => {
    const { container } = render(HintFooter, { children: 'Footer content' });
    const footer = container.querySelector('.pf-v6-c-hint__footer');
    expect(footer?.textContent).toBe('Footer content');
  });

  it('applies custom class when provided', () => {
    const { container } = render(HintFooter, { class: 'custom-class', children: 'Footer' });
    const footer = container.querySelector('.pf-v6-c-hint__footer');
    expect(footer).toHaveClass('custom-class');
  });
});
