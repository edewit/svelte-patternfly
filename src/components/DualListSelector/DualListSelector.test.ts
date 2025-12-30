import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import DualListSelector from './DualListSelector.svelte';
import DualListSelectorPane from './DualListSelectorPane.svelte';
import DualListSelectorHeader from './DualListSelectorHeader.svelte';
import DualListSelectorTitle from './DualListSelectorTitle.svelte';
import DualListSelectorTitleText from './DualListSelectorTitleText.svelte';
import DualListSelectorTools from './DualListSelectorTools.svelte';
import DualListSelectorToolsFilter from './DualListSelectorToolsFilter.svelte';
import DualListSelectorToolsActions from './DualListSelectorToolsActions.svelte';
import DualListSelectorStatus from './DualListSelectorStatus.svelte';
import DualListSelectorStatusText from './DualListSelectorStatusText.svelte';
import DualListSelectorMenu from './DualListSelectorMenu.svelte';
import DualListSelectorList from './DualListSelectorList.svelte';
import DualListSelectorListItem from './DualListSelectorListItem.svelte';
import DualListSelectorListItemRow from './DualListSelectorListItemRow.svelte';
import DualListSelectorItem from './DualListSelectorItem.svelte';
import DualListSelectorItemMain from './DualListSelectorItemMain.svelte';
import DualListSelectorItemText from './DualListSelectorItemText.svelte';
import DualListSelectorControls from './DualListSelectorControls.svelte';
import DualListSelectorControlsItem from './DualListSelectorControlsItem.svelte';
import DualListSelectorControl from './DualListSelectorControl.svelte';

describe('DualListSelector', () => {
  it('renders a div element with dual-list-selector class', () => {
    const { container } = render(DualListSelector, {
      children: ''
    });
    const selector = container.querySelector('div.pf-v6-c-dual-list-selector');
    expect(selector).toBeInTheDocument();
  });

  it('applies id attribute when provided', () => {
    const { container } = render(DualListSelector, {
      id: 'test-dual-list-selector',
      children: ''
    });
    const selector = container.querySelector('.pf-v6-c-dual-list-selector');
    expect(selector).toHaveAttribute('id', 'test-dual-list-selector');
  });
});

describe('DualListSelectorPane', () => {
  it('renders a div element with dual-list-selector__pane class', () => {
    const { container } = render(DualListSelectorPane, {
      children: ''
    });
    const pane = container.querySelector('div.pf-v6-c-dual-list-selector__pane');
    expect(pane).toBeInTheDocument();
  });

  it('applies available modifier when isChosen is false', () => {
    const { container } = render(DualListSelectorPane, {
      isChosen: false,
      children: ''
    });
    const pane = container.querySelector('.pf-v6-c-dual-list-selector__pane');
    expect(pane).toHaveClass('pf-m-available');
  });

  it('applies chosen modifier when isChosen is true', () => {
    const { container } = render(DualListSelectorPane, {
      isChosen: true,
      children: ''
    });
    const pane = container.querySelector('.pf-v6-c-dual-list-selector__pane');
    expect(pane).toHaveClass('pf-m-chosen');
  });
});

describe('DualListSelectorHeader', () => {
  it('renders a div element with dual-list-selector__header class', () => {
    const { container } = render(DualListSelectorHeader, {
      children: ''
    });
    const header = container.querySelector('div.pf-v6-c-dual-list-selector__header');
    expect(header).toBeInTheDocument();
  });
});

describe('DualListSelectorTitle', () => {
  it('renders a div element with dual-list-selector__title class', () => {
    const { container } = render(DualListSelectorTitle, {
      children: ''
    });
    const title = container.querySelector('div.pf-v6-c-dual-list-selector__title');
    expect(title).toBeInTheDocument();
  });
});

describe('DualListSelectorTitleText', () => {
  it('renders a div element with dual-list-selector__title-text class', () => {
    const { container } = render(DualListSelectorTitleText, {
      children: 'Title'
    });
    const titleText = container.querySelector('div.pf-v6-c-dual-list-selector__title-text');
    expect(titleText).toBeInTheDocument();
  });
});

