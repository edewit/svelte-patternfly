import type { Snippet } from 'svelte';

/**
 * Props for search attributes used in advanced search
 */
export interface SearchInputSearchAttribute {
  /** The search attribute's value to be provided in the search input's query string */
  attr: string;
  /** The search attribute's display name */
  display: string;
}

/**
 * Props for expandable search input
 */
export interface SearchInputExpandable {
  /** Flag to indicate if the search input is expanded */
  isExpanded: boolean;
  /** Callback function to toggle the expandable search input */
  onToggleExpand: (event: MouseEvent | KeyboardEvent, isExpanded: boolean) => void;
  /** An accessible label for the expandable search input toggle */
  toggleAriaLabel: string;
  /** Flag indicating animations should be enabled */
  hasAnimations?: boolean;
}

/**
 * Props for the SearchInput component
 */
export interface SearchInputProps {
  /** Value of the search input */
  value?: string;
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Accessible label for the search input */
  'aria-label'?: string;
  /** Additional classes applied to the search input container */
  class?: string;
  /** ID for the search input */
  id?: string;
  /** Name attribute for the search input */
  name?: string;
  /** Flag indicating if the search input is disabled */
  isDisabled?: boolean;
  /** A callback for when the input value changes */
  onChange?: (event: Event, value: string) => void;
  /** A callback for when the user clicks the reset/clear button */
  onClear?: (event: MouseEvent | KeyboardEvent) => void;
  /** A callback for when the search button is clicked or Enter is pressed */
  onSearch?: (
    event: MouseEvent | KeyboardEvent,
    value: string,
    attrValueMap: Record<string, string>
  ) => void;
  /** The number of results returned */
  resultsCount?: number | string;
  /** Custom icon to render in the search input */
  customIcon?: Snippet;
  /** Array of attribute values used for dynamically generated advanced search */
  attributes?: string[] | SearchInputSearchAttribute[];
  /** Delimiter in the query string for pairing attributes with search values */
  advancedSearchDelimiter?: string;
  /** Flag for toggling the open/close state of the advanced search menu */
  isSearchMenuOpen?: boolean;
  /** A callback for when the open advanced search button is clicked */
  onToggleAdvancedMenu?: (event: MouseEvent | KeyboardEvent) => void;
  /** Label for the button which resets the advanced search form and clears the search input */
  resetButtonLabel?: string;
  /** Label for the button which calls the onSearch event handler */
  submitSearchButtonLabel?: string;
  /** Attribute label for strings unassociated with one of the provided listed attributes */
  hasWordsAttrLabel?: string;
  /** Additional form items to render in the advanced search menu */
  formAdditionalItems?: Snippet;
  /** Props for expandable search input */
  expandableInput?: SearchInputExpandable;
}

