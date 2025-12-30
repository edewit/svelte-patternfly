<script lang="ts">
  import type { NavItemProps, NavSelectClickHandler } from './types';
  import { getContext } from 'svelte';
  import AngleRightIcon from '../Icon/icons/AngleRightIcon.svelte';
  import '@patternfly/patternfly/components/Nav/nav.css';

  interface Props extends NavItemProps {
    id?: string;
    to?: string;
    itemId?: number | string;
    groupId?: number | string;
    isActive?: boolean;
    preventDefault?: boolean;
    onClick?: NavSelectClickHandler;
    flyout?: import('svelte').Snippet;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    id,
    to = '#',
    itemId,
    groupId,
    isActive = false,
    preventDefault = false,
    onClick,
    flyout,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get nav context
  const navContext = getContext<{
    handleSelect?: (event: Event, itemId: number | string, groupId?: number | string, to?: string) => void;
    openFlyout?: (itemId: number | string, content: import('svelte').Snippet, element: HTMLElement) => void;
    closeFlyout?: () => void;
    openFlyoutItemId?: number | string | null;
  }>('nav');

  let linkElement: HTMLAnchorElement | null = $state(null);
  const hasFlyout = $derived(flyout !== undefined);
  const isFlyoutOpen = $derived(navContext?.openFlyoutItemId === itemId);

  // Build CSS classes for item
  const itemClasses = $derived(
    [
      'pf-v6-c-nav__item',
      hasFlyout && 'pf-m-flyout',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build CSS classes for link
  const linkClasses = $derived(
    [
      'pf-v6-c-nav__link',
      isActive && 'pf-m-current',
      isFlyoutOpen && 'pf-m-expanded'
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Handle click
  function handleClick(event: MouseEvent) {
    if (preventDefault) {
      event.preventDefault();
    }

    // Handle flyout toggle
    if (hasFlyout && flyout && itemId !== undefined && linkElement) {
      event.preventDefault();
      if (isFlyoutOpen) {
        navContext?.closeFlyout?.();
      } else {
        navContext?.openFlyout?.(itemId, flyout, linkElement);
      }
      return;
    }

    // Call custom onClick handler if provided
    if (onClick && itemId !== undefined) {
      onClick(event, itemId, groupId, to);
    }

    // Call nav context handler
    if (navContext?.handleSelect && itemId !== undefined) {
      navContext.handleSelect(event, itemId, groupId, to);
    }
  }

  // Handle mouse enter for flyout (hover to open)
  function handleMouseEnter() {
    if (hasFlyout && flyout && itemId !== undefined && linkElement && !isFlyoutOpen) {
      navContext?.openFlyout?.(itemId, flyout, linkElement);
    }
  }

  // Handle mouse leave - close flyout when mouse leaves the item
  function handleMouseLeave(event: MouseEvent) {
    if (hasFlyout && isFlyoutOpen) {
      // Check if mouse is moving to the flyout menu
      const relatedTarget = event.relatedTarget as HTMLElement;
      if (relatedTarget && !linkElement?.contains(relatedTarget) && !relatedTarget.closest('.pf-v6-c-menu.pf-m-flyout')) {
        navContext?.closeFlyout?.();
      }
    }
  }

  // Handle keyboard navigation
  function handleKeyDown(event: KeyboardEvent) {
    if (hasFlyout && flyout && itemId !== undefined && linkElement) {
      if (event.key === ' ' || event.key === 'Enter' || event.key === 'ArrowRight') {
        event.preventDefault();
        if (isFlyoutOpen) {
          navContext?.closeFlyout?.();
        } else {
          navContext?.openFlyout?.(itemId, flyout, linkElement);
        }
      }
    }
  }
</script>

<li class={itemClasses}>
  <a
    {id}
    href={to}
    class={linkClasses}
    aria-current={isActive ? 'page' : undefined}
    aria-haspopup={hasFlyout ? 'true' : undefined}
    aria-expanded={hasFlyout ? isFlyoutOpen : undefined}
    bind:this={linkElement}
    onclick={handleClick}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    onkeydown={handleKeyDown}
    {...restProps}
  >
    <span class="pf-v6-c-nav__link-text">
      {#if typeof children === 'string'}
        {children}
      {:else if children}
        {@render children()}
      {/if}
    </span>
    {#if hasFlyout}
      <span class="pf-v6-c-nav__toggle">
        <span class="pf-v6-c-nav__toggle-icon">
          <AngleRightIcon />
        </span>
      </span>
    {/if}
  </a>
</li>

