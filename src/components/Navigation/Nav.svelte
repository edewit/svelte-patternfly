<script lang="ts">
  import type { NavProps, NavOnSelectHandler, NavOnToggleHandler } from './types';
  import { setContext } from 'svelte';
  import AngleLeftIcon from '../Icon/icons/AngleLeftIcon.svelte';
  import AngleRightIcon from '../Icon/icons/AngleRightIcon.svelte';
  import '@patternfly/patternfly/components/Nav/nav.css';
  import '@patternfly/patternfly/components/Button/button.css';
  import '@patternfly/patternfly/components/Menu/menu.css';

  interface Props extends NavProps {
    onSelect?: NavOnSelectHandler;
    onToggle?: NavOnToggleHandler;
    variant?: 'default' | 'horizontal' | 'horizontal-subnav';
    'aria-label'?: string;
    ouiaId?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    onSelect,
    onToggle,
    variant = 'default',
    'aria-label': ariaLabel = 'Global',
    ouiaId,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // References for scroll detection
  let navElement: HTMLElement | null = $state(null);
  let listElement: HTMLElement | null = $state(null);

  // Scroll state
  let isScrollable = $state(false);
  let canScrollLeft = $state(false);
  let canScrollRight = $state(false);

  // Check if scrollable and update button states
  function checkScrollability() {
    if (!listElement || !navElement) return;

    const isHorizontal = variant === 'horizontal' || variant === 'horizontal-subnav';
    if (!isHorizontal) {
      isScrollable = false;
      canScrollLeft = false;
      canScrollRight = false;
      return;
    }

    const scrollWidth = listElement.scrollWidth;
    const clientWidth = listElement.clientWidth;
    const scrollLeft = listElement.scrollLeft;
    const maxScrollLeft = scrollWidth - clientWidth;

    isScrollable = scrollWidth > clientWidth;
    canScrollLeft = scrollLeft > 0;
    canScrollRight = scrollLeft < maxScrollLeft - 1; // Use -1 for floating point precision
  }

  // Handle scroll event
  function handleScroll() {
    checkScrollability();
  }

  // Scroll left
  function scrollLeft() {
    if (listElement) {
      const scrollAmount = listElement.clientWidth * 0.8;
      listElement.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }

  // Scroll right
  function scrollRight() {
    if (listElement) {
      const scrollAmount = listElement.clientWidth * 0.8;
      listElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  // Set up ResizeObserver and scroll listener
  $effect(() => {
    if (!listElement || !navElement) return;

    // Initial check
    checkScrollability();

    // Observe resize
    const resizeObserver = new ResizeObserver(() => {
      checkScrollability();
    });

    resizeObserver.observe(listElement);
    resizeObserver.observe(navElement);

    // Listen to scroll events
    listElement.addEventListener('scroll', handleScroll);

    return () => {
      resizeObserver.disconnect();
      listElement?.removeEventListener('scroll', handleScroll);
    };
  });

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-nav',
      variant === 'horizontal' && 'pf-m-horizontal',
      variant === 'horizontal-subnav' && 'pf-m-horizontal',
      variant === 'horizontal-subnav' && 'pf-m-subnav',
      isScrollable && 'pf-m-scrollable',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Handle select event
  function handleSelect(event: Event, itemId: number | string, groupId?: number | string, to?: string) {
    if (onSelect) {
      onSelect(event, { itemId, groupId });
    }
  }

  // Handle toggle event
  function handleToggle(event: MouseEvent, groupId: number | string, isExpanded: boolean) {
    if (onToggle) {
      onToggle(event, { groupId, isExpanded });
    }
  }

  // Flyout state
  let openFlyoutItemId: number | string | null = $state(null);
  let flyoutContent: import('svelte').Snippet | null = $state(null);
  let flyoutItemElement: HTMLElement | null = $state(null);

  // Nav needs position relative for flyout positioning (always, not just when flyout is open)
  const navStyles = $derived('position: relative;');

  // Handle flyout open/close
  function openFlyout(itemId: number | string, content: import('svelte').Snippet, element: HTMLElement) {
    openFlyoutItemId = itemId;
    flyoutContent = content;
    flyoutItemElement = element;
  }

  function closeFlyout() {
    openFlyoutItemId = null;
    flyoutContent = null;
    flyoutItemElement = null;
  }

  // Handle keyboard navigation for flyouts
  function handleKeyDown(event: KeyboardEvent) {
    if (openFlyoutItemId !== null) {
      if (event.key === 'Escape' || event.key === 'ArrowLeft') {
        event.preventDefault();
        closeFlyout();
        // Focus the nav item that opened the flyout
        flyoutItemElement?.focus();
      }
    }
  }

  // Set up keyboard listener
  $effect(() => {
    if (openFlyoutItemId !== null) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  });

  // Calculate flyout position - position it to the right of the nav item
  let flyoutStylesValue = $state('');

  $effect(() => {
    if (!flyoutItemElement || openFlyoutItemId === null || !navElement) {
      flyoutStylesValue = '';
      return;
    }

    // Use setTimeout to ensure DOM is updated
    const updatePosition = () => {
      if (!flyoutItemElement || !navElement) return;

      const itemRect = flyoutItemElement.getBoundingClientRect();
      const navRect = navElement.getBoundingClientRect();

      // Position flyout to the right of the nav item, aligned with the top
      // Add width constraints to prevent full-width expansion
      flyoutStylesValue = `position: absolute; top: ${itemRect.top - navRect.top}px; left: ${itemRect.right - navRect.left}px; z-index: 1000; display: inline-block; width: auto; max-width: fit-content;`;
    };

    // Update immediately and after a short delay to handle any layout changes
    updatePosition();
    const timeoutId = setTimeout(updatePosition, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  // Create context for children to access handleSelect, handleToggle, and flyout functions
  setContext('nav', {
    handleSelect,
    handleToggle,
    setListElement: (el: HTMLElement | null) => {
      listElement = el;
    },
    openFlyout,
    closeFlyout,
    get openFlyoutItemId() {
      return openFlyoutItemId;
    }
  });
</script>

<nav class={classes} aria-label={ariaLabel} data-ouia-component-id={ouiaId} bind:this={navElement} style={navStyles} {...restProps}>
  {#if isScrollable}
    <div class="pf-v6-c-nav__scroll-button">
      <button
        class="pf-v6-c-button pf-m-plain"
        type="button"
        aria-label="Scroll back"
        disabled={!canScrollLeft}
        onclick={scrollLeft}
      >
        <span class="pf-v6-c-button__icon">
          <AngleLeftIcon />
        </span>
      </button>
    </div>
  {/if}
  {@render children?.()}
  {#if isScrollable}
    <div class="pf-v6-c-nav__scroll-button">
      <button
        class="pf-v6-c-button pf-m-plain"
        type="button"
        aria-label="Scroll forward"
        disabled={!canScrollRight}
        onclick={scrollRight}
      >
        <span class="pf-v6-c-button__icon">
          <AngleRightIcon />
        </span>
      </button>
    </div>
  {/if}
  {#if flyoutContent && openFlyoutItemId !== null}
    <div
      class="pf-v6-c-menu pf-m-flyout pf-m-nav"
      style={flyoutStylesValue}
      role="presentation"
      onmouseleave={(e: MouseEvent) => {
        // Only close if mouse is leaving the menu area (not moving to another menu item)
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!relatedTarget || !relatedTarget.closest('.pf-v6-c-menu.pf-m-flyout')) {
          closeFlyout();
        }
      }}
    >
      {@render flyoutContent()}
    </div>
  {/if}
</nav>

