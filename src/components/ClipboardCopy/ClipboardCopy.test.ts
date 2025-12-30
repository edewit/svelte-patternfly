import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte/svelte5';
import ClipboardCopy from './ClipboardCopy.svelte';

// Mock clipboard API
const mockWriteText = vi.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText
  }
});

describe('ClipboardCopy', () => {
  beforeEach(() => {
    mockWriteText.mockClear();
    mockWriteText.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders a clipboard copy component', () => {
    render(ClipboardCopy, { children: 'Test text' });
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Test text');
  });

  it('renders inline-compact variant with correct structure', () => {
    const { container } = render(ClipboardCopy, {
      variant: 'inline-compact',
      children: 'Test text'
    });
    const textElement = container.querySelector('.pf-v6-c-clipboard-copy__text');
    const actionsElement = container.querySelector('.pf-v6-c-clipboard-copy__actions');
    expect(textElement).toBeInTheDocument();
    expect(actionsElement).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-clipboard-copy__group')).not.toBeInTheDocument();
  });

  it('renders with basic variant by default', () => {
    const { container } = render(ClipboardCopy, { children: 'Test text' });
    const component = container.querySelector('.pf-v6-c-clipboard-copy');
    expect(component).toBeInTheDocument();
    expect(component).not.toHaveClass('pf-m-expanded');
    expect(component).not.toHaveClass('pf-m-inline');
  });

  it('applies expanded variant classes', () => {
    const { container } = render(ClipboardCopy, {
      variant: 'expanded',
      children: 'Test text'
    });
    const component = container.querySelector('.pf-v6-c-clipboard-copy');
    expect(component).toHaveClass('pf-v6-c-clipboard-copy');
  });

  it('applies inline-compact variant classes', () => {
    const { container } = render(ClipboardCopy, {
      variant: 'inline-compact',
      children: 'Test text'
    });
    const component = container.querySelector('.pf-v6-c-clipboard-copy');
    expect(component).toHaveClass('pf-m-inline');
  });

  it('applies read-only class when isReadOnly is true', () => {
    const { container } = render(ClipboardCopy, {
      isReadOnly: true,
      children: 'Test text'
    });
    const inputWrapper = container.querySelector('.pf-v6-c-form-control');
    expect(inputWrapper).toHaveClass('pf-m-readonly');
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  it('applies code class when isCode is true', () => {
    const { container } = render(ClipboardCopy, {
      isCode: true,
      children: 'Test text'
    });
    const component = container.querySelector('.pf-v6-c-clipboard-copy');
    expect(component).toHaveClass('pf-m-code');
  });

  it('renders copy button', () => {
    render(ClipboardCopy, { children: 'Test text' });
    const copyButton = screen.getByRole('button', { name: /copy/i });
    expect(copyButton).toBeInTheDocument();
  });

  it('copies text to clipboard when copy button is clicked', async () => {
    render(ClipboardCopy, { children: 'Test text' });
    const copyButton = screen.getByRole('button', { name: /copy/i });

    await fireEvent.click(copyButton);

    expect(mockWriteText).toHaveBeenCalledWith('Test text');
  });

  it('handles array children by joining with newlines', async () => {
    render(ClipboardCopy, { children: ['Line 1', 'Line 2', 'Line 3'] });
    const copyButton = screen.getByRole('button', { name: /copy/i });

    await fireEvent.click(copyButton);

    expect(mockWriteText).toHaveBeenCalledWith('Line 1\nLine 2\nLine 3');
  });

  it('shows toggle button for expanded variant', () => {
    render(ClipboardCopy, {
      variant: 'expanded',
      children: 'Test text'
    });
    const toggleButton = screen.getByRole('button', { name: /toggle/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles expanded content when toggle button is clicked', async () => {
    const { container } = render(ClipboardCopy, {
      variant: 'expanded',
      children: 'Test text'
    });
    const toggleButton = screen.getByRole('button', { name: /toggle/i });
    const content = container.querySelector('.pf-v6-c-clipboard-copy__expandable-content');

    expect(content).toHaveAttribute('hidden');

    await fireEvent.click(toggleButton);

    expect(content).not.toHaveAttribute('hidden');
  });

  it('shows expanded content by default when isExpandedByDefault is true', () => {
    const { container } = render(ClipboardCopy, {
      variant: 'expanded',
      isExpandedByDefault: true,
      children: 'Test text'
    });
    const content = container.querySelector('.pf-v6-c-clipboard-copy__expandable-content');
    expect(content).not.toHaveAttribute('hidden');
  });

  it('renders expandable content for expanded variant', () => {
    const { container } = render(ClipboardCopy, {
      variant: 'expanded',
      children: 'Test text'
    });
    const content = container.querySelector('.pf-v6-c-clipboard-copy__expandable-content');
    expect(content).toBeInTheDocument();
    expect(content?.textContent).toBe('Test text');
  });

  it('makes expandable content editable when isEditable is true', () => {
    const { container } = render(ClipboardCopy, {
      variant: 'expanded',
      isEditable: true,
      children: 'Test text'
    });
    const content = container.querySelector('.pf-v6-c-clipboard-copy__expandable-content');
    expect(content).toHaveAttribute('contenteditable', 'true');
  });

  it('applies truncation classes when truncation prop is true for inline-compact', () => {
    const { container } = render(ClipboardCopy, {
      variant: 'inline-compact',
      truncation: true,
      children:
        'This is a very long text that should be truncated when the truncation prop is set to true'
    });
    const component = container.querySelector('.pf-v6-c-clipboard-copy');
    expect(component).toHaveClass('pf-m-truncate');
    const truncateElement = container.querySelector('.pf-v6-c-truncate');
    expect(truncateElement).toBeInTheDocument();
  });

  it('applies custom truncation position classes for inline-compact', () => {
    const { container } = render(ClipboardCopy, {
      variant: 'inline-compact',
      truncation: {
        position: 'middle'
      },
      children: 'This is a very long text that should be truncated'
    });
    const truncateStart = container.querySelector('.pf-v6-c-truncate__middle');
    expect(truncateStart).toBeInTheDocument();
  });

  it('renders text instead of input for inline-compact variant', () => {
    const { container } = render(ClipboardCopy, {
      variant: 'inline-compact',
      children: 'Test text'
    });
    const textElement = container.querySelector('.pf-v6-c-clipboard-copy__text');
    expect(textElement).toBeInTheDocument();
    expect(textElement?.textContent).toBe('Test text');
    const input = container.querySelector('input');
    expect(input).not.toBeInTheDocument();
  });

  it('uses plain button style for inline-compact variant', () => {
    const { container: _container } = render(ClipboardCopy, {
      variant: 'inline-compact',
      children: 'Test text'
    });
    const copyButton = screen.getByRole('button', { name: /copy/i });
    expect(copyButton).toHaveClass('pf-m-plain');
    expect(copyButton).toHaveClass('pf-m-no-padding');
  });

  it('applies custom aria-label', () => {
    render(ClipboardCopy, {
      children: 'Test text',
      'aria-label': 'Custom label'
    });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-label', 'Custom label');
  });

  it('applies custom className', () => {
    const { container } = render(ClipboardCopy, {
      children: 'Test text',
      class: 'custom-class'
    });
    const component = container.querySelector('.pf-v6-c-clipboard-copy');
    expect(component).toHaveClass('custom-class');
  });

  it('handles controlled expanded state', async () => {
    const { container, component } = render(ClipboardCopy, {
      variant: 'expanded',
      isExpanded: false,
      children: 'Test text'
    });
    const content = container.querySelector('.pf-v6-c-clipboard-copy__expandable-content');
    expect(content).toHaveAttribute('hidden');

    await component.$set({ isExpanded: true });

    expect(content).not.toHaveAttribute('hidden');
  });
});
