export interface DatePickerProps {
  value?: string;
  onChange?: (event: Event, value: string, date: Date | null) => void;
  onBlur?: (event: Event, value: string, date: Date | null) => void;
  'aria-label'?: string;
  id?: string;
  name?: string;
  class?: string;
  helperText?: string;
  isInvalid?: boolean;
  isExpanded?: boolean;
  calendarPosition?: 'top' | 'bottom';
  calendarAlign?: 'left' | 'right';
}
