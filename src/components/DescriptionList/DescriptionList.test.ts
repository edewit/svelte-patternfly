import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import DescriptionList from './DescriptionList.svelte';
import DescriptionListGroup from './DescriptionListGroup.svelte';
import DescriptionListTerm from './DescriptionListTerm.svelte';
import DescriptionListDescription from './DescriptionListDescription.svelte';

describe('DescriptionList', () => {
  it('renders the description list container', () => {
    const { container } = render(DescriptionList);
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toBeInTheDocument();
    expect(descriptionList?.tagName).toBe('DL');
  });

  it('applies horizontal modifier when isHorizontal is true', () => {
    const { container } = render(DescriptionList, { isHorizontal: true });
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toHaveClass('pf-m-horizontal');
  });

  it('applies column modifier classes correctly', () => {
    const { container } = render(DescriptionList, {
      columnModifier: { default: '2Col' }
    });
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toHaveClass('pf-m-2-col');
  });

  it('applies responsive column modifier classes', () => {
    const { container } = render(DescriptionList, {
      columnModifier: { default: '2Col', lg: '3Col' }
    });
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toHaveClass('pf-m-2-col');
    expect(descriptionList).toHaveClass('pf-m-3-col-on-lg');
  });

  it('applies aria-label when provided', () => {
    const { container } = render(DescriptionList, {
      'aria-label': 'Test description list'
    });
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toHaveAttribute('aria-label', 'Test description list');
  });

  it('applies id when provided', () => {
    const { container } = render(DescriptionList, { id: 'test-id' });
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toHaveAttribute('id', 'test-id');
  });

  it('applies compact modifier when isCompact is true', () => {
    const { container } = render(DescriptionList, { isCompact: true });
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toHaveClass('pf-m-compact');
  });

  it('applies fluid modifier when isFluid is true', () => {
    const { container } = render(DescriptionList, { isFluid: true });
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toHaveClass('pf-m-fluid');
  });

  it('applies column fill modifier when isColumnFill is true', () => {
    const { container } = render(DescriptionList, { isColumnFill: true });
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toHaveClass('pf-m-column-fill');
  });

  it('applies auto-fit modifier when isAutoFit is true', () => {
    const { container } = render(DescriptionList, { isAutoFit: true });
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toHaveClass('pf-m-auto-fit');
  });

  it('applies auto-column-width modifier when isAutoColumnWidth is true', () => {
    const { container } = render(DescriptionList, { isAutoColumnWidth: true });
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toHaveClass('pf-m-auto-column-width');
  });

  it('applies inline-grid modifier when isInlineGrid is true', () => {
    const { container } = render(DescriptionList, { isInlineGrid: true });
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toHaveClass('pf-m-inline-grid');
  });

  it('applies display modifier when display is provided', () => {
    const { container } = render(DescriptionList, { display: 'lg' });
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toHaveClass('pf-m-display-lg');
  });

  it('applies display-2xl modifier when display is 2xl', () => {
    const { container } = render(DescriptionList, { display: '2xl' });
    const descriptionList = container.querySelector('.pf-v6-c-description-list');
    expect(descriptionList).toHaveClass('pf-m-display-2xl');
  });
});

describe('DescriptionListGroup', () => {
  it('renders the description list group container', () => {
    const { container } = render(DescriptionListGroup);
    const group = container.querySelector('.pf-v6-c-description-list__group');
    expect(group).toBeInTheDocument();
    expect(group?.tagName).toBe('DIV');
  });

  it('applies card modifier when isCard is true', () => {
    const { container } = render(DescriptionListGroup, { isCard: true });
    const group = container.querySelector('.pf-v6-c-description-list__group');
    expect(group).toHaveClass('pf-m-card');
  });

  it('applies vertical modifier when isVertical is true', () => {
    const { container } = render(DescriptionListGroup, { isVertical: true });
    const group = container.querySelector('.pf-v6-c-description-list__group');
    expect(group).toHaveClass('pf-m-vertical');
  });
});

describe('DescriptionListTerm', () => {
  it('renders the description list term', () => {
    const { container } = render(DescriptionListTerm);
    const term = container.querySelector('.pf-v6-c-description-list__term');
    expect(term).toBeInTheDocument();
    expect(term?.tagName).toBe('DT');
  });

  it('renders the text wrapper span', () => {
    const { container } = render(DescriptionListTerm);
    const text = container.querySelector('.pf-v6-c-description-list__text');
    expect(text).toBeInTheDocument();
    expect(text?.tagName).toBe('SPAN');
  });

  it('applies help-text modifier when hasHelpText is true', () => {
    const { container } = render(DescriptionListTerm, { hasHelpText: true });
    const text = container.querySelector('.pf-v6-c-description-list__text');
    expect(text).toHaveClass('pf-m-help-text');
  });
});

describe('DescriptionListDescription', () => {
  it('renders the description list description', () => {
    const { container } = render(DescriptionListDescription);
    const description = container.querySelector('.pf-v6-c-description-list__description');
    expect(description).toBeInTheDocument();
    expect(description?.tagName).toBe('DD');
  });

  it('renders the text wrapper div', () => {
    const { container } = render(DescriptionListDescription);
    const text = container.querySelector('.pf-v6-c-description-list__text');
    expect(text).toBeInTheDocument();
    expect(text?.tagName).toBe('DIV');
  });
});
