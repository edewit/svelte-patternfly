export type DropEvent = DragEvent | Event | { target: HTMLInputElement };

export interface DropzoneOptions {
  accept?: Record<string, string[]>;
  disabled?: boolean;
  maxSize?: number;
  minSize?: number;
  multiple?: boolean;
  onDrop?: (acceptedFiles: File[], rejectedFiles: File[], event: DropEvent) => void;
  onDropAccepted?: (files: File[], event: DropEvent) => void;
  onDropRejected?: (files: File[], event: DropEvent) => void;
  onDragEnter?: (event: DragEvent) => void;
  onDragLeave?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
  [key: string]: unknown;
}

export interface MultipleFileUploadProps {
  onFileDrop?: (event: DropEvent, files: File[]) => void;
  dropzoneProps?: DropzoneOptions;
  isHorizontal?: boolean;
  class?: string;
}

export interface MultipleFileUploadMainProps {
  titleIcon?: import('svelte').Snippet;
  titleText?: import('svelte').Snippet | string;
  titleTextSeparator?: import('svelte').Snippet | string;
  infoText?: import('svelte').Snippet | string;
  browseButtonText?: string;
  isUploadButtonHidden?: boolean;
  class?: string;
}

export type ProgressVariant = 'success' | 'danger' | 'warning';

export interface MultipleFileUploadStatusProps {
  statusToggleText?: string;
  statusToggleIcon?: 'inProgress' | 'success' | 'danger';
  'aria-label'?: string;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface MultipleFileUploadStatusItemProps {
  file?: File;
  fileName?: string;
  fileSize?: number;
  progressValue?: number;
  progressVariant?: ProgressVariant;
  progressHelperText?: import('svelte').Snippet | string;
  progressAriaDescribedBy?: string;
  onClearClick?: () => void;
  onReadSuccess?: (data: string, file: File) => void;
  onReadFail?: (error: DOMException, file: File) => void;
  customFileHandler?: (file: File) => Promise<void>;
  class?: string;
}
