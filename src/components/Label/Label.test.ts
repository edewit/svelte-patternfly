import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import Label from './Label.svelte';
import { createRawSnippet } from 'svelte';

describe('Label', () => {
  it('renders a span element', () => {
    const { container } = render(Label, {}, { children: 'Test Label' });
    const label = container.querySelector('span.pf-v6-c-label');
    expect(label).toBeInTheDocument();
  });

  it('applies filled variant by default', () => {
    const { container } = render(Label, {}, { children: 'Test Label' });
    const label = container.querySelector('.pf-v6-c-label');
    expect(label).toHaveClass('pf-m-filled');
  });

  it('applies outlined variant correctly', () => {
    const { container } = render(Label, { variant: 'outlined' }, { children: 'Test Label' });
    const label = container.querySelector('.pf-v6-c-label');
    expect(label).toHaveClass('pf-m-outlined');
  });

  it('applies color classes correctly', () => {
    const { container } = render(Label, { color: 'blue' }, { children: 'Test Label' });
    const label = container.querySelector('.pf-v6-c-label');
    expect(label).toHaveClass('pf-m-blue');
  });

  it('applies status classes correctly', () => {
    const { container } = render(Label, { status: 'success' }, { children: 'Test Label' });
    const label = container.querySelector('.pf-v6-c-label');
    expect(label).toHaveClass('pf-m-success');
  });

  it('applies compact variant correctly', () => {
    const { container } = render(Label, { isCompact: true }, { children: 'Test Label' });
    const label = container.querySelector('.pf-v6-c-label');
    expect(label).toHaveClass('pf-m-compact');
  });

  it('applies disabled state correctly', () => {
    const { container } = render(Label, { isDisabled: true }, { children: 'Test Label' });
    const label = container.querySelector('.pf-v6-c-label');
    expect(label).toHaveClass('pf-m-disabled');
  });

  it('displays children content', () => {
    const { container } = render(Label, { children: 'Test Label' });
    const label = container.querySelector('.pf-v6-c-label');
    expect(label?.textContent).toContain('Test Label');
  });

  it('renders icon when provided as string', () => {
    const { container } = render(Label, { icon: 'fas fa-cube' }, { children: 'Test Label' });
    const icon = container.querySelector('.pf-v6-c-label__icon i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('fas', 'fa-cube');
  });

  it('renders close button when onClose is provided', () => {
    const { container } = render(Label, { onClose: () => {} }, { children: 'Test Label' });
    const closeButton = container.querySelector('.pf-v6-c-label__actions button');
    expect(closeButton).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(Label, { onClose }, { children: 'Test Label' });
    const closeButton = container.querySelector('.pf-v6-c-label__actions button');
    closeButton?.click();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders as link when href is provided', () => {
    const { container } = render(Label, { href: '#test' }, { children: 'Test Label' });
    const link = container.querySelector('.pf-v6-c-label__content');
    expect(link?.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '#test');
  });

  it('renders as button when onClick is provided', () => {
    const { container } = render(Label, { onClick: () => {} }, { children: 'Test Label' });
    const button = container.querySelector('.pf-v6-c-label__content');
    expect(button?.tagName).toBe('BUTTON');
  });

  it('applies clickable class when href or onClick is provided', () => {
    const { container } = render(Label, { onClick: () => {} }, { children: 'Test Label' });
    const label = container.querySelector('.pf-v6-c-label');
    expect(label).toHaveClass('pf-m-clickable');
  });

  it('calls onClick when label is clicked', () => {
    const onClick = vi.fn();
    const { container } = render(Label, { onClick }, { children: 'Test Label' });
    const button = container.querySelector('.pf-v6-c-label__content');
    button?.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables link when isDisabled is true', () => {
    const { container } = render(Label, { href: '#test', isDisabled: true }, { children: 'Test Label' });
    const link = container.querySelector('.pf-v6-c-label__content');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
  });

  it('disables button when isDisabled is true', () => {
    const { container } = render(Label, { onClick: () => {}, isDisabled: true }, { children: 'Test Label' });
    const button = container.querySelector('.pf-v6-c-label__content');
    expect(button).toHaveAttribute('disabled');
  });

  it('applies textMaxWidth style when provided', () => {
    const { container } = render(Label, { textMaxWidth: '16ch' }, { children: 'Test Label' });
    const text = container.querySelector('.pf-v6-c-label__text');
    expect(text).toHaveStyle('--pf-v6-c-label__text--MaxWidth: 16ch');
  });

  it('applies custom class', () => {
    const { container } = render(Label, { class: 'custom-class' }, { children: 'Test Label' });
    const label = container.querySelector('.pf-v6-c-label');
    expect(label).toHaveClass('custom-class');
  });

  it('generates unique IDs for accessibility', () => {
    const { container } = render(Label, { onClose: () => {} }, { children: 'Test Label' });
    const label = container.querySelector('.pf-v6-c-label');
    const text = container.querySelector('.pf-v6-c-label__text');
    const closeButton = container.querySelector('.pf-v6-c-label__actions button');
    
    expect(label).toHaveAttribute('id');
    expect(text).toHaveAttribute('id');
    expect(closeButton).toHaveAttribute('id');
    
    const labelId = label?.getAttribute('id');
    const textId = text?.getAttribute('id');
    const buttonId = closeButton?.getAttribute('id');
    
    expect(textId).toContain(labelId);
    expect(buttonId).toContain(labelId);
  });

  it('uses provided id when given', () => {
    const { container } = render(Label, { id: 'custom-id' }, { children: 'Test Label' });
    const label = container.querySelector('.pf-v6-c-label');
    expect(label).toHaveAttribute('id', 'custom-id');
  });
});

