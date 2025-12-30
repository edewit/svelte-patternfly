<script lang="ts">
  import type { OverflowMenuDropdownItemProps } from './types';
  import { getContext, untrack } from 'svelte';
  import MenuItem from '../Menu/MenuItem.svelte';
  import '@patternfly/patternfly/components/Menu/menu.css';
  import '@patternfly/patternfly/components/OverflowMenu/overflow-menu.css';

  interface Props extends OverflowMenuDropdownItemProps {
    itemId?: string | number;
    isShared?: boolean;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    itemId,
    isShared = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get overflow menu context
  const overflowMenuContext = getContext<{
    registerSharedItem: (itemId: string | number) => void;
    unregisterSharedItem: (itemId: string | number) => void;
    isBelowBreakpoint: boolean;
    sharedItemIds: Set<string | number>;
  }>('overflow-menu');

  // Register shared item - only run when itemId or isShared changes
  // Use untrack to prevent tracking context's reactive properties
  $effect(() => {
    // Track only itemId and isShared
    const id = itemId;
    const shared = isShared;
    
    // Get context without tracking its reactive properties
    const context = untrack(() => overflowMenuContext);
    
    if (!context || !shared || id === undefined) {
      return;
    }
    
    // Register the item (wrapped in untrack to prevent reactivity loop)
    untrack(() => {
      context.registerSharedItem(id);
    });
    
    // Cleanup: unregister when effect re-runs or component unmounts
    return () => {
      untrack(() => {
        context?.unregisterSharedItem(id);
      });
    };
  });

  // Show item when below breakpoint
  // Shared items are always shown when below breakpoint (they correspond to visible menu items)
  const shouldShow = $derived.by(() => {
    if (!overflowMenuContext) return false;
    
    // All dropdown items show when below breakpoint
    // The isShared prop is used to coordinate with visible menu items
    return overflowMenuContext.isBelowBreakpoint;
  });

  // Get dropdown select handler from context
  const dropdownContext = getContext<{
    handleSelect?: (event: MouseEvent, value?: string | number) => void;
  }>('dropdown-select');

  function handleClick(event: MouseEvent) {
    if (dropdownContext?.handleSelect && itemId !== undefined) {
      dropdownContext.handleSelect(event, itemId);
    }
  }
</script>

{#if shouldShow}
  <MenuItem itemId={itemId} class={className} onclick={handleClick} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </MenuItem>
{/if}

