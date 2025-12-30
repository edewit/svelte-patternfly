<script lang="ts">
  import type {
    ExpandableSectionProps,
    ExpandableSectionDisplaySize,
    ExpandableSectionDirection,
    ExpandableSectionVariant
  } from './types';
  import '@patternfly/patternfly/components/ExpandableSection/expandable-section.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends ExpandableSectionProps {
    toggleText?: string;
    onToggle?: (_event: MouseEvent, _isExpanded: boolean) => void;
    isExpanded?: boolean;
    displaySize?: ExpandableSectionDisplaySize;
    isDetached?: boolean;
    contentId?: string;
    toggleId?: string;
    direction?: ExpandableSectionDirection;
    isIndented?: boolean;
    variant?: ExpandableSectionVariant;
    truncateMaxLines?: number;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    toggleText = 'Show more',
    onToggle,
    isExpanded: controlledExpanded,
    displaySize = 'default',
    isDetached: _isDetached = false,
    contentId,
    toggleId,
    direction,
    isIndented = false,
    variant = 'default',
    truncateMaxLines = 3,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Internal state for uncontrolled mode
  let internalExpanded = $state(false);

  // Determine if component is controlled
  const isControlled = controlledExpanded !== undefined;
  const isExpanded = $derived(isControlled ? controlledExpanded! : internalExpanded);

  // Generate unique IDs if not provided
  const componentId = $derived(`expandable-section-${Math.random().toString(36).substring(2, 11)}`);
  const generatedToggleId = $derived(toggleId || `${componentId}-toggle`);
  const generatedContentId = $derived(contentId || `${componentId}-content`);

  // Handle toggle click
  function handleToggle(event: MouseEvent) {
    const newExpanded = !isExpanded;

    if (!isControlled) {
      internalExpanded = newExpanded;
    }

    if (onToggle) {
      onToggle(event, newExpanded);
    }
  }

  // Build CSS classes for the main container
  const classes = $derived(
    [
      'pf-v6-c-expandable-section',
      isExpanded && 'pf-m-expanded',
      displaySize === 'lg' && 'pf-m-display-lg',
      isIndented && 'pf-m-indented',
      variant === 'truncate' && 'pf-m-truncate',
      direction === 'up' && 'pf-m-expand-top',
      direction === 'down' && 'pf-m-expand-bottom',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build CSS classes for the toggle button
  const toggleButtonClasses = $derived(['pf-v6-c-button', 'pf-m-link'].filter(Boolean).join(' '));

  // Build CSS classes for the toggle icon
  const toggleIconClasses = $derived(
    ['pf-v6-c-expandable-section__toggle-icon', direction === 'up' && 'pf-m-expand-top']
      .filter(Boolean)
      .join(' ')
  );

  // Build CSS classes for the content
  const contentClasses = $derived('pf-v6-c-expandable-section__content');

  // Build inline styles for truncate variant
  const contentStyles = $derived(
    variant === 'truncate' && truncateMaxLines
      ? `--pf-v6-c-expandable-section__content--LineClamp: ${truncateMaxLines};`
      : ''
  );
</script>

<div class={classes} {...restProps}>
  <div class="pf-v6-c-expandable-section__toggle">
    <button
      class={toggleButtonClasses}
      id={generatedToggleId}
      type="button"
      aria-expanded={isExpanded}
      aria-controls={generatedContentId}
      onclick={handleToggle}
    >
      <span class="pf-v6-c-button__icon pf-m-start">
        <span class={toggleIconClasses}>
          <i class="fas fa-angle-right" aria-hidden="true"></i>
        </span>
      </span>
      <span class="pf-v6-c-button__text">{toggleText}</span>
    </button>
  </div>
  <div
    class={contentClasses}
    id={generatedContentId}
    role="region"
    aria-labelledby={generatedToggleId}
    hidden={isExpanded ? undefined : true}
    style={contentStyles}
  >
    {@render children?.()}
  </div>
</div>
