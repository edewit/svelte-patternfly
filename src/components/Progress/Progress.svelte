<script lang="ts">
  import type { ProgressProps } from './types';
  import '@patternfly/patternfly/components/Progress/progress.css';

  interface Props extends ProgressProps {
    children?: import('svelte').Snippet;
  }

  let {
    class: className = '',
    value = 0,
    id = `progress-${Math.random().toString(36).substring(2, 11)}`,
    title,
    label,
    size,
    measureLocation = 'top',
    variant = 'default',
    min = 0,
    max = 100,
    valueText,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    isTitleTruncated = false,
    helperText,
    ouiaId,
    ouiaSafe = true,
    children,
    ...restProps
  }: Props = $props();

  // Calculate percentage
  const percentage = $derived(Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)));

  // Description ID for accessibility
  const descriptionId = $derived(`${id}-description`);

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-progress',
      size === 'sm' && 'pf-m-sm',
      size === 'lg' && 'pf-m-lg',
      measureLocation === 'inside' && 'pf-m-inside',
      measureLocation === 'outside' && 'pf-m-outside',
      measureLocation === 'none' && 'pf-m-singleline',
      variant === 'success' && 'pf-m-success',
      variant === 'warning' && 'pf-m-warning',
      variant === 'danger' && 'pf-m-danger',
      isTitleTruncated && 'pf-m-truncate',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Display text (percentage or custom label)
  const displayText = $derived(label ?? `${Math.round(percentage)}%`);

  // Value text for accessibility
  const accessibleValueText = $derived(valueText ?? displayText);

  // Determine aria-labelledby
  const computedAriaLabelledBy = $derived(
    ariaLabelledBy ?? (title ? descriptionId : undefined)
  );

  // Generate OUIA ID
  const ouiaComponentId = $derived(
    ouiaId !== undefined ? String(ouiaId) : id
  );

  // Status icon based on variant
  const showStatusIcon = $derived(variant !== 'default');
</script>

<div
  class={classes}
  {id}
  data-ouia-component-type="PF6/Progress"
  data-ouia-component-id={ouiaComponentId}
  data-ouia-safe={ouiaSafe ? 'true' : 'false'}
  {...restProps}
>
  {#if title && measureLocation !== 'inside'}
    <div
      class="pf-v6-c-progress__description"
      class:pf-m-truncate={isTitleTruncated}
      id={descriptionId}
    >
      {title}
    </div>
  {/if}

  {#if measureLocation === 'top' || measureLocation === 'outside'}
    <div class="pf-v6-c-progress__status" aria-hidden="true">
      <span class="pf-v6-c-progress__measure">{displayText}</span>
      {#if showStatusIcon}
        <span class="pf-v6-c-progress__status-icon">
          {#if variant === 'success'}
            <i class="fas fa-check-circle" aria-hidden="true"></i>
          {:else if variant === 'warning'}
            <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
          {:else if variant === 'danger'}
            <i class="fas fa-times-circle" aria-hidden="true"></i>
          {/if}
        </span>
      {/if}
    </div>
  {/if}

  <div
    class="pf-v6-c-progress__bar"
    role="progressbar"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    aria-valuetext={accessibleValueText}
    aria-label={ariaLabel}
    aria-labelledby={computedAriaLabelledBy}
    aria-describedby={ariaDescribedBy}
  >
    <div class="pf-v6-c-progress__indicator" style="width:{percentage}%;">
      {#if measureLocation === 'inside'}
        <span class="pf-v6-c-progress__measure">{displayText}</span>
      {/if}
    </div>
  </div>

  {#if helperText}
    <div class="pf-v6-c-progress__helper-text">
      {helperText}
    </div>
  {/if}

  {#if children}
    {@render children()}
  {/if}
</div>

