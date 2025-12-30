<script lang="ts">
  import type { ToolbarProps } from './types';
  import '@patternfly/patternfly/components/Toolbar/toolbar.css';

  interface Props extends ToolbarProps {
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

  const classes = $derived(['pf-v6-c-toolbar', className].filter(Boolean).join(' '));
</script>

<div class={classes} {id} {...restProps}>
  {@render children?.()}
</div>

