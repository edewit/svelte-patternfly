import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import Title from './Title.svelte';

describe('Title', () => {
  it('renders an h1 element when headingLevel is h1', () => {
    const { container } = render(Title, { headingLevel: 'h1', children: 'Test' });
    const h1 = container.querySelector('h1.pf-v6-c-title');
    expect(h1).toBeInTheDocument();
  });

  it('renders an h2 element when headingLevel is h2', () => {
    const { container } = render(Title, { headingLevel: 'h2', children: 'Test' });
    const h2 = container.querySelector('h2.pf-v6-c-title');
    expect(h2).toBeInTheDocument();
  });

  it('renders an h3 element when headingLevel is h3', () => {
    const { container } = render(Title, { headingLevel: 'h3', children: 'Test' });
    const h3 = container.querySelector('h3.pf-v6-c-title');
    expect(h3).toBeInTheDocument();
  });

  it('renders an h4 element when headingLevel is h4', () => {
    const { container } = render(Title, { headingLevel: 'h4', children: 'Test' });
    const h4 = container.querySelector('h4.pf-v6-c-title');
    expect(h4).toBeInTheDocument();
  });

  it('renders an h5 element when headingLevel is h5', () => {
    const { container } = render(Title, { headingLevel: 'h5', children: 'Test' });
    const h5 = container.querySelector('h5.pf-v6-c-title');
    expect(h5).toBeInTheDocument();
  });

  it('renders an h6 element when headingLevel is h6', () => {
    const { container } = render(Title, { headingLevel: 'h6', children: 'Test' });
    const h6 = container.querySelector('h6.pf-v6-c-title');
    expect(h6).toBeInTheDocument();
  });

  it('applies default size pf-m-2xl for h1', () => {
    const { container } = render(Title, { headingLevel: 'h1', children: 'Test' });
    const title = container.querySelector('.pf-v6-c-title');
    expect(title).toHaveClass('pf-m-2xl');
  });

  it('applies default size pf-m-xl for h2', () => {
    const { container } = render(Title, { headingLevel: 'h2', children: 'Test' });
    const title = container.querySelector('.pf-v6-c-title');
    expect(title).toHaveClass('pf-m-xl');
  });

  it('applies default size pf-m-lg for h3', () => {
    const { container } = render(Title, { headingLevel: 'h3', children: 'Test' });
    const title = container.querySelector('.pf-v6-c-title');
    expect(title).toHaveClass('pf-m-lg');
  });

  it('applies default size pf-m-md for h4', () => {
    const { container } = render(Title, { headingLevel: 'h4', children: 'Test' });
    const title = container.querySelector('.pf-v6-c-title');
    expect(title).toHaveClass('pf-m-md');
  });

  it('applies custom size when provided', () => {
    const { container } = render(Title, { headingLevel: 'h1', size: '4xl', children: 'Test' });
    const title = container.querySelector('.pf-v6-c-title');
    expect(title).toHaveClass('pf-m-4xl');
  });

  it('applies 3xl size', () => {
    const { container } = render(Title, { headingLevel: 'h1', size: '3xl', children: 'Test' });
    const title = container.querySelector('.pf-v6-c-title');
    expect(title).toHaveClass('pf-m-3xl');
  });

  it('applies lg size', () => {
    const { container } = render(Title, { headingLevel: 'h1', size: 'lg', children: 'Test' });
    const title = container.querySelector('.pf-v6-c-title');
    expect(title).toHaveClass('pf-m-lg');
  });

  it('applies md size', () => {
    const { container } = render(Title, { headingLevel: 'h1', size: 'md', children: 'Test' });
    const title = container.querySelector('.pf-v6-c-title');
    expect(title).toHaveClass('pf-m-md');
  });

  it('renders children content', () => {
    const { container } = render(Title, { headingLevel: 'h1', children: 'Test Title' });
    const title = container.querySelector('.pf-v6-c-title');
    expect(title?.textContent).toBe('Test Title');
  });

  it('applies custom class', () => {
    const { container } = render(Title, {
      headingLevel: 'h1',
      class: 'custom-class',
      children: 'Test'
    });
    const title = container.querySelector('.pf-v6-c-title');
    expect(title).toHaveClass('custom-class');
  });
});
