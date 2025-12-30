<script lang="ts">
  import type { DataListItemRowProps } from './types';
  import '@patternfly/patternfly/components/DataList/data-list.css';

  interface Props extends DataListItemRowProps {
    id?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let { id, class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-data-list__item-row', className].filter(Boolean).join(' '));
</script>

<div class={classes} {id} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
