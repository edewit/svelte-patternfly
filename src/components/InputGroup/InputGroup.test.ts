import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import InputGroup from './InputGroup.svelte';
import InputGroupItem from './InputGroupItem.svelte';
import InputGroupText from './InputGroupText.svelte';
import TextInput from '../TextInput/TextInput.svelte';

describe('InputGroup', () => {
  it('renders an input group', () => {
    const { container } = render(InputGroup);
    const inputGroup = container.querySelector('.pf-v6-c-input-group');
    expect(inputGroup).toBeInTheDocument();
  });

  it('renders children', () => {
    const { container } = render(InputGroup, {
      children: () => '<div>Test content</div>'
    });
    const inputGroup = container.querySelector('.pf-v6-c-input-group');
    expect(inputGroup).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(InputGroup, {
      className: 'custom-class'
    });
    const inputGroup = container.querySelector('.pf-v6-c-input-group');
    expect(inputGroup).toHaveClass('custom-class');
  });

  it('applies custom class prop', () => {
    const { container } = render(InputGroup, {
      class: 'custom-class-prop'
    });
    const inputGroup = container.querySelector('.pf-v6-c-input-group');
    expect(inputGroup).toHaveClass('custom-class-prop');
  });
});

describe('InputGroupItem', () => {
  it('renders an input group item', () => {
    const { container } = render(InputGroupItem);
    const item = container.querySelector('.pf-v6-c-input-group__item');
    expect(item).toBeInTheDocument();
  });

  it('applies isFill modifier', () => {
    const { container } = render(InputGroupItem, {
      isFill: true
    });
    const item = container.querySelector('.pf-v6-c-input-group__item');
    expect(item).toHaveClass('pf-m-fill');
  });

  it('applies isBox modifier', () => {
    const { container } = render(InputGroupItem, {
      isBox: true
    });
    const item = container.querySelector('.pf-v6-c-input-group__item');
    expect(item).toHaveClass('pf-m-box');
  });

  it('applies isDisabled modifier', () => {
    const { container } = render(InputGroupItem, {
      isDisabled: true
    });
    const item = container.querySelector('.pf-v6-c-input-group__item');
    expect(item).toHaveClass('pf-m-disabled');
  });

  it('applies isPlain modifier', () => {
    const { container } = render(InputGroupItem, {
      isPlain: true
    });
    const item = container.querySelector('.pf-v6-c-input-group__item');
    expect(item).toHaveClass('pf-m-plain');
  });

  it('applies custom className', () => {
    const { container } = render(InputGroupItem, {
      className: 'custom-class'
    });
    const item = container.querySelector('.pf-v6-c-input-group__item');
    expect(item).toHaveClass('custom-class');
  });

  it('renders children', () => {
    const { container } = render(InputGroupItem, {
      children: () => '<div>Test content</div>'
    });
    const item = container.querySelector('.pf-v6-c-input-group__item');
    expect(item).toBeInTheDocument();
  });
});

describe('InputGroupText', () => {
  it('renders an input group text as span by default', () => {
    const { container } = render(InputGroupText);
    const text = container.querySelector('.pf-v6-c-input-group__text');
    expect(text).toBeInTheDocument();
    expect(text?.tagName.toLowerCase()).toBe('span');
  });

  it('renders as div when component is div', () => {
    const { container } = render(InputGroupText, {
      component: 'div'
    });
    const text = container.querySelector('.pf-v6-c-input-group__text');
    expect(text?.tagName.toLowerCase()).toBe('div');
  });

  it('renders as label when component is label', () => {
    const { container } = render(InputGroupText, {
      component: 'label'
    });
    const text = container.querySelector('.pf-v6-c-input-group__text');
    expect(text?.tagName.toLowerCase()).toBe('label');
  });

  it('renders as button when component is button', () => {
    const { container } = render(InputGroupText, {
      component: 'button'
    });
    const text = container.querySelector('.pf-v6-c-input-group__text');
    expect(text?.tagName.toLowerCase()).toBe('button');
  });

  it('renders string children', () => {
    const { container } = render(InputGroupText, {
      children: 'Test text'
    });
    const text = container.querySelector('.pf-v6-c-input-group__text');
    expect(text).toHaveTextContent('Test text');
  });

  it('applies isDisabled modifier', () => {
    const { container } = render(InputGroupText, {
      isDisabled: true
    });
    const text = container.querySelector('.pf-v6-c-input-group__text');
    expect(text).toHaveClass('pf-m-disabled');
  });

  it('applies isPlain modifier', () => {
    const { container } = render(InputGroupText, {
      isPlain: true
    });
    const text = container.querySelector('.pf-v6-c-input-group__text');
    expect(text).toHaveClass('pf-m-plain');
  });

  it('applies custom className', () => {
    const { container } = render(InputGroupText, {
      className: 'custom-class'
    });
    const text = container.querySelector('.pf-v6-c-input-group__text');
    expect(text).toHaveClass('custom-class');
  });
});

