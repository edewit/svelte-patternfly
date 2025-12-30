<script lang="ts">
  import type { OverflowMenuItemProps } from './types';
  import { getContext } from 'svelte';
  import '@patternfly/patternfly/components/OverflowMenu/overflow-menu.css';

  interface Props extends OverflowMenuItemProps {
    isPersistent?: boolean;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    isPersistent = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get overflow menu context
  const overflowMenuContext = getContext<{
    registerItem: (el: HTMLElement) => void;
    unregisterItem: (el: HTMLElement) => void;
    isBelowBreakpoint: boolean;
  }>('overflow-menu');

  let itemElement: HTMLElement | null = $state(null);

  // Register/unregister item element
  $effect(() => {
    if (overflowMenuContext && itemElement) {
      overflowMenuContext.registerItem(itemElement);
    }
    return () => {
      if (overflowMenuContext && itemElement) {
        overflowMenuContext.unregisterItem(itemElement);
      }
    };
  });

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-overflow-menu__item',
      isPersistent && 'pf-m-persistent',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Hide item when below breakpoint (unless persistent)
  const shouldShow = $derived(
    isPersistent || !overflowMenuContext?.isBelowBreakpoint
  );
</script>

{#if shouldShow}
  <div class={classes} bind:this={itemElement} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </div>
{/if}

