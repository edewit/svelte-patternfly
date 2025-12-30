export type AccordionDisplaySize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type AccordionToggleIconPosition = 'start' | 'end';

export interface AccordionProps {
  asDefinitionList?: boolean;
  isBordered?: boolean;
  displaySize?: AccordionDisplaySize;
  toggleIconPosition?: AccordionToggleIconPosition;
  isMultipleExpandable?: boolean;
  isFixed?: boolean;
  class?: string;
}

export interface AccordionItemProps {
  isExpanded?: boolean;
  class?: string;
}

export interface AccordionToggleProps {
  isExpanded?: boolean;
  isDisabled?: boolean;
  isCustomContent?: boolean;
  isCustomIcon?: boolean;
  isCustomText?: boolean;
  isPlain?: boolean;
  isHoverable?: boolean;
  isFocused?: boolean;
  isActive?: boolean;
  isPressed?: boolean;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  'aria-label'?: string;
  'aria-describedby'?: string;
  class?: string;
  children?: import('svelte').Snippet;
}

export interface AccordionContentProps {
  isExpanded?: boolean;
  isFixed?: boolean;
  maxHeight?: string;
  class?: string;
}

export interface AccordionExpandableContentBodyProps {
  class?: string;
  children?: import('svelte').Snippet;
}
