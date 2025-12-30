export type CardVariant = 'default' | 'secondary' | 'plain';
export type CardSelectType = 'checkbox' | 'radio';

export interface CardProps {
  id?: string;
  class?: string;
  variant?: CardVariant;
  isSelectable?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  selectType?: CardSelectType;
  checkboxName?: string;
  radioName?: string;
  onSelect?: (selected: boolean) => void;
}
