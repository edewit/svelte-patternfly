<script lang="ts">
  import type { ToolbarGroupProps, ToolbarGroupVariant } from './types';

  interface Props extends ToolbarGroupProps {
    id?: string;
    className?: string;
    class?: string;
    align?: { default?: 'alignStart' | 'alignEnd' | 'alignStartWithConsumers' | 'alignEndWithConsumers' };
    variant?: ToolbarGroupVariant;
    children?: import('svelte').Snippet;
  }

  let {
    id,
    className = '',
    class: classProp = '',
    align,
    variant,
    children,
    ...restProps
  }: Props = $props();

  // Map variant to CSS modifier class
  const variantClass = $derived.by(() => {
    if (!variant) return null;
    const variantMap: Record<string, string> = {
      'filter-group': 'pf-m-filter-group',
      'action-group': 'pf-m-action-group',
      'action-group-inline': 'pf-m-action-group-inline',
      'action-group-plain': 'pf-m-action-group-plain',
      'label-group': 'pf-m-label-group'
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
      'pf-v6-c-toolbar__group',
      variantClass,
      alignClass,
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {id} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>
