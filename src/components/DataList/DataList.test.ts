import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import DataList from './DataList.svelte';
import DataListItem from './DataListItem.svelte';
import DataListItemRow from './DataListItemRow.svelte';
import DataListItemCells from './DataListItemCells.svelte';
import DataListCell from './DataListCell.svelte';
import DataListControl from './DataListControl.svelte';
import DataListCheck from './DataListCheck.svelte';
import DataListAction from './DataListAction.svelte';
import DataListToggle from './DataListToggle.svelte';
import DataListContent from './DataListContent.svelte';

describe('DataList', () => {
  it('renders a ul element with data-list class', () => {
    const { container } = render(DataList, {
      children: ''
    });
    const dataList = container.querySelector('ul.pf-v6-c-data-list');
    expect(dataList).toBeInTheDocument();
    expect(dataList?.tagName).toBe('UL');
  });

  it('applies compact modifier when isCompact is true', () => {
    const { container } = render(DataList, {
      isCompact: true,
      children: ''
    });
    const dataList = container.querySelector('.pf-v6-c-data-list');
    expect(dataList).toHaveClass('pf-m-compact');
  });

  it('applies grid breakpoint modifier when gridBreakpoint is provided', () => {
    const { container } = render(DataList, {
      gridBreakpoint: 'lg',
      children: ''
    });
    const dataList = container.querySelector('.pf-v6-c-data-list');
    expect(dataList).toHaveClass('pf-m-grid-lg');
  });

  it('applies aria-label attribute when provided', () => {
    const { container } = render(DataList, {
      'aria-label': 'Test data list',
      children: ''
    });
    const dataList = container.querySelector('.pf-v6-c-data-list');
    expect(dataList).toHaveAttribute('aria-label', 'Test data list');
  });

  it('applies id attribute when provided', () => {
    const { container } = render(DataList, {
      id: 'test-data-list',
      children: ''
    });
    const dataList = container.querySelector('.pf-v6-c-data-list');
    expect(dataList).toHaveAttribute('id', 'test-data-list');
  });
});

describe('DataListItem', () => {
  it('renders a li element with data-list__item class', () => {
    const { container } = render(DataListItem, {
      children: ''
    });
    const item = container.querySelector('li.pf-v6-c-data-list__item');
    expect(item).toBeInTheDocument();
    expect(item?.tagName).toBe('LI');
  });

  it('applies expanded modifier when isExpanded is true', () => {
    const { container } = render(DataListItem, {
      isExpanded: true,
      children: ''
    });
    const item = container.querySelector('.pf-v6-c-data-list__item');
    expect(item).toHaveClass('pf-m-expanded');
  });

  it('applies clickable modifier when isClickable is true', () => {
    const { container } = render(DataListItem, {
      isClickable: true,
      children: ''
    });
    const item = container.querySelector('.pf-v6-c-data-list__item');
    expect(item).toHaveClass('pf-m-clickable');
  });
});

describe('DataListItemRow', () => {
  it('renders a div element with data-list__item-row class', () => {
    const { container } = render(DataListItemRow, {
      children: ''
    });
    const row = container.querySelector('div.pf-v6-c-data-list__item-row');
    expect(row).toBeInTheDocument();
  });
});

describe('DataListItemCells', () => {
  it('renders a div element with data-list__item-content class', () => {
    const { container } = render(DataListItemCells, {
      children: ''
    });
    const cells = container.querySelector('div.pf-v6-c-data-list__item-content');
    expect(cells).toBeInTheDocument();
  });
});

describe('DataListCell', () => {
  it('renders a div element with data-list__cell class', () => {
    const { container } = render(DataListCell, {
      children: 'Cell content'
    });
    const cell = container.querySelector('div.pf-v6-c-data-list__cell');
    expect(cell).toBeInTheDocument();
  });

  it('applies width modifier when width is provided', () => {
    const { container } = render(DataListCell, {
      width: '2',
      children: ''
    });
    const cell = container.querySelector('.pf-v6-c-data-list__cell');
    expect(cell).toHaveClass('pf-m-2');
  });

  it('applies modifier classes when modifier is provided', () => {
    const { container } = render(DataListCell, {
      modifier: 'align-right',
      children: ''
    });
    const cell = container.querySelector('.pf-v6-c-data-list__cell');
    expect(cell).toHaveClass('pf-m-align-right');
  });

  it('applies multiple modifier classes when modifier is an array', () => {
    const { container } = render(DataListCell, {
      modifier: ['align-right', 'no-fill'],
      children: ''
    });
    const cell = container.querySelector('.pf-v6-c-data-list__cell');
    expect(cell).toHaveClass('pf-m-align-right');
    expect(cell).toHaveClass('pf-m-no-fill');
  });

  it('applies no-fill modifier when isFilled is false', () => {
    const { container } = render(DataListCell, {
      isFilled: false,
      children: ''
    });
    const cell = container.querySelector('.pf-v6-c-data-list__cell');
    expect(cell).toHaveClass('pf-m-no-fill');
  });
});

