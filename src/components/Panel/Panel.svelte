<script lang="ts">
  import type { PanelProps } from './types';
  import '@patternfly/patternfly/components/Panel/panel.css';

  interface Props extends PanelProps {
    children?: import('svelte').Snippet;
  }

  let {
    class: className = '',
    isScrollable = false,
    variant,
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-panel',
      isScrollable && 'pf-m-scrollable',
      variant && `pf-m-${variant}`,
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>

