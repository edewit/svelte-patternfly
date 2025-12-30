<script lang="ts">
  import type { PageGroupProps } from './types';
  import '@patternfly/patternfly/components/Page/page.css';
  import { getContext } from 'svelte';

  interface Props extends PageGroupProps {
    isFilled?: boolean;
    id?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    isFilled: isFilledProp,
    id,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get context for content filled behavior
  const pageContext = getContext<{
    isContentFilled?: boolean;
  }>('page');

  // Determine if filled based on prop or context
  const isFilled = $derived(isFilledProp ?? (pageContext?.isContentFilled ?? false));

  const classes = $derived(
    [
      'pf-v6-c-page__main-group',
      isFilled && 'pf-m-fill',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<section class={classes} {id} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</section>

