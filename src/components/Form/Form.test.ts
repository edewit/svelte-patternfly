import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import Form from './Form.svelte';
import FormGroup from './FormGroup.svelte';
import FormHelperText from './FormHelperText.svelte';
import HelperText from '../HelperText/HelperText.svelte';
import HelperTextItem from '../HelperText/HelperTextItem.svelte';
import FormGroupLabelHelp from './FormGroupLabelHelp.svelte';
import ActionGroup from './ActionGroup.svelte';
import TextInput from '../TextInput/TextInput.svelte';
import { createRawSnippet } from 'svelte';

describe('Form', () => {
  it('renders a form element', () => {
    const { container } = render(Form);
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass('pf-v6-c-form');
  });

  it('applies horizontal class when isHorizontal is true', () => {
    const { container } = render(Form, { isHorizontal: true });
    const form = container.querySelector('form');
    expect(form).toHaveClass('pf-m-horizontal');
  });

  it('applies limit-width class when isWidthLimited is true', () => {
    const { container } = render(Form, { isWidthLimited: true });
    const form = container.querySelector('form');
    expect(form).toHaveClass('pf-m-limit-width');
  });

  it('applies custom maxWidth style', () => {
    const { container } = render(Form, { maxWidth: '500px' });
    const form = container.querySelector('form');
    expect(form).toHaveStyle({ 'max-width': '500px' });
  });

  it('has novalidate attribute', () => {
    const { container } = render(Form);
    const form = container.querySelector('form');
    expect(form).toHaveAttribute('novalidate');
  });

  it('applies custom className', () => {
    const { container } = render(Form, { className: 'custom-class' });
    const form = container.querySelector('form');
    expect(form).toHaveClass('custom-class');
  });
});

