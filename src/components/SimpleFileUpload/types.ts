export type DropEvent = DragEvent | Event | { target: HTMLInputElement };

export interface SimpleFileUploadProps {
  id?: string;
  type?: 'text';
  value?: string | File;
  filename?: string;
  filenamePlaceholder?: string;
  onFileInputChange?: (event: DropEvent, file: File) => void;
  onDataChange?: (event: DropEvent, value: string) => void;
  onTextChange?: (event: Event, value: string) => void;
  onReadStarted?: (event: DropEvent, fileHandle: File) => void;
  onReadFinished?: (event: DropEvent, fileHandle: File) => void;
  onClearClick?: (event: MouseEvent) => void;
  isLoading?: boolean;
  allowEditingUploadedText?: boolean;
  browseButtonText?: string;
  hideDefaultPreview?: boolean;
  isInvalid?: boolean;
  helperText?: string;
  dropzoneProps?: {
    accept?: Record<string, string[]>;
    disabled?: boolean;
    maxSize?: number;
    minSize?: number;
    multiple?: boolean;
    [key: string]: unknown;
  };
  'aria-label'?: string;
  'aria-describedby'?: string;
  class?: string;
}
