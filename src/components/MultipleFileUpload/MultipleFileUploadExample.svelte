<script lang="ts">
  import MultipleFileUpload from './MultipleFileUpload.svelte';
  import MultipleFileUploadMain from './MultipleFileUploadMain.svelte';
  import MultipleFileUploadStatus from './MultipleFileUploadStatus.svelte';
  import MultipleFileUploadStatusItem from './MultipleFileUploadStatusItem.svelte';
  import type { DropEvent } from './types';
  import '@patternfly/patternfly/components/Check/check.css';
  import '@patternfly/patternfly/components/HelperText/helper-text.css';

  interface readFile {
    fileName: string;
    data?: string;
    loadResult?: 'danger' | 'success';
    loadError?: DOMException;
  }

  interface Props {
    isHorizontal?: boolean;
  }

  let { isHorizontal: isHorizontalProp = false }: Props = $props();

  let isHorizontal = $state(isHorizontalProp);
  let fileUploadShouldFail = $state(false);
  let currentFiles = $state<File[]>([]);
  let readFileData = $state<readFile[]>([]);
  let showStatus = $state(false);
  let statusIcon = $state<'inProgress' | 'success' | 'danger'>('inProgress');

  // Update isHorizontal when prop changes
  $effect(() => {
    isHorizontal = isHorizontalProp;
  });

  // Only show the status component once a file has been uploaded
  $effect(() => {
    if (!showStatus && currentFiles.length > 0) {
      showStatus = true;
    }
  });

  // Determine the icon that should be shown for the overall status list
  $effect(() => {
    if (readFileData.length < currentFiles.length) {
      statusIcon = 'inProgress';
    } else if (readFileData.every((file) => file.loadResult === 'success')) {
      statusIcon = 'success';
    } else {
      statusIcon = 'danger';
    }
  });

  // Remove files from both state arrays based on their name
  function removeFiles(namesOfFilesToRemove: string[]) {
    currentFiles = currentFiles.filter(
      (currentFile) => !namesOfFilesToRemove.some((fileName) => fileName === currentFile.name)
    );
    readFileData = readFileData.filter(
      (readFile) => !namesOfFilesToRemove.some((fileName) => fileName === readFile.fileName)
    );
  }

  /** Forces uploaded files to become corrupted if "Demonstrate error reporting by forcing uploads to fail" is selected,
   * only used in this example for demonstration purposes */
  function updateCurrentFiles(files: File[]) {
    currentFiles = [...currentFiles, ...files];
  }

  // Callback that will be called by the dropzone with the newly dropped file objects
  function handleFileDrop(_event: DropEvent, droppedFiles: File[]) {
    if (droppedFiles.length === 0) return;

    // Identify what, if any, files are re-uploads of already uploaded files
    const currentFileNames = currentFiles.map((file) => file.name);
    const reUploads = droppedFiles.filter((droppedFile) =>
      currentFileNames.includes(droppedFile.name)
    );

    /** This promise chain is needed because if the file removal is done at the same time as the file adding react
     * won't realize that the status items for the re-uploaded files needs to be re-rendered */
    Promise.resolve()
      .then(() => {
        if (reUploads.length > 0) {
          removeFiles(reUploads.map((file) => file.name));
        }
      })
      .then(() => {
        // Only add files that aren't already in the list
        const newFiles = droppedFiles.filter((file) => !currentFileNames.includes(file.name));
        if (newFiles.length > 0) {
          updateCurrentFiles(newFiles);
        }
      });
  }

  // Callback called by the status item when a file is successfully read with the built-in file reader
  function handleReadSuccess(data: string, file: File) {
    readFileData = [...readFileData, { data, fileName: file.name, loadResult: 'success' }];
  }

  // Callback called by the status item when a file encounters an error while being read with the built-in file reader
  function handleReadFail(error: DOMException, file: File) {
    readFileData = [
      ...readFileData,
      { loadError: error, fileName: file.name, loadResult: 'danger' }
    ];
  }

  // Add helper text to a status item showing any error encountered during the file reading process
  function createHelperText(file: File, _fileIndex: number) {
    const fileResult = readFileData.find((readFile) => readFile.fileName === file.name);
    if (fileResult?.loadError) {
      return fileResult.loadError.toString();
    }
    return null;
  }

  const successfullyReadFileCount = $derived(
    readFileData.filter((fileData) => fileData.loadResult === 'success').length
  );

  const statusToggleText = $derived(
    `${successfullyReadFileCount} of ${currentFiles.length} files uploaded`
  );
</script>

<MultipleFileUpload
  onFileDrop={handleFileDrop}
  dropzoneProps={{
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/msword': ['.doc'],
      'application/pdf': ['.pdf'],
      'image/png': ['.png']
    }
  }}
  {isHorizontal}
>
  <MultipleFileUploadMain
    titleText="Drag and drop files here"
    titleTextSeparator="or"
    infoText="Accepted file types: JPEG, Doc, PDF, PNG"
  >
    {#snippet titleIcon()}
      <i class="fas fa-upload" aria-hidden="true"></i>
    {/snippet}
  </MultipleFileUploadMain>

  {#if showStatus}
    <MultipleFileUploadStatus
      {statusToggleText}
      statusToggleIcon={statusIcon}
      aria-label="Current uploads"
    >
      {#each currentFiles as file, index (file.name)}
        <MultipleFileUploadStatusItem
          {file}
          onClearClick={() => removeFiles([file.name])}
          onReadSuccess={handleReadSuccess}
          onReadFail={handleReadFail}
          progressAriaDescribedBy="multiple-file-upload-basic-example-help-text-{index}"
          customFileHandler={fileUploadShouldFail
            ? () => {
                return Promise.reject(
                  new DOMException('File read failed - simulated error for demonstration')
                );
              }
            : undefined}
        >
          {#if createHelperText(file, index)}
            {#snippet _progressHelperText()}
              <div
                class="pf-v6-c-helper-text"
                id="multiple-file-upload-basic-example-help-text-{index}"
                role="region"
                aria-live="polite"
              >
                <div class="pf-v6-c-helper-text__item pf-m-error">
                  <span class="pf-v6-c-helper-text__item-icon">
                    <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
                  </span>
                  <span class="pf-v6-c-helper-text__item-text">
                    {createHelperText(file, index)}
                  </span>
                </div>
              </div>
            {/snippet}
          {/if}
        </MultipleFileUploadStatusItem>
      {/each}
    </MultipleFileUploadStatus>
  {/if}
</MultipleFileUpload>

<div style="margin-top: 1rem;">
  <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
    <input type="checkbox" bind:checked={isHorizontal} id="horizontal-checkbox" />
    <span>Show as horizontal</span>
  </label>
  <label style="display: flex; align-items: center; gap: 0.5rem;">
    <input type="checkbox" bind:checked={fileUploadShouldFail} id="upload-should-fail-checkbox" />
    <span>Demonstrate error reporting by forcing uploads to fail</span>
  </label>
</div>
