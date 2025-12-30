<script lang="ts">
  import type { ProgressStepProps } from './types';

  interface Props extends ProgressStepProps {
    children?: import('svelte').Snippet;
  }

  let {
    'aria-label': ariaLabel,
    class: className = '',
    description,
    icon,
    isCurrent = false,
    id,
    titleId,
    variant = 'default',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-progress-stepper__step',
      variant === 'success' && 'pf-m-success',
      variant === 'info' && 'pf-m-info',
      variant === 'pending' && 'pf-m-pending',
      variant === 'warning' && 'pf-m-warning',
      variant === 'danger' && 'pf-m-danger',
      isCurrent && 'pf-m-current',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Default icons based on variant
  const defaultIconClass = $derived.by(() => {
    switch (variant) {
      case 'success':
        return 'fas fa-check-circle';
      case 'info':
        return 'pf-v6-pficon pf-v6-pficon-resources-full';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      case 'danger':
        return 'fas fa-times-circle';
      case 'pending':
      case 'default':
      default:
        return '';
    }
  });
</script>

<li
  class={classes}
  role="listitem"
  aria-label={ariaLabel}
  {id}
  {...restProps}
>
  <div class="pf-v6-c-progress-stepper__step-connector">
    <span class="pf-v6-c-progress-stepper__step-icon">
      {#if icon}
        {@render icon()}
      {:else if defaultIconClass}
        <i class={defaultIconClass} aria-hidden="true"></i>
      {/if}
    </span>
  </div>
  <div class="pf-v6-c-progress-stepper__step-main">
    <div class="pf-v6-c-progress-stepper__step-title" id={titleId}>
      {#if children}
        {@render children()}
      {/if}
    </div>
    {#if description}
      <div class="pf-v6-c-progress-stepper__step-description">
        {description}
      </div>
    {/if}
  </div>
</li>

