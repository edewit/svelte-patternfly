<script lang="ts">
  import type { BreadcrumbProps, BreadcrumbItem } from './types';
  import '@patternfly/patternfly/components/Breadcrumb/breadcrumb.css';
  import '@patternfly/patternfly/components/MenuToggle/menu-toggle.css';
  import '@patternfly/patternfly/components/Menu/menu.css';
  import '@patternfly/patternfly/components/Badge/badge.css';

  interface Props extends BreadcrumbProps {
    'aria-label'?: string;
    class?: string;
  }

  let {
    items = [],
    'aria-label': ariaLabel = 'breadcrumb',
    class: className = '',
    ...restProps
  }: Props = $props();

  // Track which dropdowns are open (by index)
  // Initialize from items that have isExpanded: true
  let openDropdowns = $state<Set<number>>(
    new Set(
      items
        .map((item, index) => (item.type === 'dropdown' && item.isExpanded ? index : -1))
        .filter((index) => index !== -1)
    )
  );

  function toggleDropdown(index: number) {
    const newSet = new Set(openDropdowns);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    openDropdowns = newSet;
  }

  function closeDropdown(index: number) {
    const newSet = new Set(openDropdowns);
    newSet.delete(index);
    openDropdowns = newSet;
  }

  function handleMenuItemClick(
    itemIndex: number,
    menuItemIndex: number,
    menuItem: BreadcrumbItem['dropdownItems'][number]
  ) {
    if (menuItem.onClick) {
      menuItem.onClick();
    }
    closeDropdown(itemIndex);
  }
</script>

