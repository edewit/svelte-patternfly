<script lang="ts">
  import type { TdProps } from './types';

  interface Props extends TdProps {
    dataLabel?: string;
    textCenter?: boolean;
    colSpan?: number;
    rowSpan?: number;
    width?: string | number;
    compoundExpand?: {
      isExpanded?: boolean;
      onToggle?: (event: MouseEvent) => void;
    };
    select?: {
      isSelected?: boolean;
      onSelect?: (event: Event, isSelected: boolean) => void;
      isDisabled?: boolean;
      rowIndex?: number;
    };
    expand?: {
      isExpanded?: boolean;
      onToggle?: (event: MouseEvent) => void;
      rowIndex?: number;
    };
    isActionCell?: boolean;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    dataLabel,
    textCenter = false,
    colSpan,
    rowSpan,
    width,
    compoundExpand,
    select,
    expand,
    isActionCell = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-table__td',
      textCenter && 'pf-m-center',
      compoundExpand && 'pf-v6-c-table__compound-expansion-toggle',
      compoundExpand?.isExpanded && 'pf-m-expanded',
      select && 'pf-v6-c-table__check',
      expand && 'pf-v6-c-table__toggle',
      expand?.isExpanded && 'pf-m-expanded',
      isActionCell && 'pf-v6-c-table__action',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build inline styles
  const styles = $derived(
    width ? `width: ${typeof width === 'number' ? `${width}px` : width}` : ''
  );

  // Handle select change
  function handleSelectChange(event: Event) {
    if (select?.onSelect) {
      const target = event.target as HTMLInputElement;
      select.onSelect(event, target.checked);
    }
  }

  // Handle expand toggle
  function handleExpandToggle(event: MouseEvent) {
    if (expand?.onToggle) {
      expand.onToggle(event);
    }
  }

  // Handle compound expand toggle
  function handleCompoundExpandToggle(event: MouseEvent) {
    if (compoundExpand?.onToggle) {
      compoundExpand.onToggle(event);
    }
  }
</script>

<td
  class={classes}
  role="cell"
  data-label={dataLabel}
  colspan={colSpan}
  rowspan={rowSpan}
  style={styles || undefined}
  {...restProps}
>
  {#if select}
    <input
      type="checkbox"
      class="pf-v6-c-check__input"
      checked={select.isSelected}
      disabled={select.isDisabled}
      aria-label="Select row"
      onchange={handleSelectChange}
    />
  {:else if expand}
    <button
      class="pf-v6-c-button pf-m-plain"
      type="button"
      aria-label={expand.isExpanded ? 'Collapse row' : 'Expand row'}
      aria-expanded={expand.isExpanded}
      onclick={handleExpandToggle}
    >
      <svg
        class="pf-v6-c-table__toggle-icon"
        fill="currentColor"
        height="1em"
        width="1em"
        viewBox="0 0 256 512"
        aria-hidden="true"
        role="img"
        style="transition: transform 0.2s; transform: rotate({expand.isExpanded ? 90 : 0}deg);"
      >
        <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
      </svg>
    </button>
  {:else if compoundExpand}
    <button
      class="pf-v6-c-table__button"
      type="button"
      aria-expanded={compoundExpand.isExpanded}
      onclick={handleCompoundExpandToggle}
    >
      {#if typeof children === 'string'}
        {children}
      {:else if children}
        {@render children()}
      {/if}
    </button>
  {:else}
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  {/if}
</td>
