<script lang="ts">
  import type { TabContentBodyProps } from './types';

  interface Props extends TabContentBodyProps {
    hasPadding?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    hasPadding = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(
    [
      'pf-v6-c-tab-content__body',
      hasPadding && 'pf-m-padding',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
