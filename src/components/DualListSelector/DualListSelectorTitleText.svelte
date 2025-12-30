<script lang="ts">
  import type { DualListSelectorTitleTextProps } from './types';
  import '@patternfly/patternfly/components/DualListSelector/dual-list-selector.css';

  interface Props extends DualListSelectorTitleTextProps {
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-dual-list-selector__title-text', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
