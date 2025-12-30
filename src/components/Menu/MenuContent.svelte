<script lang="ts">
  import type { MenuContentProps } from './types';
  import '@patternfly/patternfly/components/Menu/menu.css';

  interface Props extends MenuContentProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-menu__content', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>







