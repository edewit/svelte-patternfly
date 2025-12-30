<script lang="ts">
  import type { SimpleFileUploadProps, DropEvent } from './types';
  import HelperText from '../HelperText/HelperText.svelte';
  import HelperTextItem from '../HelperText/HelperTextItem.svelte';
  import '@patternfly/patternfly/components/FileUpload/file-upload.css';
  import '@patternfly/patternfly/components/Button/button.css';
  import '@patternfly/patternfly/components/FormControl/form-control.css';
  import '@patternfly/patternfly/components/InputGroup/input-group.css';
  import '@patternfly/patternfly/components/Spinner/spinner.css';

  interface Props extends SimpleFileUploadProps {
    children?: import('svelte').Snippet;
  }

  let {
    id,
    type,
    value = '',
    filename = '',
    filenamePlaceholder = 'Drag and drop a file or upload one',
    onFileInputChange,
    onDataChange,
    onTextChange,
    onReadStarted,
    onReadFinished,
    onClearClick,
    isLoading = false,
    allowEditingUploadedText = false,
    browseButtonText = 'Upload',
    hideDefaultPreview = false,
    isInvalid = false,
    helperText,
    dropzoneProps = {},
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // State for drag and drop
  let isDragOver = $state(false);
  let fileInputRef: HTMLInputElement | null = $state(null);
  let textareaRef: HTMLTextAreaElement | null = $state(null);

  // Internal state for value and filename
  let internalValue = $state<string | File | undefined>(
    value !== undefined ? value : type === 'text' ? '' : undefined
  );
  let internalFilename = $state(filename);

  // Sync with props
  $effect(() => {
    if (value !== undefined) {
      internalValue = value;
    } else if (type === 'text') {
      internalValue = '';
    } else {
      internalValue = undefined;
    }
  });

  $effect(() => {
    internalFilename = filename;
  });

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-file-upload', isLoading && 'pf-m-loading', isDragOver && 'pf-m-drag-hover', className]
      .filter(Boolean)
      .join(' ')
  );

  // Get accept attribute from dropzoneProps
  const acceptAttr = $derived(() => {
    if (!dropzoneProps.accept) return undefined;
    const acceptList: string[] = [];
    Object.entries(dropzoneProps.accept).forEach(([mime, exts]) => {
      acceptList.push(mime);
      exts.forEach((ext) => {
        const normalizedExt = ext.startsWith('.') ? ext : `.${ext}`;
        acceptList.push(normalizedExt);
      });
    });
    return acceptList.join(',');
  });

  // Check if file is accepted based on dropzoneProps
  function isFileAccepted(file: File): boolean {
    if (dropzoneProps.disabled) return false;
    if (dropzoneProps.maxSize && file.size > dropzoneProps.maxSize) return false;
    if (dropzoneProps.minSize && file.size < dropzoneProps.minSize) return false;
    if (dropzoneProps.accept) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const fileType = file.type;
      return Object.entries(dropzoneProps.accept).some(([mime, exts]) => {
        return exts.some((ext) => {
          const normalizedExt = ext.startsWith('.') ? ext : `.${ext}`;
          return fileExtension === normalizedExt || fileType === mime;
        });
      });
    }
    return true;
  }

  // Read text file
  async function readTextFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = () => {
        reject(new DOMException('File read failed'));
      };
      reader.readAsText(file);
    });
  }

  // Handle file selection
  async function handleFile(file: File, event: DropEvent) {
    if (!isFileAccepted(file)) {
      return;
    }

    internalFilename = file.name;
    onFileInputChange?.(event, file);

    // If type is text, read the file
    if (type === 'text') {
      onReadStarted?.(event, file);
      try {
        const textContent = await readTextFile(file);
        internalValue = textContent;
        onDataChange?.(event, textContent);
      } catch (error) {
        console.error('Error reading file:', error);
      } finally {
        onReadFinished?.(event, file);
      }
    } else {
      // For non-text files, store File object
      internalValue = file;
      // Note: onDataChange expects string, but we pass File for non-text types
      // This matches React behavior where File is passed as second arg to onFileInputChange
    }
  }

  // Handle file input change
  function handleFileInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      handleFile(file, event);
    }
    // Reset input so same file can be selected again
    if (target) {
      target.value = '';
    }
  }

  // Handle drag events
  function handleDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    isDragOver = true;
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (!target.closest('.pf-v6-c-file-upload')) {
      isDragOver = false;
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    isDragOver = false;

    const file = event.dataTransfer?.files[0];
    if (file) {
      handleFile(file, event);
    }
  }

  // Handle browse button click
  function handleBrowseClick() {
    if (fileInputRef && !dropzoneProps.disabled && !isLoading) {
      fileInputRef.click();
    }
  }

  // Handle clear button click
  function handleClear(event: MouseEvent) {
    if (type === 'text') {
      internalValue = '';
    } else {
      internalValue = undefined as any;
    }
    internalFilename = '';
    onClearClick?.(event);
  }

  // Handle textarea change
  function handleTextareaChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    const newValue = target.value;
    internalValue = newValue;
    onTextChange?.(event, newValue);
  }

  // Generate IDs
  const componentId = $derived(id || `file-upload-${Math.random().toString(36).substring(2, 11)}`);
  const inputId = $derived(`${componentId}-text-input`);
  const browseId = $derived(`${componentId}-browse`);
  const fileDetailsId = $derived(`${componentId}-file-details`);
  const helperTextId = $derived(helperText ? `${componentId}-helper-text` : undefined);

  // Combine aria-describedby
  const combinedAriaDescribedBy = $derived(
    [ariaDescribedBy, helperTextId].filter(Boolean).join(' ') || undefined
  );
