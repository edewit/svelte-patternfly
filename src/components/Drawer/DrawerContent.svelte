<script lang="ts">
  import type { DrawerContentProps } from './types';
  import { setContext } from 'svelte';
  import '@patternfly/patternfly/components/Drawer/drawer.css';

  interface Props extends DrawerContentProps {
    isExpanded?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    panelContent?: import('svelte').Snippet;
  }

  let {
    isExpanded = false,
    class: className = '',
    children,
    panelContent,
    ...restProps
  }: Props = $props();

  // Provide isExpanded to child components via context
  try {
    setContext('drawer-is-expanded', isExpanded);
  } catch (e) {
    // Context already set or not available (e.g., in tests)
  }

  // Build CSS classes
  const classes = $derived(['pf-v6-c-drawer__main', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  <div class="pf-v6-c-drawer__content">
    {@render children?.()}
  </div>
  {#if panelContent}
    {@render panelContent()}
  {/if}
</div>
