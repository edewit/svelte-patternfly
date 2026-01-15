<script lang="ts">
  import type { TbodyProps } from './types';

  interface Props extends TbodyProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-table__tbody', className].filter(Boolean).join(' '));
</script>

<tbody class={classes} role="rowgroup" {...restProps}>
  {@render children?.()}
</tbody>
