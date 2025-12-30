<script lang="ts">
  import type { AlertProps, AlertVariant } from './types';
  import Icon from '../Icon/Icon.svelte';
  import CheckCircleIcon from '../Icon/icons/CheckCircleIcon.svelte';
  import ExclamationTriangleIcon from '../Icon/icons/ExclamationTriangleIcon.svelte';
  import ExclamationCircleIcon from '../Icon/icons/ExclamationCircleIcon.svelte';
  import InfoCircleIcon from '../Icon/icons/InfoCircleIcon.svelte';
  import AngleRightIcon from '../Icon/icons/AngleRightIcon.svelte';
  import TimesIcon from '../Icon/icons/TimesIcon.svelte';
  import '@patternfly/patternfly/components/Alert/alert.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends AlertProps {
    variant?: AlertVariant;
    isInline?: boolean;
    isPlain?: boolean;
    isExpandable?: boolean;
    isExpanded?: boolean;
    isTruncate?: boolean;
    title?: string;
    titleScreenReader?: string;
    customIcon?: string;
    showClose?: boolean;
    onClose?: () => void;
    onExpand?: (_expanded: boolean) => void;
    id?: string;
    'aria-label'?: string;
    'aria-live'?: 'polite' | 'assertive' | 'off';
    'aria-atomic'?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    titleSlot?: import('svelte').Snippet;
    descriptionSlot?: import('svelte').Snippet;
    actionSlot?: import('svelte').Snippet;
    actionGroupSlot?: import('svelte').Snippet;
    iconSlot?: import('svelte').Snippet;
  }

  let {
    variant = 'info',
    isInline = false,
    isPlain = false,
    isExpandable = false,
    isExpanded: initialExpanded = false,
    isTruncate = false,
    title,
    titleScreenReader,
    customIcon,
    showClose = false,
    onClose,
    onExpand,
    id,
    'aria-label': ariaLabel,
    'aria-live': ariaLive = 'polite',
    'aria-atomic': ariaAtomic = true,
    class: className = '',
    children,
    titleSlot,
    descriptionSlot,
    actionSlot,
    actionGroupSlot,
    iconSlot,
    ...restProps
  }: Props = $props();

  let isExpanded = $state(initialExpanded);

  // Generate IDs for accessibility
  const alertId = $derived(id || `alert-${Math.random().toString(36).substring(2, 11)}`);
  const titleId = $derived(`${alertId}-title`);
  const toggleId = $derived(`${alertId}-toggle`);

  // Check if we should show default icon
  const shouldShowDefaultIcon = $derived(
    !iconSlot && !customIcon && variant !== 'custom' && variant !== 'default'
  );

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-alert',
      variant !== 'custom' && `pf-m-${variant}`,
      isInline && 'pf-m-inline',
      isPlain && 'pf-m-plain',
      isExpandable && 'pf-m-expandable',
      isExpanded && 'pf-m-expanded',
      isTruncate && 'pf-m-truncate',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  function toggleExpand() {
    isExpanded = !isExpanded;
    onExpand?.(isExpanded);
  }

  function handleClose() {
    onClose?.();
  }

  // Build close button aria-label
  const closeAriaLabel = $derived(() => {
    if (title) {
      return `Close ${variant} alert: ${title}`;
    }
    return `Close ${variant} alert`;
  });
</script>

<div
  class={classes}
  role="alert"
  aria-label={ariaLabel}
  aria-live={ariaLive}
  aria-atomic={ariaAtomic}
  id={alertId}
  {...restProps}
>
  {#if isExpandable}
    <div class="pf-v6-c-alert__toggle">
      <button
        class="pf-v6-c-button pf-m-plain"
        id={toggleId}
        type="button"
        aria-expanded={isExpanded}
        aria-labelledby={titleId + ' ' + toggleId}
        aria-label="Details"
        onclick={toggleExpand}
      >
        <span class="pf-v6-c-button__icon">
          <span class="pf-v6-c-alert__toggle-icon">
            <Icon size="sm">
              <AngleRightIcon />
            </Icon>
          </span>
        </span>
      </button>
    </div>
  {/if}

  {#if iconSlot || customIcon || shouldShowDefaultIcon}
    <div class="pf-v6-c-alert__icon">
      {#if iconSlot}
        {@render iconSlot()}
      {:else if customIcon}
        <Icon icon={customIcon} />
      {:else if variant === 'success'}
        <Icon>
          <CheckCircleIcon />
        </Icon>
      {:else if variant === 'warning'}
        <Icon>
          <ExclamationTriangleIcon />
        </Icon>
      {:else if variant === 'danger'}
        <Icon>
          <ExclamationCircleIcon />
        </Icon>
      {:else if variant === 'info'}
        <Icon>
          <InfoCircleIcon />
        </Icon>
      {/if}
    </div>
  {/if}

  {#if titleSlot || title}
    <p class="pf-v6-c-alert__title" id={titleId}>
      {#if titleScreenReader}
        <span class="pf-v6-screen-reader">{titleScreenReader}</span>
      {/if}
      {#if titleSlot}
        {@render titleSlot()}
      {:else}
        {title}
      {/if}
    </p>
  {/if}

  {#if showClose}
    <div class="pf-v6-c-alert__action">
      <button
        class="pf-v6-c-button pf-m-plain"
        type="button"
        aria-label={closeAriaLabel()}
        onclick={handleClose}
      >
        <span class="pf-v6-c-button__icon">
          <Icon size="sm">
            <TimesIcon />
          </Icon>
        </span>
      </button>
    </div>
  {/if}

  {#if descriptionSlot}
    <div class="pf-v6-c-alert__description" hidden={isExpandable && !isExpanded}>
      <p>
        {@render descriptionSlot()}
      </p>
    </div>
  {/if}

  {#if actionGroupSlot}
    <div class="pf-v6-c-alert__action-group">
      {@render actionGroupSlot()}
    </div>
  {:else if actionSlot}
    <div class="pf-v6-c-alert__action">
      {@render actionSlot()}
    </div>
  {/if}

  {#if isExpandable && children}
    <div class="pf-v6-c-alert__expandable-content" hidden={!isExpanded}>
      <div class="pf-v6-c-alert__expandable-content-body">
        {@render children()}
      </div>
    </div>
  {:else if children && !isExpandable}
    {@render children()}
  {/if}
</div>
