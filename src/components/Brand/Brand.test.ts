import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import Brand from './Brand.svelte';

describe('Brand', () => {
  it('renders an img element', () => {
    render(Brand, {
      src: '/assets/images/PF-HorizontalLogo-Color.svg',
      alt: 'PatternFly logo'
    });
    const img = screen.getByAltText('PatternFly logo');
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe('IMG');
  });

  it('applies brand class by default', () => {
    const { container } = render(Brand, {
      src: '/assets/images/PF-HorizontalLogo-Color.svg',
      alt: 'PatternFly logo'
    });
    const img = container.querySelector('.pf-v6-c-brand');
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('pf-v6-c-brand');
  });

  it('sets src attribute', () => {
    render(Brand, {
      src: '/assets/images/PF-HorizontalLogo-Color.svg',
      alt: 'PatternFly logo'
    });
    const img = screen.getByAltText('PatternFly logo');
    expect(img).toHaveAttribute('src', '/assets/images/PF-HorizontalLogo-Color.svg');
  });

  it('sets alt attribute (required)', () => {
    render(Brand, {
      src: '/assets/images/PF-HorizontalLogo-Color.svg',
      alt: 'PatternFly logo'
    });
    const img = screen.getByAltText('PatternFly logo');
    expect(img).toHaveAttribute('alt', 'PatternFly logo');
  });

  it('applies custom width and height styles', () => {
    const { container } = render(Brand, {
      src: '/assets/images/PF-HorizontalLogo-Color.svg',
      alt: 'PatternFly logo',
      width: '200px',
      height: '50px'
    });
    const img = container.querySelector('.pf-v6-c-brand') as HTMLElement;
    expect(img).toHaveStyle('--pf-v6-c-brand--Width: 200px');
    expect(img).toHaveStyle('--pf-v6-c-brand--Height: 50px');
  });

  it('applies numeric width and height as pixels', () => {
    const { container } = render(Brand, {
      src: '/assets/images/PF-HorizontalLogo-Color.svg',
      alt: 'PatternFly logo',
      width: 300,
      height: 75
    });
    const img = container.querySelector('.pf-v6-c-brand') as HTMLElement;
    expect(img).toHaveStyle('--pf-v6-c-brand--Width: 300px');
    expect(img).toHaveStyle('--pf-v6-c-brand--Height: 75px');
  });

  it('applies custom class when provided', () => {
    const { container } = render(Brand, {
      src: '/assets/images/PF-HorizontalLogo-Color.svg',
      alt: 'PatternFly logo',
      class: 'custom-class'
    });
    const img = container.querySelector('.pf-v6-c-brand');
    expect(img).toHaveClass('custom-class');
  });
});
