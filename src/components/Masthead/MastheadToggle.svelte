<script lang="ts">
  import type { MastheadToggleProps } from './types';
  import '@patternfly/patternfly/components/Masthead/masthead.css';

  interface Props extends MastheadToggleProps {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(['pf-v6-c-masthead__toggle', className].filter(Boolean).join(' '));
</script>

<span class={classes} {...restProps}>
  {@render children?.()}
</span>

