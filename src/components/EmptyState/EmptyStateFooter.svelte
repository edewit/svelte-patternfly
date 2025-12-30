<script lang="ts">
  import type { EmptyStateFooterProps } from './types';
  import '@patternfly/patternfly/components/EmptyState/empty-state.css';

  interface Props extends EmptyStateFooterProps {
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  const classes = $derived(['pf-v6-c-empty-state__footer', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
