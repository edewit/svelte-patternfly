export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'warning'
  | 'link'
  | 'plain'
  | 'control'
  | 'stateful';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonStatefulState = 'read' | 'unread' | 'attention';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  isDanger?: boolean;
  isBlock?: boolean;
  isInline?: boolean;
  isAriaDisabled?: boolean;
  component?: 'button' | 'a' | 'span';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  inProgress?: boolean;
  statefulState?: ButtonStatefulState;
  count?: number;
  'aria-label'?: string;
  'aria-describedby'?: string;
  class?: string;
}
