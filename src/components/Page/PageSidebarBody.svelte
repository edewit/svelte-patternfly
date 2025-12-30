<script lang="ts">
  import type { PageSidebarBodyProps } from './types';
  import '@patternfly/patternfly/components/Page/page.css';

  interface Props extends PageSidebarBodyProps {
    usePageInsets?: boolean;
    isFilled?: boolean;
    id?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    usePageInsets = false,
    isFilled,
    id,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(
    [
      'pf-v6-c-page__sidebar-body',
      usePageInsets && 'pf-m-inset',
      isFilled && 'pf-m-fill',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {id} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>

