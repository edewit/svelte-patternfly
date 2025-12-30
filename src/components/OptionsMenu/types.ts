import type { SelectProps } from '../Select/types';

export interface OptionsMenuProps extends Omit<SelectProps, 'toggle'> {
  toggleLabel?: string;
}



