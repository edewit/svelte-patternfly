<script lang="ts">
  import type { DataListItemCellsProps } from './types';
  import '@patternfly/patternfly/components/DataList/data-list.css';

  interface Props extends DataListItemCellsProps {
    dataListCells?: import('svelte').ComponentType[];
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    dataListCells: _dataListCells,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-data-list__item-content', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
