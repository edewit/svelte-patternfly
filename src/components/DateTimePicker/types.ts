export interface DateTimePickerProps {
  date?: Date;
  time?: string;
  times?: number[];
  defaultTime?: string;
  dateFormat?: (date: Date) => string;
  onChange?: (date: Date, time: string) => void;
  'aria-label'?: string;
  id?: string;
  class?: string;
  width?: string;
}
