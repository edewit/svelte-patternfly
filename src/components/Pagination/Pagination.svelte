<script lang="ts">
  import type { PaginationProps, PaginationTitles, PaginationToggleTemplateProps } from './types';
  import Button from '../Button/Button.svelte';
  import MenuToggle from '../MenuToggle/MenuToggle.svelte';
  import Menu from '../Menu/Menu.svelte';
  import MenuContent from '../Menu/MenuContent.svelte';
  import MenuList from '../Menu/MenuList.svelte';
  import MenuItem from '../Menu/MenuItem.svelte';
  import Icon from '../Icon/Icon.svelte';
  import '@patternfly/patternfly/components/Pagination/pagination.css';
  import '@patternfly/patternfly/components/FormControl/form-control.css';
  import '@patternfly/patternfly/components/Menu/menu.css';
  import '@patternfly/patternfly/components/MenuToggle/menu-toggle.css';

  interface Props extends PaginationProps {
    children?: import('svelte').Snippet;
  }

  let {
    itemCount,
    perPage = 10,
    page: pageProp = 1,
    onSetPage,
    onPerPageSelect,
    perPageOptions = [
      { value: 10, title: '10' },
      { value: 20, title: '20' },
      { value: 50, title: '50' },
      { value: 100, title: '100' }
    ],
    widgetId = `pagination-${Math.random().toString(36).substring(2, 11)}`,
    itemsStart,
    itemsEnd,
    titles = {},
    toggleTemplate,
    isCompact = false,
    isDisabled = false,
    isStatic = false,
    isSticky = false,
    className = '',
    class: classProp = '',
    ouiaId,
    ouiaSafe = true,
    variant = 'top',
    dropDirection = 'down',
    firstPage = 1,
    lastPage,
    offset,
    inset,
    isLastFullPageShown = false,
    children,
    ...restProps
  }: Props = $props();

  // Internal state
  let internalPage = $state(pageProp);
  let internalPerPage = $state(perPage);
  let isPerPageMenuOpen = $state(false);
  let perPageMenuElement: HTMLDivElement | null = $state(null);
  let perPageToggleElement: HTMLElement | null = $state(null);

  // Sync with props
  $effect(() => {
    if (pageProp !== undefined) {
      internalPage = pageProp;
    }
  });

  $effect(() => {
    if (perPage !== undefined) {
      internalPerPage = perPage;
    }
  });

  // Handle click outside to close menu
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      perPageMenuElement &&
      !perPageMenuElement.contains(target) &&
      perPageToggleElement &&
      !perPageToggleElement.contains(target) &&
      isPerPageMenuOpen
    ) {
      isPerPageMenuOpen = false;
    }
  }

  // Add event listener for click outside
  $effect(() => {
    if (isPerPageMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  });

  // Calculate derived values
  const totalPages = $derived.by(() => {
    if (itemCount === undefined || itemCount === 0) return 1;
    if (isLastFullPageShown) {
      return Math.ceil(itemCount / internalPerPage);
    }
    return Math.max(1, Math.ceil(itemCount / internalPerPage));
  });

  const currentPage = $derived(Math.max(1, Math.min(internalPage, totalPages)));
  const startIndex = $derived.by(() => {
    if (itemsStart !== undefined) return itemsStart;
    if (offset !== undefined) return offset + 1;
    return (currentPage - 1) * internalPerPage + 1;
  });
  const endIndex = $derived.by(() => {
    if (itemsEnd !== undefined) return itemsEnd;
    if (itemCount === undefined) return startIndex + internalPerPage - 1;
    return Math.min(startIndex + internalPerPage - 1, itemCount);
  });

  // Default titles
  const defaultTitles: PaginationTitles = {
    items: 'items',
    page: 'Page',
    itemsPerPage: 'Items per page',
    perPageSuffix: 'per page',
    toFirstPage: 'Go to first page',
    toPreviousPage: 'Go to previous page',
    toNextPage: 'Go to next page',
    toLastPage: 'Go to last page',
    optionsToggle: 'Items per page',
    currPage: 'Current page',
    paginationTitle: `Pagination nav - ${widgetId}`,
    ofWord: 'of'
  };

  const finalTitles = $derived({ ...defaultTitles, ...titles });

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-pagination',
      isCompact && 'pf-m-compact',
      isStatic && 'pf-m-static',
      isSticky && 'pf-m-sticky',
      variant === 'bottom' && 'pf-m-bottom',
      inset && Object.entries(inset).map(([breakpoint, value]) => {
        if (breakpoint === 'default') {
          return value ? `pf-m-${value}` : '';
        }
        return value ? `pf-m-${breakpoint}-${value}` : '';
      }).filter(Boolean).join(' '),
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Toggle template function
  const toggleText = $derived.by(() => {
    if (toggleTemplate) {
      const props: PaginationToggleTemplateProps = {
        firstIndex: startIndex,
        lastIndex: endIndex,
        itemCount,
        itemsTitle: finalTitles.items,
        ofWord: finalTitles.ofWord
      };
      return toggleTemplate(props);
    }
    return `<b>${startIndex} - ${endIndex}</b>&nbsp;${finalTitles.ofWord}&nbsp;<b>${itemCount ?? 'many'}</b>`;
  });

  // Handle escape key to close menu
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isPerPageMenuOpen) {
      isPerPageMenuOpen = false;
      perPageToggleElement?.focus();
    }
  }

  // Add keyboard event listener
  $effect(() => {
    if (isPerPageMenuOpen) {
      document.addEventListener('keydown', handleKeydown);
      return () => {
        document.removeEventListener('keydown', handleKeydown);
      };
    }
  });

  // Handle page change
  function handleSetPage(newPage: number, event?: MouseEvent | KeyboardEvent) {
    if (isDisabled || newPage < 1 || newPage > totalPages || newPage === currentPage) {
      return;
    }
    internalPage = newPage;
    if (onSetPage && event) {
      onSetPage(event, newPage);
    }
  }

  // Handle per page select
  function handlePerPageSelect(newPerPage: number, event?: MouseEvent | KeyboardEvent) {
    if (isDisabled) return;
    
    const newPage = Math.max(1, Math.min(currentPage, Math.ceil((itemCount ?? 0) / newPerPage)));
    internalPerPage = newPerPage;
    internalPage = newPage;
    isPerPageMenuOpen = false;
    
    if (onPerPageSelect && event) {
      onPerPageSelect(event, newPerPage, newPage);
    }
  }

  // Handle page input change
  function handlePageInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      handleSetPage(value, event as MouseEvent | KeyboardEvent);
    } else {
      // Reset to current page if invalid
      target.value = String(currentPage);
    }
  }

  // Handle page input keydown
  function handlePageInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handlePageInputChange(event);
    }
  }

  // Navigation button states
  const isFirstDisabled = $derived(isDisabled || currentPage === 1);
  const isPrevDisabled = $derived(isDisabled || currentPage === 1);
  const isNextDisabled = $derived(isDisabled || currentPage >= totalPages);
  const isLastDisabled = $derived(isDisabled || currentPage >= totalPages);

  // Generate OUIA ID
  const ouiaComponentId = $derived(
    ouiaId !== undefined ? String(ouiaId) : `pagination-${Math.random().toString(36).substring(2, 11)}`
  );

  // Menu toggle ID
  const menuToggleId = $derived(`pagination-menu-toggle-${widgetId}`);
