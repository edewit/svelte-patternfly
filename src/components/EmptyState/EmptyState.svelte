<script lang="ts">
  import type {
    EmptyStateProps,
    EmptyStateVariant,
    EmptyStateStatus,
    EmptyStateHeadingLevel
  } from './types';
  import Icon from '../Icon/Icon.svelte';
  import CheckCircleIcon from '../Icon/icons/CheckCircleIcon.svelte';
  import ExclamationTriangleIcon from '../Icon/icons/ExclamationTriangleIcon.svelte';
  import ExclamationCircleIcon from '../Icon/icons/ExclamationCircleIcon.svelte';
  import InfoCircleIcon from '../Icon/icons/InfoCircleIcon.svelte';
  import '@patternfly/patternfly/components/EmptyState/empty-state.css';

  interface Props extends EmptyStateProps {
    id?: string;
    class?: string;
    headerClassName?: string;
    titleClassName?: string;
    titleText?: string | import('svelte').Snippet;
    headingLevel?: EmptyStateHeadingLevel;
    icon?: string | import('svelte').Snippet;
    variant?: EmptyStateVariant;
    status?: EmptyStateStatus;
    isFullHeight?: boolean;
    children?: import('svelte').Snippet;
    bodySlot?: import('svelte').Snippet | string;
    footerSlot?: import('svelte').Snippet | string;
  }

  let {
    id,
    class: className = '',
    headerClassName = '',
    titleClassName = '',
    titleText,
    headingLevel = 'h4',
    icon,
    variant = 'full',
    status,
    isFullHeight = false,
    children,
    bodySlot,
    footerSlot,
    ...restProps
  }: Props = $props();

  // Generate ID for accessibility
  const emptyStateId = $derived(id || `empty-state-${Math.random().toString(36).substring(2, 11)}`);

  // Get default icon component based on status
  const defaultIconComponent = $derived.by(() => {
    if (icon) return null; // User-provided icon takes precedence
    if (!status) return null;

    switch (status) {
      case 'success':
        return CheckCircleIcon;
      case 'warning':
        return ExclamationTriangleIcon;
      case 'danger':
        return ExclamationCircleIcon;
      case 'info':
        return InfoCircleIcon;
      case 'custom':
        return null;
      default:
        return null;
    }
  });

  // Determine if icon is a string (Font Awesome class) or a component (Snippet)
  const iconIsString = $derived(icon && typeof icon === 'string');
  const hasIcon = $derived(icon || defaultIconComponent);

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-empty-state',
      variant !== 'full' && `pf-m-${variant}`,
      status && `pf-m-${status}`,
      isFullHeight && 'pf-m-full-height',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  const headerClasses = $derived(
    ['pf-v6-c-empty-state__header', headerClassName].filter(Boolean).join(' ')
  );

  const titleClasses = $derived(
    ['pf-v6-c-empty-state__title', titleClassName].filter(Boolean).join(' ')
  );

  // Get the heading element tag
  const HeadingTag = $derived(headingLevel);
</script>

<div class={classes} id={emptyStateId} {...restProps}>
  <div class="pf-v6-c-empty-state__content">
    {#if hasIcon || titleText}
      <div class={headerClasses}>
        {#if hasIcon}
          <div class="pf-v6-c-empty-state__icon">
            {#if iconIsString}
              <Icon icon={icon} />
            {:else if icon}
              <Icon>
                {@render icon()}
              </Icon>
            {:else if defaultIconComponent}
              <Icon>
                <svelte:component this={defaultIconComponent} />
              </Icon>
            {/if}
          </div>
        {/if}
        {#if titleText}
          <div class={titleClasses}>
            <svelte:element this={HeadingTag} class="pf-v6-c-empty-state__title-text">
              {#if typeof titleText === 'string'}
                {titleText}
              {:else}
                {@render titleText()}
              {/if}
            </svelte:element>
          </div>
        {/if}
      </div>
    {/if}

    {#if bodySlot}
      <div class="pf-v6-c-empty-state__body">
        {#if typeof bodySlot === 'string'}
          {bodySlot}
        {:else}
          {@render bodySlot()}
        {/if}
      </div>
    {/if}

    {#if footerSlot}
      <div class="pf-v6-c-empty-state__footer">
        {#if typeof footerSlot === 'string'}
          {footerSlot}
        {:else}
          {@render footerSlot()}
        {/if}
      </div>
    {/if}

    {@render children?.()}
  </div>
</div>
