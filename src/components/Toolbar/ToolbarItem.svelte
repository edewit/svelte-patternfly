<script lang="ts">
  import type { ToolbarItemProps, ToolbarItemVariant } from './types';
  import '@patternfly/patternfly/components/Divider/divider.css';

  interface Props extends ToolbarItemProps {
    id?: string;
    className?: string;
    class?: string;
    align?: { default?: 'alignStart' | 'alignEnd' | 'alignStartWithConsumers' | 'alignEndWithConsumers' };
    isAllExpanded?: boolean;
    isOverflowContainer?: boolean;
    variant?: ToolbarItemVariant;
    widths?: { default?: string; sm?: string; md?: string; lg?: string; xl?: string; '2xl'?: string };
    children?: import('svelte').Snippet;
  }

  let {
    id,
    className = '',
    class: classProp = '',
    align,
    isAllExpanded = false,
    isOverflowContainer = false,
    variant,
    widths,
    children,
    ...restProps
  }: Props = $props();

  // Map variant to CSS modifier class
  const variantClass = $derived.by(() => {
    if (!variant || variant === 'separator') return null;
    const variantMap: Record<string, string> = {
      'bulk-select': 'pf-m-bulk-select',
      'overflow-menu': 'pf-m-overflow-menu',
      'pagination': 'pf-m-pagination',
      'search-filter': 'pf-m-search-filter',
      'label': 'pf-m-label',
      'chip-group': 'pf-m-chip-group',
      'expand-all': 'pf-m-expand-all'
    };
    return variantMap[variant] || null;
  });

  // Map align to CSS modifier class
  const alignClass = $derived.by(() => {
    if (!align?.default) return null;
    const alignMap: Record<string, string> = {
      'alignStart': 'pf-m-align-start',
      'alignEnd': 'pf-m-align-end',
      'alignStartWithConsumers': 'pf-m-align-start',
      'alignEndWithConsumers': 'pf-m-align-end'
    };
    return alignMap[align.default] || null;
  });

  const classes = $derived(
    [
      'pf-v6-c-toolbar__item',
      variantClass,
      alignClass,
      isOverflowContainer && 'pf-m-overflow-container',
      isAllExpanded && 'pf-m-all-expanded',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build width styles
  const widthStyles = $derived.by(() => {
    if (!widths) return undefined;
    const styles: string[] = [];
    if (widths.default) styles.push(`--pf-v6-c-toolbar__item--Width: ${widths.default}`);
    if (widths.sm) styles.push(`--pf-v6-c-toolbar__item--Width-on-sm: ${widths.sm}`);
    if (widths.md) styles.push(`--pf-v6-c-toolbar__item--Width-on-md: ${widths.md}`);
    if (widths.lg) styles.push(`--pf-v6-c-toolbar__item--Width-on-lg: ${widths.lg}`);
    if (widths.xl) styles.push(`--pf-v6-c-toolbar__item--Width-on-xl: ${widths.xl}`);
    if (widths['2xl']) styles.push(`--pf-v6-c-toolbar__item--Width-on-2xl: ${widths['2xl']}`);
    return styles.length > 0 ? styles.join('; ') : undefined;
  });

  const isSeparator = $derived(variant === 'separator');
</script>

{#if isSeparator}
  <hr class="pf-v6-c-divider pf-m-vertical" />
{:else}
  <div class={classes} {id} style={widthStyles} {...restProps}>
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
