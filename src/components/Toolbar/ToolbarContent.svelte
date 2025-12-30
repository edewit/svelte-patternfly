<script lang="ts">
  import type { ToolbarContentProps } from './types';
  import '@patternfly/patternfly/components/Toolbar/toolbar.css';

  interface Props extends ToolbarContentProps {
    id?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    id,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(['pf-v6-c-toolbar__content', className].filter(Boolean).join(' '));
</script>

<div class={classes} {id} {...restProps}>
  {@render children?.()}
</div>

