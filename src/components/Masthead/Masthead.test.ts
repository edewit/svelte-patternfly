import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import Masthead from './Masthead.svelte';
import MastheadMain from './MastheadMain.svelte';
import MastheadToggle from './MastheadToggle.svelte';
import MastheadBrand from './MastheadBrand.svelte';
import MastheadLogo from './MastheadLogo.svelte';
import MastheadContent from './MastheadContent.svelte';

describe('Masthead', () => {
  it('renders a header element', () => {
    const { container } = render(Masthead, { id: 'test-masthead' });
    const header = container.querySelector('header.pf-v6-c-masthead');
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('id', 'test-masthead');
  });

  it('applies display classes correctly', () => {
    const { container } = render(Masthead, {
      id: 'test-masthead',
      display: { default: 'inline' }
    });
    const header = container.querySelector('.pf-v6-c-masthead');
    expect(header).toHaveClass('pf-m-display-inline');
  });

  it('applies responsive display classes', () => {
    const { container } = render(Masthead, {
      id: 'test-masthead',
      display: { default: 'stack', md: 'inline' }
    });
    const header = container.querySelector('.pf-v6-c-masthead');
    expect(header).toHaveClass('pf-m-display-stack');
    expect(header).toHaveClass('pf-m-display-inline-on-md');
  });

  it('applies inset classes correctly', () => {
    const { container } = render(Masthead, {
      id: 'test-masthead',
      inset: { default: 'insetMd' }
    });
    const header = container.querySelector('.pf-v6-c-masthead');
    expect(header).toHaveClass('pf-m-insetMd');
  });
});

describe('MastheadMain', () => {
  it('renders a div with correct class', () => {
    const { container } = render(MastheadMain);
    const div = container.querySelector('.pf-v6-c-masthead__main');
    expect(div).toBeInTheDocument();
  });
});

describe('MastheadToggle', () => {
  it('renders a span with correct class', () => {
    const { container } = render(MastheadToggle);
    const span = container.querySelector('.pf-v6-c-masthead__toggle');
    expect(span).toBeInTheDocument();
  });
});

describe('MastheadBrand', () => {
  it('renders a div with correct class', () => {
    const { container } = render(MastheadBrand);
    const div = container.querySelector('.pf-v6-c-masthead__brand');
    expect(div).toBeInTheDocument();
  });
});

describe('MastheadLogo', () => {
  it('renders an anchor by default', () => {
    const { container } = render(MastheadLogo, {
      component: 'a',
      href: '#',
      children: 'Logo'
    });
    const link = container.querySelector('a.pf-v6-c-masthead__logo');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#');
  });

  it('renders as specified component', () => {
    const { container } = render(MastheadLogo, {
      component: 'div',
      children: 'Logo'
    });
    const div = container.querySelector('div.pf-v6-c-masthead__logo');
    expect(div).toBeInTheDocument();
  });
});

describe('MastheadContent', () => {
  it('renders a div with correct class', () => {
    const { container } = render(MastheadContent, { children: 'Content' });
    const div = container.querySelector('.pf-v6-c-masthead__content');
    expect(div).toBeInTheDocument();
    expect(div?.textContent).toBe('Content');
  });
});