describe('DataListControl', () => {
  it('renders a div element with data-list__item-control class', () => {
    const { container } = render(DataListControl, {
      children: ''
    });
    const control = container.querySelector('div.pf-v6-c-data-list__item-control');
    expect(control).toBeInTheDocument();
  });
});

describe('DataListCheck', () => {
  it('renders a checkbox input', () => {
    const { container } = render(DataListCheck, {
      id: 'test-check',
      name: 'test-checkbox'
    });
    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeInTheDocument();
  });

  it('renders label with pf-m-standalone class', () => {
    const { container } = render(DataListCheck, {
      id: 'test-check'
    });
    const label = container.querySelector('label.pf-v6-c-check.pf-m-standalone');
    expect(label).toBeInTheDocument();
  });

  it('applies checked state when checked is true', () => {
    const { container } = render(DataListCheck, {
      id: 'test-check',
      checked: true
    });
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input?.checked).toBe(true);
  });

  it('applies disabled state when disabled is true', () => {
    const { container } = render(DataListCheck, {
      id: 'test-check',
      disabled: true
    });
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input?.disabled).toBe(true);
  });

  it('uses default aria-label when not provided', () => {
    const { container } = render(DataListCheck, {
      id: 'test-check'
    });
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input?.getAttribute('aria-label')).toBe('Standalone check');
  });
});

describe('DataListAction', () => {
  it('renders a div element with data-list__item-action class', () => {
    const { container } = render(DataListAction, {
      children: 'Action content'
    });
    const action = container.querySelector('div.pf-v6-c-data-list__item-action');
    expect(action).toBeInTheDocument();
  });

  it('applies visibility classes when visibility is provided', () => {
    const { container } = render(DataListAction, {
      visibility: { lg: 'hidden' },
      children: ''
    });
    const action = container.querySelector('.pf-v6-c-data-list__item-action');
    expect(action).toHaveClass('pf-m-hidden-on-lg');
  });
});

describe('DataListToggle', () => {
  it('renders a button element', () => {
    const { container } = render(DataListToggle);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('renders toggle icon structure correctly', () => {
    const { container } = render(DataListToggle);
    const iconSpan = container.querySelector('span.pf-v6-c-button__icon.pf-m-start');
    expect(iconSpan).toBeInTheDocument();
    const toggleIcon = container.querySelector('div.pf-v6-c-data-list__toggle-icon');
    expect(toggleIcon).toBeInTheDocument();
  });

  it('applies aria-expanded attribute based on isExpanded', () => {
    const { container } = render(DataListToggle, {
      isExpanded: true
    });
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies aria-controls attribute when provided', () => {
    const { container } = render(DataListToggle, {
      'aria-controls': 'content-1'
    });
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-controls', 'content-1');
  });
});

describe('DataListContent', () => {
  it('renders a section element with data-list__expandable-content class', () => {
    const { container } = render(DataListContent, {
      children: 'Content'
    });
    const content = container.querySelector('section.pf-v6-c-data-list__expandable-content');
    expect(content).toBeInTheDocument();
    expect(content?.tagName).toBe('SECTION');
  });

  it('applies hidden attribute when isHidden is true', () => {
    const { container } = render(DataListContent, {
      isHidden: true,
      children: ''
    });
    const content = container.querySelector('section.pf-v6-c-data-list__expandable-content');
    expect(content).toHaveAttribute('hidden');
  });

  it('does not apply hidden attribute when isHidden is false', () => {
    const { container } = render(DataListContent, {
      isHidden: false,
      children: ''
    });
    const content = container.querySelector('section.pf-v6-c-data-list__expandable-content');
    expect(content).not.toHaveAttribute('hidden');
  });

  it('applies aria-label when provided', () => {
    const { container } = render(DataListContent, {
      'aria-label': 'Content details',
      children: ''
    });
    const content = container.querySelector('section.pf-v6-c-data-list__expandable-content');
    expect(content).toHaveAttribute('aria-label', 'Content details');
  });

  it('applies no-padding modifier when hasNoPadding is true', () => {
    const { container } = render(DataListContent, {
      hasNoPadding: true,
      children: ''
    });
    const body = container.querySelector('.pf-v6-c-data-list__expandable-content-body');
    expect(body).toHaveClass('pf-m-no-padding');
  });
});
