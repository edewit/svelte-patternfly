<script lang="ts">
  import type { NotificationDrawerHeaderProps } from './types';
  import Button from '../Button/Button.svelte';
  import TimesIcon from '../Icon/icons/TimesIcon.svelte';
  import Icon from '../Icon/Icon.svelte';
  import '@patternfly/patternfly/components/NotificationDrawer/notification-drawer.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends NotificationDrawerHeaderProps {
    count?: number;
    onClose?: (event: MouseEvent | KeyboardEvent) => void;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    count,
    onClose,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-notification-drawer__header', className]
      .filter(Boolean)
      .join(' ')
  );

  function handleClose(event: MouseEvent | KeyboardEvent) {
    if (onClose) {
      onClose(event);
    }
  }
</script>

<div class={classes} {...restProps}>
  <h1 class="pf-v6-c-notification-drawer__header-title">Notifications</h1>
  {#if count !== undefined}
    <span class="pf-v6-c-notification-drawer__header-status">{count} unread</span>
  {/if}
  <div class="pf-v6-c-notification-drawer__header-action">
    {#if children}
      {@render children()}
    {/if}
    {#if onClose}
      <div class="pf-v6-c-notification-drawer__header-action-close">
        <Button variant="plain" aria-label="Close" onclick={handleClose}>
          <span class="pf-v6-c-button__icon">
            <Icon size="sm">
              <TimesIcon />
            </Icon>
          </span>
        </Button>
      </div>
    {/if}
  </div>
</div>

