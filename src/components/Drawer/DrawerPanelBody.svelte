<script lang="ts">
  import type { DrawerPanelBodyProps } from './types';
  import '@patternfly/patternfly/components/Drawer/drawer.css';

  interface Props extends DrawerPanelBodyProps {
    hasPadding?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { hasPadding = true, class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-drawer__body', !hasPadding && 'pf-m-no-padding', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
