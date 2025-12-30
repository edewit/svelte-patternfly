<script lang="ts">
  import SimpleFileUpload from './SimpleFileUpload.svelte';
  import type { DropEvent } from './types';

  let value = $state('');
  let filename = $state('');
  let isLoading = $state(false);

  function handleFileInputChange(_event: DropEvent, file: File) {
    filename = file.name;
  }

  function handleTextChange(_event: Event, newValue: string) {
    value = newValue;
  }

  function handleDataChange(_event: DropEvent, newValue: string) {
    value = newValue;
  }

  function handleClear(_event: MouseEvent) {
    filename = '';
    value = '';
  }

  function handleFileReadStarted(_event: DropEvent, _fileHandle: File) {
    isLoading = true;
  }

  function handleFileReadFinished(_event: DropEvent, _fileHandle: File) {
    isLoading = false;
  }
</script>

<SimpleFileUpload
  id="text-file-simple"
  type="text"
  {value}
  {filename}
  filenamePlaceholder="Drag and drop a file or upload one"
  onFileInputChange={handleFileInputChange}
  onDataChange={handleDataChange}
  onTextChange={handleTextChange}
  onReadStarted={handleFileReadStarted}
  onReadFinished={handleFileReadFinished}
  onClearClick={handleClear}
  {isLoading}
  allowEditingUploadedText={false}
  browseButtonText="Upload"
/>
