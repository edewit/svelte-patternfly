<script lang="ts">
  import type { NavListProps } from './types';
  import { getContext } from 'svelte';
  import '@patternfly/patternfly/components/Nav/nav.css';

  interface Props extends NavListProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    class: className = '',
    children
  }: Props = $props();

  // Get nav context to register list element
  const navContext = getContext<{
    setListElement?: (el: HTMLElement | null) => void;
  }>('nav');

  let listElement: HTMLUListElement | null = $state(null);

  // Register list element with nav context
  $effect(() => {
    if (navContext?.setListElement && listElement) {
      navContext.setListElement(listElement);
    }
    return () => {
      if (navContext?.setListElement) {
        navContext.setListElement(null);
      }
    };
  });

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-nav__list', className].filter(Boolean).join(' ')
  );
</script>

<ul class={classes} role="list" bind:this={listElement}>
  {@render children?.()}
</ul>

