<script lang="ts">
  import type {
    DescriptionListProps,
    ColumnModifier,
    DescriptionListBreakpoint,
    DescriptionListDisplay
  } from './types';
  import '@patternfly/patternfly/components/DescriptionList/description-list.css';

  interface Props extends DescriptionListProps {
    id?: string;
    'aria-label'?: string;
    isHorizontal?: boolean;
    isCompact?: boolean;
    isFluid?: boolean;
    isColumnFill?: boolean;
    isAutoFit?: boolean;
    isAutoColumnWidth?: boolean;
    isInlineGrid?: boolean;
    display?: DescriptionListDisplay;
    columnModifier?: ColumnModifier;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    id,
    'aria-label': ariaLabel,
    isHorizontal = false,
    isCompact = false,
    isFluid = false,
    isColumnFill = false,
    isAutoFit = false,
    isAutoColumnWidth = false,
    isInlineGrid = false,
    display,
    columnModifier,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build column modifier classes
  const columnModifierClasses = $derived.by(() => {
    if (!columnModifier) return [];

    const classes: string[] = [];
    const breakpoints: DescriptionListBreakpoint[] = ['default', 'sm', 'md', 'lg', 'xl', '2xl'];

    for (const bp of breakpoints) {
      const value = columnModifier[bp];
      if (value) {
        // Convert '2Col' to '2-col' for CSS class
        const colValue = value.toLowerCase().replace('col', '-col');
        if (bp === 'default') {
          classes.push(`pf-m-${colValue}`);
        } else {
          classes.push(`pf-m-${colValue}-on-${bp}`);
        }
      }
    }

    return classes;
  });

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-description-list',
      isHorizontal && 'pf-m-horizontal',
      isCompact && 'pf-m-compact',
      isFluid && 'pf-m-fluid',
      isColumnFill && 'pf-m-column-fill',
      isAutoFit && 'pf-m-auto-fit',
      isAutoColumnWidth && 'pf-m-auto-column-width',
      isInlineGrid && 'pf-m-inline-grid',
      display && `pf-m-display-${display}`,
      ...columnModifierClasses,
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<dl class={classes} aria-label={ariaLabel} {id} {...restProps}>
  {@render children?.()}
</dl>
