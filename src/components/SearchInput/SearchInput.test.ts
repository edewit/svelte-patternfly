import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte/svelte5';
import SearchInput from './SearchInput.svelte';

describe('SearchInput', () => {
  it('renders with default props', () => {
    render(SearchInput);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders with placeholder text', () => {
    render(SearchInput, { props: { placeholder: 'Find by name' } });
    const input = screen.getByPlaceholderText('Find by name');
    expect(input).toBeInTheDocument();
  });

  it('renders with aria-label', () => {
    render(SearchInput, { props: { 'aria-label': 'Search input' } });
    const input = screen.getByRole('textbox', { name: 'Search input' });
    expect(input).toBeInTheDocument();
  });

  it('renders with initial value', () => {
    render(SearchInput, { props: { value: 'test value' } });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('test value');
  });

  it('calls onChange when input value changes', async () => {
    const onChange = vi.fn();
    render(SearchInput, { props: { onChange } });

    const input = screen.getByRole('textbox');
    await fireEvent.input(input, { target: { value: 'new value' } });

    expect(onChange).toHaveBeenCalledWith(expect.any(Event), 'new value');
  });

  it('shows reset button when value is present and onClear is provided', () => {
    render(SearchInput, { props: { value: 'test', onClear: vi.fn() } });
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    expect(resetButton).toBeInTheDocument();
  });

  it('does not show reset button when value is empty', () => {
    render(SearchInput, { props: { value: '', onClear: vi.fn() } });
    const resetButton = screen.queryByRole('button', { name: 'Reset' });
    expect(resetButton).not.toBeInTheDocument();
  });

  it('calls onClear when reset button is clicked', async () => {
    const onClear = vi.fn();
    render(SearchInput, { props: { value: 'test', onClear } });

    const resetButton = screen.getByRole('button', { name: 'Reset' });
    await fireEvent.click(resetButton);

    expect(onClear).toHaveBeenCalled();
  });

  it('renders in disabled state', () => {
    render(SearchInput, { props: { isDisabled: true } });
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('applies disabled class to container when disabled', () => {
    const { container } = render(SearchInput, { props: { isDisabled: true } });
    const wrapper = container.querySelector('.pf-v6-c-text-input-group');
    expect(wrapper).toHaveClass('pf-m-disabled');
  });

  it('renders search icon by default', () => {
    const { container } = render(SearchInput);
    const icon = container.querySelector('.fas.fa-search');
    expect(icon).toBeInTheDocument();
  });

  it('applies custom class', () => {
    const { container } = render(SearchInput, { props: { class: 'custom-class' } });
    const wrapper = container.querySelector('.pf-v6-c-text-input-group');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('renders with results count badge', () => {
    render(SearchInput, { props: { resultsCount: 3 } });
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders results count with screen reader text', () => {
    const { container } = render(SearchInput, { props: { resultsCount: 5 } });
    const badge = container.querySelector('.pf-v6-c-badge');
    expect(badge).toHaveTextContent('5');
    const srText = container.querySelector('.pf-v6-screen-reader');
    expect(srText).toHaveTextContent('results');
  });

  it('renders string results count', () => {
    render(SearchInput, { props: { resultsCount: '10+' } });
    expect(screen.getByText('10+')).toBeInTheDocument();
  });

  it('calls onSearch when Enter key is pressed', async () => {
    const onSearch = vi.fn();
    render(SearchInput, { props: { value: 'test', onSearch } });

    const input = screen.getByRole('textbox');
    await fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSearch).toHaveBeenCalledWith(expect.any(KeyboardEvent), 'test', {});
  });

  it('uses custom id when provided', () => {
    render(SearchInput, { props: { id: 'my-search-input' } });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'my-search-input');
  });

  it('uses name attribute when provided', () => {
    render(SearchInput, { props: { name: 'search-field' } });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'search-field');
  });

  it('shows both results count and reset button when value and resultsCount are present', () => {
    render(SearchInput, {
      props: {
        value: 'test',
        resultsCount: 3,
        onClear: vi.fn()
      }
    });

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });
});
