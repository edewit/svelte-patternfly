<script lang="ts">
  import type { WizardBodyProps } from './types';

  interface Props extends WizardBodyProps {
    hasNoPadding?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    hasNoPadding = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(
    [
      'pf-v6-c-wizard__main-body',
      hasNoPadding && 'pf-m-no-padding',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
