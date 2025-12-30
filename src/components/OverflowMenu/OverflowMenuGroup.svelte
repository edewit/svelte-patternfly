<script lang="ts">
  import type { OverflowMenuGroupProps } from './types';
  import '@patternfly/patternfly/components/OverflowMenu/overflow-menu.css';

  interface Props extends OverflowMenuGroupProps {
    groupType?: 'button' | 'icon';
    isPersistent?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    groupType,
    isPersistent = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-overflow-menu__group',
      groupType && `pf-m-${groupType}-group`,
      isPersistent && 'pf-m-persistent',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>

