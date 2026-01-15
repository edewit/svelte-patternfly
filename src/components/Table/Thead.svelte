<script lang="ts">
  import type { TheadProps } from './types';

  interface Props extends TheadProps {
    noWrap?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { noWrap = false, class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-table__thead', noWrap && 'pf-m-nowrap', className].filter(Boolean).join(' ')
  );
</script>

<thead class={classes} {...restProps}>
  {@render children?.()}
</thead>
