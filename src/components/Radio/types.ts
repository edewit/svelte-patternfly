export interface RadioProps {
  id: string;
  name: string;
  'aria-label'?: string;
  body?: import('svelte').Snippet;
  checked?: boolean;
  className?: string;
  component?: string | import('svelte').ComponentType;
  description?: import('svelte').Snippet | string;
  inputClassName?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isLabelWrapped?: boolean;
  isValid?: boolean;
  label?: import('svelte').Snippet | string;
  onChange?: (event: Event, checked: boolean) => void;
  class?: string;
}
