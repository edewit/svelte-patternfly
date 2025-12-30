<script lang="ts">
  import type { PanelMainProps } from './types';

  interface Props extends PanelMainProps {
    children?: import('svelte').Snippet;
  }

  let {
    class: className = '',
    maxHeight,
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-panel__main', className].filter(Boolean).join(' ')
  );

  // Build style
  const style = $derived(maxHeight ? `max-height: ${maxHeight}` : undefined);
</script>

<div class={classes} style={style} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>

