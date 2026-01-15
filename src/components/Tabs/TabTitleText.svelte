<script lang="ts">
  import type { TabTitleTextProps } from './types';

  interface Props extends TabTitleTextProps {
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
    ['pf-v6-c-tabs__item-text', className].filter(Boolean).join(' ')
  );
</script>

<span class={classes} {...restProps}>
  {@render children?.()}
</span>
