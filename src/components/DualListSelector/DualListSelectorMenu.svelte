<script lang="ts">
  import type { DualListSelectorMenuProps } from './types';
  import '@patternfly/patternfly/components/DualListSelector/dual-list-selector.css';

  interface Props extends DualListSelectorMenuProps {
    tabindex?: number | string;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let { tabindex, class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-dual-list-selector__menu', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {tabindex} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
