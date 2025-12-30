<script lang="ts">
  import type { OverflowMenuControlProps } from './types';
  import { getContext } from 'svelte';
  import '@patternfly/patternfly/components/OverflowMenu/overflow-menu.css';

  interface Props extends OverflowMenuControlProps {
    hasAdditionalOptions?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    hasAdditionalOptions = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get overflow menu context
  const overflowMenuContext = getContext<{
    setControlElement: (el: HTMLElement | null) => void;
    isBelowBreakpoint: boolean;
  }>('overflow-menu');

  let controlElement: HTMLElement | null = $state(null);

  // Register element with parent
  $effect(() => {
    if (overflowMenuContext) {
      overflowMenuContext.setControlElement(controlElement);
    }
    return () => {
      if (overflowMenuContext) {
        overflowMenuContext.setControlElement(null);
      }
    };
  });

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-overflow-menu__control',
      hasAdditionalOptions && 'pf-m-additional-options',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Show control when below breakpoint or hasAdditionalOptions is true
  const shouldShow = $derived(
    hasAdditionalOptions || overflowMenuContext?.isBelowBreakpoint
  );
</script>

{#if shouldShow}
  <div class={classes} bind:this={controlElement} {...restProps}>
    {@render children?.()}
  </div>
{/if}

