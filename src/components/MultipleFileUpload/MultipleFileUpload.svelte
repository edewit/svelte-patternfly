<script lang="ts">
  import type { MultipleFileUploadProps, DropEvent } from './types';
  import { setContext } from 'svelte';
  import '@patternfly/patternfly/components/MultipleFileUpload/multiple-file-upload.css';

  interface Props extends MultipleFileUploadProps {
    children?: import('svelte').Snippet | string;
  }

  let {
    onFileDrop,
    dropzoneProps = {},
    isHorizontal = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // State for drag and drop
  let isDragOver = $state(false);
  let fileInputRef: HTMLInputElement | null = $state(null);

  // Provide file input ref via context
  try {
    setContext('multipleFileUpload', {
      getFileInputRef: () => fileInputRef,
      setFileInputRef: (ref: HTMLInputElement | null) => {
        fileInputRef = ref;
      }
    });
  } catch (e) {
    // Context already set or not available (e.g., in tests)
    // This is fine - the component will still work
  }

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-multiple-file-upload',
      isHorizontal && 'pf-m-horizontal',
      isDragOver && 'pf-m-drag-over',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Get accept attribute from dropzoneProps
  const acceptAttr = $derived(() => {
    if (!dropzoneProps.accept) return undefined;
    const acceptList: string[] = [];
    Object.entries(dropzoneProps.accept).forEach(([mime, exts]) => {
      acceptList.push(mime); // Add MIME type
      exts.forEach((ext) => {
        const normalizedExt = ext.startsWith('.') ? ext : `.${ext}`;
        acceptList.push(normalizedExt); // Add extension
      });
    });
    return acceptList.join(',');
  });

  // Handle file selection from input
  function handleFileInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    if (files.length > 0) {
      handleFiles(files, event as DropEvent);
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
    dropzoneProps.onDragEnter?.(event);
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    dropzoneProps.onDragOver?.(event);
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Only set isDragOver to false if we're leaving the dropzone itself
    const target = event.target as HTMLElement;
    if (!target.closest('.pf-v6-c-multiple-file-upload')) {
      isDragOver = false;
    }
    dropzoneProps.onDragLeave?.(event);
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    isDragOver = false;

    const files = Array.from(event.dataTransfer?.files || []);
    if (files.length > 0) {
      handleFiles(files, event);
    }
  }

  // Process files and call callbacks
  function handleFiles(files: File[], event: DropEvent) {
    const acceptedFiles: File[] = [];
    const rejectedFiles: File[] = [];

    // Filter files based on dropzoneProps
    files.forEach((file) => {
      if (isFileAccepted(file)) {
        acceptedFiles.push(file);
      } else {
        rejectedFiles.push(file);
      }
    });

    // Call dropzone callbacks
    dropzoneProps.onDrop?.(acceptedFiles, rejectedFiles, event);
    if (acceptedFiles.length > 0) {
      dropzoneProps.onDropAccepted?.(acceptedFiles, event);
    }
    if (rejectedFiles.length > 0) {
      dropzoneProps.onDropRejected?.(rejectedFiles, event);
    }

    // Call our onFileDrop callback
    if (acceptedFiles.length > 0) {
      onFileDrop?.(event, acceptedFiles);
    }
  }

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
</script>

<div
  class={classes}
  {...restProps}
  ondragenter={handleDragEnter}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
>
  <input
    bind:this={fileInputRef}
    type="file"
    accept={acceptAttr()}
    multiple={dropzoneProps.multiple !== false}
    style="display: none;"
    onchange={handleFileInputChange}
  />
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
