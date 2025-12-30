export interface PanelProps {
  /** Class to add to outer div */
  class?: string;
  /** Flag to add scrollable styling to the panel */
  isScrollable?: boolean;
  /** Adds panel variant styles */
  variant?: 'raised' | 'bordered' | 'secondary';
  /** Additional props */
  [key: string]: unknown;
}

export interface PanelMainProps {
  /** Class to add to outer div */
  class?: string;
  /** Max height of the panel main div as a string with the value and unit */
  maxHeight?: string;
  /** Additional props */
  [key: string]: unknown;
}

export interface PanelMainBodyProps {
  /** Class to add to outer div */
  class?: string;
  /** Additional props */
  [key: string]: unknown;
}

export interface PanelHeaderProps {
  /** Class to add to outer div */
  class?: string;
  /** Additional props */
  [key: string]: unknown;
}

export interface PanelFooterProps {
  /** Class to add to outer div */
  class?: string;
  /** Additional props */
  [key: string]: unknown;
}

