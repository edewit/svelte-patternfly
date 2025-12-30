import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import Content from './Content.svelte';
import { ContentVariants } from './types';

describe('Content', () => {
  it('renders as wrapper div when no component prop is provided', () => {
    const { container } = render(Content, { children: 'Test content' });
    const wrapper = container.querySelector('.pf-v6-c-content');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.tagName).toBe('DIV');
  });

  it('renders h1 element with correct classes', () => {
    const { container } = render(Content, {
      component: ContentVariants.h1,
      children: 'Hello World'
    });
    const heading = container.querySelector('h1');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('pf-v6-c-content--h1');
    expect(heading?.textContent).toBe('Hello World');
  });

  it('applies page title modifier to h1', () => {
    const { container } = render(Content, {
      component: ContentVariants.h1,
      isPageTitle: true,
      children: 'Hello World'
    });
    const heading = container.querySelector('h1');
    expect(heading).toHaveClass('pf-m-page-title');
  });

  it('renders p element with correct classes', () => {
    const { container } = render(Content, {
      component: ContentVariants.p,
      children: 'Paragraph text'
    });
    const paragraph = container.querySelector('p');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('pf-v6-c-content--p');
    expect(paragraph?.textContent).toBe('Paragraph text');
  });

  it('renders a element with href', () => {
    const { container } = render(Content, {
      component: ContentVariants.a,
      href: '#',
      children: 'Link text'
    });
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('pf-v6-c-content--a');
    expect(link?.getAttribute('href')).toBe('#');
    expect(link?.textContent).toBe('Link text');
  });

  it('applies plain modifier to ul', () => {
    const { container } = render(Content, { component: ContentVariants.ul, isPlain: true });
    const list = container.querySelector('ul');
    expect(list).toHaveClass('pf-m-plain');
  });

  it('applies plain modifier to ol', () => {
    const { container } = render(Content, { component: ContentVariants.ol, isPlain: true });
    const list = container.querySelector('ol');
    expect(list).toHaveClass('pf-m-plain');
  });

  it('applies plain modifier to a', () => {
    const { container } = render(Content, {
      component: ContentVariants.a,
      href: '#',
      isPlain: true,
      children: 'Link'
    });
    const link = container.querySelector('a');
    expect(link).toHaveClass('pf-m-plain');
  });

  it('renders hr element', () => {
    const { container } = render(Content, { component: ContentVariants.hr });
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass('pf-v6-c-content--hr');
  });

  it('applies editorial modifier to wrapper', () => {
    const { container } = render(Content, { isEditorial: true, children: 'Content' });
    const wrapper = container.querySelector('.pf-v6-c-content');
    expect(wrapper).toHaveClass('pf-m-editorial');
  });

  it('renders blockquote element', () => {
    const { container } = render(Content, {
      component: ContentVariants.blockquote,
      children: 'Quote text'
    });
    const blockquote = container.querySelector('blockquote');
    expect(blockquote).toBeInTheDocument();
    expect(blockquote).toHaveClass('pf-v6-c-content--blockquote');
  });

  it('renders dl element', () => {
    const { container } = render(Content, { component: ContentVariants.dl });
    const dl = container.querySelector('dl');
    expect(dl).toBeInTheDocument();
    expect(dl).toHaveClass('pf-v6-c-content--dl');
  });

  it('renders dt element', () => {
    const { container } = render(Content, { component: ContentVariants.dt, children: 'Term' });
    const dt = container.querySelector('dt');
    expect(dt).toBeInTheDocument();
    expect(dt).toHaveClass('pf-v6-c-content--dt');
  });

  it('renders dd element', () => {
    const { container } = render(Content, {
      component: ContentVariants.dd,
      children: 'Description'
    });
    const dd = container.querySelector('dd');
    expect(dd).toBeInTheDocument();
    expect(dd).toHaveClass('pf-v6-c-content--dd');
  });

  it('renders small element', () => {
    const { container } = render(Content, {
      component: ContentVariants.small,
      children: 'Small text'
    });
    const small = container.querySelector('small');
    expect(small).toBeInTheDocument();
    expect(small).toHaveClass('pf-v6-c-content--small');
  });

  it('applies custom class', () => {
    const { container } = render(Content, {
      component: ContentVariants.p,
      class: 'custom-class',
      children: 'Text'
    });
    const paragraph = container.querySelector('p');
    expect(paragraph).toHaveClass('custom-class');
  });

  it('renders all heading levels', () => {
    const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
    levels.forEach((level) => {
      const { container } = render(Content, {
        component: ContentVariants[level],
        children: `Heading ${level}`
      });
      const heading = container.querySelector(level);
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass(`pf-v6-c-content--${level}`);
    });
  });
});
