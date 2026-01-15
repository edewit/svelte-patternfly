import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import Skeleton from './Skeleton.svelte';

describe('Skeleton', () => {
  it('renders a div element with correct class', () => {
    const { container } = render(Skeleton);
    const skeleton = container.querySelector('div.pf-v6-c-skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders screenreader text when provided', () => {
    const { container } = render(Skeleton, {
      screenreaderText: 'Loading content'
    });
    const srText = container.querySelector('.pf-v6-screen-reader');
    expect(srText).toBeInTheDocument();
    expect(srText?.textContent).toBe('Loading content');
  });

  it('does not render screenreader span when screenreaderText is not provided', () => {
    const { container } = render(Skeleton);
    const srText = container.querySelector('.pf-v6-screen-reader');
    expect(srText).not.toBeInTheDocument();
  });

  it('applies circle shape class', () => {
    const { container } = render(Skeleton, { shape: 'circle' });
    const skeleton = container.querySelector('.pf-v6-c-skeleton');
    expect(skeleton).toHaveClass('pf-m-circle');
  });

  it('applies square shape class', () => {
    const { container } = render(Skeleton, { shape: 'square' });
    const skeleton = container.querySelector('.pf-v6-c-skeleton');
    expect(skeleton).toHaveClass('pf-m-square');
  });

  it('applies font size class', () => {
    const { container } = render(Skeleton, { fontSize: 'lg' });
    const skeleton = container.querySelector('.pf-v6-c-skeleton');
    expect(skeleton).toHaveClass('pf-m-text-lg');
  });

  it('applies width style', () => {
    const { container } = render(Skeleton, { width: '200px' });
    const skeleton = container.querySelector('.pf-v6-c-skeleton');
    expect(skeleton?.getAttribute('style')).toContain('--pf-v6-c-skeleton--Width: 200px');
  });

  it('applies height style', () => {
    const { container } = render(Skeleton, { height: '100px' });
    const skeleton = container.querySelector('.pf-v6-c-skeleton');
    expect(skeleton?.getAttribute('style')).toContain('--pf-v6-c-skeleton--Height: 100px');
  });

  it('applies both width and height styles', () => {
    const { container } = render(Skeleton, { width: '200px', height: '100px' });
    const skeleton = container.querySelector('.pf-v6-c-skeleton');
    const style = skeleton?.getAttribute('style');
    expect(style).toContain('--pf-v6-c-skeleton--Width: 200px');
    expect(style).toContain('--pf-v6-c-skeleton--Height: 100px');
  });

  it('applies custom class', () => {
    const { container } = render(Skeleton, { class: 'custom-class' });
    const skeleton = container.querySelector('.pf-v6-c-skeleton');
    expect(skeleton).toHaveClass('custom-class');
  });
});
