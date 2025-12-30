<script lang="ts">
  import type { DrawerPanelDescriptionProps } from './types';
  import '@patternfly/patternfly/components/Drawer/drawer.css';

  interface Props extends DrawerPanelDescriptionProps {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-drawer__description', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