<nav class="pf-v6-c-breadcrumb {className}" aria-label={ariaLabel} {...restProps}>
  <ol class="pf-v6-c-breadcrumb__list" role="list">
    {#each items as item, index}
      <li class="pf-v6-c-breadcrumb__item">
        <span class="pf-v6-c-breadcrumb__item-divider">
          <i class="fas fa-angle-right" aria-hidden="true"></i>
        </span>
        {#if item.type === 'dropdown'}
          {@const itemIndex = index}
          {@const isOpen = openDropdowns.has(itemIndex)}
          <span class="pf-v6-c-breadcrumb__dropdown">
            <button
              class="pf-v6-c-menu-toggle pf-m-text pf-m-small pf-m-plain"
              class:pf-m-expanded={isOpen}
              type="button"
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-label={item['aria-label'] || 'Menu toggle'}
              onclick={() => toggleDropdown(itemIndex)}
            >
              <span class="pf-v6-c-menu-toggle__count">
                {#if item.dropdownCount !== undefined}
                  <span class="pf-v6-c-badge pf-m-unread">
                    {item.dropdownCount}
                    <span class="pf-v6-screen-reader">additional items</span>
                  </span>
                {/if}
              </span>
              <span class="pf-v6-c-menu-toggle__controls">
                <span class="pf-v6-c-menu-toggle__toggle-icon">
                  <i class="fas fa-caret-down fa-fw" aria-hidden="true"></i>
                </span>
              </span>
            </button>
            {#if isOpen && item.dropdownItems && item.dropdownItems.length > 0}
              <div class="pf-v6-c-menu pf-m-flyout">
                <ul class="pf-v6-c-menu__list" role="menu">
                  {#each item.dropdownItems as menuItem, menuItemIndex}
                    <li class="pf-v6-c-menu__list-item" role="none">
                      {#if menuItem.href}
                        <a
                          class="pf-v6-c-menu__item"
                          href={menuItem.href}
                          role="menuitem"
                          aria-label={menuItem['aria-label']}
                          onclick={() => handleMenuItemClick(itemIndex, menuItemIndex, menuItem)}
                        >
                          <span class="pf-v6-c-menu__item-text">{menuItem.text}</span>
                        </a>
                      {:else}
                        <button
                          class="pf-v6-c-menu__item"
                          type="button"
                          role="menuitem"
                          aria-label={menuItem['aria-label']}
                          onclick={() => handleMenuItemClick(itemIndex, menuItemIndex, menuItem)}
                        >
                          <span class="pf-v6-c-menu__item-text">{menuItem.text}</span>
                        </button>
                      {/if}
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </span>
        {:else if item.type === 'heading'}
          {@const headingLevel = item.headingLevel || 1}
          {@const linkContent = item.isCurrent
            ? { href: item.href, isCurrent: true, text: item.text, ariaLabel: item['aria-label'] }
            : item.href
              ? {
                  href: item.href,
                  isCurrent: false,
                  text: item.text,
                  ariaLabel: item['aria-label']
                }
              : {
                  href: undefined,
                  isCurrent: false,
                  text: item.text,
                  ariaLabel: item['aria-label']
                }}
          {#if headingLevel === 1}
            <h1 class="pf-v6-c-breadcrumb__heading">
              {#if linkContent.isCurrent}
                <a
                  href={linkContent.href}
                  class="pf-v6-c-breadcrumb__link pf-m-current"
                  aria-current="page"
                  aria-label={linkContent.ariaLabel}
                >
                  {linkContent.text}
                </a>
              {:else if linkContent.href}
                <a
                  href={linkContent.href}
                  class="pf-v6-c-breadcrumb__link"
                  aria-label={linkContent.ariaLabel}
                >
                  {linkContent.text}
                </a>
              {:else}
                <span class="pf-v6-c-breadcrumb__link">{linkContent.text}</span>
              {/if}
            </h1>
          {:else if headingLevel === 2}
            <h2 class="pf-v6-c-breadcrumb__heading">
              {#if linkContent.isCurrent}
                <a
                  href={linkContent.href}
                  class="pf-v6-c-breadcrumb__link pf-m-current"
                  aria-current="page"
                  aria-label={linkContent.ariaLabel}
                >
                  {linkContent.text}
                </a>
              {:else if linkContent.href}
                <a
                  href={linkContent.href}
                  class="pf-v6-c-breadcrumb__link"
                  aria-label={linkContent.ariaLabel}
                >
                  {linkContent.text}
                </a>
              {:else}
                <span class="pf-v6-c-breadcrumb__link">{linkContent.text}</span>
              {/if}
            </h2>
          {:else if headingLevel === 3}
            <h3 class="pf-v6-c-breadcrumb__heading">
              {#if linkContent.isCurrent}
                <a
                  href={linkContent.href}
                  class="pf-v6-c-breadcrumb__link pf-m-current"
                  aria-current="page"
                  aria-label={linkContent.ariaLabel}
                >
                  {linkContent.text}
                </a>
              {:else if linkContent.href}
                <a
                  href={linkContent.href}
                  class="pf-v6-c-breadcrumb__link"
                  aria-label={linkContent.ariaLabel}
                >
                  {linkContent.text}
                </a>
              {:else}
                <span class="pf-v6-c-breadcrumb__link">{linkContent.text}</span>
              {/if}
            </h3>
          {:else if headingLevel === 4}
            <h4 class="pf-v6-c-breadcrumb__heading">
              {#if linkContent.isCurrent}
                <a
                  href={linkContent.href}
                  class="pf-v6-c-breadcrumb__link pf-m-current"
                  aria-current="page"
                  aria-label={linkContent.ariaLabel}
                >
                  {linkContent.text}
                </a>
              {:else if linkContent.href}
                <a
                  href={linkContent.href}
                  class="pf-v6-c-breadcrumb__link"
                  aria-label={linkContent.ariaLabel}
                >
                  {linkContent.text}
                </a>
              {:else}
                <span class="pf-v6-c-breadcrumb__link">{linkContent.text}</span>
              {/if}
            </h4>
          {:else if headingLevel === 5}
            <h5 class="pf-v6-c-breadcrumb__heading">
              {#if linkContent.isCurrent}
                <a
                  href={linkContent.href}
                  class="pf-v6-c-breadcrumb__link pf-m-current"
                  aria-current="page"
                  aria-label={linkContent.ariaLabel}
                >
                  {linkContent.text}
                </a>
              {:else if linkContent.href}
                <a
                  href={linkContent.href}
                  class="pf-v6-c-breadcrumb__link"
                  aria-label={linkContent.ariaLabel}
                >
                  {linkContent.text}
                </a>
              {:else}
                <span class="pf-v6-c-breadcrumb__link">{linkContent.text}</span>
              {/if}
            </h5>
          {:else}
            <h6 class="pf-v6-c-breadcrumb__heading">
              {#if linkContent.isCurrent}
                <a
                  href={linkContent.href}
                  class="pf-v6-c-breadcrumb__link pf-m-current"
                  aria-current="page"
                  aria-label={linkContent.ariaLabel}
                >
                  {linkContent.text}
                </a>
              {:else if linkContent.href}
                <a
                  href={linkContent.href}
                  class="pf-v6-c-breadcrumb__link"
                  aria-label={linkContent.ariaLabel}
                >
                  {linkContent.text}
                </a>
              {:else}
                <span class="pf-v6-c-breadcrumb__link">{linkContent.text}</span>
              {/if}
            </h6>
          {/if}
        {:else if item.isCurrent}
          <a
            href={item.href}
            class="pf-v6-c-breadcrumb__link pf-m-current"
            aria-current="page"
            aria-label={item['aria-label']}
          >
            {item.text}
          </a>
        {:else if item.href}
          <a href={item.href} class="pf-v6-c-breadcrumb__link" aria-label={item['aria-label']}>
            {item.text}
          </a>
        {:else}
          <span class="pf-v6-c-breadcrumb__link">{item.text}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  :global(.pf-v6-c-breadcrumb__dropdown) {
    position: relative;
  }

  :global(.pf-v6-c-breadcrumb__dropdown .pf-v6-c-menu.pf-m-flyout) {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
  }
</style>
