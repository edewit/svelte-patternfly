<script lang="ts">
  import type { SidebarPanelProps } from './types';

  interface Props extends SidebarPanelProps {}

  let {
    class: className = '',
    hasNoFlex = false,
    isSticky = false,
    isStatic = false,
    hasBorder = false,
    hasPadding = false,
    width,
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes for the panel
  const panelClasses = $derived(
    [
      'pf-v6-c-sidebar__panel',
      hasNoFlex && 'pf-m-no-flex',
      isSticky && 'pf-m-sticky',
      isStatic && 'pf-m-static',
      hasBorder && 'pf-m-border',
      hasPadding && 'pf-m-padding',
      width && `pf-m-width-${width}`,
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={panelClasses} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>

