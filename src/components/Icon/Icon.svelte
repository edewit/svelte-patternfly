<script lang="ts">
  import type { IconProps, IconSize, IconStatus } from './types';
  import '@patternfly/patternfly/components/Icon/icon.css';
  import '@patternfly/patternfly/components/Spinner/spinner.css';

  interface Props extends IconProps {
    size?: IconSize;
    iconSize?: IconSize;
    status?: IconStatus;
    isInline?: boolean;
    isInProgress?: boolean;
    progressIcon?: import('svelte').Snippet;
    progressIconSize?: IconSize;
    shouldMirrorRTL?: boolean;
    defaultProgressArialabel?: string;
    class?: string;
    children?: import('svelte').Snippet;
    icon?: string; // Icon class string (e.g., "fas fa-cog")
  }

  let {
    size = 'md',
    iconSize,
    status,
    isInline = false,
    isInProgress = false,
    progressIcon,
    progressIconSize,
    shouldMirrorRTL = false,
    defaultProgressArialabel = 'Loading...',
    class: className = '',
    children,
    icon,
    ...restProps
  }: Props = $props();

  // Build CSS classes for the icon container
  const containerClasses = $derived(
    [
      'pf-v6-c-icon',
      size !== 'md' && `pf-m-${size}`,
      isInline && 'pf-m-inline',
      isInProgress && 'pf-m-in-progress',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build CSS classes for the icon content
  const contentClasses = $derived(
    [
      'pf-v6-c-icon__content',
      iconSize && iconSize !== size && `pf-m-${iconSize}`,
      status && `pf-m-${status}`
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Apply RTL mirroring via style if needed
  const contentStyle = $derived(
    shouldMirrorRTL ? 'transform: scaleX(-1);' : ''
  );

  // Determine which icon content to show
  const hasIconClass = $derived(!!icon);
  const hasIconSnippet = $derived(!!children);

  // Build CSS classes for the progress icon
  const progressClasses = $derived(
    [
      'pf-v6-c-icon__progress',
      progressIconSize && progressIconSize !== size && `pf-m-${progressIconSize}`
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Default spinner SVG for progress state
  const defaultSpinnerSize = $derived(() => {
    if (progressIconSize) {
      const sizeMap: Record<IconSize, string> = {
        sm: '0.75rem',
        md: '0.875rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '3.5rem',
        '3xl': '6rem',
        headingSm: '1rem',
        headingMd: '1rem',
        headingLg: '1rem',
        headingXl: '1.125rem',
        heading_2xl: '1.25rem',
        heading_3xl: '1.5rem',
        bodySm: '0.75rem',
        bodyDefault: '0.875rem',
        bodyLg: '1rem'
      };
      return sizeMap[progressIconSize] || '1em';
    }
    if (isInline) {
      return '1em';
    }
    const sizeMap: Record<IconSize, string> = {
      sm: '0.75rem',
      md: '0.875rem',
      lg: '1rem',
      xl: '1.5rem',
      '2xl': '3.5rem',
      '3xl': '6rem',
      headingSm: '1rem',
      headingMd: '1rem',
      headingLg: '1rem',
      headingXl: '1.125rem',
      heading_2xl: '1.25rem',
      heading_3xl: '1.5rem',
      bodySm: '0.75rem',
      bodyDefault: '0.875rem',
      bodyLg: '1rem'
    };
    return sizeMap[size] || '0.875rem';
  });
</script>

<span class={containerClasses} {...restProps}>
  <span class={contentClasses} style={contentStyle}>
    {#if isInProgress}
      <!-- Progress icon is shown, content is hidden via CSS -->
      <span style="opacity: 0;" aria-hidden="true">
        {#if hasIconClass}
          <i class={icon} aria-hidden="true"></i>
        {:else if hasIconSnippet}
          {@render children?.()}
        {/if}
      </span>
    {:else}
      {#if hasIconClass}
        <i class={icon} aria-hidden="true"></i>
      {:else if hasIconSnippet}
        {@render children?.()}
      {/if}
    {/if}
  </span>
  {#if isInProgress}
    <span class={progressClasses}>
      {#if progressIcon}
        {@render progressIcon()}
      {:else}
        <!-- Default spinner -->
        <svg
          class="pf-v6-c-spinner"
          role="progressbar"
          viewBox="0 0 100 100"
          aria-label={defaultProgressArialabel}
          style="width: {defaultSpinnerSize()}; height: {defaultSpinnerSize()};"
        >
          <circle class="pf-v6-c-spinner__path" cx="50" cy="50" r="45" fill="none" />
        </svg>
      {/if}
    </span>
  {/if}
</span>


