<script lang="ts">
  import type { AccordionToggleProps } from './types';
  import '@patternfly/patternfly/components/Accordion/accordion.css';

  interface Props extends AccordionToggleProps {
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

  let {
    isExpanded = false,
    isDisabled = false,
    isCustomContent = false,
    isCustomIcon = false,
    isCustomText = false,
    isPlain = false,
    isHoverable = false,
    isFocused = false,
    isActive = false,
    isPressed = false,
    headingLevel = 3,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-accordion__toggle',
      isExpanded && 'pf-m-expanded',
      isDisabled && 'pf-m-disabled',
      isCustomContent && 'pf-m-custom-content',
      isCustomIcon && 'pf-m-custom-icon',
      isCustomText && 'pf-m-custom-text',
      isPlain && 'pf-m-plain',
      isHoverable && 'pf-m-hoverable',
      isFocused && 'pf-m-focused',
      isActive && 'pf-m-active',
      isPressed && 'pf-m-pressed',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

{#if headingLevel === 1}
  <h1>
    <button
      class={classes}
      type="button"
      disabled={isDisabled}
      aria-expanded={isExpanded ? 'true' : 'false'}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      {...restProps}
    >
      {@render children?.()}
    </button>
  </h1>
{:else if headingLevel === 2}
  <h2>
    <button
      class={classes}
      type="button"
      disabled={isDisabled}
      aria-expanded={isExpanded ? 'true' : 'false'}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      {...restProps}
    >
      {@render children?.()}
    </button>
  </h2>
{:else if headingLevel === 3}
  <h3>
    <button
      class={classes}
      type="button"
      disabled={isDisabled}
      aria-expanded={isExpanded ? 'true' : 'false'}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      {...restProps}
    >
      {@render children?.()}
    </button>
  </h3>
{:else if headingLevel === 4}
  <h4>
    <button
      class={classes}
      type="button"
      disabled={isDisabled}
      aria-expanded={isExpanded ? 'true' : 'false'}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      {...restProps}
    >
      {@render children?.()}
    </button>
  </h4>
{:else if headingLevel === 5}
  <h5>
    <button
      class={classes}
      type="button"
      disabled={isDisabled}
      aria-expanded={isExpanded ? 'true' : 'false'}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      {...restProps}
    >
      {@render children?.()}
    </button>
  </h5>
{:else}
  <h6>
    <button
      class={classes}
      type="button"
      disabled={isDisabled}
      aria-expanded={isExpanded ? 'true' : 'false'}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      {...restProps}
    >
      {@render children?.()}
    </button>
  </h6>
{/if}
