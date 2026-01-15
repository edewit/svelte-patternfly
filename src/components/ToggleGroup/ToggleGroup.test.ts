import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte/svelte5';
import ToggleGroup from './ToggleGroup.svelte';
import ToggleGroupItem from './ToggleGroupItem.svelte';

describe('ToggleGroup', () => {
  it('renders with default props', () => {
    const { container } = render(ToggleGroup);
    const group = container.querySelector('.pf-v6-c-toggle-group');
    expect(group).toBeInTheDocument();
    expect(group).toHaveAttribute('role', 'group');
  });

  it('renders with aria-label', () => {
    const { container } = render(ToggleGroup, { 'aria-label': 'Test toggle group' });
    const group = container.querySelector('.pf-v6-c-toggle-group');
    expect(group).toHaveAttribute('aria-label', 'Test toggle group');
  });

  it('renders with compact variant', () => {
    const { container } = render(ToggleGroup, { isCompact: true });
    const group = container.querySelector('.pf-v6-c-toggle-group');
    expect(group).toHaveClass('pf-m-compact');
  });

  it('renders with custom class', () => {
    const { container } = render(ToggleGroup, { class: 'custom-class' });
    const group = container.querySelector('.pf-v6-c-toggle-group');
    expect(group).toHaveClass('custom-class');
  });
});

describe('ToggleGroupItem', () => {
  it('renders with text', () => {
    const { container } = render(ToggleGroupItem, { text: 'Option 1' });
    const item = container.querySelector('.pf-v6-c-toggle-group__item');
    expect(item).toBeInTheDocument();
    const text = container.querySelector('.pf-v6-c-toggle-group__text');
    expect(text).toHaveTextContent('Option 1');
  });

  it('renders with button id', () => {
    const { container } = render(ToggleGroupItem, { text: 'Option 1', buttonId: 'test-button' });
    const button = container.querySelector('.pf-v6-c-toggle-group__button');
    expect(button).toHaveAttribute('id', 'test-button');
  });

  it('renders selected state', () => {
    const { container } = render(ToggleGroupItem, { text: 'Option 1', isSelected: true });
    const button = container.querySelector('.pf-v6-c-toggle-group__button');
    expect(button).toHaveClass('pf-m-selected');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders unselected state', () => {
    const { container } = render(ToggleGroupItem, { text: 'Option 1', isSelected: false });
    const button = container.querySelector('.pf-v6-c-toggle-group__button');
    expect(button).not.toHaveClass('pf-m-selected');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders disabled state', () => {
    const { container } = render(ToggleGroupItem, { text: 'Option 1', isDisabled: true });
    const button = container.querySelector('.pf-v6-c-toggle-group__button');
    expect(button).toBeDisabled();
  });

  it('renders with aria-label', () => {
    const { container } = render(ToggleGroupItem, { 'aria-label': 'Custom label' });
    const button = container.querySelector('.pf-v6-c-toggle-group__button');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
  });

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn();
    const { container } = render(ToggleGroupItem, {
      text: 'Option 1',
      buttonId: 'test-button',
      isSelected: false,
      onChange
    });
    const button = container.querySelector('.pf-v6-c-toggle-group__button');
    await fireEvent.click(button!);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(MouseEvent), true);
  });

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn();
    const { container } = render(ToggleGroupItem, {
      text: 'Option 1',
      isDisabled: true,
      onChange
    });
    const button = container.querySelector('.pf-v6-c-toggle-group__button');
    await fireEvent.click(button!);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with custom class', () => {
    const { container } = render(ToggleGroupItem, { text: 'Option 1', class: 'custom-class' });
    const button = container.querySelector('.pf-v6-c-toggle-group__button');
    expect(button).toHaveClass('custom-class');
  });
});
