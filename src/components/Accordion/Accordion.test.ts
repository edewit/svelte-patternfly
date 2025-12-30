import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import Accordion from './Accordion.svelte';
import AccordionItem from './AccordionItem.svelte';
import AccordionToggle from './AccordionToggle.svelte';
import AccordionToggleText from './AccordionToggleText.svelte';
import AccordionToggleIcon from './AccordionToggleIcon.svelte';
import AccordionContent from './AccordionContent.svelte';
import AccordionExpandableContentBody from './AccordionExpandableContentBody.svelte';

describe('Accordion', () => {
  it('renders a div element by default', () => {
    const { container } = render(Accordion, {});
    const accordion = container.querySelector('.pf-v6-c-accordion');
    expect(accordion).toBeInTheDocument();
    expect(accordion?.tagName).toBe('DIV');
  });

  it('renders as a definition list when asDefinitionList is true', () => {
    const { container } = render(Accordion, { asDefinitionList: true });
    const accordion = container.querySelector('.pf-v6-c-accordion');
    expect(accordion).toBeInTheDocument();
    expect(accordion?.tagName).toBe('DL');
  });

  it('applies bordered class when isBordered is true', () => {
    const { container } = render(Accordion, { isBordered: true });
    const accordion = container.querySelector('.pf-v6-c-accordion');
    expect(accordion).toHaveClass('pf-m-bordered');
  });

  it('applies display size classes correctly', () => {
    const { container } = render(Accordion, { displaySize: 'lg' });
    const accordion = container.querySelector('.pf-v6-c-accordion');
    expect(accordion).toHaveClass('pf-m-display-lg');
  });

  it('applies toggle icon position classes correctly', () => {
    const { container } = render(Accordion, { toggleIconPosition: 'start' });
    const accordion = container.querySelector('.pf-v6-c-accordion');
    expect(accordion).toHaveClass('pf-m-toggle-start');
  });

  it('applies multiple expandable class when isMultipleExpandable is true', () => {
    const { container } = render(Accordion, { isMultipleExpandable: true });
    const accordion = container.querySelector('.pf-v6-c-accordion');
    expect(accordion).toHaveClass('pf-m-multiple-expandable');
  });

  it('applies fixed class when isFixed is true', () => {
    const { container } = render(Accordion, { isFixed: true });
    const accordion = container.querySelector('.pf-v6-c-accordion');
    expect(accordion).toHaveClass('pf-m-fixed');
  });
});

describe('AccordionItem', () => {
  it('renders an accordion item', () => {
    const { container } = render(AccordionItem, {});
    const item = container.querySelector('.pf-v6-c-accordion__item');
    expect(item).toBeInTheDocument();
  });

  it('applies expanded class when isExpanded is true', () => {
    const { container } = render(AccordionItem, { isExpanded: true });
    const item = container.querySelector('.pf-v6-c-accordion__item');
    expect(item).toHaveClass('pf-m-expanded');
  });
});

describe('AccordionToggle', () => {
  it('renders a button element', () => {
    render(AccordionToggle, {});
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('has aria-expanded attribute set to false by default', () => {
    render(AccordionToggle, {});
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('has aria-expanded attribute set to true when isExpanded is true', () => {
    render(AccordionToggle, { isExpanded: true });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies expanded class when isExpanded is true', () => {
    const { container } = render(AccordionToggle, { isExpanded: true });
    const button = container.querySelector('.pf-v6-c-accordion__toggle');
    expect(button).toHaveClass('pf-m-expanded');
  });

  it('can be disabled', () => {
    render(AccordionToggle, { isDisabled: true });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies disabled class when isDisabled is true', () => {
    const { container } = render(AccordionToggle, { isDisabled: true });
    const button = container.querySelector('.pf-v6-c-accordion__toggle');
    expect(button).toHaveClass('pf-m-disabled');
  });
});

describe('AccordionToggleText', () => {
  it('renders toggle text', () => {
    const { container } = render(AccordionToggleText, {}, { children: 'Test text' });
    const text = container.querySelector('.pf-v6-c-accordion__toggle-text');
    expect(text).toBeInTheDocument();
  });
});

describe('AccordionToggleIcon', () => {
  it('renders toggle icon', () => {
    const { container } = render(AccordionToggleIcon, {});
    const icon = container.querySelector('.pf-v6-c-accordion__toggle-icon');
    expect(icon).toBeInTheDocument();
  });
});

describe('AccordionContent', () => {
  it('renders accordion content', () => {
    const { container } = render(AccordionContent, {});
    const content = container.querySelector('.pf-v6-c-accordion__expandable-content');
    expect(content).toBeInTheDocument();
  });

  it('applies fixed class when isFixed is true', () => {
    const { container } = render(AccordionContent, { isFixed: true });
    const content = container.querySelector('.pf-v6-c-accordion__expandable-content');
    expect(content).toHaveClass('pf-m-fixed');
  });
});

describe('AccordionExpandableContentBody', () => {
  it('renders expandable content body', () => {
    const { container } = render(AccordionExpandableContentBody, {});
    const body = container.querySelector('.pf-v6-c-accordion__expandable-content-body');
    expect(body).toBeInTheDocument();
  });
});
