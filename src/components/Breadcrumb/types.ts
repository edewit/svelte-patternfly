export interface BreadcrumbDropdownMenuItem {
  href?: string;
  text: string;
  'aria-label'?: string;
  onClick?: () => void;
}

export interface BreadcrumbItem {
  href?: string;
  text: string;
  isCurrent?: boolean;
  'aria-label'?: string;
  type?: 'link' | 'dropdown' | 'heading';
  dropdownCount?: number;
  isExpanded?: boolean;
  dropdownItems?: BreadcrumbDropdownMenuItem[];
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  'aria-label'?: string;
  class?: string;
}

export interface BreadcrumbItemProps {
  isCurrent?: boolean;
  class?: string;
}

export interface BreadcrumbLinkProps {
  href?: string;
  isCurrent?: boolean;
  'aria-label'?: string;
  class?: string;
}
