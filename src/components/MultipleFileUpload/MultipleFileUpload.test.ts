import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import MultipleFileUpload from './MultipleFileUpload.svelte';
import MultipleFileUploadMain from './MultipleFileUploadMain.svelte';
import MultipleFileUploadStatus from './MultipleFileUploadStatus.svelte';
import MultipleFileUploadStatusItem from './MultipleFileUploadStatusItem.svelte';

describe('MultipleFileUpload', () => {
  it('renders with default props', () => {
    const { container } = render(MultipleFileUpload);
    const element = container.querySelector('.pf-v6-c-multiple-file-upload');
    expect(element).toBeTruthy();
  });

  it('applies horizontal class when isHorizontal is true', () => {
    const { container } = render(MultipleFileUpload, { isHorizontal: true });
    const element = container.querySelector('.pf-v6-c-multiple-file-upload');
    expect(element).toHaveClass('pf-m-horizontal');
  });

  it('renders file input', () => {
    const { container } = render(MultipleFileUpload);
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeTruthy();
  });
});

describe('MultipleFileUploadMain', () => {
  it('renders with default props', () => {
    const { container } = render(MultipleFileUploadMain);
    const element = container.querySelector('.pf-v6-c-multiple-file-upload__main');
    expect(element).toBeTruthy();
  });

  it('renders title text', () => {
    const { container } = render(MultipleFileUploadMain, {
      titleText: 'Test title'
    });
    const text = container.querySelector('.pf-v6-c-multiple-file-upload__title-text');
    expect(text?.textContent).toContain('Test title');
  });

  it('renders upload button by default', () => {
    const { container } = render(MultipleFileUploadMain);
    const button = container.querySelector('.pf-v6-c-button');
    expect(button).toBeTruthy();
  });

  it('hides upload button when isUploadButtonHidden is true', () => {
    const { container } = render(MultipleFileUploadMain, {
      isUploadButtonHidden: true
    });
    const uploadDiv = container.querySelector('.pf-v6-c-multiple-file-upload__upload');
    expect(uploadDiv).toBeFalsy();
  });
});

describe('MultipleFileUploadStatus', () => {
  it('renders with default props', () => {
    const { container } = render(MultipleFileUploadStatus);
    const element = container.querySelector('.pf-v6-c-multiple-file-upload__status');
    expect(element).toBeTruthy();
  });

  it('renders status toggle text', () => {
    const { container } = render(MultipleFileUploadStatus, {
      statusToggleText: '3 of 5 files uploaded'
    });
    const text = container.querySelector('.pf-v6-c-multiple-file-upload__status-progress-text');
    expect(text?.textContent).toContain('3 of 5 files uploaded');
  });
});

describe('MultipleFileUploadStatusItem', () => {
  it('renders with file prop', () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const { container } = render(MultipleFileUploadStatusItem, { file });
    const element = container.querySelector('.pf-v6-c-multiple-file-upload__status-item');
    expect(element).toBeTruthy();
  });

  it('renders file name', () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const { container } = render(MultipleFileUploadStatusItem, { file });
    const name = container.querySelector(
      '.pf-v6-c-multiple-file-upload__status-item-progress-text'
    );
    expect(name?.textContent).toContain('test.txt');
  });

  it('renders with fileName prop when file is not provided', () => {
    const { container } = render(MultipleFileUploadStatusItem, {
      fileName: 'custom.txt',
      fileSize: 1024
    });
    const name = container.querySelector(
      '.pf-v6-c-multiple-file-upload__status-item-progress-text'
    );
    expect(name?.textContent).toContain('custom.txt');
  });
});
