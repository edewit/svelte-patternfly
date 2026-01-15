export interface SwitchProps {
  id: string;
  'aria-label'?: string;
  className?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isReversed?: boolean;
  label?: import('svelte').Snippet | string;
  labelOff?: import('svelte').Snippet | string;
  name?: string;
  onChange?: (event: Event, checked: boolean) => void;
  ouiaId?: string;
  ouiaSafe?: boolean;
  class?: string;
}
