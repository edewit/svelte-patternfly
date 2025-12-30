export interface CalendarMonthInlineProps {
  component?: string;
  title?: import('svelte').Snippet;
  ariaLabelledby?: string;
  [key: string]: any;
}

export interface CalendarMonthProps {
  date?: Date | number;
  onChange?: (event: MouseEvent, date: Date) => void;
  onMonthChange?: (event: MouseEvent | Event | undefined, newDate: Date) => void;
  cellAriaLabel?: (date: Date) => string;
  className?: string;
  dayFormat?: (date: Date) => string | number;
  inlineProps?: CalendarMonthInlineProps;
  rangeStart?: Date | number;
  validators?: Array<(date: Date) => boolean>;
  'aria-label'?: string;
  class?: string;
  children?: import('svelte').Snippet;
}
