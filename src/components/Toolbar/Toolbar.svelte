<script lang="ts">
  import type { ToolbarProps } from './types';
  import '@patternfly/patternfly/components/Toolbar/toolbar.css';

  interface Props extends ToolbarProps {
    id?: string;
    className?: string;
    class?: string;
    clearAllFilters?: () => void;
    clearFiltersButtonText?: string;
    collapseListedFiltersBreakpoint?: 'all' | 'md' | 'lg' | 'xl' | '2xl';
    isExpanded?: boolean;
    isFullHeight?: boolean;
    isStatic?: boolean;
    isSticky?: boolean;
    toggleIsExpanded?: () => void;
    ouiaId?: string;
    ouiaSafe?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    id,
    className = '',
    class: classProp = '',
    clearAllFilters,
    clearFiltersButtonText = 'Clear all filters',
    collapseListedFiltersBreakpoint,
    isExpanded = false,
    isFullHeight = false,
    isStatic = false,
    isSticky = false,
    toggleIsExpanded,
    ouiaId,
    ouiaSafe = true,
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(
    [
      'pf-v6-c-toolbar',
      isExpanded && 'pf-m-expanded',
      isFullHeight && 'pf-m-full-height',
      isStatic && 'pf-m-static',
      isSticky && 'pf-m-sticky',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div
  class={classes}
  {id}
  data-ouia-component-type="PF6/Toolbar"
  data-ouia-safe={ouiaSafe}
  data-ouia-component-id={ouiaId}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</div>
