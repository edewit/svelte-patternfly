<script lang="ts">
  import type { MultipleFileUploadStatusItemProps, ProgressVariant } from './types';
  import HelperText from '../HelperText/HelperText.svelte';
  import HelperTextItem from '../HelperText/HelperTextItem.svelte';
  import '@patternfly/patternfly/components/MultipleFileUpload/multiple-file-upload.css';
  import '@patternfly/patternfly/components/Progress/progress.css';

  interface Props extends MultipleFileUploadStatusItemProps {
    children?: import('svelte').Snippet | string;
  }

  let {
    file,
    fileName,
    fileSize,
    progressValue,
    progressVariant,
    progressHelperText,
    progressAriaDescribedBy,
    onClearClick,
    onReadSuccess,
    onReadFail,
    customFileHandler,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // State
  let currentProgress = $state(progressValue ?? 0);
  let currentVariant = $state<ProgressVariant | undefined>(progressVariant);
  let isReading = $state(false);
  let readError: DOMException | null = $state(null);
  let progressInterval: ReturnType<typeof setInterval> | null = $state(null);
  let _hasReadFile = $state(false);
  let lastReadFileName = $state<string | null>(null);

  // Use file if provided, otherwise use fileName/fileSize
  const displayFileName = $derived(file?.name || fileName || 'Unknown file');
  const displayFileSize = $derived(file?.size || fileSize || 0);

  // Format file size (returns format like "40 mb")
  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = Math.round((bytes / Math.pow(k, i)) * 100) / 100;
    const unit = sizes[i].toLowerCase();
    return `${size} ${unit}`;
  }

  // Generate unique ID for progress bar
  const progressId = $derived(
    `multiple-file-upload-status-expanded-progress-${displayFileName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`
  );
  const progressDescriptionId = $derived(`${progressId}-description`);

  // Read file if provided
  $effect(() => {
    const fileToRead = file;
    const fileNameToCheck = fileToRead?.name;

    // Only read once per file (track by filename to handle object reference changes)
    // Allow reading even when customFileHandler is provided
    if (fileToRead && !fileName && fileNameToCheck && fileNameToCheck !== lastReadFileName) {
      lastReadFileName = fileNameToCheck;
      _hasReadFile = true;
      readFile();
    }

    // Cleanup on unmount or file change
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    };
  });

  async function readFile() {
    if (!file || isReading) return;

    isReading = true;
    currentProgress = 0;
    currentVariant = undefined;
    readError = null;

    try {
      if (customFileHandler) {
        // Clear any existing interval
        if (progressInterval) {
          clearInterval(progressInterval);
          progressInterval = null;
        }

        // Simulate progress before failure
        currentProgress = 5;
        progressInterval = setInterval(() => {
          if (isReading && currentProgress < 50) {
            currentProgress = Math.min(currentProgress + 5, 50);
          }
        }, 100);

        try {
          // Add a small delay to show progress before failing
          await new Promise((resolve) => setTimeout(resolve, 500));
          await customFileHandler(file);
          if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
          }
          currentProgress = 100;
          currentVariant = 'success';
          isReading = false;
          onReadSuccess?.('', file);
        } catch (error) {
          // Handle custom file handler errors
          if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
          }
          const domError =
            error instanceof DOMException
              ? error
              : new DOMException(error instanceof Error ? error.message : 'File read failed');
          currentProgress = 0;
          currentVariant = 'danger';
          isReading = false;
          readError = domError;
          onReadFail?.(domError, file);
        }
      } else {
        const reader = new FileReader();

        // Clear any existing interval
        if (progressInterval) {
          clearInterval(progressInterval);
        }

        // Simulate progress for better UX (FileReader progress events are unreliable)
        // Start with a small progress to show something is happening
        currentProgress = 5;
        progressInterval = setInterval(() => {
          if (isReading && currentProgress < 90) {
            currentProgress = Math.min(currentProgress + 5, 90);
          } else if (!isReading) {
            if (progressInterval) {
              clearInterval(progressInterval);
              progressInterval = null;
            }
          }
        }, 150);

        reader.onprogress = (event) => {
          if (event.lengthComputable && isReading) {
            const calculatedProgress = Math.round((event.loaded / event.total) * 100);
            // Use the higher of simulated or actual progress
            currentProgress = Math.max(currentProgress, Math.min(calculatedProgress, 90));
          }
        };

        reader.onload = () => {
          if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
          }
          const result = reader.result as string;
          currentProgress = 100;
          currentVariant = 'success';
          isReading = false;
          onReadSuccess?.(result, file);
        };

        reader.onerror = () => {
          if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
          }
          const error = reader.error || new DOMException('File read failed');
          currentProgress = 0;
          currentVariant = 'danger';
          isReading = false;
          readError = error as DOMException;
          onReadFail?.(error as DOMException, file);
        };

        reader.readAsDataURL(file);
      }
    } catch (error) {
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
      const domError = error instanceof DOMException ? error : new DOMException('File read failed');
      currentProgress = 0;
      currentVariant = 'danger';
      isReading = false;
      readError = domError;
      onReadFail?.(domError, file);
    }
  }

  // Update progress when prop changes
  $effect(() => {
    if (progressValue !== undefined) {
      currentProgress = progressValue;
    }
  });

  $effect(() => {
    if (progressVariant !== undefined) {
      currentVariant = progressVariant;
    }
  });

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-multiple-file-upload__status-item', className].filter(Boolean).join(' ')
  );

  // Determine progress variant class
  const _progressVariantClass = $derived(() => {
    if (!currentVariant) return '';
    return `pf-m-${currentVariant}`;
  });

  function handleClear() {
    onClearClick?.();
  }
