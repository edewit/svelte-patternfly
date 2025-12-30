<script lang="ts">
  import type { DualListSelectorProps } from './types';
  import '@patternfly/patternfly/components/DualListSelector/dual-list-selector.css';

  interface Props extends DualListSelectorProps {
    id?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let { id, class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-dual-list-selector', className].filter(Boolean).join(' '));
</script>

<div class={classes} {id} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
