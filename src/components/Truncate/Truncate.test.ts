import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import Truncate from './Truncate.svelte';

describe('Truncate', () => {
  const testContent = 'redhat_logo_black_and_white_reversed_simple_with_fedora_container.zip';

  it('renders a span element with correct class', () => {
    const { container } = render(Truncate, { content: testContent });
    const truncate = container.querySelector('span.pf-v6-c-truncate');
    expect(truncate).toBeInTheDocument();
  });

  it('has tabindex="0" for keyboard accessibility', () => {
    const { container } = render(Truncate, { content: testContent });
    const truncate = container.querySelector('span.pf-v6-c-truncate');
    expect(truncate).toHaveAttribute('tabindex', '0');
  });

  it('renders content in start span for end truncation (default)', () => {
    const { container } = render(Truncate, { content: testContent });
    const startSpan = container.querySelector('.pf-v6-c-truncate__start');
    expect(startSpan).toBeInTheDocument();
    expect(startSpan?.textContent).toBe(testContent);
  });

  it('renders content in end span for start truncation', () => {
    const { container } = render(Truncate, { content: testContent, position: 'start' });
    const endSpan = container.querySelector('.pf-v6-c-truncate__end');
    expect(endSpan).toBeInTheDocument();
    expect(endSpan?.textContent).toBe(testContent);
  });

  it('renders both start and end spans for middle truncation', () => {
    const { container } = render(Truncate, { content: testContent, position: 'middle' });
    const startSpan = container.querySelector('.pf-v6-c-truncate__start');
    const endSpan = container.querySelector('.pf-v6-c-truncate__end');
    expect(startSpan).toBeInTheDocument();
    expect(endSpan).toBeInTheDocument();
  });

  it('splits content correctly for middle truncation with default trailingNumChars', () => {
    const { container } = render(Truncate, {
      content: testContent,
      position: 'middle',
      trailingNumChars: 7
    });
    const startSpan = container.querySelector('.pf-v6-c-truncate__start');
    const endSpan = container.querySelector('.pf-v6-c-truncate__end');

    // Default trailingNumChars is 7
    const expectedEnd = testContent.slice(-7);
    const expectedStart = testContent.slice(0, testContent.length - 7);

    expect(startSpan?.textContent).toBe(expectedStart);
    expect(endSpan?.textContent).toBe(expectedEnd);
  });

  it('splits content correctly for middle truncation with custom trailingNumChars', () => {
    const { container } = render(Truncate, {
      content: testContent,
      position: 'middle',
      trailingNumChars: 15
    });
    const startSpan = container.querySelector('.pf-v6-c-truncate__start');
    const endSpan = container.querySelector('.pf-v6-c-truncate__end');

    const expectedEnd = testContent.slice(-15);
    const expectedStart = testContent.slice(0, testContent.length - 15);

    expect(startSpan?.textContent).toBe(expectedStart);
    expect(endSpan?.textContent).toBe(expectedEnd);
  });

  it('applies custom class', () => {
    const { container } = render(Truncate, {
      content: testContent,
      class: 'custom-class'
    });
    const truncate = container.querySelector('span.pf-v6-c-truncate');
    expect(truncate).toHaveClass('custom-class');
  });

  it('renders full content when position is end', () => {
    const { container } = render(Truncate, { content: testContent, position: 'end' });
    const startSpan = container.querySelector('.pf-v6-c-truncate__start');
    expect(startSpan?.textContent).toBe(testContent);
  });
});