</script>

<div
  class={classes}
  id={componentId}
  ondragenter={handleDragEnter}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
  {...restProps}
>
  <input
    bind:this={fileInputRef}
    type="file"
    accept={acceptAttr()}
    multiple={dropzoneProps.multiple === true}
    style="display: none;"
    onchange={handleFileInputChange}
    disabled={dropzoneProps.disabled || isLoading}
  />

  <div class="pf-v6-c-file-upload__file-select">
    <div class="pf-v6-c-input-group">
      <div class="pf-v6-c-input-group__item pf-m-fill">
        <span class="pf-v6-c-form-control pf-m-readonly">
          <input
            readonly
            id={inputId}
            name={componentId}
            aria-label={ariaLabel || (isInvalid ? 'File upload error' : 'Read only filename')}
            value={internalFilename || filenamePlaceholder}
            aria-describedby={browseId}
          />
        </span>
      </div>
      <div class="pf-v6-c-input-group__item">
        <button
          class="pf-v6-c-button pf-m-control"
          type="button"
          disabled={dropzoneProps.disabled || isLoading}
          id={browseId}
          aria-describedby={combinedAriaDescribedBy}
          onclick={handleBrowseClick}
        >
          <span class="pf-v6-c-button__text">{browseButtonText}</span>
        </button>
      </div>
      <div class="pf-v6-c-input-group__item">
        <button class="pf-v6-c-button pf-m-control" type="button" onclick={handleClear}>
          <span class="pf-v6-c-button__text">Clear</span>
        </button>
      </div>
    </div>
  </div>

  {#if !hideDefaultPreview && type === 'text'}
    <div
      class="pf-v6-c-file-upload__file-details"
      aria-describedby={combinedAriaDescribedBy}
      aria-invalid={isInvalid ? 'true' : undefined}
    >
      <span
        class="pf-v6-c-form-control pf-m-textarea pf-m-resize-vertical"
        class:pf-m-error={isInvalid}
      >
        <textarea
          bind:this={textareaRef}
          id={fileDetailsId}
          name={`${componentId}-file-details`}
          aria-label={isInvalid ? 'Empty text area' : 'Text area'}
          aria-describedby={combinedAriaDescribedBy}
          aria-invalid={isInvalid ? 'true' : undefined}
          value={typeof internalValue === 'string' ? internalValue : ''}
          readonly={!allowEditingUploadedText && !!internalFilename}
          oninput={handleTextareaChange}
        ></textarea>
        {#if isInvalid}
          <span class="pf-v6-c-form-control__utilities">
            <span class="pf-v6-c-form-control__icon pf-m-status">
              <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
            </span>
          </span>
        {/if}
      </span>
      {#if isLoading}
        <div class="pf-v6-c-file-upload__file-details-spinner">
          <svg
            class="pf-v6-c-spinner pf-m-lg"
            role="progressbar"
            viewBox="0 0 100 100"
            aria-label="Loading..."
          >
            <circle class="pf-v6-c-spinner__path" cx="50" cy="50" r="45" fill="none" />
          </svg>
        </div>
      {/if}
    </div>
  {/if}

  {@render children?.()}

  {#if helperText}
    <div class="pf-v6-c-file-upload__helper-text">
      <HelperText>
        <HelperTextItem variant={isInvalid ? 'error' : 'default'} id={helperTextId}>
          {helperText}
        </HelperTextItem>
      </HelperText>
    </div>
  {/if}
</div>
