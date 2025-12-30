<script lang="ts">
  import type { PanelHeaderProps } from './types';

  interface Props extends PanelHeaderProps {
    children?: import('svelte').Snippet;
  }

  let {
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-panel__header', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>

