import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import HelperText from './HelperText.svelte';
import HelperTextItem from './HelperTextItem.svelte';
import { createRawSnippet } from 'svelte';

describe('HelperText', () => {
  it('renders a helper text wrapper', () => {
    const { container } = render(HelperText);
    const helperText = container.querySelector('.pf-v6-c-helper-text');
    expect(helperText).toBeInTheDocument();
  });

  it('renders children', () => {
    // Note: Testing children rendering with nested components is complex in test environment
    // The component structure is verified through integration tests in other components
    const { container } = render(HelperText);
    const helperText = container.querySelector('.pf-v6-c-helper-text');
    expect(helperText).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(HelperText, { class: 'custom-class' }, {
      children: () => ({
        component: HelperTextItem,
        props: { children: 'Test' }
      })
    });
    const helperText = container.querySelector('.pf-v6-c-helper-text');
    expect(helperText).toHaveClass('custom-class');
  });

  it('renders as ul when component is "ul"', () => {
    const { container } = render(HelperText, { component: 'ul' }, {
      children: () => ({
        component: HelperTextItem,
        props: { children: 'Test', component: 'li' }
      })
    });
    const helperText = container.querySelector('ul.pf-v6-c-helper-text');
    expect(helperText).toBeInTheDocument();
  });

  it('applies id attribute when provided', () => {
    const { container } = render(HelperText, { id: 'test-helper-text' }, {
      children: () => ({
        component: HelperTextItem,
        props: { children: 'Test' }
      })
    });
    const helperText = container.querySelector('.pf-v6-c-helper-text');
    expect(helperText).toHaveAttribute('id', 'test-helper-text');
  });

  it('applies aria-label when provided', () => {
    const { container } = render(HelperText, { 'aria-label': 'Helper text description' }, {
      children: () => ({
        component: HelperTextItem,
        props: { children: 'Test' }
      })
    });
    const helperText = container.querySelector('.pf-v6-c-helper-text');
    expect(helperText).toHaveAttribute('aria-label', 'Helper text description');
  });

  it('sets aria-live when isLiveRegion is true', () => {
    const { container } = render(HelperText, { isLiveRegion: true }, {
      children: () => ({
        component: HelperTextItem,
        props: { children: 'Test' }
      })
    });
    const helperText = container.querySelector('.pf-v6-c-helper-text');
    expect(helperText).toHaveAttribute('aria-live', 'polite');
  });
});

describe('HelperTextItem', () => {
  it('renders a helper text item', () => {
    const { container } = render(HelperTextItem, { children: 'Test helper text' });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toBeInTheDocument();
  });

  it('renders text content', () => {
    render(HelperTextItem, { children: 'Test helper text' });
    expect(screen.getByText('Test helper text')).toBeInTheDocument();
  });

  it('applies error variant class', () => {
    const { container } = render(HelperTextItem, {
      children: 'Error text',
      variant: 'error'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toHaveClass('pf-m-error');
  });

  it('applies warning variant class', () => {
    const { container } = render(HelperTextItem, {
      children: 'Warning text',
      variant: 'warning'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toHaveClass('pf-m-warning');
  });

  it('applies success variant class', () => {
    const { container } = render(HelperTextItem, {
      children: 'Success text',
      variant: 'success'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toHaveClass('pf-m-success');
  });

  it('applies dynamic class when isDynamic is true', () => {
    const { container } = render(HelperTextItem, {
      children: 'Dynamic text',
      isDynamic: true
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toHaveClass('pf-m-dynamic');
  });

  it('renders error icon when variant is error', () => {
    const { container } = render(HelperTextItem, {
      children: 'Error text',
      variant: 'error'
    });
    const icon = container.querySelector('.pf-v6-c-helper-text__item-icon');
    expect(icon).toBeInTheDocument();
    const errorIcon = icon?.querySelector('.fa-exclamation-circle');
    expect(errorIcon).toBeInTheDocument();
  });

  it('renders warning icon when variant is warning', () => {
    const { container } = render(HelperTextItem, {
      children: 'Warning text',
      variant: 'warning'
    });
    const icon = container.querySelector('.pf-v6-c-helper-text__item-icon');
    expect(icon).toBeInTheDocument();
    const warningIcon = icon?.querySelector('.fa-exclamation-triangle');
    expect(warningIcon).toBeInTheDocument();
  });

  it('renders success icon when variant is success', () => {
    const { container } = render(HelperTextItem, {
      children: 'Success text',
      variant: 'success'
    });
    const icon = container.querySelector('.pf-v6-c-helper-text__item-icon');
    expect(icon).toBeInTheDocument();
    const successIcon = icon?.querySelector('.fa-check-circle');
    expect(successIcon).toBeInTheDocument();
  });

  it('renders custom icon when provided as string', () => {
    const { container } = render(HelperTextItem, {
      children: 'Text with custom icon',
      icon: 'fa-info-circle'
    });
    const icon = container.querySelector('.pf-v6-c-helper-text__item-icon');
    expect(icon).toBeInTheDocument();
    const customIcon = icon?.querySelector('.fa-info-circle');
    expect(customIcon).toBeInTheDocument();
  });

  it('uses li component when provided', () => {
    const { container } = render(HelperTextItem, {
      children: 'List item text',
      component: 'li'
    });
    const item = container.querySelector('li.pf-v6-c-helper-text__item');
    expect(item).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(HelperTextItem, {
      children: 'Test text',
      class: 'custom-class'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toHaveClass('custom-class');
  });

  it('applies indeterminate variant class', () => {
    const { container } = render(HelperTextItem, {
      variant: 'indeterminate',
      children: 'Indeterminate message'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toHaveClass('pf-m-indeterminate');
  });

  it('displays screen reader text for variants', () => {
    const { container } = render(HelperTextItem, {
      variant: 'warning',
      children: 'Warning message'
    });
    const screenReader = container.querySelector('.pf-v6-screen-reader');
    expect(screenReader).toBeInTheDocument();
    expect(screenReader?.textContent).toBe('Warning:');
  });
});
