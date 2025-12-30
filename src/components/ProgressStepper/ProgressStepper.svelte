<script lang="ts">
  import type { ProgressStepperProps } from './types';
  import '@patternfly/patternfly/components/ProgressStepper/progress-stepper.css';

  interface Props extends ProgressStepperProps {
    children?: import('svelte').Snippet;
  }

  let {
    'aria-label': ariaLabel,
    class: className = '',
    isCenterAligned = false,
    isCompact = false,
    isVertical = false,
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-progress-stepper',
      isCenterAligned && 'pf-m-center',
      isCompact && 'pf-m-compact',
      isVertical && 'pf-m-vertical',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<ol class={classes} role="list" aria-label={ariaLabel} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</ol>

