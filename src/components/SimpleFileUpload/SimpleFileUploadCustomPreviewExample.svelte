<script lang="ts">
  import SimpleFileUpload from './SimpleFileUpload.svelte';
  import type { DropEvent } from './types';

  let value = $state<File | undefined>(undefined);
  let filename = $state('');

  function handleFileInputChange(_event: DropEvent, file: File) {
    value = file;
    filename = file.name;
  }

  function handleClear(_event: MouseEvent) {
    filename = '';
    value = undefined;
  }
</script>

<SimpleFileUpload
  id="customized-preview-file"
  {value}
  {filename}
  filenamePlaceholder="Drag and drop a file or upload one"
  onFileInputChange={handleFileInputChange}
  onClearClick={handleClear}
  hideDefaultPreview
  browseButtonText="Upload"
>
  {#if value}
    <div>
      <i class="fas fa-upload" style="width: 2em; height: 2em;" aria-hidden="true"></i>
      {' '}Custom preview here for your {value?.size ?? 0}-byte file named{' '}
      {value?.name ?? ''}
    </div>
  {/if}
</SimpleFileUpload>
