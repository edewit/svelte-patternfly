<script lang="ts">
  import type { DataListProps } from './types';
  import '@patternfly/patternfly/components/DataList/data-list.css';

  interface Props extends DataListProps {
    id?: string;
    'aria-label'?: string;
    isCompact?: boolean;
    gridBreakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    id,
    'aria-label': ariaLabel,
    isCompact = false,
    gridBreakpoint,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-data-list',
      isCompact && 'pf-m-compact',
      gridBreakpoint && `pf-m-grid-${gridBreakpoint}`,
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<ul class={classes} role="list" aria-label={ariaLabel} {id} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</ul>
