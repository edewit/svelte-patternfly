<script lang="ts">
  import type { PageProps } from './types';
  import '@patternfly/patternfly/components/Page/page.css';
  import { setContext } from 'svelte';

  interface Props extends PageProps {
    masthead?: import('svelte').Snippet;
    sidebar?: import('svelte').Snippet;
    isContentFilled?: boolean;
    isManagedSidebar?: boolean;
    id?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    masthead,
    sidebar,
    isContentFilled = false,
    isManagedSidebar = false,
    id,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Internal sidebar state for managed mode
  let internalIsSidebarOpen = $state(true);

  // Create derived value for sidebar open state
  const sidebarOpen = $derived(internalIsSidebarOpen);

  // Provide context for sidebar state management
  setContext('page', {
    isManagedSidebar,
    isContentFilled,
    sidebarOpen,
    setSidebarOpen: (open: boolean) => {
      if (isManagedSidebar) {
        internalIsSidebarOpen = open;
      }
    },
    toggleSidebar: () => {
      if (isManagedSidebar) {
        internalIsSidebarOpen = !internalIsSidebarOpen;
      }
    }
  });

  const classes = $derived(['pf-v6-c-page', className].filter(Boolean).join(' '));
</script>

<div class={classes} {id} {...restProps}>
  {#if masthead}
    {@render masthead()}
  {/if}
  {#if sidebar}
    {@render sidebar()}
  {/if}
  <div class="pf-v6-c-page__main-container" tabindex="-1">
    <main class="pf-v6-c-page__main" tabindex="-1">
      {#if children}
        {@render children()}
      {/if}
    </main>
  </div>
</div>

