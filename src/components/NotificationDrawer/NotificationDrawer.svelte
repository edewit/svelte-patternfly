<script lang="ts">
  import type { NotificationDrawerProps } from './types';
  import '@patternfly/patternfly/components/NotificationDrawer/notification-drawer.css';

  interface Props extends NotificationDrawerProps {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-notification-drawer', className]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>

