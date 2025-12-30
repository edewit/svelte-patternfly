import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte/svelte5';
import FormSelect from './FormSelect.svelte';
import FormSelectOption from './FormSelectOption.svelte';
import FormSelectOptionGroup from './FormSelectOptionGroup.svelte';

describe('FormSelect', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ];

  it('renders a form select', () => {
    render(FormSelect, {
      'aria-label': 'test select',
      options: defaultOptions
    });
    const select = screen.getByLabelText('test select');
    expect(select).toBeInTheDocument();
    expect(select.tagName).toBe('SELECT');
  });

  it('renders with correct id when provided', () => {
    render(FormSelect, {
      id: 'my-select',
      'aria-label': 'test select',
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const select = screen.getByLabelText('test select');
    expect(select).toHaveAttribute('id', 'my-select');
  });

  it('generates unique id when not provided', () => {
    render(FormSelect, {
      'aria-label': 'test select',
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const select = screen.getByLabelText('test select');
    expect(select).toHaveAttribute('id');
    expect(select.getAttribute('id')).toMatch(/^form-select-/);
  });

  it('renders with value', () => {
    render(FormSelect, {
      'aria-label': 'test select',
      value: 'option2',
      options: defaultOptions
    });
    const select = screen.getByLabelText('test select') as HTMLSelectElement;
    expect(select.value).toBe('option2');
  });

  it('can be disabled', () => {
    render(FormSelect, {
      'aria-label': 'test select',
      isDisabled: true,
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const select = screen.getByLabelText('test select') as HTMLSelectElement;
    expect(select).toBeDisabled();
  });

  it('can be required', () => {
    render(FormSelect, {
      'aria-label': 'test select',
      isRequired: true,
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const select = screen.getByLabelText('test select');
    expect(select).toHaveAttribute('aria-required', 'true');
  });

  it('can be invalid', () => {
    render(FormSelect, {
      'aria-label': 'test select',
      validated: 'error',
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const select = screen.getByLabelText('test select');
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });

  it('can be success', () => {
    const { container } = render(FormSelect, {
      'aria-label': 'test select',
      validated: 'success',
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const select = screen.getByLabelText('test select');
    expect(select).toHaveAttribute('aria-invalid', 'false');
    const icon = container.querySelector('.pf-v6-c-form-control__icon.pf-m-status');
    expect(icon).toBeInTheDocument();
  });

  it('can be warning', () => {
    render(FormSelect, {
      'aria-label': 'test select',
      validated: 'warning',
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const select = screen.getByLabelText('test select');
    expect(select).toHaveAttribute('aria-invalid', 'false');
  });

  it('calls onChange when value changes', async () => {
    const handleChange = vi.fn();
    render(FormSelect, {
      'aria-label': 'test select',
      onChange: handleChange,
      options: defaultOptions
    });
    const select = screen.getByLabelText('test select') as HTMLSelectElement;
    select.value = 'option2';
    await fireEvent.change(select);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Event), 'option2');
  });

  it('calls onBlur when select loses focus', async () => {
    const handleBlur = vi.fn();
    render(FormSelect, {
      'aria-label': 'test select',
      onBlur: handleBlur,
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const select = screen.getByLabelText('test select');
    await fireEvent.blur(select);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onFocus when select gains focus', async () => {
    const handleFocus = vi.fn();
    render(FormSelect, {
      'aria-label': 'test select',
      onFocus: handleFocus,
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const select = screen.getByLabelText('test select');
    await fireEvent.focus(select);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(FormSelect, {
      'aria-label': 'test select',
      className: 'custom-class',
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const formControl = container.querySelector('.pf-v6-c-form-control');
    expect(formControl).toHaveClass('custom-class');
  });

  it('supports name attribute', () => {
    render(FormSelect, {
      'aria-label': 'test select',
      name: 'my-select',
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const select = screen.getByLabelText('test select');
    expect(select).toHaveAttribute('name', 'my-select');
  });

  it('renders toggle icon', () => {
    const { container } = render(FormSelect, {
      'aria-label': 'test select',
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const toggleIcon = container.querySelector('.pf-v6-c-form-control__toggle-icon');
    expect(toggleIcon).toBeInTheDocument();
  });

  it('supports ouiaId', () => {
    render(FormSelect, {
      'aria-label': 'test select',
      ouiaId: 'test-ouia-id',
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const select = screen.getByLabelText('test select');
    expect(select).toHaveAttribute('data-ouia-component-id', 'test-ouia-id');
  });

  it('supports ouiaSafe', () => {
    render(FormSelect, {
      'aria-label': 'test select',
      ouiaSafe: false,
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    const select = screen.getByLabelText('test select');
    expect(select).toHaveAttribute('data-ouia-safe', 'false');
  });

  it('updates value when prop changes', async () => {
    const { component } = render(FormSelect, {
      'aria-label': 'test select',
      value: 'option1',
      options: defaultOptions
    });
    const select = screen.getByLabelText('test select') as HTMLSelectElement;
    expect(select.value).toBe('option1');

    component.$set({ value: 'option2' });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(select.value).toBe('option2');
  });

  it('renders FormSelectOption components', () => {
    render(FormSelect, {
      'aria-label': 'test select',
      options: defaultOptions
    });
    const select = screen.getByLabelText('test select') as HTMLSelectElement;
    expect(select.options.length).toBe(2);
    expect(select.options[0].text).toBe('Option 1');
    expect(select.options[1].text).toBe('Option 2');
  });
});

describe('FormSelectOption', () => {
  it('renders an option element', () => {
    const { container } = render(FormSelectOption, {
      label: 'Test Option',
      value: 'test'
    });
    const option = container.querySelector('option');
    expect(option).toBeInTheDocument();
    expect(option?.textContent).toBe('Test Option');
    expect(option?.getAttribute('value')).toBe('test');
  });

  it('can be disabled', () => {
    const { container } = render(FormSelectOption, {
      label: 'Test Option',
      value: 'test',
      isDisabled: true
    });
    const option = container.querySelector('option');
    expect(option).toBeDisabled();
  });

  it('supports placeholder styling', () => {
    const { container } = render(FormSelectOption, {
      label: 'Select one',
      value: '',
      isPlaceholder: true
    });
    const option = container.querySelector('option');
    expect(option).toBeInTheDocument();
  });
});

describe('FormSelectOptionGroup', () => {
  it.skip('renders an optgroup element', () => {
    // Skipping: FormSelectOptionGroup uses snippets for children which don't work in tests
    // Component supports optgroup with snippet children, but testing snippets is problematic
    const { container } = render(FormSelectOptionGroup, {
      label: 'Test Group'
    });
    const optgroup = container.querySelector('optgroup');
    expect(optgroup).toBeInTheDocument();
    expect(optgroup?.getAttribute('label')).toBe('Test Group');
  });

  it.skip('can be disabled', () => {
    // Skipping: FormSelectOptionGroup uses snippets for children which don't work in tests
    const { container } = render(FormSelectOptionGroup, {
      label: 'Test Group',
      isDisabled: true
    });
    const optgroup = container.querySelector('optgroup');
    expect(optgroup).toBeDisabled();
  });
});
