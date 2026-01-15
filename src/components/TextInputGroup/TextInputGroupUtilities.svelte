<script lang="ts">
  import type { TextInputGroupUtilitiesProps } from './types';

  interface Props extends TextInputGroupUtilitiesProps {
    className?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    className = '',
    class: classProp = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-text-input-group__utilities', className || classProp]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>
