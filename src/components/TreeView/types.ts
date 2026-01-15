export interface TreeViewDataItem {
  /** Unique identifier for the item */
  id: string;
  /** Display name of the item */
  name: string;
  /** Child items */
  children?: TreeViewDataItem[];
  /** Whether the item is expanded by default */
  defaultExpanded?: boolean;
  /** Custom icon for the item */
  icon?: import('svelte').Snippet;
  /** Custom expanded icon for the item */
  expandedIcon?: import('svelte').Snippet;
  /** Whether the item has a checkbox */
  hasCheckbox?: boolean;
  /** Checkbox properties */
  checkProps?: {
    checked?: boolean;
    disabled?: boolean;
  };
  /** Custom badge content */
  customBadgeContent?: import('svelte').Snippet | string;
  /** Action to render for the item */
  action?: import('svelte').Snippet;
  /** Additional properties */
  [key: string]: unknown;
}

export interface TreeViewProps {
  /** Accessible label for the tree */
  'aria-label'?: string;
  /** Data to render in the tree */
  data: TreeViewDataItem[];
  /** Currently active/selected items */
  activeItems?: TreeViewDataItem[];
  /** Whether all items are expanded */
  allExpanded?: boolean;
  /** Additional CSS class */
  className?: string;
  class?: string;
  /** Whether to show checkboxes */
  hasCheckboxes?: boolean;
  /** Whether to show guides/lines */
  hasGuides?: boolean;
  /** Whether to use compact variant */
  isCompact?: boolean;
  /** Callback when item is selected */
  onSelect?: (event: MouseEvent, item: TreeViewDataItem) => void;
  /** Callback when item checkbox is checked */
  onCheck?: (event: Event, item: TreeViewDataItem, checked: boolean) => void;
  /** Callback when item is expanded/collapsed */
  onExpand?: (event: MouseEvent, item: TreeViewDataItem, isExpanded: boolean) => void;
  /** Whether the tree has animations */
  hasAnimations?: boolean;
  /** OUIA component id */
  ouiaId?: string;
  /** OUIA safe flag */
  ouiaSafe?: boolean;
}

export interface TreeViewListItemProps {
  /** The data item to render */
  item: TreeViewDataItem;
  /** Level of nesting (0-based) */
  level?: number;
  /** Currently active/selected items */
  activeItems?: TreeViewDataItem[];
  /** Whether all items are expanded */
  allExpanded?: boolean;
  /** Whether to show checkboxes */
  hasCheckboxes?: boolean;
  /** Callback when item is selected */
  onSelect?: (event: MouseEvent, item: TreeViewDataItem) => void;
  /** Callback when item checkbox is checked */
  onCheck?: (event: Event, item: TreeViewDataItem, checked: boolean) => void;
  /** Callback when item is expanded/collapsed */
  onExpand?: (event: MouseEvent, item: TreeViewDataItem, isExpanded: boolean) => void;
  /** Whether the tree has animations */
  hasAnimations?: boolean;
}
