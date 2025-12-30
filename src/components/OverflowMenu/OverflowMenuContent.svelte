<script lang="ts">
  import type { OverflowMenuContentProps } from './types';
  import { getContext } from 'svelte';
  import '@patternfly/patternfly/components/OverflowMenu/overflow-menu.css';

  interface Props extends OverflowMenuContentProps {
    isPersistent?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
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
    setContentElement: (el: HTMLElement | null) => void;
    isBelowBreakpoint: boolean;
  }>('overflow-menu');

  let contentElement: HTMLElement | null = $state(null);

  // Register element with parent
  $effect(() => {
    if (overflowMenuContext) {
      overflowMenuContext.setContentElement(contentElement);
    }
    return () => {
      if (overflowMenuContext) {
        overflowMenuContext.setContentElement(null);
      }
    };
  });

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-overflow-menu__content',
      isPersistent && 'pf-m-persistent',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Hide content when below breakpoint (items move to dropdown)
  const shouldShow = $derived(
    isPersistent || !overflowMenuContext?.isBelowBreakpoint
  );
</script>

{#if shouldShow}
  <div class={classes} bind:this={contentElement} {...restProps}>
    {@render children?.()}
  </div>
{/if}

