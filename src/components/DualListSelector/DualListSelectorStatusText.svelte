<script lang="ts">
  import type { DualListSelectorStatusTextProps } from './types';
  import '@patternfly/patternfly/components/DualListSelector/dual-list-selector.css';

  interface Props extends DualListSelectorStatusTextProps {
    id?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let { id, class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-dual-list-selector__status-text', className].filter(Boolean).join(' ')
  );
</script>

<span class={classes} {id} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</span>