describe('FormGroup', () => {
  it('renders a form group', () => {
    const { container } = render(FormGroup, { fieldId: 'test-group' });
    const group = container.querySelector('.pf-v6-c-form__group');
    expect(group).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(FormGroup, { label: 'Test Label', fieldId: 'test-group' });
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  it('renders required indicator when isRequired is true', () => {
    const { container } = render(FormGroup, {
      label: 'Required Field',
      isRequired: true,
      fieldId: 'test-group'
    });
    const requiredIndicator = container.querySelector('.pf-v6-c-form__label-required');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator?.textContent).toBe('*');
  });

  it('applies hasNoPaddingTop class when hasNoPaddingTop is true', () => {
    const { container } = render(FormGroup, {
      hasNoPaddingTop: true,
      fieldId: 'test-group'
    });
    const group = container.querySelector('.pf-v6-c-form__group');
    expect(group).toHaveClass('pf-m-no-padding-top');
  });

  it('applies inline class when isInline is true', () => {
    const { container } = render(FormGroup, {
      isInline: true,
      fieldId: 'test-group'
    });
    const control = container.querySelector('.pf-v6-c-form__group-control');
    expect(control).toHaveClass('pf-m-inline');
  });

  it('applies stack class when isStack is true', () => {
    const { container } = render(FormGroup, {
      isStack: true,
      fieldId: 'test-group'
    });
    const control = container.querySelector('.pf-v6-c-form__group-control');
    expect(control).toHaveClass('pf-m-stack');
  });

  it('sets role attribute when provided', () => {
    const { container } = render(FormGroup, {
      role: 'group',
      fieldId: 'test-group'
    });
    const group = container.querySelector('.pf-v6-c-form__group');
    expect(group).toHaveAttribute('role', 'group');
  });

  it('sets fieldId attribute', () => {
    const { container } = render(FormGroup, { fieldId: 'my-field-id' });
    const group = container.querySelector('.pf-v6-c-form__group');
    expect(group).toHaveAttribute('fieldId', 'my-field-id');
  });

  it('connects label to fieldId', () => {
    render(FormGroup, { label: 'Test Label', fieldId: 'my-input' });
    const label = screen.getByText('Test Label');
    expect(label.closest('label')).toHaveAttribute('for', 'my-input');
  });

  it('renders labelInfo when provided', () => {
    const { container } = render(FormGroup, {
      label: 'Test Label',
      labelInfo: 'Additional info',
      fieldId: 'test-group'
    });
    const labelInfo = container.querySelector('.pf-v6-c-form__group-label-info');
    expect(labelInfo).toBeInTheDocument();
    expect(labelInfo?.textContent).toContain('Additional info');
  });

  it('renders labelHelp when provided', () => {
    const helpSnippet = createRawSnippet(() => ({
      render: () => '<button>Help</button>'
    }));
    const { container } = render(FormGroup, {
      label: 'Test Label',
      labelHelp: helpSnippet,
      fieldId: 'test-group'
    });
    const labelHelp = container.querySelector('.pf-v6-c-form__group-label-help');
    expect(labelHelp).toBeInTheDocument();
  });

  it('generates unique fieldId when not provided', () => {
    const { container } = render(FormGroup);
    const group = container.querySelector('.pf-v6-c-form__group');
    const fieldId = group?.getAttribute('fieldId');
    expect(fieldId).toBeTruthy();
    expect(fieldId).toMatch(/^form-group-/);
  });

  it('sets aria-labelledby when role and label are provided', () => {
    const { container } = render(FormGroup, {
      role: 'group',
      label: 'Test Label',
      fieldId: 'test-group'
    });
    const group = container.querySelector('.pf-v6-c-form__group');
    expect(group).toHaveAttribute('aria-labelledby');
  });
});

describe('FormHelperText', () => {
  it('renders a form helper text wrapper', () => {
    const { container } = render(FormHelperText);
    const helperText = container.querySelector('.pf-v6-c-form__helper-text');
    expect(helperText).toBeInTheDocument();
  });

  it('renders children', () => {
    const childrenSnippet = createRawSnippet(() => ({
      render: () => '<span>Helper text content</span>'
    }));
    const { container } = render(FormHelperText, { children: childrenSnippet });
    expect(container.textContent).toContain('Helper text content');
  });

  it('applies custom className', () => {
    const { container } = render(FormHelperText, { className: 'custom-class' });
    const helperText = container.querySelector('.pf-v6-c-form__helper-text');
    expect(helperText).toHaveClass('custom-class');
  });
});

describe('FormGroupLabelHelp', () => {
  it('renders a help button', () => {
    const { container } = render(FormGroupLabelHelp, {
      'aria-label': 'Help button'
    });
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('pf-v6-c-button');
    expect(button).toHaveClass('pf-m-plain');
  });

  it('has correct aria-label', () => {
    render(FormGroupLabelHelp, {
      'aria-label': 'More information'
    });
    const button = screen.getByLabelText('More information');
    expect(button).toBeInTheDocument();
  });

  it('renders help icon', () => {
    const { container } = render(FormGroupLabelHelp, {
      'aria-label': 'Help button'
    });
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(FormGroupLabelHelp, {
      'aria-label': 'Help button',
      className: 'custom-class'
    });
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });
});

describe('ActionGroup', () => {
  it('renders an action group', () => {
    const { container } = render(ActionGroup);
    const group = container.querySelector('.pf-v6-c-form__group');
    expect(group).toBeInTheDocument();
    expect(group).toHaveClass('pf-m-action');
  });

  it('renders children', () => {
    const childrenSnippet = createRawSnippet(() => ({
      render: () => '<button>Action</button>'
    }));
    const { container } = render(ActionGroup, { children: childrenSnippet });
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button?.textContent).toBe('Action');
  });

  it('applies custom className', () => {
    const { container } = render(ActionGroup, { className: 'custom-class' });
    const group = container.querySelector('.pf-v6-c-form__group');
    expect(group).toHaveClass('custom-class');
  });
});
