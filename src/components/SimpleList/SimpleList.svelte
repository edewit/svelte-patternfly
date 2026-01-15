<script lang="ts">
  import type { SimpleListProps, SimpleListOnSelectHandler } from './types';
  import { setContext } from 'svelte';
  import '@patternfly/patternfly/components/SimpleList/simple-list.css';

  interface Props extends SimpleListProps {
    onSelect?: SimpleListOnSelectHandler;
    isControlled?: boolean;
    'aria-label'?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    onSelect,
    isControlled = false,
    'aria-label': ariaLabel,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Track the currently active item (for uncontrolled mode)
  let currentItemId = $state<number | string | null>(null);

  // Handle item selection
  function handleSelect(event: Event, itemId: number | string) {
    if (!isControlled) {
      currentItemId = itemId;
    }
    onSelect?.(event, { itemId });
  }

  // Provide context to children
  setContext('simpleList', {
    handleSelect,
    get currentItemId() {
      return currentItemId;
    },
    get isControlled() {
      return isControlled;
    }
  });

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-simple-list', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} aria-label={ariaLabel} role="list" {...restProps}>
  {@render children?.()}
</div>
