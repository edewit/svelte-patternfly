export interface FormProps {
  className?: string;
  isHorizontal?: boolean;
  isWidthLimited?: boolean;
  maxWidth?: string;
  class?: string;
}

export interface FormGroupProps {
  className?: string;
  fieldId?: string;
  hasNoPaddingTop?: boolean;
  isInline?: boolean;
  isRequired?: boolean;
  isStack?: boolean;
  label?: import('svelte').Snippet | string;
  labelHelp?: import('svelte').Snippet;
  labelInfo?: import('svelte').Snippet | string;
  role?: 'group' | 'radiogroup' | string;
  class?: string;
}

export interface FormHelperTextProps {
  className?: string;
  class?: string;
}

export interface FormGroupLabelHelpProps {
  'aria-label': string;
  className?: string;
  class?: string;
}

export interface ActionGroupProps {
  className?: string;
  class?: string;
}






