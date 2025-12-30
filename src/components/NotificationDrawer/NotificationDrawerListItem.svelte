<script lang="ts">
  import type { NotificationDrawerListItemProps } from './types';
  import '@patternfly/patternfly/components/NotificationDrawer/notification-drawer.css';

  interface Props extends NotificationDrawerListItemProps {
    variant?: 'custom' | 'info' | 'success' | 'warning' | 'danger';
    isRead?: boolean;
    isHoverable?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    variant,
    isRead = false,
    isHoverable = true,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-notification-drawer__list-item',
      isRead && 'pf-m-read',
      isHoverable && 'pf-m-hoverable',
      variant && variant !== 'custom' && `pf-m-${variant}`,
      variant === 'custom' && 'pf-m-custom',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<li class={classes} tabindex={isRead ? undefined : 0} {...restProps}>
  {@render children?.()}
</li>

