<script lang="ts">
  import type { NotificationDrawerListItemHeaderProps } from './types';
  import Icon from '../Icon/Icon.svelte';
  import InfoCircleIcon from '../Icon/icons/InfoCircleIcon.svelte';
  import ExclamationCircleIcon from '../Icon/icons/ExclamationCircleIcon.svelte';
  import ExclamationTriangleIcon from '../Icon/icons/ExclamationTriangleIcon.svelte';
  import CheckCircleIcon from '../Icon/icons/CheckCircleIcon.svelte';
  import '@patternfly/patternfly/components/NotificationDrawer/notification-drawer.css';
  import '@patternfly/patternfly/components/Icon/icon.css';

  interface Props extends NotificationDrawerListItemHeaderProps {
    variant?: 'custom' | 'info' | 'success' | 'warning' | 'danger';
    title?: string;
    srTitle?: string;
    truncateTitle?: number;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    variant,
    title,
    srTitle,
    truncateTitle,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get default icon component based on variant
  const defaultIconComponent = $derived.by(() => {
    switch (variant) {
      case 'success':
        return CheckCircleIcon;
      case 'warning':
        return ExclamationTriangleIcon;
      case 'danger':
        return ExclamationCircleIcon;
      case 'info':
        return InfoCircleIcon;
      default:
        return null;
    }
  });

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-notification-drawer__list-item-header',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build title CSS classes
  const titleClasses = $derived(
    [
      'pf-v6-c-notification-drawer__list-item-header-title',
      truncateTitle !== undefined && 'pf-m-truncate',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build title styles for truncateTitle
  const titleStyles = $derived(
    truncateTitle !== undefined && truncateTitle > 0
      ? `--pf-v6-c-notification-drawer__list-item-header-title--max-lines: ${truncateTitle}`
      : ''
  );
</script>

<div class={classes} {...restProps}>
  {#if defaultIconComponent || variant === 'custom'}
    <span class="pf-v6-c-notification-drawer__list-item-header-icon">
      {#if defaultIconComponent}
        <Icon>
          <svelte:component this={defaultIconComponent} />
        </Icon>
      {/if}
    </span>
  {/if}
  <h2 class={titleClasses} style={titleStyles}>
    {#if srTitle}
      <span class="pf-v6-screen-reader">{srTitle}</span>
    {/if}
    {#if title}
      {title}
    {/if}
  </h2>
</div>
{#if children}
  <div class="pf-v6-c-notification-drawer__list-item-action">
    {@render children()}
  </div>
{/if}

