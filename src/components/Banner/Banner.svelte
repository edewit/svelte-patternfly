<script lang="ts">
  import type { BannerProps, BannerColorVariant, BannerStatusVariant } from './types';
  import '@patternfly/patternfly/components/Banner/banner.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends BannerProps {
    colorVariant?: BannerColorVariant;
    statusVariant?: BannerStatusVariant;
    isSticky?: boolean;
    screenReaderText?: string;
    customIcon?: string;
    id?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    colorVariant,
    statusVariant,
    isSticky = false,
    screenReaderText,
    customIcon,
    id,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Generate ID for accessibility
  const bannerId = $derived(id || `banner-${Math.random().toString(36).substring(2, 11)}`);

  // Get default icon based on status variant
  const defaultIcon = $derived.by(() => {
    if (customIcon) return customIcon;
    if (!statusVariant) return null;

    switch (statusVariant) {
      case 'success':
        return 'fas fa-fw fa-check-circle';
      case 'warning':
        return 'fas fa-fw fa-exclamation-triangle';
      case 'danger':
        return 'fas fa-fw fa-exclamation-circle';
      case 'info':
        return 'fas fa-fw fa-info-circle';
      case 'custom':
        return null;
      default:
        return null;
    }
  });

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-banner',
      colorVariant && colorVariant !== 'default' && `pf-m-${colorVariant}`,
      statusVariant && `pf-m-${statusVariant}`,
      isSticky && 'pf-m-sticky',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} id={bannerId} {...restProps}>
  {#if screenReaderText}
    <span class="pf-v6-screen-reader">{screenReaderText}</span>
  {/if}

  {#if defaultIcon}
    <div class="pf-v6-c-banner__icon">
      <i class={defaultIcon} aria-hidden="true"></i>
    </div>
  {/if}

  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
