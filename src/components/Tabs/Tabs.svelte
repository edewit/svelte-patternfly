<script lang="ts">
  import type { TabsProps, TabsVariant, TabsInset, TabsComponent, TabSelectHandler } from './types';
  import { setContext } from 'svelte';
  import AngleLeftIcon from '../Icon/icons/AngleLeftIcon.svelte';
  import AngleRightIcon from '../Icon/icons/AngleRightIcon.svelte';
  import '@patternfly/patternfly/components/Tabs/tabs.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends TabsProps {
    activeKey?: string | number;
    onSelect?: TabSelectHandler;
    isBox?: boolean;
    isVertical?: boolean;
    isFilled?: boolean;
    isSecondary?: boolean;
    hasPageInsets?: boolean;
    hasBorderBottom?: boolean;
    hasSecondaryBorderBottom?: boolean;
    inset?: TabsInset;
    component?: TabsComponent;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    role?: string;
    id?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    activeKey = 0,
    onSelect,
    isBox = false,
    isVertical = false,
    isFilled = false,
    isSecondary = false,
    hasPageInsets = false,
    hasBorderBottom = false,
    hasSecondaryBorderBottom = false,
    inset,
    component = 'div',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    role,
    id,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // References for scroll detection
  let tabsElement: HTMLElement | null = $state(null);
  let listElement: HTMLElement | null = $state(null);

  // Scroll state
  let isScrollable = $state(false);
  let canScrollLeft = $state(false);
  let canScrollRight = $state(false);

  // Check if scrollable and update button states
  function checkScrollability() {
    if (!listElement || !tabsElement || isVertical) {
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
    canScrollRight = scrollLeft < maxScrollLeft - 1;
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
    if (!listElement || !tabsElement) return;

    // Initial check
    checkScrollability();

    // Observe resize
    const resizeObserver = new ResizeObserver(() => {
      checkScrollability();
    });

    resizeObserver.observe(listElement);
    resizeObserver.observe(tabsElement);

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
      'pf-v6-c-tabs',
      isBox && 'pf-m-box',
      isVertical && 'pf-m-vertical',
      isFilled && 'pf-m-fill',
      isSecondary && 'pf-m-secondary',
      hasPageInsets && 'pf-m-page-insets',
      hasBorderBottom && 'pf-m-border-bottom',
      hasSecondaryBorderBottom && 'pf-m-secondary-border-bottom',
      isScrollable && 'pf-m-scrollable',
      inset && inset !== 'none' && `pf-m-inset-${inset}`,
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Handle tab selection
  function handleSelect(event: MouseEvent | KeyboardEvent, eventKey: string | number) {
    if (onSelect) {
      onSelect(event, eventKey);
    }
  }

  // Create context for children
  setContext('tabs', {
    get activeKey() {
      return activeKey;
    },
    handleSelect,
    setListElement: (el: HTMLElement | null) => {
      listElement = el;
    },
    id
  });
</script>

{#if component === 'nav'}
  <nav
    class={classes}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    {id}
    bind:this={tabsElement}
    {...restProps}
  >
    {#if isScrollable}
      <div class="pf-v6-c-tabs__scroll-button" aria-hidden="true">
        <button
          class="pf-v6-c-button pf-m-plain"
          type="button"
          aria-label="Scroll left"
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
      <div class="pf-v6-c-tabs__scroll-button" aria-hidden="true">
        <button
          class="pf-v6-c-button pf-m-plain"
          type="button"
          aria-label="Scroll right"
          disabled={!canScrollRight}
          onclick={scrollRight}
        >
          <span class="pf-v6-c-button__icon">
            <AngleRightIcon />
          </span>
        </button>
      </div>
    {/if}
  </nav>
{:else}
  <div
    class={classes}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    {role}
    {id}
    bind:this={tabsElement}
    {...restProps}
  >
    {#if isScrollable}
      <div class="pf-v6-c-tabs__scroll-button" aria-hidden="true">
        <button
          class="pf-v6-c-button pf-m-plain"
          type="button"
          aria-label="Scroll left"
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
      <div class="pf-v6-c-tabs__scroll-button" aria-hidden="true">
        <button
          class="pf-v6-c-button pf-m-plain"
          type="button"
          aria-label="Scroll right"
          disabled={!canScrollRight}
          onclick={scrollRight}
        >
          <span class="pf-v6-c-button__icon">
            <AngleRightIcon />
          </span>
        </button>
      </div>
    {/if}
  </div>
{/if}
