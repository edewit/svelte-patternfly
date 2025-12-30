<script lang="ts">
  import type { DataListItemProps } from './types';
  import '@patternfly/patternfly/components/DataList/data-list.css';

  interface Props extends DataListItemProps {
    id?: string;
    'aria-labelledby'?: string;
    isExpanded?: boolean;
    isClickable?: boolean;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    id,
    'aria-labelledby': ariaLabelledBy,
    isExpanded = false,
    isClickable = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-data-list__item',
      isExpanded && 'pf-m-expanded',
      isClickable && 'pf-m-clickable',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<li class={classes} {id} aria-labelledby={ariaLabelledBy} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</li>
