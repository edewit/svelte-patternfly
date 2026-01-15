import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte/svelte5';
import Table from './Table.svelte';
import Caption from './Caption.svelte';
import Thead from './Thead.svelte';
import Tbody from './Tbody.svelte';
import Tr from './Tr.svelte';
import Th from './Th.svelte';
import Td from './Td.svelte';

describe('Table', () => {
  it('renders a table element with correct class', () => {
    const { container } = render(Table);
    const table = container.querySelector('table.pf-v6-c-table');
    expect(table).toBeInTheDocument();
  });

  it('applies role="grid" attribute', () => {
    const { container } = render(Table);
    const table = container.querySelector('table');
    expect(table).toHaveAttribute('role', 'grid');
  });

  it('applies aria-label attribute', () => {
    const { container } = render(Table, { 'aria-label': 'Test table' });
    const table = container.querySelector('table');
    expect(table).toHaveAttribute('aria-label', 'Test table');
  });

  it('applies compact variant class', () => {
    const { container } = render(Table, { variant: 'compact' });
    const table = container.querySelector('table');
    expect(table).toHaveClass('pf-m-compact');
  });

  it('applies bordered class', () => {
    const { container } = render(Table, { isBordered: true });
    const table = container.querySelector('table');
    expect(table).toHaveClass('pf-m-bordered');
  });

  it('applies striped class', () => {
    const { container } = render(Table, { isStriped: true });
    const table = container.querySelector('table');
    expect(table).toHaveClass('pf-m-striped');
  });

  it('applies grid breakpoint class', () => {
    const { container } = render(Table, { gridBreakpoint: 'grid-lg' });
    const table = container.querySelector('table');
    expect(table).toHaveClass('pf-m-grid-lg');
  });

  it('applies sticky header class', () => {
    const { container } = render(Table, { isStickyHeader: true });
    const table = container.querySelector('table');
    expect(table).toHaveClass('pf-m-sticky-header');
  });

  it('applies custom class', () => {
    const { container } = render(Table, { class: 'custom-class' });
    const table = container.querySelector('table');
    expect(table).toHaveClass('custom-class');
  });
});

describe('Caption', () => {
  it('renders a caption element with correct class', () => {
    const { container } = render(Caption);
    const caption = container.querySelector('caption.pf-v6-c-table__caption');
    expect(caption).toBeInTheDocument();
  });
});

describe('Thead', () => {
  it('renders a thead element with correct class', () => {
    const { container } = render(Thead);
    const thead = container.querySelector('thead.pf-v6-c-table__thead');
    expect(thead).toBeInTheDocument();
  });

  it('applies noWrap class', () => {
    const { container } = render(Thead, { noWrap: true });
    const thead = container.querySelector('thead');
    expect(thead).toHaveClass('pf-m-nowrap');
  });
});

describe('Tbody', () => {
  it('renders a tbody element with correct class', () => {
    const { container } = render(Tbody);
    const tbody = container.querySelector('tbody.pf-v6-c-table__tbody');
    expect(tbody).toBeInTheDocument();
  });

  it('applies role="rowgroup" attribute', () => {
    const { container } = render(Tbody);
    const tbody = container.querySelector('tbody');
    expect(tbody).toHaveAttribute('role', 'rowgroup');
  });
});

describe('Tr', () => {
  it('renders a tr element with correct class', () => {
    const { container } = render(Tr);
    const tr = container.querySelector('tr.pf-v6-c-table__tr');
    expect(tr).toBeInTheDocument();
  });

  it('applies role="row" attribute', () => {
    const { container } = render(Tr);
    const tr = container.querySelector('tr');
    expect(tr).toHaveAttribute('role', 'row');
  });

  it('applies selected class', () => {
    const { container } = render(Tr, { isSelected: true });
    const tr = container.querySelector('tr');
    expect(tr).toHaveClass('pf-m-selected');
  });

  it('applies expanded class', () => {
    const { container } = render(Tr, { isExpanded: true });
    const tr = container.querySelector('tr');
    expect(tr).toHaveClass('pf-m-expanded');
  });

  it('calls onRowClick when clicked', async () => {
    const onRowClick = vi.fn();
    const { container } = render(Tr, { onRowClick });
    const tr = container.querySelector('tr');
    await fireEvent.click(tr!);
    expect(onRowClick).toHaveBeenCalled();
  });
});

describe('Th', () => {
  it('renders a th element with correct class', () => {
    const { container } = render(Th);
    const th = container.querySelector('th.pf-v6-c-table__th');
    expect(th).toBeInTheDocument();
  });

  it('applies role="columnheader" attribute', () => {
    const { container } = render(Th);
    const th = container.querySelector('th');
    expect(th).toHaveAttribute('role', 'columnheader');
  });

  it('applies scope="col" by default', () => {
    const { container } = render(Th);
    const th = container.querySelector('th');
    expect(th).toHaveAttribute('scope', 'col');
  });

  it('applies textCenter class', () => {
    const { container } = render(Th, { textCenter: true });
    const th = container.querySelector('th');
    expect(th).toHaveClass('pf-m-center');
  });

  it('applies colspan attribute', () => {
    const { container } = render(Th, { colSpan: 3 });
    const th = container.querySelector('th');
    expect(th).toHaveAttribute('colspan', '3');
  });

  it('applies width style', () => {
    const { container } = render(Th, { width: '100px' });
    const th = container.querySelector('th');
    expect(th?.getAttribute('style')).toContain('width: 100px');
  });
});

describe('Td', () => {
  it('renders a td element with correct class', () => {
    const { container } = render(Td);
    const td = container.querySelector('td.pf-v6-c-table__td');
    expect(td).toBeInTheDocument();
  });

  it('applies role="cell" attribute', () => {
    const { container } = render(Td);
    const td = container.querySelector('td');
    expect(td).toHaveAttribute('role', 'cell');
  });

  it('applies data-label attribute', () => {
    const { container } = render(Td, { dataLabel: 'Test label' });
    const td = container.querySelector('td');
    expect(td).toHaveAttribute('data-label', 'Test label');
  });

  it('applies textCenter class', () => {
    const { container } = render(Td, { textCenter: true });
    const td = container.querySelector('td');
    expect(td).toHaveClass('pf-m-center');
  });

  it('applies colspan attribute', () => {
    const { container } = render(Td, { colSpan: 3 });
    const td = container.querySelector('td');
    expect(td).toHaveAttribute('colspan', '3');
  });

  it('renders checkbox when select prop is provided', () => {
    const { container } = render(Td, {
      select: { isSelected: false, onSelect: vi.fn() }
    });
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders expand button when expand prop is provided', () => {
    const { container } = render(Td, {
      expand: { isExpanded: false, onToggle: vi.fn() }
    });
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('calls onSelect when checkbox is changed', async () => {
    const onSelect = vi.fn();
    const { container } = render(Td, {
      select: { isSelected: false, onSelect }
    });
    const checkbox = container.querySelector('input[type="checkbox"]');
    await fireEvent.click(checkbox!);
    expect(onSelect).toHaveBeenCalled();
  });

  it('calls onToggle when expand button is clicked', async () => {
    const onToggle = vi.fn();
    const { container } = render(Td, {
      expand: { isExpanded: false, onToggle }
    });
    const button = container.querySelector('button');
    await fireEvent.click(button!);
    expect(onToggle).toHaveBeenCalled();
  });
});
