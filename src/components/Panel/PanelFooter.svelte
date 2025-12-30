<script lang="ts">
  import type { PanelFooterProps } from './types';

  interface Props extends PanelFooterProps {
    children?: import('svelte').Snippet;
  }

  let {
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-panel__footer', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>

