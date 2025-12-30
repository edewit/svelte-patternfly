<script lang="ts">
  import type { ClipboardCopyProps, ClipboardCopyVariant } from './types';
  import '@patternfly/patternfly/components/ClipboardCopy/clipboard-copy.css';
  import '@patternfly/patternfly/components/Button/button.css';
  import '@patternfly/patternfly/components/FormControl/form-control.css';
  import '@patternfly/patternfly/components/Tooltip/tooltip.css';
  import '@patternfly/patternfly/components/Truncate/truncate.css';

  interface Props extends ClipboardCopyProps {
    variant?: ClipboardCopyVariant;
    children: string | string[];
    isReadOnly?: boolean;
    isExpanded?: boolean;
    isExpandedByDefault?: boolean;
    isCode?: boolean;
    isEditable?: boolean;
    isCompact?: boolean;
    clickTip?: string;
    hoverTip?: string;
    exitDelay?: number;
    entryDelay?: number;
    maxWidth?: string;
    minWidth?: string;
    position?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
    additionalActions?: import('svelte').Snippet;
    truncation?:
      | boolean
      | {
          position?: 'start' | 'middle' | 'end';
          numChars?: number;
        };
    'aria-label'?: string;
    'aria-describedby'?: string;
    class?: string;
    id?: string;
  }

  let {
    variant = 'basic',
    children,
    isReadOnly = false,
    isExpanded: controlledExpanded,
    isExpandedByDefault = false,
    isCode = false,
    isEditable = false,
    isCompact = false,
    clickTip = 'Successfully copied to clipboard!',
    hoverTip = 'Copy to clipboard',
    exitDelay = 2000,
    entryDelay: _entryDelay = 300,
    maxWidth,
    minWidth,
    position = 'top',
    additionalActions,
    truncation,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    class: className = '',
    id,
    ...restProps
  }: Props = $props();

  // Generate unique IDs if not provided
  const componentId = $derived(
    id || `clipboard-copy-${Math.random().toString(36).substring(2, 11)}`
  );
  const inputId = $derived(`${componentId}-text-input`);
  const toggleId = $derived(`${componentId}-toggle`);
  const contentId = $derived(`${componentId}-content`);
  const copyButtonId = $derived(`${componentId}-copy-button`);
  const tooltipId = $derived(`${componentId}-tooltip-content`);

  // Handle expanded state
  let internalExpanded = $state(isExpandedByDefault);
  const isExpanded = $derived(
    controlledExpanded !== undefined ? controlledExpanded : internalExpanded
  );

  // Tooltip state
  let showTooltip = $state(false);
  let tooltipText = $state(hoverTip);
  let tooltipTimeout: ReturnType<typeof setTimeout> | null = null;

  // Convert children to string
  const textValue = $derived(Array.isArray(children) ? children.join('\n') : children);

  // For inline-compact variant, truncation is handled by CSS classes
  // For basic/expanded variants, we need to truncate the input value
  const displayText = $derived.by(() => {
    if (variant === 'inline-compact') {
      // Inline compact uses CSS truncation, so return full text
      return textValue;
    }

    if (!truncation) return textValue;

    if (typeof truncation === 'boolean' && truncation) {
      // Default truncation
      return textValue.length > 50 ? textValue.substring(0, 47) + '...' : textValue;
    }

    if (typeof truncation === 'object') {
      const { position = 'end', numChars = 50 } = truncation;
      if (textValue.length <= numChars) return textValue;

      switch (position) {
        case 'start':
          return '...' + textValue.substring(textValue.length - numChars + 3);
        case 'middle': {
          const half = Math.floor(numChars / 2);
          return (
            textValue.substring(0, half - 3) + '...' + textValue.substring(textValue.length - half)
          );
        }
        case 'end':
        default:
          return textValue.substring(0, numChars - 3) + '...';
      }
    }

    return textValue;
  });

  // Determine truncate position class for inline-compact variant
  const truncatePositionClass = $derived.by(() => {
    if (variant !== 'inline-compact' || !truncation) return null;

    if (typeof truncation === 'object' && truncation.position) {
      return `pf-v6-c-truncate__${truncation.position}`;
    }

    return 'pf-v6-c-truncate__start'; // default based on PatternFly example
  });

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-clipboard-copy',
      variant === 'expanded' && isExpanded && 'pf-m-expanded',
      variant === 'inline-compact' && 'pf-m-inline',
      variant === 'inline-compact' && truncation && 'pf-m-truncate',
      isCode && 'pf-m-code',
      isCompact && 'pf-m-compact',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  const inputClasses = $derived(
    ['pf-v6-c-form-control', isReadOnly && 'pf-m-readonly', isCode && 'pf-m-code']
      .filter(Boolean)
      .join(' ')
  );

  const tooltipClasses = $derived(
    ['pf-v6-c-tooltip', `pf-m-${position}`].filter(Boolean).join(' ')
  );

  // Copy to clipboard function
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(textValue);
      // Show success tooltip
      if (clickTip) {
        tooltipText = clickTip;
        showTooltip = true;

        // Clear any existing timeout
        if (tooltipTimeout) {
          clearTimeout(tooltipTimeout);
        }

        // Reset to hover tip after exitDelay
        tooltipTimeout = setTimeout(() => {
          tooltipText = hoverTip;
          showTooltip = false;
        }, exitDelay);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  // Handle tooltip hover
  function handleMouseEnter() {
    if (!showTooltip || tooltipText === clickTip) {
      // Only show hover tip if not showing click tip
      tooltipText = hoverTip;
      showTooltip = true;
    }
  }

  function handleMouseLeave() {
    if (tooltipText === hoverTip) {
      // Only hide if showing hover tip, not click tip
      showTooltip = false;
    }
  }

  // Cleanup timeout on unmount
  $effect(() => {
    return () => {
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
      }
    };
  });

  // Toggle expanded state
  function toggleExpanded() {
    if (controlledExpanded === undefined) {
      internalExpanded = !internalExpanded;
    }
  }

  // Handle content edit (for editable expanded content)
  let contentText = $state('');

  // Update contentText when textValue changes
  $effect(() => {
    contentText = textValue;
  });

  function handleContentInput(event: Event) {
    const target = event.target as HTMLElement;
    if (target) {
      contentText = target.textContent || '';
    }
  }
