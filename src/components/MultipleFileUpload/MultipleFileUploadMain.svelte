<script lang="ts">
  import type { MultipleFileUploadMainProps } from './types';
  import { getContext } from 'svelte';
  import Button from '../Button/Button.svelte';
  import '@patternfly/patternfly/components/MultipleFileUpload/multiple-file-upload.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends MultipleFileUploadMainProps {
    titleIcon?: import('svelte').Snippet;
    titleText?: import('svelte').Snippet | string;
    titleTextSeparator?: import('svelte').Snippet | string;
    infoText?: import('svelte').Snippet | string;
    children?: import('svelte').Snippet | string;
  }

  let {
    titleIcon,
    titleText = 'Drag and drop files here',
    titleTextSeparator = 'or',
    infoText,
    browseButtonText = 'Upload',
    isUploadButtonHidden = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get file input ref from context (optional for testing)
  let context: { getFileInputRef: () => HTMLInputElement | null } | undefined;
  try {
    context = getContext<{ getFileInputRef: () => HTMLInputElement | null }>('multipleFileUpload');
  } catch {
    // Context not available (e.g., in tests)
    context = undefined;
  }

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-multiple-file-upload__main', className].filter(Boolean).join(' ')
  );

  // Handle upload button click
  function handleUploadClick(_event: MouseEvent) {
    if (!context) {
      console.warn('MultipleFileUpload context not available');
      return;
    }
    const ref = context.getFileInputRef();
    if (ref) {
      ref.click();
    } else {
      console.warn('File input ref not available');
    }
  }
</script>

<div class={classes} {...restProps}>
  <div class="pf-v6-c-multiple-file-upload__title">
    {#if titleIcon}
      <div class="pf-v6-c-multiple-file-upload__title-icon">
        {@render titleIcon()}
      </div>
    {/if}
    <div class="pf-v6-c-multiple-file-upload__title-text">
      {#if typeof titleText === 'string'}
        {titleText}
      {:else if titleText}
        {@render titleText()}
      {/if}
      {#if titleTextSeparator}
        <div class="pf-v6-c-multiple-file-upload__title-text-separator">
          {#if typeof titleTextSeparator === 'string'}
            {titleTextSeparator}
          {:else}
            {@render titleTextSeparator()}
          {/if}
        </div>
      {/if}
    </div>
  </div>
  {#if !isUploadButtonHidden}
    <div class="pf-v6-c-multiple-file-upload__upload" onclick={handleUploadClick} role="button" tabindex="0">
      <Button variant="secondary" type="button">
        {browseButtonText}
      </Button>
    </div>
  {/if}
  {#if infoText}
    <div class="pf-v6-c-multiple-file-upload__info">
      {#if typeof infoText === 'string'}
        {infoText}
      {:else}
        {@render infoText()}
      {/if}
    </div>
  {/if}
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
