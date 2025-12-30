<script lang="ts">
  import type { OverflowMenuProps } from './types';
  import { setContext } from 'svelte';
  import '@patternfly/patternfly/components/OverflowMenu/overflow-menu.css';

  interface Props extends OverflowMenuProps {
    breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    breakpointReference?: HTMLElement | (() => HTMLElement) | { current: HTMLElement | null };
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    breakpoint,
    breakpointReference,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // References
  let overflowMenuElement: HTMLElement | null = $state(null);
  let contentElement: HTMLElement | null = $state(null);
  let controlElement: HTMLElement | null = $state(null);

  // Breakpoint widths (PatternFly v6 breakpoints)
  const breakpointWidths: Record<string, number> = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    '2xl': 1456
  };

  // State for responsive behavior
  let isBelowBreakpoint = $state(false);
  let itemElements: HTMLElement[] = $state([]);
  let sharedItemIds: Set<string | number> = $state(new Set());

  // Get reference element for breakpoint calculation
  const getReferenceElement = $derived.by(() => {
    if (!breakpointReference) return null;

    if (typeof breakpointReference === 'function') {
      return breakpointReference();
    }
    if ('current' in breakpointReference) {
      return breakpointReference.current;
    }
    return breakpointReference;
  });

  // Check if we're below the breakpoint
  function checkBreakpoint() {
    const reference = getReferenceElement || overflowMenuElement;
    if (!reference) return;

    const width = reference.clientWidth;
    const breakpointWidth = breakpointWidths[breakpoint] || 992;
    isBelowBreakpoint = width < breakpointWidth;
  }

  // Set up ResizeObserver and media query listener
  $effect(() => {
    if (!overflowMenuElement) return;

    const reference = getReferenceElement || overflowMenuElement;

    // Initial check
    checkBreakpoint();

    // Observe resize
    const resizeObserver = new ResizeObserver(() => {
      checkBreakpoint();
    });

    resizeObserver.observe(reference);
    if (getReferenceElement && reference !== overflowMenuElement) {
      resizeObserver.observe(overflowMenuElement);
    }

    // Also listen to window resize for viewport-based breakpoints
    if (!getReferenceElement) {
      window.addEventListener('resize', checkBreakpoint);
    }

    return () => {
      resizeObserver.disconnect();
      if (!getReferenceElement) {
        window.removeEventListener('resize', checkBreakpoint);
      }
    };
  });

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-overflow-menu',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Create context for children
  setContext('overflow-menu', {
    setContentElement: (el: HTMLElement | null) => {
      contentElement = el;
    },
    setControlElement: (el: HTMLElement | null) => {
      controlElement = el;
    },
    registerItem: (el: HTMLElement) => {
      if (!itemElements.includes(el)) {
        itemElements = [...itemElements, el];
      }
    },
    unregisterItem: (el: HTMLElement) => {
      itemElements = itemElements.filter(item => item !== el);
    },
    registerSharedItem: (itemId: string | number) => {
      if (!sharedItemIds.has(itemId)) {
        const newSet = new Set(sharedItemIds);
        newSet.add(itemId);
        sharedItemIds = newSet;
      }
    },
    unregisterSharedItem: (itemId: string | number) => {
      if (sharedItemIds.has(itemId)) {
        const newSet = new Set(sharedItemIds);
        newSet.delete(itemId);
        sharedItemIds = newSet;
      }
    },
    get isBelowBreakpoint() {
      return isBelowBreakpoint;
    },
    get sharedItemIds() {
      return sharedItemIds;
    }
  });
</script>

<div class={classes} bind:this={overflowMenuElement} {...restProps}>
  {@render children?.()}
</div>

