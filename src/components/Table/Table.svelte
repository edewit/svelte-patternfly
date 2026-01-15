<script lang="ts">
  import type { TableProps, TableVariant, TableGridBreakpoint } from './types';
  import '@patternfly/patternfly/components/Table/table.css';

  interface Props extends TableProps {
    'aria-label'?: string;
    variant?: TableVariant;
    isBordered?: boolean;
    isBorderless?: boolean;
    isStriped?: boolean;
    isExpandable?: boolean;
    gridBreakpoint?: TableGridBreakpoint;
    isStickyHeader?: boolean;
    isNested?: boolean;
    id?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    'aria-label': ariaLabel,
    variant = 'default',
    isBordered = false,
    isBorderless = false,
    isStriped = false,
    isExpandable = false,
    gridBreakpoint = 'grid-md',
    isStickyHeader = false,
    isNested = false,
    id,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-table',
      variant === 'compact' && 'pf-m-compact',
      isBordered && 'pf-m-bordered',
      isBorderless && 'pf-m-borderless',
      isStriped && 'pf-m-striped',
      isExpandable && 'pf-m-expandable',
      gridBreakpoint && `pf-m-${gridBreakpoint}`,
      isStickyHeader && 'pf-m-sticky-header',
      isNested && 'pf-m-nested',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<table class={classes} role="grid" aria-label={ariaLabel} {id} {...restProps}>
  {@render children?.()}
</table>
