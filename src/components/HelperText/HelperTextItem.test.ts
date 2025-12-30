import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import HelperTextItem from './HelperTextItem.svelte';
import { createRawSnippet } from 'svelte';

describe('HelperTextItem', () => {
  it('renders a div element by default', () => {
    const { container } = render(HelperTextItem, {
      children: 'Helper text item'
    });
    const item = container.querySelector('div.pf-v6-c-helper-text__item');
    expect(item).toBeInTheDocument();
  });

  it('renders as li when component is "li"', () => {
    const { container } = render(HelperTextItem, {
      component: 'li',
      children: 'Helper text item'
    });
    const item = container.querySelector('li.pf-v6-c-helper-text__item');
    expect(item).toBeInTheDocument();
  });

  it('applies default variant class', () => {
    const { container } = render(HelperTextItem, {
      variant: 'default',
      children: 'Default helper text'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toBeInTheDocument();
    expect(item).not.toHaveClass('pf-m-error', 'pf-m-warning', 'pf-m-success', 'pf-m-indeterminate');
  });

  it('applies error variant class', () => {
    const { container } = render(HelperTextItem, {
      variant: 'error',
      children: 'Error message'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toHaveClass('pf-m-error');
  });

  it('applies warning variant class', () => {
    const { container } = render(HelperTextItem, {
      variant: 'warning',
      children: 'Warning message'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toHaveClass('pf-m-warning');
  });

  it('applies success variant class', () => {
    const { container } = render(HelperTextItem, {
      variant: 'success',
      children: 'Success message'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toHaveClass('pf-m-success');
  });

  it('applies indeterminate variant class', () => {
    const { container } = render(HelperTextItem, {
      variant: 'indeterminate',
      children: 'Indeterminate message'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toHaveClass('pf-m-indeterminate');
  });

  it('displays default error icon when variant is error', () => {
    const { container } = render(HelperTextItem, {
      variant: 'error',
      children: 'Error message'
    });
    const icon = container.querySelector('.pf-v6-c-helper-text__item-icon');
    expect(icon).toBeInTheDocument();
    const errorIcon = icon?.querySelector('.fa-exclamation-circle');
    expect(errorIcon).toBeInTheDocument();
  });

  it('displays default warning icon when variant is warning', () => {
    const { container } = render(HelperTextItem, {
      variant: 'warning',
      children: 'Warning message'
    });
    const icon = container.querySelector('.pf-v6-c-helper-text__item-icon');
    expect(icon).toBeInTheDocument();
    const warningIcon = icon?.querySelector('.fa-exclamation-triangle');
    expect(warningIcon).toBeInTheDocument();
  });

  it('displays default success icon when variant is success', () => {
    const { container } = render(HelperTextItem, {
      variant: 'success',
      children: 'Success message'
    });
    const icon = container.querySelector('.pf-v6-c-helper-text__item-icon');
    expect(icon).toBeInTheDocument();
    const successIcon = icon?.querySelector('.fa-check-circle');
    expect(successIcon).toBeInTheDocument();
  });

  it('displays default indeterminate icon when variant is indeterminate', () => {
    const { container } = render(HelperTextItem, {
      variant: 'indeterminate',
      children: 'Indeterminate message'
    });
    const icon = container.querySelector('.pf-v6-c-helper-text__item-icon');
    expect(icon).toBeInTheDocument();
    const indeterminateIcon = icon?.querySelector('.fa-minus');
    expect(indeterminateIcon).toBeInTheDocument();
  });

  it('does not display icon for default variant', () => {
    const { container } = render(HelperTextItem, {
      variant: 'default',
      children: 'Default message'
    });
    const icon = container.querySelector('.pf-v6-c-helper-text__item-icon');
    expect(icon).not.toBeInTheDocument();
  });

  it('displays custom icon when provided as string', () => {
    const { container } = render(HelperTextItem, {
      icon: 'fa-info-circle',
      children: 'Custom icon message'
    });
    const icon = container.querySelector('.pf-v6-c-helper-text__item-icon');
    expect(icon).toBeInTheDocument();
    const customIcon = icon?.querySelector('.fa-info-circle');
    expect(customIcon).toBeInTheDocument();
  });

  it('applies id attribute when provided', () => {
    const { container } = render(HelperTextItem, {
      id: 'test-helper-text-item',
      children: 'Helper text item'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toHaveAttribute('id', 'test-helper-text-item');
  });

  it('displays screen reader text for error variant', () => {
    const { container } = render(HelperTextItem, {
      variant: 'error',
      children: 'Error message'
    });
    const screenReader = container.querySelector('.pf-v6-screen-reader');
    expect(screenReader).toBeInTheDocument();
    expect(screenReader?.textContent).toBe('Error:');
  });

  it('displays custom screen reader text when provided', () => {
    const { container } = render(HelperTextItem, {
      variant: 'error',
      screenReaderText: 'Custom error:',
      children: 'Error message'
    });
    const screenReader = container.querySelector('.pf-v6-screen-reader');
    expect(screenReader).toBeInTheDocument();
    expect(screenReader?.textContent).toBe('Custom error:');
  });

  it('displays children content', () => {
    const { container } = render(HelperTextItem, {
      children: 'Test helper text content'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item?.textContent).toContain('Test helper text content');
  });

  it('applies custom class', () => {
    const { container } = render(HelperTextItem, {
      class: 'custom-class',
      children: 'Helper text item'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toHaveClass('custom-class');
  });

  it('applies dynamic class when isDynamic is true', () => {
    const { container } = render(HelperTextItem, {
      isDynamic: true,
      children: 'Dynamic helper text'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item).toHaveClass('pf-m-dynamic');
  });

  it('renders children as string', () => {
    const { container } = render(HelperTextItem, {
      children: 'String content'
    });
    const item = container.querySelector('.pf-v6-c-helper-text__item');
    expect(item?.textContent).toContain('String content');
  });
});
