<script lang="ts">
  import type { CaptionProps } from './types';

  interface Props extends CaptionProps {
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-table__caption', className].filter(Boolean).join(' '));
</script>

<caption class={classes} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</caption>
