export type ClipboardCopyVariant = 'basic' | 'expanded' | 'inline-compact';

export interface ClipboardCopyProps {
  variant?: ClipboardCopyVariant;
  children: string | string[];
  isReadOnly?: boolean;
  isExpanded?: boolean;
  isExpandedByDefault?: boolean;
  isCode?: boolean;
  isEditable?: boolean;
  isCompact?: boolean;
  clickTip?: string;
  hoverTip?: string;
  exitDelay?: number;
  entryDelay?: number;
  maxWidth?: string;
  minWidth?: string;
  position?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  additionalActions?: import('svelte').Snippet;
  truncation?:
    | boolean
    | {
        position?: 'start' | 'middle' | 'end';
        numChars?: number;
      };
  'aria-label'?: string;
  'aria-describedby'?: string;
  class?: string;
  id?: string;
}
