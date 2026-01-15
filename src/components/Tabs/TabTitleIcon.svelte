<script lang="ts">
  import type { TabTitleIconProps } from './types';

  interface Props extends TabTitleIconProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(
    ['pf-v6-c-tabs__item-icon', className].filter(Boolean).join(' ')
  );
</script>

<span class={classes} {...restProps}>
  {@render children?.()}
</span>