</script>

<div
  class={classes}
  data-ouia-component-type="PF6/Pagination"
  data-ouia-component-id={ouiaComponentId}
  data-ouia-safe={ouiaSafe ? 'true' : 'false'}
  {...restProps}
>
  <!-- Total items display (for summary variant) -->
  {#if !isCompact && variant !== 'bottom' && itemCount !== undefined}
    <div class="pf-v6-c-pagination__total-items">
      <b>{startIndex} - {endIndex}</b>&nbsp;{finalTitles.ofWord}&nbsp;
      <b>{itemCount}</b>
    </div>
  {/if}

  <!-- Per page menu -->
  {#if !isStatic}
    <div class="pf-v6-c-pagination__page-menu">
      <div bind:this={perPageMenuElement} style="position: relative; display: inline-block;">
        <button
          bind:this={perPageToggleElement}
          class="pf-v6-c-menu-toggle pf-m-text pf-m-plain"
          class:pf-m-top={variant === 'bottom'}
          type="button"
          aria-expanded={isPerPageMenuOpen}
          aria-label={finalTitles.optionsToggle}
          id={menuToggleId}
          disabled={isDisabled}
          onclick={() => {
            if (!isDisabled) {
              isPerPageMenuOpen = !isPerPageMenuOpen;
            }
          }}
        >
          <span class="pf-v6-c-menu-toggle__text">
            {@html toggleText}
          </span>
          <span class="pf-v6-c-menu-toggle__controls">
            <span class="pf-v6-c-menu-toggle__toggle-icon">
              <i class="fas fa-caret-down fa-fw" aria-hidden="true"></i>
            </span>
          </span>
        </button>
        {#if isPerPageMenuOpen}
          <Menu
            role="listbox"
            isFlyout={true}
            selected={internalPerPage}
            onSelect={(event, itemId) => {
              const value = typeof itemId === 'number' ? itemId : parseInt(String(itemId), 10);
              handlePerPageSelect(value, event);
            }}
            style="position: absolute; z-index: 1000; {variant === 'bottom' ? 'bottom: 100%; top: auto;' : 'top: 100%;'} left: 0; min-width: max-content;"
          >
            <MenuContent>
              <MenuList>
                {#each perPageOptions as option}
                  <MenuItem
                    itemId={option.value}
                    isSelected={internalPerPage === option.value}
                  >
                    {option.title ?? String(option.value)}
                  </MenuItem>
                {/each}
              </MenuList>
            </MenuContent>
          </Menu>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Navigation -->
  <nav class="pf-v6-c-pagination__nav" aria-label={finalTitles.paginationTitle}>
    {#if isCompact}
      <!-- Compact mode: only prev/next buttons -->
      <!-- Previous page button -->
      <div class="pf-v6-c-pagination__nav-control pf-m-prev">
        <Button
          variant="plain"
          isDisabled={isPrevDisabled}
          aria-label={finalTitles.toPreviousPage}
          onclick={(e) => handleSetPage(currentPage - 1, e)}
        >
          <span class="pf-v6-c-button__icon">
            <Icon icon="fas fa-angle-left" />
          </span>
        </Button>
      </div>

      <!-- Next page button -->
      <div class="pf-v6-c-pagination__nav-control pf-m-next">
        <Button
          variant="plain"
          isDisabled={isNextDisabled}
          aria-label={finalTitles.toNextPage}
          onclick={(e) => handleSetPage(currentPage + 1, e)}
        >
          <span class="pf-v6-c-button__icon">
            <Icon icon="fas fa-angle-right" />
          </span>
        </Button>
      </div>
    {:else}
      <!-- Full mode: first, prev, page input, next, last -->
      <!-- First page button -->
      <div class="pf-v6-c-pagination__nav-control pf-m-first">
        <Button
          variant="plain"
          isDisabled={isFirstDisabled}
          aria-label={finalTitles.toFirstPage}
          onclick={(e) => handleSetPage(1, e)}
        >
          <span class="pf-v6-c-button__icon">
            <Icon icon="fas fa-angle-double-left" />
          </span>
        </Button>
      </div>

      <!-- Previous page button -->
      <div class="pf-v6-c-pagination__nav-control pf-m-prev">
        <Button
          variant="plain"
          isDisabled={isPrevDisabled}
          aria-label={finalTitles.toPreviousPage}
          onclick={(e) => handleSetPage(currentPage - 1, e)}
        >
          <span class="pf-v6-c-button__icon">
            <Icon icon="fas fa-angle-left" />
          </span>
        </Button>
      </div>

      <!-- Page input -->
      <div class="pf-v6-c-pagination__nav-page-select">
        <span class="pf-v6-c-form-control">
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            aria-label={finalTitles.currPage}
            disabled={isDisabled}
            onchange={handlePageInputChange}
            onkeydown={handlePageInputKeydown}
          />
        </span>
        <span aria-hidden="true">{finalTitles.ofWord} {totalPages}</span>
      </div>

      <!-- Next page button -->
      <div class="pf-v6-c-pagination__nav-control pf-m-next">
        <Button
          variant="plain"
          isDisabled={isNextDisabled}
          aria-label={finalTitles.toNextPage}
          onclick={(e) => handleSetPage(currentPage + 1, e)}
        >
          <span class="pf-v6-c-button__icon">
            <Icon icon="fas fa-angle-right" />
          </span>
        </Button>
      </div>

      <!-- Last page button -->
      <div class="pf-v6-c-pagination__nav-control pf-m-last">
        <Button
          variant="plain"
          isDisabled={isLastDisabled}
          aria-label={finalTitles.toLastPage}
          onclick={(e) => handleSetPage(totalPages, e)}
        >
          <span class="pf-v6-c-button__icon">
            <Icon icon="fas fa-angle-double-right" />
          </span>
        </Button>
      </div>
    {/if}
  </nav>

  {#if children}
    {@render children()}
  {/if}
</div>