</script>

<li class={classes} {...restProps}>
  <div
    class="pf-v6-c-multiple-file-upload__status-item-icon"
    class:pf-m-danger={currentVariant === 'danger' || readError !== null}
  >
    {#if currentVariant === 'danger' || readError}
      <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
    {:else if isReading}
      <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
    {:else}
      <i class="fas fa-file" aria-hidden="true"></i>
    {/if}
  </div>
  <div class="pf-v6-c-multiple-file-upload__status-item-main">
    <div
      class="pf-v6-c-progress"
      id={progressId}
      class:pf-m-success={currentProgress === 100 && currentVariant === 'success'}
    >
      <div
        class="pf-v6-c-progress__description"
        id={progressDescriptionId}
        aria-hidden={currentProgress === 100 && currentVariant === 'success' ? 'true' : undefined}
      >
        <span class="pf-v6-c-multiple-file-upload__status-item-progress">
          <span class="pf-v6-c-multiple-file-upload__status-item-progress-text">
            {displayFileName}
          </span>
          <span class="pf-v6-c-multiple-file-upload__status-item-progress-size">
            {formatFileSize(displayFileSize)}
          </span>
        </span>
      </div>
      <div class="pf-v6-c-progress__status" aria-hidden="true">
        <span class="pf-v6-c-progress__measure">{currentProgress}%</span>
        {#if currentProgress === 100 && currentVariant === 'success'}
          <span class="pf-v6-c-progress__status-icon">
            <i class="fas fa-check-circle" aria-hidden="true"></i>
          </span>
        {/if}
      </div>
      <div
        class="pf-v6-c-progress__bar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={currentProgress}
        aria-labelledby={progressDescriptionId}
        aria-describedby={progressAriaDescribedBy}
      >
        <div
          class="pf-v6-c-progress__indicator"
          style="width:{currentProgress}%;"
          class:pf-m-success={currentVariant === 'success'}
          class:pf-m-danger={currentVariant === 'danger'}
          class:pf-m-warning={currentVariant === 'warning'}
        >
          {#if currentProgress === 100 && currentVariant === 'success'}
            <span class="pf-v6-c-progress__measure"></span>
          {/if}
        </div>
      </div>
    </div>
    {#if readError && !progressHelperText}
      <div class="pf-v6-c-multiple-file-upload__status-item-progress-text">
        <HelperText
          id={progressAriaDescribedBy || `${progressId}-helper`}
          isLiveRegion={true}
        >
          <HelperTextItem variant="error">
            {readError.toString()}
          </HelperTextItem>
        </HelperText>
      </div>
    {/if}
    {#if progressHelperText}
      <div class="pf-v6-c-multiple-file-upload__status-item-progress-text">
        {#if typeof progressHelperText === 'string'}
          {progressHelperText}
        {:else}
          {@render progressHelperText()}
        {/if}
      </div>
    {/if}
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </div>
  <div class="pf-v6-c-multiple-file-upload__status-item-close">
    <button
      class="pf-v6-c-button pf-m-plain"
      type="button"
      aria-label="Remove from list"
      onclick={handleClear}
    >
      <span class="pf-v6-c-button__icon">
        <i class="fas fa-times" aria-hidden="true"></i>
      </span>
    </button>
  </div>
</li>
