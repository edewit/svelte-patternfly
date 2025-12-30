<script lang="ts">
  import type { MastheadBrandProps } from './types';
  import '@patternfly/patternfly/components/Masthead/masthead.css';

  interface Props extends MastheadBrandProps {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(['pf-v6-c-masthead__brand', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>

