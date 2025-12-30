<script lang="ts">
  import type { MastheadContentProps } from './types';
  import '@patternfly/patternfly/components/Masthead/masthead.css';

  interface Props extends MastheadContentProps {
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(['pf-v6-c-masthead__content', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>

