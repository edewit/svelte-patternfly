<script lang="ts">
  import type { ToggleGroupProps } from './types';
  import '@patternfly/patternfly/components/ToggleGroup/toggle-group.css';

  interface Props extends ToggleGroupProps {
    isCompact?: boolean;
    'aria-label'?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    isCompact = false,
    'aria-label': ariaLabel,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-toggle-group',
      isCompact && 'pf-m-compact',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} role="group" aria-label={ariaLabel} {...restProps}>
  {@render children?.()}
</div>
