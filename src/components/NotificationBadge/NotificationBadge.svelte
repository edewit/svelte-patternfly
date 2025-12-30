<script lang="ts">
  import type { NotificationBadgeProps, NotificationBadgeVariant } from './types';
  import '@patternfly/patternfly/components/Button/button.css';
  import '@patternfly/patternfly/base/patternfly-pf-icons.css';
  import BellIcon from '../Icon/icons/BellIcon.svelte';
  import AttentionBellIcon from '../Icon/icons/AttentionBellIcon.svelte';

  interface Props extends NotificationBadgeProps {
    variant?: NotificationBadgeVariant;
    'aria-label'?: string;
    isExpanded?: boolean;
    count?: number;
    shouldNotify?: boolean;
    onClick?: (event: MouseEvent) => void;
    onAnimationEnd?: (event: AnimationEvent) => void;
    icon?: import('svelte').Snippet;
    attentionIcon?: import('svelte').Snippet;
    className?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    variant = 'read',
    'aria-label': ariaLabel,
    isExpanded = false,
    count = 0,
    shouldNotify = false,
    onClick,
    onAnimationEnd,
    icon,
    attentionIcon,
    className = '',
    class: classProp = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-button',
      'pf-m-stateful',
      `pf-m-${variant}`,
      isExpanded && 'pf-m-expanded',
      shouldNotify && 'pf-m-notify',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Determine which icon to use
  const useAttentionIcon = $derived(variant === 'attention');
  const hasCustomIcon = $derived(useAttentionIcon ? !!attentionIcon : !!icon);
  const customIcon = $derived(useAttentionIcon ? attentionIcon : icon);

  // Build icon CSS classes
  const iconClasses = $derived(
    ['pf-v6-c-button__icon', count > 0 && 'pf-m-start'].filter(Boolean).join(' ')
  );

  // Handle animation end
  function handleAnimationEnd(event: AnimationEvent) {
    if (onAnimationEnd) {
      onAnimationEnd(event);
    }
  }

  // Handle click
  function handleClick(event: MouseEvent) {
    if (onClick) {
      onClick(event);
    }
  }
</script>

<button
  class={classes}
  type="button"
  aria-expanded={isExpanded}
  aria-label={ariaLabel}
  onclick={handleClick}
  onanimationend={handleAnimationEnd}
  {...restProps}
>
  <span class={iconClasses}>
    {#if hasCustomIcon && customIcon}
      {@render customIcon()}
    {:else if useAttentionIcon}
      <AttentionBellIcon />
    {:else}
      <BellIcon />
    {/if}
  </span>
  {#if count > 0}
    <span class="pf-v6-c-button__text">{count}</span>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</button>

