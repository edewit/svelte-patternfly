<script lang="ts">
  import type { PageSidebarProps } from './types';
  import '@patternfly/patternfly/components/Page/page.css';
  import { getContext } from 'svelte';

  interface Props extends PageSidebarProps {
    isSidebarOpen?: boolean;
    id?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    isSidebarOpen: isSidebarOpenProp = true,
    id,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get context for managed sidebar
  const pageContext = getContext<{
    isManagedSidebar?: boolean;
    sidebarOpen?: boolean;
  }>('page');

  // Use context state if managed, otherwise use prop
  const isSidebarOpen = $derived(
    pageContext?.isManagedSidebar && pageContext?.sidebarOpen !== undefined
      ? pageContext.sidebarOpen
      : isSidebarOpenProp
  );

  const classes = $derived(
    [
      'pf-v6-c-page__sidebar',
      !isSidebarOpen && 'pf-m-collapsed',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {id} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>

