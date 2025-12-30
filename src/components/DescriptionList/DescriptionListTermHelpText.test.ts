import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import DescriptionListTermHelpText from './DescriptionListTermHelpText.svelte';
import DescriptionListTermHelpTextButton from './DescriptionListTermHelpTextButton.svelte';

describe('DescriptionListTermHelpText', () => {
  it('renders the description list term', () => {
    const { container } = render(DescriptionListTermHelpText);
    const term = container.querySelector('.pf-v6-c-description-list__term');
    expect(term).toBeInTheDocument();
    expect(term?.tagName).toBe('DT');
  });
});

describe('DescriptionListTermHelpTextButton', () => {
  it('renders the help text button span', () => {
    const { container } = render(DescriptionListTermHelpTextButton);
    const button = container.querySelector('.pf-v6-c-description-list__text');
    expect(button).toBeInTheDocument();
    expect(button?.tagName).toBe('SPAN');
  });

  it('applies help-text modifier class', () => {
    const { container } = render(DescriptionListTermHelpTextButton);
    const button = container.querySelector('.pf-v6-c-description-list__text');
    expect(button).toHaveClass('pf-m-help-text');
  });

  it('has button role attribute', () => {
    const { container } = render(DescriptionListTermHelpTextButton);
    const button = container.querySelector('.pf-v6-c-description-list__text');
    expect(button).toHaveAttribute('role', 'button');
  });

  it('has type="button" attribute', () => {
    const { container } = render(DescriptionListTermHelpTextButton);
    const button = container.querySelector('.pf-v6-c-description-list__text');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('has tabindex="0" by default', () => {
    const { container } = render(DescriptionListTermHelpTextButton);
    const button = container.querySelector('.pf-v6-c-description-list__text');
    expect(button).toHaveAttribute('tabindex', '0');
  });

  it('applies custom tabindex when provided', () => {
    const { container } = render(DescriptionListTermHelpTextButton, { tabindex: -1 });
    const button = container.querySelector('.pf-v6-c-description-list__text');
    expect(button).toHaveAttribute('tabindex', '-1');
  });

  it('applies aria-label when provided', () => {
    const { container } = render(DescriptionListTermHelpTextButton, {
      'aria-label': 'Help text button'
    });
    const button = container.querySelector('.pf-v6-c-description-list__text');
    expect(button).toHaveAttribute('aria-label', 'Help text button');
  });
});