</script>

<div class={classes} id={componentId} {...restProps}>
  {#if variant === 'inline-compact'}
    <!-- Inline compact variant uses different structure -->
    <span class="pf-v6-c-clipboard-copy__text" id={inputId}>
      {#if truncation}
        <span class="pf-v6-c-truncate" tabindex="0">
          <span class={truncatePositionClass || 'pf-v6-c-truncate__start'}>
            {textValue}
          </span>
        </span>
      {:else}
        {textValue}
      {/if}
    </span>
    <span class="pf-v6-c-clipboard-copy__actions">
      <span class="pf-v6-c-clipboard-copy__actions-item">
        <div class={tooltipClasses} role="tooltip" style:display={showTooltip ? 'block' : 'none'}>
          <div class="pf-v6-c-tooltip__arrow"></div>
          <div class="pf-v6-c-tooltip__content" id={tooltipId}>
            {tooltipText}
          </div>
        </div>
        <button
          class="pf-v6-c-button pf-m-no-padding pf-m-plain"
          type="button"
          aria-label={ariaLabel || hoverTip}
          id={copyButtonId}
          onclick={copyToClipboard}
          onmouseenter={handleMouseEnter}
          onmouseleave={handleMouseLeave}
        >
          <span class="pf-v6-c-button__icon">
            <i class="fas fa-copy" aria-hidden="true"></i>
          </span>
        </button>
      </span>
      {#if additionalActions}
        <span class="pf-v6-c-clipboard-copy__actions-item">
          {@render additionalActions()}
        </span>
      {/if}
    </span>
  {:else}
    <!-- Basic and expanded variants use group structure -->
    <div class="pf-v6-c-clipboard-copy__group">
      {#if variant === 'expanded'}
        <button
          class="pf-v6-c-button pf-m-control"
          type="button"
          aria-expanded={isExpanded}
          id={toggleId}
          aria-label={ariaLabel || 'Toggle expanded example'}
          aria-controls={contentId}
          onclick={toggleExpanded}
        >
          <span class="pf-v6-c-button__icon">
            <div class="pf-v6-c-clipboard-copy__toggle-icon">
              <i class="fas fa-angle-right" aria-hidden="true"></i>
            </div>
          </span>
        </button>
      {/if}

      <span class={inputClasses} style:max-width={maxWidth} style:min-width={minWidth}>
        <input
          readonly={isReadOnly}
          type="text"
          value={displayText}
          id={inputId}
          aria-label={ariaLabel || 'Copyable input'}
          aria-describedby={ariaDescribedBy}
        />
      </span>

      <div class={tooltipClasses} role="tooltip" style:display={showTooltip ? 'block' : 'none'}>
        <div class="pf-v6-c-tooltip__arrow"></div>
        <div class="pf-v6-c-tooltip__content" id={tooltipId}>
          {tooltipText}
        </div>
      </div>
      <button
        class="pf-v6-c-button pf-m-control"
        type="button"
        aria-label={ariaLabel || hoverTip}
        id={copyButtonId}
        onclick={copyToClipboard}
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
      >
        <span class="pf-v6-c-button__icon">
          <i class="fas fa-copy" aria-hidden="true"></i>
        </span>
      </button>

      {#if additionalActions}
        <div class="pf-v6-c-clipboard-copy__actions">
          {@render additionalActions()}
        </div>
      {/if}
    </div>

    {#if variant === 'expanded'}
      <div
        class="pf-v6-c-clipboard-copy__expandable-content"
        contenteditable={isEditable ? 'true' : undefined}
        id={contentId}
        aria-hidden={!isExpanded}
        hidden={!isExpanded}
        oninput={isEditable ? handleContentInput : undefined}
      >
        {#if isEditable}
          {contentText}
        {:else}
          {textValue}
        {/if}
      </div>
    {/if}
  {/if}
</div>

<style>
  :global(.pf-v6-c-clipboard-copy__toggle-icon) {
    transition: transform 0.2s ease;
  }

  :global(.pf-v6-c-clipboard-copy.pf-m-expanded .pf-v6-c-clipboard-copy__toggle-icon i) {
    transform: rotate(90deg);
  }
</style>
