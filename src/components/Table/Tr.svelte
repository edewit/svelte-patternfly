<script lang="ts">
  import type { TrProps } from './types';

  interface Props extends TrProps {
    isSelected?: boolean;
    isExpanded?: boolean;
    isExpandableRow?: boolean;
    isHoverable?: boolean;
    isClickable?: boolean;
    onRowClick?: (event: MouseEvent) => void;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    isSelected = false,
    isExpanded,
    isExpandableRow = false,
    isHoverable = false,
    isClickable = false,
    onRowClick,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-table__tr',
      isSelected && 'pf-m-selected',
      isExpanded && 'pf-m-expanded',
      isExpandableRow && 'pf-m-expandable-row',
      isHoverable && 'pf-m-hoverable',
      isClickable && 'pf-m-clickable',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  function handleClick(event: MouseEvent) {
    if (onRowClick) {
      onRowClick(event);
    }
  }
</script>

<tr class={classes} role="row" onclick={onRowClick ? handleClick : undefined} {...restProps}>
  {@render children?.()}
</tr>
