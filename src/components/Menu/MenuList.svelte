<script lang="ts">
  import type { MenuListProps } from './types';
  import '@patternfly/patternfly/components/Menu/menu.css';

  interface Props extends MenuListProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    class: className = '',
    children
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-menu__list', className].filter(Boolean).join(' ')
  );
</script>

<ul class={classes} role="menu">
  {@render children?.()}
</ul>