describe('DualListSelectorTools', () => {
  it('renders a div element with dual-list-selector__tools class', () => {
    const { container } = render(DualListSelectorTools, {
      children: ''
    });
    const tools = container.querySelector('div.pf-v6-c-dual-list-selector__tools');
    expect(tools).toBeInTheDocument();
  });
});

describe('DualListSelectorToolsFilter', () => {
  it('renders a div element with dual-list-selector__tools-filter class', () => {
    const { container } = render(DualListSelectorToolsFilter, {
      children: ''
    });
    const filter = container.querySelector('div.pf-v6-c-dual-list-selector__tools-filter');
    expect(filter).toBeInTheDocument();
  });
});

describe('DualListSelectorToolsActions', () => {
  it('renders a div element with dual-list-selector__tools-actions class', () => {
    const { container } = render(DualListSelectorToolsActions, {
      children: ''
    });
    const actions = container.querySelector('div.pf-v6-c-dual-list-selector__tools-actions');
    expect(actions).toBeInTheDocument();
  });
});

describe('DualListSelectorStatus', () => {
  it('renders a div element with dual-list-selector__status class', () => {
    const { container } = render(DualListSelectorStatus, {
      children: ''
    });
    const status = container.querySelector('div.pf-v6-c-dual-list-selector__status');
    expect(status).toBeInTheDocument();
  });
});

describe('DualListSelectorStatusText', () => {
  it('renders a span element with dual-list-selector__status-text class', () => {
    const { container } = render(DualListSelectorStatusText, {
      children: 'Status'
    });
    const statusText = container.querySelector('span.pf-v6-c-dual-list-selector__status-text');
    expect(statusText).toBeInTheDocument();
  });

  it('applies id attribute when provided', () => {
    const { container } = render(DualListSelectorStatusText, {
      id: 'test-status-text',
      children: ''
    });
    const statusText = container.querySelector('.pf-v6-c-dual-list-selector__status-text');
    expect(statusText).toHaveAttribute('id', 'test-status-text');
  });
});

describe('DualListSelectorMenu', () => {
  it('renders a div element with dual-list-selector__menu class', () => {
    const { container } = render(DualListSelectorMenu, {
      children: ''
    });
    const menu = container.querySelector('div.pf-v6-c-dual-list-selector__menu');
    expect(menu).toBeInTheDocument();
  });

  it('applies tabindex attribute when provided', () => {
    const { container } = render(DualListSelectorMenu, {
      tabindex: '0',
      children: ''
    });
    const menu = container.querySelector('.pf-v6-c-dual-list-selector__menu');
    expect(menu).toHaveAttribute('tabindex', '0');
  });
});

describe('DualListSelectorList', () => {
  it('renders a ul element with dual-list-selector__list class', () => {
    const { container } = render(DualListSelectorList, {
      children: ''
    });
    const list = container.querySelector('ul.pf-v6-c-dual-list-selector__list');
    expect(list).toBeInTheDocument();
    expect(list?.tagName).toBe('UL');
  });

  it('applies role attribute when provided', () => {
    const { container } = render(DualListSelectorList, {
      role: 'listbox',
      children: ''
    });
    const list = container.querySelector('.pf-v6-c-dual-list-selector__list');
    expect(list).toHaveAttribute('role', 'listbox');
  });

  it('applies aria-labelledby attribute when provided', () => {
    const { container } = render(DualListSelectorList, {
      'aria-labelledby': 'test-label',
      children: ''
    });
    const list = container.querySelector('.pf-v6-c-dual-list-selector__list');
    expect(list).toHaveAttribute('aria-labelledby', 'test-label');
  });

  it('applies aria-multiselectable attribute when provided', () => {
    const { container } = render(DualListSelectorList, {
      'aria-multiselectable': true,
      children: ''
    });
    const list = container.querySelector('.pf-v6-c-dual-list-selector__list');
    expect(list).toHaveAttribute('aria-multiselectable', 'true');
  });
});

