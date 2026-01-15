<script lang="ts">
  import type { ThProps, ThSortType, ThInfoType, SortDirection } from './types';
  import '@patternfly/patternfly/components/Table/table.css';
  import '@patternfly/patternfly/components/Tooltip/tooltip.css';
  import '@patternfly/patternfly/components/Popover/popover.css';

  interface Props extends ThProps {
    sort?: ThSortType;
    info?: ThInfoType;
    scope?: 'col' | 'row';
    textCenter?: boolean;
    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    isSubheader?: boolean;
    colSpan?: number;
    rowSpan?: number;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    sort,
    info,
    scope = 'col',
    textCenter = false,
    width,
    minWidth,
    maxWidth,
    isSubheader = false,
    colSpan,
    rowSpan,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  let showTooltip = $state(false);
  let showPopover = $state(false);

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-table__th',
      textCenter && 'pf-m-center',
      sort && 'pf-v6-c-table__sort',
      sort?.sortBy && sort.sortBy !== 'none' && 'pf-m-selected',
      isSubheader && 'pf-m-subhead',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build inline styles
  const styles = $derived(
    [
      width && `width: ${typeof width === 'number' ? `${width}px` : width}`,
      minWidth && `min-width: ${typeof minWidth === 'number' ? `${minWidth}px` : minWidth}`,
      maxWidth && `max-width: ${typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth}`
    ]
      .filter(Boolean)
      .join('; ')
  );

  // Handle sort click
  function handleSortClick(event: MouseEvent) {
    if (sort?.onSort && sort.columnIndex !== undefined) {
      const newDirection: SortDirection =
        sort.sortBy === 'asc' ? 'desc' : sort.sortBy === 'desc' ? 'none' : 'asc';
      sort.onSort(event, sort.columnIndex, newDirection);
    }
  }

  // Handle info button click
  function handleInfoClick() {
    if (info?.popover) {
      showPopover = !showPopover;
    }
  }

  // Handle info button hover
  function handleInfoMouseEnter() {
    if (info?.tooltip) {
      showTooltip = true;
    }
  }

  function handleInfoMouseLeave() {
    showTooltip = false;
  }
</script>

<th
  class={classes}
  role="columnheader"
  {scope}
  colspan={colSpan}
  rowspan={rowSpan}
  style={styles || undefined}
  aria-sort={sort?.sortBy === 'asc' ? 'ascending' : sort?.sortBy === 'desc' ? 'descending' : undefined}
  {...restProps}
>
  {#if sort}
    <button class="pf-v6-c-table__button" type="button" onclick={handleSortClick}>
      <div class="pf-v6-c-table__button-content">
        <span class="pf-v6-c-table__text">
          {#if typeof children === 'string'}
            {children}
          {:else if children}
            {@render children()}
          {/if}
        </span>
        <span class="pf-v6-c-table__sort-indicator">
          <svg
            class="pf-v6-c-table__sort-indicator-icon"
            fill="currentColor"
            height="1em"
            width="1em"
            viewBox="0 0 256 512"
            aria-hidden="true"
            role="img"
          >
            {#if sort.sortBy === 'asc'}
              <path d="M214.059 377.941H168V134.059h46.059c21.382 0 32.09-25.851 16.971-40.971L144.971 7.029c-9.373-9.373-24.568-9.373-33.941 0L24.971 93.088c-15.119 15.119-4.411 40.971 16.971 40.971H88v243.882H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.568 9.373 33.941 0l86.059-86.059c15.12-15.119 4.412-40.971-16.97-40.971z" />
            {:else if sort.sortBy === 'desc'}
              <path d="M41.941 134.059H88v243.882H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.568 9.373 33.941 0l86.059-86.059c15.119-15.119 4.411-40.971-16.971-40.971H168V134.059h46.059c21.382 0 32.09-25.851 16.971-40.971L144.971 7.029c-9.373-9.373-24.568-9.373-33.941 0L24.971 93.088c-15.119 15.119-4.411 40.971 16.971 40.971z" />
            {:else}
              <path d="M214.059 377.941H168V134.059h46.059c21.382 0 32.09-25.851 16.971-40.971L144.971 7.029c-9.373-9.373-24.568-9.373-33.941 0L24.971 93.088c-15.119 15.119-4.411 40.971 16.971 40.971H88v243.882H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.568 9.373 33.941 0l86.059-86.059c15.12-15.119 4.412-40.971-16.97-40.971z" />
            {/if}
          </svg>
        </span>
      </div>
    </button>
  {:else}
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  {/if}

  {#if info}
    <span class="pf-v6-c-table__column-help {info.className || ''}" style="position: relative;">
      <button
        class="pf-v6-c-button pf-m-plain pf-m-small"
        type="button"
        aria-label={info.ariaLabel || 'More info'}
        onclick={handleInfoClick}
        onmouseenter={handleInfoMouseEnter}
        onmouseleave={handleInfoMouseLeave}
      >
        <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512" aria-hidden="true" role="img">
          <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" />
        </svg>
      </button>

      {#if info.tooltip && showTooltip}
        <div
          class="pf-v6-c-tooltip pf-m-top"
          role="tooltip"
          style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px; white-space: nowrap; z-index: 1000; {info.tooltipProps?.isContentLeftAligned ? 'text-align: left;' : ''}"
        >
          <div class="pf-v6-c-tooltip__arrow"></div>
          <div class="pf-v6-c-tooltip__content">{info.tooltip}</div>
        </div>
      {/if}

      {#if info.popover && showPopover}
        <div
          class="pf-v6-c-popover pf-m-top"
          role="dialog"
          aria-modal="true"
          style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px; z-index: 1000;"
        >
          <div class="pf-v6-c-popover__arrow"></div>
          <div class="pf-v6-c-popover__content">
            {#if info.popoverProps?.headerContent}
              <header class="pf-v6-c-popover__header">
                <h1 class="pf-v6-c-popover__title">{info.popoverProps.headerContent}</h1>
              </header>
            {/if}
            <div class="pf-v6-c-popover__body">
              {@render info.popover()}
            </div>
            {#if info.popoverProps?.footerContent}
              <footer class="pf-v6-c-popover__footer">
                {@render info.popoverProps.footerContent()}
              </footer>
            {/if}
          </div>
        </div>
      {/if}
    </span>
  {/if}
</th>
