export enum TimestampFormat {
  full = 'full',
  long = 'long',
  medium = 'medium',
  short = 'short'
}

export enum TimestampTooltipVariant {
  default = 'default',
  custom = 'custom'
}

export interface TimestampTooltip {
  /** Variant of the tooltip */
  variant?: TimestampTooltipVariant;
  /** Custom tooltip content (for custom variant) */
  content?: string;
  /** Tooltip suffix (e.g., timezone) */
  suffix?: string;
  /** Date format for tooltip */
  dateFormat?: TimestampFormat;
  /** Time format for tooltip */
  timeFormat?: TimestampFormat;
}

export interface TimestampProps {
  /** The date to display */
  date?: Date;
  /** Custom format for the date portion */
  dateFormat?: TimestampFormat;
  /** Custom format for the time portion */
  timeFormat?: TimestampFormat;
  /** Whether to display date only (no time) */
  isDateOnly?: boolean;
  /** Whether to display time only (no date) */
  isTimeOnly?: boolean;
  /** Locale for formatting */
  locale?: string;
  /** Timezone for display */
  timezone?: string;
  /** Display format for 12/24 hour time */
  is12Hour?: boolean;
  /** Tooltip configuration */
  tooltip?: TimestampTooltip;
  /** Custom datetime attribute value */
  customFormat?: string;
  /** Additional CSS class */
  class?: string;
  /** Children content (custom display text) */
  children?: import('svelte').Snippet | string;
  /** Allow additional props */
  [key: string]: unknown;
}
