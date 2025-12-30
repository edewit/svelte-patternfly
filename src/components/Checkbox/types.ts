export interface CheckboxProps {
  id: string;
  'aria-label'?: string;
  body?: import('svelte').Snippet;
  checked?: boolean;
  className?: string;
  component?: string | import('svelte').ComponentType;
  description?: import('svelte').Snippet | string;
  inputClassName?: string;
  isChecked?: boolean | null;
  isDisabled?: boolean;
  isLabelWrapped?: boolean;
  isRequired?: boolean;
  isValid?: boolean;
  label?: import('svelte').Snippet | string;
  name?: string;
  onChange?: (event: Event, checked: boolean) => void;
  class?: string;
}
