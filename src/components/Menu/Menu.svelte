<script lang="ts">
  import type { MenuProps } from './types';
  import { setContext, getContext } from 'svelte';
  import '@patternfly/patternfly/components/Menu/menu.css';

  interface Props extends MenuProps {
    activeItemId?: string | number;
    onSelect?: (event?: MouseEvent, itemId?: string | number) => void;
    isPlain?: boolean;
    isFlyout?: boolean;
    containsFlyout?: boolean;
    isNavFlyout?: boolean;
    role?: 'menu' | 'listbox';
    selected?: string | number | (string | number)[];
    hidden?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    activeItemId,
    onSelect,
    isPlain = false,
    isFlyout = false,
    containsFlyout = false,
    isNavFlyout = false,
    role = 'menu',
    selected,
    hidden = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-menu',
      isPlain && 'pf-m-plain',
      isFlyout && 'pf-m-flyout',
      isNavFlyout && 'pf-m-nav',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Check if this menu is nested (has a parent menu context)
  let parentMenuContext: { handleSelect?: (event: MouseEvent, itemId?: string | number) => void } | undefined;
  try {
    parentMenuContext = getContext<{ handleSelect?: (event: MouseEvent, itemId?: string | number) => void }>('menu');
  } catch {
    // No parent menu context, this is a root menu
    parentMenuContext = undefined;
  }
  const isNested = $derived(parentMenuContext !== undefined);

  // Build styles for flyout menus
  // Root menu: inline-block to prevent full-width expansion
  // Nested menus: absolutely positioned relative to parent
  const flyoutStyles = $derived.by(() => {
    if (!isFlyout) return '';

    if (isNested && !hidden) {
      // Nested flyout menu - absolutely positioned
      return 'position: absolute; z-index: 1000; top: 0; left: 100%; min-width: max-content;';
    } else if (!isNested) {
      // Root flyout menu - inline-block to constrain width
      return 'display: inline-block;';
    }

    return '';
  });

  // Handle select
  function handleSelect(event: MouseEvent, itemId?: string | number) {
    if (onSelect) {
      onSelect(event, itemId);
    }
  }

  // Create context for children to access handleSelect, activeItemId, and selected
  // Note: In Svelte 5, props are reactive, so accessing them in children will be reactive
  setContext('menu', {
    handleSelect,
    get activeItemId() {
      return activeItemId;
    },
    get selected() {
      return Array.isArray(selected) ? selected : selected !== undefined ? [selected] : undefined;
    }
  });
</script>

<div class={classes} role={role} hidden={hidden} style={flyoutStyles} {...restProps}>
  {@render children?.()}
</div>