describe('DualListSelectorListItem', () => {
  it('renders a li element with dual-list-selector__list-item class', () => {
    const { container } = render(DualListSelectorListItem, {
      children: ''
    });
    const item = container.querySelector('li.pf-v6-c-dual-list-selector__list-item');
    expect(item).toBeInTheDocument();
    expect(item?.tagName).toBe('LI');
  });

  it('applies disabled modifier when isDisabled is true', () => {
    const { container } = render(DualListSelectorListItem, {
      isDisabled: true,
      children: ''
    });
    const item = container.querySelector('.pf-v6-c-dual-list-selector__list-item');
    expect(item).toHaveClass('pf-m-disabled');
  });

  it('applies selected modifier when isSelected is true', () => {
    const { container } = render(DualListSelectorListItem, {
      isSelected: true,
      children: ''
    });
    const item = container.querySelector('.pf-v6-c-dual-list-selector__list-item');
    expect(item).toHaveClass('pf-m-selected');
  });

  it('applies role attribute when provided', () => {
    const { container } = render(DualListSelectorListItem, {
      role: 'option',
      children: ''
    });
    const item = container.querySelector('.pf-v6-c-dual-list-selector__list-item');
    expect(item).toHaveAttribute('role', 'option');
  });
});

describe('DualListSelectorListItemRow', () => {
  it('renders a div element with dual-list-selector__list-item-row class', () => {
    const { container } = render(DualListSelectorListItemRow, {
      children: ''
    });
    const row = container.querySelector('div.pf-v6-c-dual-list-selector__list-item-row');
    expect(row).toBeInTheDocument();
  });

  it('applies selected modifier when isSelected is true', () => {
    const { container } = render(DualListSelectorListItemRow, {
      isSelected: true,
      children: ''
    });
    const row = container.querySelector('.pf-v6-c-dual-list-selector__list-item-row');
    expect(row).toHaveClass('pf-m-selected');
  });
});

describe('DualListSelectorItem', () => {
  it('renders a span element with dual-list-selector__item class', () => {
    const { container } = render(DualListSelectorItem, {
      children: ''
    });
    const item = container.querySelector('span.pf-v6-c-dual-list-selector__item');
    expect(item).toBeInTheDocument();
  });
});

describe('DualListSelectorItemMain', () => {
  it('renders a span element with dual-list-selector__item-main class', () => {
    const { container } = render(DualListSelectorItemMain, {
      children: ''
    });
    const main = container.querySelector('span.pf-v6-c-dual-list-selector__item-main');
    expect(main).toBeInTheDocument();
  });
});

describe('DualListSelectorItemText', () => {
  it('renders a span element with dual-list-selector__item-text class', () => {
    const { container } = render(DualListSelectorItemText, {
      children: 'Item text'
    });
    const text = container.querySelector('span.pf-v6-c-dual-list-selector__item-text');
    expect(text).toBeInTheDocument();
  });
});

describe('DualListSelectorControls', () => {
  it('renders a div element with dual-list-selector__controls class', () => {
    const { container } = render(DualListSelectorControls, {
      children: ''
    });
    const controls = container.querySelector('div.pf-v6-c-dual-list-selector__controls');
    expect(controls).toBeInTheDocument();
  });
});

describe('DualListSelectorControlsItem', () => {
  it('renders a div element with dual-list-selector__controls-item class', () => {
    const { container } = render(DualListSelectorControlsItem, {
      children: ''
    });
    const item = container.querySelector('div.pf-v6-c-dual-list-selector__controls-item');
    expect(item).toBeInTheDocument();
  });
});

describe('DualListSelectorControl', () => {
  it('renders a button element', () => {
    const { container } = render(DualListSelectorControl, {
      'aria-label': 'Test control'
    });
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('applies disabled state when isDisabled is true', () => {
    const { container } = render(DualListSelectorControl, {
      isDisabled: true,
      'aria-label': 'Test control'
    });
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('applies aria-label attribute when provided', () => {
    const { container } = render(DualListSelectorControl, {
      'aria-label': 'Test control'
    });
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-label', 'Test control');
  });
});
