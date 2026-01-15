export type TruncatePosition = 'start' | 'middle' | 'end';

export interface TruncateProps {
  /** The content to truncate */
  content: string;
  /** Where to truncate the content */
  position?: TruncatePosition;
  /** Number of characters to show at the end when position is 'middle' */
  trailingNumChars?: number;
  /** Tooltip position */
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}
