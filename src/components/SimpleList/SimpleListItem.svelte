<script lang="ts">
  import type { SimpleListItemProps, SimpleListItemClickHandler } from './types';
  import { getContext, hasContext } from 'svelte';
  import '@patternfly/patternfly/components/SimpleList/simple-list.css';

  interface Props extends SimpleListItemProps {
    itemId?: number | string;
    isActive?: boolean;
    onClick?: SimpleListItemClickHandler;
    component?: 'button' | 'a';
    href?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    itemId,
    isActive,
    onClick,
    component = 'button',
    href,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get simple list context (if available)
  const simpleListContext = hasContext('simpleList')
    ? getContext<{
        handleSelect?: (event: Event, itemId: number | string) => void;
        currentItemId?: number | string | null;
        isControlled?: boolean;
      }>('simpleList')
    : null;

  // Determine if item is active (controlled vs uncontrolled)
  const isItemActive = $derived(() => {
    if (isActive !== undefined) {
      return isActive;
    }
    if (simpleListContext && !simpleListContext.isControlled && itemId !== undefined) {
      return simpleListContext.currentItemId === itemId;
    }
    return false;
  });

  // Build CSS classes for the list item
  const itemClasses = $derived(
    ['pf-v6-c-simple-list__item', className].filter(Boolean).join(' ')
  );

  // Build CSS classes for the link/button
  const linkClasses = $derived(
    ['pf-v6-c-simple-list__item-link', isItemActive() && 'pf-m-current']
      .filter(Boolean)
      .join(' ')
  );

  // Handle click
  function handleClick(event: MouseEvent) {
    if (onClick && itemId !== undefined) {
      onClick(event, itemId);
    }
    if (simpleListContext?.handleSelect && itemId !== undefined) {
      simpleListContext.handleSelect(event, itemId);
    }
  }
</script>

<li class={itemClasses} role="listitem">
  {#if component === 'a'}
    <a
      class={linkClasses}
      {href}
      aria-current={isItemActive() ? 'true' : undefined}
      onclick={handleClick}
      {...restProps}
    >
      {#if typeof children === 'string'}
        {children}
      {:else if children}
        {@render children()}
      {/if}
    </a>
  {:else}
    <button
      class={linkClasses}
      type="button"
      aria-current={isItemActive() ? 'true' : undefined}
      onclick={handleClick}
      {...restProps}
    >
      {#if typeof children === 'string'}
        {children}
      {:else if children}
        {@render children()}
      {/if}
    </button>
  {/if}
</li>
