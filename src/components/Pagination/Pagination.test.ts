import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte/svelte5';
import Pagination from './Pagination.svelte';

describe('Pagination', () => {
  it('should render with default props', () => {
    render(Pagination, {
      props: {
        itemCount: 100,
        perPage: 10,
        page: 1,
        widgetId: 'test-pagination'
      }
    });

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument();
  });

  it('should display correct item range', () => {
    const { container } = render(Pagination, {
      props: {
        itemCount: 100,
        perPage: 10,
        page: 1,
        widgetId: 'test-pagination'
      }
    });

    expect(container.querySelector('.pf-v6-c-pagination__total-items')).toHaveTextContent('1 - 10');
    expect(container.querySelector('.pf-v6-c-pagination__total-items')).toHaveTextContent('100');
  });

  it('should disable first and previous buttons on first page', () => {
    render(Pagination, {
      props: {
        itemCount: 100,
        perPage: 10,
        page: 1,
        widgetId: 'test-pagination'
      }
    });

    expect(screen.getByLabelText('Go to first page')).toBeDisabled();
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
    expect(screen.getByLabelText('Go to next page')).not.toBeDisabled();
    expect(screen.getByLabelText('Go to last page')).not.toBeDisabled();
  });

  it('should disable next and last buttons on last page', () => {
    render(Pagination, {
      props: {
        itemCount: 100,
        perPage: 10,
        page: 10,
        widgetId: 'test-pagination'
      }
    });

    expect(screen.getByLabelText('Go to first page')).not.toBeDisabled();
    expect(screen.getByLabelText('Go to previous page')).not.toBeDisabled();
    expect(screen.getByLabelText('Go to next page')).toBeDisabled();
    expect(screen.getByLabelText('Go to last page')).toBeDisabled();
  });

  it('should call onSetPage when navigation buttons are clicked', async () => {
    const onSetPage = vi.fn();
    render(Pagination, {
      props: {
        itemCount: 100,
        perPage: 10,
        page: 5,
        widgetId: 'test-pagination',
        onSetPage
      }
    });

    // Test next page
    await fireEvent.click(screen.getByLabelText('Go to next page'));
    expect(onSetPage).toHaveBeenLastCalledWith(expect.any(Object), 6);

    // After clicking next, internal state is 6, clicking prev goes to 5
    await fireEvent.click(screen.getByLabelText('Go to previous page'));
    expect(onSetPage).toHaveBeenLastCalledWith(expect.any(Object), 5);

    // Test first page navigation
    await fireEvent.click(screen.getByLabelText('Go to first page'));
    expect(onSetPage).toHaveBeenLastCalledWith(expect.any(Object), 1);

    // Test last page navigation
    await fireEvent.click(screen.getByLabelText('Go to last page'));
    expect(onSetPage).toHaveBeenLastCalledWith(expect.any(Object), 10);
  });

  it('should render compact version', () => {
    const { container } = render(Pagination, {
      props: {
        itemCount: 100,
        perPage: 10,
        page: 1,
        widgetId: 'test-pagination',
        isCompact: true
      }
    });

    expect(container.querySelector('.pf-v6-c-pagination')).toHaveClass('pf-m-compact');
    // Compact mode should only have prev/next buttons, not first/last
    expect(screen.queryByLabelText('Go to first page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to last page')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
  });

  it('should render bottom variant', () => {
    const { container } = render(Pagination, {
      props: {
        itemCount: 100,
        perPage: 10,
        page: 1,
        widgetId: 'test-pagination',
        variant: 'bottom'
      }
    });

    expect(container.querySelector('.pf-v6-c-pagination')).toHaveClass('pf-m-bottom');
  });

  it('should render disabled state', () => {
    render(Pagination, {
      props: {
        itemCount: 100,
        perPage: 10,
        page: 5,
        widgetId: 'test-pagination',
        isDisabled: true
      }
    });

    expect(screen.getByLabelText('Go to first page')).toBeDisabled();
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
    expect(screen.getByLabelText('Go to next page')).toBeDisabled();
    expect(screen.getByLabelText('Go to last page')).toBeDisabled();
    expect(screen.getByLabelText('Current page')).toBeDisabled();
  });

  it('should handle zero items', () => {
    const { container } = render(Pagination, {
      props: {
        itemCount: 0,
        perPage: 10,
        page: 1,
        widgetId: 'test-pagination'
      }
    });

    expect(container.querySelector('.pf-v6-c-pagination__total-items')).toHaveTextContent('1 - 0');
    expect(container.querySelector('.pf-v6-c-pagination__total-items')).toHaveTextContent('0');
  });

  it('should set OUIA attributes', () => {
    const { container } = render(Pagination, {
      props: {
        itemCount: 100,
        perPage: 10,
        page: 1,
        widgetId: 'test-pagination',
        ouiaId: 'test-ouia-id',
        ouiaSafe: true
      }
    });

    const paginationElement = container.querySelector('.pf-v6-c-pagination');
    expect(paginationElement).toHaveAttribute('data-ouia-component-type', 'PF6/Pagination');
    expect(paginationElement).toHaveAttribute('data-ouia-component-id', 'test-ouia-id');
    expect(paginationElement).toHaveAttribute('data-ouia-safe', 'true');
  });

  it('should update page input value', () => {
    render(Pagination, {
      props: {
        itemCount: 100,
        perPage: 10,
        page: 3,
        widgetId: 'test-pagination'
      }
    });

    const pageInput = screen.getByLabelText('Current page') as HTMLInputElement;
    expect(pageInput.value).toBe('3');
  });

  it('should show correct total pages', () => {
    const { container } = render(Pagination, {
      props: {
        itemCount: 100,
        perPage: 10,
        page: 1,
        widgetId: 'test-pagination'
      }
    });

    expect(container.querySelector('.pf-v6-c-pagination__nav-page-select')).toHaveTextContent('of 10');
  });

  it('should render sticky variant', () => {
    const { container } = render(Pagination, {
      props: {
        itemCount: 100,
        perPage: 10,
        page: 1,
        widgetId: 'test-pagination',
        isSticky: true
      }
    });

    expect(container.querySelector('.pf-v6-c-pagination')).toHaveClass('pf-m-sticky');
  });

  it('should render static variant (no per-page selector)', () => {
    const { container } = render(Pagination, {
      props: {
        itemCount: 100,
        perPage: 10,
        page: 1,
        widgetId: 'test-pagination',
        isStatic: true
      }
    });

    expect(container.querySelector('.pf-v6-c-pagination')).toHaveClass('pf-m-static');
    expect(container.querySelector('.pf-v6-c-pagination__page-menu')).not.toBeInTheDocument();
  });
});

