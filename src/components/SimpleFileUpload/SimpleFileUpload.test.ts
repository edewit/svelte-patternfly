import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/svelte/svelte5';
import { fireEvent } from '@testing-library/dom';
import SimpleFileUpload from './SimpleFileUpload.svelte';

describe('SimpleFileUpload', () => {
  it('renders with default props', () => {
    const { container } = render(SimpleFileUpload);
    const element = container.querySelector('.pf-v6-c-file-upload');
    expect(element).toBeTruthy();
  });

  it('renders filename input', () => {
    const { container } = render(SimpleFileUpload, {
      filename: 'test.txt'
    });
    const input = container.querySelector('input[readonly]');
    expect(input).toBeTruthy();
    expect(input).toHaveValue('test.txt');
  });

  it('shows placeholder when filename is empty', () => {
    const { container } = render(SimpleFileUpload, {
      filenamePlaceholder: 'Drag and drop a file'
    });
    const input = container.querySelector('input[readonly]');
    expect(input).toHaveValue('Drag and drop a file');
  });

  it('renders browse and clear buttons', () => {
    const { container } = render(SimpleFileUpload);
    const buttons = container.querySelectorAll('.pf-v6-c-button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('renders textarea when type is text', () => {
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      value: 'Sample content'
    });
    const textarea = container.querySelector('textarea');
    expect(textarea).toBeTruthy();
    expect(textarea).toHaveValue('Sample content');
  });

  it('does not render textarea when hideDefaultPreview is true', () => {
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      hideDefaultPreview: true
    });
    const textarea = container.querySelector('textarea');
    expect(textarea).toBeFalsy();
  });

  it('shows loading spinner when isLoading is true', () => {
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      isLoading: true
    });
    const spinner = container.querySelector('.pf-v6-c-spinner');
    expect(spinner).toBeTruthy();
    const element = container.querySelector('.pf-v6-c-file-upload');
    expect(element).toHaveClass('pf-m-loading');
  });

  it('calls onClearClick when clear button is clicked', () => {
    const handleClear = vi.fn();
    const { container } = render(SimpleFileUpload, {
      onClearClick: handleClear
    });
    const buttons = container.querySelectorAll('.pf-v6-c-button');
    const clearButton = Array.from(buttons).find((btn) => btn.textContent?.includes('Clear'));
    if (clearButton) {
      fireEvent.click(clearButton);
      expect(handleClear).toHaveBeenCalled();
    }
  });

  it('disables browse button when isLoading is true', () => {
    const { container } = render(SimpleFileUpload, {
      isLoading: true
    });
    const buttons = container.querySelectorAll('button');
    const browseButton = Array.from(buttons).find((btn) => btn.textContent?.includes('Upload'));
    expect(browseButton).toBeDisabled();
  });

  it('disables browse button when dropzoneProps.disabled is true', () => {
    const { container } = render(SimpleFileUpload, {
      dropzoneProps: { disabled: true }
    });
    const buttons = container.querySelectorAll('button');
    const browseButton = Array.from(buttons).find((btn) => btn.textContent?.includes('Upload'));
    expect(browseButton).toBeDisabled();
  });

  it('makes textarea readonly when allowEditingUploadedText is false', () => {
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      value: 'Content',
      filename: 'test.txt',
      allowEditingUploadedText: false
    });
    const textarea = container.querySelector('textarea');
    expect(textarea).toHaveAttribute('readonly');
  });

  it('allows editing textarea when allowEditingUploadedText is true and filename is set', () => {
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      value: 'Content',
      filename: 'test.txt',
      allowEditingUploadedText: true
    });
    const textarea = container.querySelector('textarea');
    expect(textarea).not.toHaveAttribute('readonly');
  });

  it('calls onTextChange when textarea value changes', async () => {
    const handleTextChange = vi.fn();
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      value: 'Initial',
      filename: 'test.txt',
      allowEditingUploadedText: true,
      onTextChange: handleTextChange
    });
    const textarea = container.querySelector('textarea');
    if (textarea) {
      fireEvent.input(textarea, { target: { value: 'New content' } });
      await waitFor(() => {
        expect(handleTextChange).toHaveBeenCalled();
      });
    }
  });

  it('renders custom browse button text', () => {
    const { container } = render(SimpleFileUpload, {
      browseButtonText: 'Choose File'
    });
    const buttons = container.querySelectorAll('.pf-v6-c-button');
    const browseButton = Array.from(buttons).find((btn) =>
      btn.textContent?.includes('Choose File')
    );
    expect(browseButton).toBeTruthy();
  });

  it('applies custom class name', () => {
    const { container } = render(SimpleFileUpload, {
      class: 'custom-class'
    });
    const element = container.querySelector('.pf-v6-c-file-upload');
    expect(element).toHaveClass('custom-class');
  });

  it('renders file input with accept attribute from dropzoneProps', () => {
    const { container } = render(SimpleFileUpload, {
      dropzoneProps: {
        accept: {
          'text/csv': ['.csv']
        }
      }
    });
    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toHaveAttribute('accept');
  });

  it('applies error class when isInvalid is true', () => {
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      isInvalid: true
    });
    const formControl = container.querySelector('.pf-v6-c-form-control.pf-m-textarea');
    expect(formControl).toHaveClass('pf-m-error');
  });

  it('sets aria-invalid when isInvalid is true', () => {
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      isInvalid: true
    });
    const textarea = container.querySelector('textarea');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    const fileDetails = container.querySelector('.pf-v6-c-file-upload__file-details');
    expect(fileDetails).toHaveAttribute('aria-invalid', 'true');
  });

  it('displays error icon when isInvalid is true', () => {
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      isInvalid: true
    });
    const errorIcon = container.querySelector('.pf-v6-c-form-control__icon.pf-m-status');
    expect(errorIcon).toBeTruthy();
    const icon = errorIcon?.querySelector('.fa-exclamation-circle');
    expect(icon).toBeTruthy();
  });

  it('renders helper text when provided', () => {
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      helperText: 'This is helper text'
    });
    const helperText = container.querySelector('.pf-v6-c-helper-text');
    expect(helperText).toBeTruthy();
    expect(helperText?.textContent).toContain('This is helper text');
  });

  it('applies error class to helper text when isInvalid is true', () => {
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      isInvalid: true,
      helperText: 'Error message'
    });
    const helperTextItem = container.querySelector('.pf-v6-c-helper-text__item');
    expect(helperTextItem).toHaveClass('pf-m-error');
  });

  it('displays error icon in helper text when isInvalid is true', () => {
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      isInvalid: true,
      helperText: 'Error message'
    });
    const helperTextIcon = container.querySelector('.pf-v6-c-helper-text__item-icon');
    expect(helperTextIcon).toBeTruthy();
    const icon = helperTextIcon?.querySelector('.fa-exclamation-circle');
    expect(icon).toBeTruthy();
  });

  it('includes screen reader text "Error:" in helper text when isInvalid is true', () => {
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      isInvalid: true,
      helperText: 'Error message'
    });
    const screenReader = container.querySelector('.pf-v6-screen-reader');
    expect(screenReader).toBeTruthy();
    expect(screenReader?.textContent).toBe('Error:');
  });

  it('sets aria-describedby on browse button when helperText is provided', () => {
    const { container } = render(SimpleFileUpload, {
      helperText: 'Helper text'
    });
    // The ID is dynamic, so we'll check if aria-describedby exists on the browse button
    const buttons = container.querySelectorAll('button');
    const browseBtn = Array.from(buttons).find((btn) => btn.textContent?.includes('Upload'));
    expect(browseBtn).toBeTruthy();
    expect(browseBtn).toHaveAttribute('aria-describedby');
  });

  it('sets aria-describedby on textarea when helperText is provided', () => {
    const { container } = render(SimpleFileUpload, {
      type: 'text',
      helperText: 'Helper text'
    });
    const textarea = container.querySelector('textarea');
    expect(textarea).toHaveAttribute('aria-describedby');
  });
});
