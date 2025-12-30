<script lang="ts">
  import type { NotificationDrawerListProps } from './types';
  import '@patternfly/patternfly/components/NotificationDrawer/notification-drawer.css';

  interface Props extends NotificationDrawerListProps {
    'aria-label'?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    'aria-label': ariaLabel,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-notification-drawer__list', className]
      .filter(Boolean)
      .join(' ')
  );
</script>

<ul class={classes} role="list" aria-label={ariaLabel} {...restProps}>
  {@render children?.()}
</ul>

