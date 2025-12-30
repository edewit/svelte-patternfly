<script lang="ts">
  import type { HintTitleProps } from './types';
  import '@patternfly/patternfly/components/Hint/hint.css';

  interface Props extends HintTitleProps {
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  const classes = $derived(['pf-v6-c-hint__title', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
