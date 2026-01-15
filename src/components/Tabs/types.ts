export type TabsVariant = 'default' | 'light-300';

export type TabsInset =
  | 'none'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl';

export type TabsComponent = 'div' | 'nav';

export type TabSelectHandler = (
  event: MouseEvent | KeyboardEvent,
  eventKey: string | number
) => void;

export interface TabsProps {
  /** The index or key of the active tab */
  activeKey?: string | number;
  /** Callback when a tab is selected */
  onSelect?: TabSelectHandler;
  /** Enables box styling */
  isBox?: boolean;
  /** Enables vertical tabs */
  isVertical?: boolean;
  /** Enables filled tabs */
  isFilled?: boolean;
  /** Adds secondary styling */
  isSecondary?: boolean;
  /** Adds page insets */
  hasPageInsets?: boolean;
  /** Adds border bottom */
  hasBorderBottom?: boolean;
  /** Enables secondary border bottom */
  hasSecondaryBorderBottom?: boolean;
  /** Inset size */
  inset?: TabsInset;
  /** The component to use as the tabs container */
  component?: TabsComponent;
  /** Accessible label for the tabs */
  'aria-label'?: string;
  /** ID of element that labels the tabs */
  'aria-labelledby'?: string;
  /** Role for the tabs container */
  role?: string;
  /** Unique identifier */
  id?: string;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface TabProps {
  /** The key that identifies this tab */
  eventKey: string | number;
  /** Title content for the tab */
  title?: import('svelte').Snippet;
  /** Whether the tab is disabled */
  isDisabled?: boolean;
  /** Whether the tab is aria-disabled (focusable but not interactive) */
  isAriaDisabled?: boolean;
  /** Whether the tab is hidden */
  isHidden?: boolean;
  /** Tooltip snippet for the tab */
  tooltip?: import('svelte').Snippet;
  /** Accessible label for the tab */
  'aria-label'?: string;
  /** Href for link tabs */
  href?: string;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface TabTitleTextProps {
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface TabTitleIconProps {
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface TabContentProps {
  /** The key that identifies which tab this content belongs to */
  eventKey: string | number;
  /** Unique identifier */
  id?: string;
  /** Whether the content is hidden when not active */
  hidden?: boolean;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}

export interface TabContentBodyProps {
  /** Whether to add padding */
  hasPadding?: boolean;
  /** Additional CSS class */
  class?: string;
  /** Allow additional props */
  [key: string]: unknown;
}
