<script lang="ts">
  import type { DrawerActionsProps } from './types';
  import '@patternfly/patternfly/components/Drawer/drawer.css';

  interface Props extends DrawerActionsProps {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-drawer__actions', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
