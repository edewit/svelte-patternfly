<script lang="ts">
  import type { NotificationDrawerListItemBodyProps } from './types';
  import '@patternfly/patternfly/components/NotificationDrawer/notification-drawer.css';

  interface Props extends NotificationDrawerListItemBodyProps {
    timestamp?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    timestamp,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-notification-drawer__list-item-description', className]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>
{#if timestamp}
  <div class="pf-v6-c-notification-drawer__list-item-timestamp">
    {timestamp}
  </div>
{/if}

