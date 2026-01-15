<script lang="ts">
  import { getContext, onMount } from 'svelte';

  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get tabs context
  const tabsContext = getContext<{
    setListElement?: (el: HTMLElement | null) => void;
  }>('tabs');

  let listElement: HTMLUListElement | null = $state(null);

  // Register list element with parent
  $effect(() => {
    if (listElement && tabsContext?.setListElement) {
      tabsContext.setListElement(listElement);
    }
  });

  const classes = $derived(
    ['pf-v6-c-tabs__list', className].filter(Boolean).join(' ')
  );
</script>

<ul class={classes} role="tablist" bind:this={listElement} {...restProps}>
  {@render children?.()}
</ul>
