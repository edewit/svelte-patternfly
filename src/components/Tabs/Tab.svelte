<script lang="ts">
  import type { TabProps } from './types';
  import { getContext } from 'svelte';

  interface Props extends TabProps {
    eventKey: string | number;
    title?: import('svelte').Snippet;
    isDisabled?: boolean;
    isAriaDisabled?: boolean;
    isHidden?: boolean;
    tooltip?: import('svelte').Snippet;
    'aria-label'?: string;
    href?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    eventKey,
    title,
    isDisabled = false,
    isAriaDisabled = false,
    isHidden = false,
    tooltip,
    'aria-label': ariaLabel,
    href,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get tabs context
  const tabsContext = getContext<{
    activeKey?: string | number;
    handleSelect?: (event: MouseEvent | KeyboardEvent, eventKey: string | number) => void;
    id?: string;
  }>('tabs');

  const isActive = $derived(tabsContext?.activeKey === eventKey);
  const tabId = $derived(tabsContext?.id ? `${tabsContext.id}-${eventKey}-link` : undefined);
  const tabPanelId = $derived(tabsContext?.id ? `${tabsContext.id}-${eventKey}-panel` : undefined);

  // Build CSS classes for item
  const itemClasses = $derived(
    [
      'pf-v6-c-tabs__item',
      isActive && 'pf-m-current',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build CSS classes for link/button
  const linkClasses = $derived(
    [
      'pf-v6-c-tabs__link',
      isAriaDisabled && 'pf-m-aria-disabled'
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Handle click
  function handleClick(event: MouseEvent) {
    if (isDisabled || isAriaDisabled) {
      event.preventDefault();
      return;
    }

    if (tabsContext?.handleSelect) {
      tabsContext.handleSelect(event, eventKey);
    }
  }

  // Handle keyboard
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      if (isDisabled || isAriaDisabled) {
        event.preventDefault();
        return;
      }

      if (tabsContext?.handleSelect) {
        tabsContext.handleSelect(event, eventKey);
      }
    }
  }
</script>

{#if !isHidden}
  <li class={itemClasses} role="presentation">
    {#if tooltip}
      <span class="pf-v6-c-tabs__item-tooltip">
        {#if href}
          <a
            {href}
            class={linkClasses}
            role="tab"
            id={tabId}
            aria-controls={tabPanelId}
            aria-selected={isActive}
            aria-label={ariaLabel}
            aria-disabled={isAriaDisabled ? 'true' : undefined}
            tabindex={isActive ? 0 : -1}
            onclick={handleClick}
            onkeydown={handleKeyDown}
            {...restProps}
          >
            {#if title}
              {@render title()}
            {/if}
          </a>
        {:else}
          <button
            type="button"
            class={linkClasses}
            role="tab"
            id={tabId}
            aria-controls={tabPanelId}
            aria-selected={isActive}
            aria-label={ariaLabel}
            aria-disabled={isAriaDisabled ? 'true' : undefined}
            disabled={isDisabled}
            tabindex={isActive ? 0 : -1}
            onclick={handleClick}
            onkeydown={handleKeyDown}
            {...restProps}
          >
            {#if title}
              {@render title()}
            {/if}
          </button>
        {/if}
        {@render tooltip()}
      </span>
    {:else if href}
      <a
        {href}
        class={linkClasses}
        role="tab"
        id={tabId}
        aria-controls={tabPanelId}
        aria-selected={isActive}
        aria-label={ariaLabel}
        aria-disabled={isAriaDisabled ? 'true' : undefined}
        tabindex={isActive ? 0 : -1}
        onclick={handleClick}
        onkeydown={handleKeyDown}
        {...restProps}
      >
        {#if title}
          {@render title()}
        {/if}
      </a>
    {:else}
      <button
        type="button"
        class={linkClasses}
        role="tab"
        id={tabId}
        aria-controls={tabPanelId}
        aria-selected={isActive}
        aria-label={ariaLabel}
        aria-disabled={isAriaDisabled ? 'true' : undefined}
        disabled={isDisabled}
        tabindex={isActive ? 0 : -1}
        onclick={handleClick}
        onkeydown={handleKeyDown}
        {...restProps}
      >
        {#if title}
          {@render title()}
        {/if}
      </button>
    {/if}
  </li>
{/if}
