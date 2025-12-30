<script lang="ts">
  import type { SidebarProps } from './types';
  import '@patternfly/patternfly/components/Sidebar/sidebar.css';

  interface Props extends SidebarProps {}

  let {
    'aria-label': ariaLabel,
    class: className = '',
    hasGutter = false,
    hasNoBackground = false,
    isPanelRight = false,
    orientation,
    tabIndex,
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes for the container
  const containerClasses = $derived(
    [
      'pf-v6-c-sidebar',
      hasGutter && 'pf-m-gutter',
      hasNoBackground && 'pf-m-no-background',
      isPanelRight && 'pf-m-panel-right',
      orientation === 'stack' && 'pf-m-stack',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div
  class={containerClasses}
  aria-label={ariaLabel}
  tabindex={tabIndex}
  {...restProps}
>
  <div class="pf-v6-c-sidebar__main">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>

