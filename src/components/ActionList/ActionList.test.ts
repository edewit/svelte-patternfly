import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import ActionList from './ActionList.svelte';
import ActionListGroup from './ActionListGroup.svelte';
import ActionListItem from './ActionListItem.svelte';

describe('ActionList', () => {
  it('renders the action list container', () => {
    const { container } = render(ActionList);
    const actionList = container.querySelector('.pf-v6-c-action-list');
    expect(actionList).toBeInTheDocument();
    expect(actionList?.tagName).toBe('DIV');
  });

  it('applies icons modifier when isIcons is true', () => {
    const { container } = render(ActionList, { isIcons: true });
    const actionList = container.querySelector('.pf-v6-c-action-list');
    expect(actionList).toHaveClass('pf-m-icons');
  });
});

describe('ActionListGroup', () => {
  it('renders the action list group container', () => {
    const { container } = render(ActionListGroup);
    const group = container.querySelector('.pf-v6-c-action-list__group');
    expect(group).toBeInTheDocument();
    expect(group?.tagName).toBe('DIV');
  });
});

describe('ActionListItem', () => {
  it('renders the action list item container', () => {
    const { container } = render(ActionListItem);
    const item = container.querySelector('.pf-v6-c-action-list__item');
    expect(item).toBeInTheDocument();
    expect(item?.tagName).toBe('DIV');
  });
});
