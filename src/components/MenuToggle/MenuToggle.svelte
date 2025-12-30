<script lang="ts">
  import type { MenuToggleProps } from './types';
  import AngleDownIcon from '../Icon/icons/AngleDownIcon.svelte';
  import '@patternfly/patternfly/components/MenuToggle/menu-toggle.css';

  interface Props extends MenuToggleProps {
    isExpanded?: boolean;
    isDisabled?: boolean;
    isPlain?: boolean;
    isFullHeight?: boolean;
    isFullWidth?: boolean;
    isPlaceholder?: boolean;
    isSettings?: boolean;
    size?: 'default' | 'sm';
    variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'plain' | 'plainText' | 'typeahead';
    badge?: import('svelte').Snippet | string | number;
    icon?: import('svelte').Snippet;
    status?: 'default' | 'warning' | 'danger' | 'success';
    statusIcon?: import('svelte').Snippet;
    'aria-label'?: string;
    'aria-haspopup'?: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    'aria-controls'?: string;
    'aria-describedby'?: string;
    onClick?: (event: MouseEvent) => void;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    isExpanded = false,
    isDisabled = false,
    isPlain = false,
    isFullHeight = false,
    isFullWidth = false,
    isPlaceholder = false,
    isSettings = false,
    size = 'default',
    variant = 'default',
    badge,
    icon,
    status,
    statusIcon,
    'aria-label': ariaLabel,
    'aria-haspopup': ariaHasPopup = 'menu',
    'aria-controls': ariaControls,
    'aria-describedby': ariaDescribedBy,
    onClick,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-menu-toggle',
      isExpanded && 'pf-m-expanded',
      isDisabled && 'pf-m-disabled',
      isPlain && 'pf-m-plain',
      isFullHeight && 'pf-m-full-height',
      isFullWidth && 'pf-m-full-width',
      isPlaceholder && 'pf-m-placeholder',
      isSettings && 'pf-m-settings',
      size !== 'default' && `pf-m-${size}`,
      variant !== 'default' && `pf-m-${variant}`,
      status && `pf-m-status pf-m-${status}`,
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  function handleClick(event: MouseEvent) {
    if (!isDisabled && onClick) {
      onClick(event);
    }
  }
</script>

<button
  class={classes}
  type="button"
  aria-expanded={isExpanded}
  aria-haspopup={ariaHasPopup}
  aria-controls={ariaControls}
  aria-label={ariaLabel}
  aria-describedby={ariaDescribedBy}
  disabled={isDisabled}
  onclick={handleClick}
  {...restProps}
>
  {#if icon}
    <span class="pf-v6-c-menu-toggle__icon">
      {@render icon()}
    </span>
  {/if}
  
  {#if status && statusIcon}
    <span class="pf-v6-c-menu-toggle__status-icon">
      {@render statusIcon()}
    </span>
  {/if}

  <span class="pf-v6-c-menu-toggle__text">
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </span>

  {#if badge !== undefined}
    <span class="pf-v6-c-menu-toggle__badge">
      {#if typeof badge === 'string' || typeof badge === 'number'}
        {badge}
      {:else if badge}
        {@render badge()}
      {/if}
    </span>
  {/if}

  <span class="pf-v6-c-menu-toggle__controls">
    <span class="pf-v6-c-menu-toggle__toggle-icon">
      <AngleDownIcon />
    </span>
  </span>
</button>

