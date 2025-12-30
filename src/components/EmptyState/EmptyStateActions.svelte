<script lang="ts">
  import type { EmptyStateActionsProps } from './types';
  import '@patternfly/patternfly/components/EmptyState/empty-state.css';

  interface Props extends EmptyStateActionsProps {
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  const classes = $derived(['pf-v6-c-empty-state__actions', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
