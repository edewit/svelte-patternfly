<script lang="ts">
  import type { MenuToggleProps } from './types';
  import AngleDownIcon from '../Icon/icons/AngleDownIcon.svelte';
  import '@patternfly/patternfly/components/MenuToggle/menu-toggle.css';

  interface Props extends MenuToggleProps {
    isExpanded?: boolean;
    isDisabled?: boolean;
    isPlain?: boolean;
    isFullHeight?: boolean;
    isSplitButton?: boolean;
    variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'plain';
    'aria-label'?: string;
    'aria-haspopup'?: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    'aria-controls'?: string;
    'aria-describedby'?: string;
    onClick?: () => void;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    isExpanded = false,
    isDisabled = false,
    isPlain = false,
    isFullHeight = false,
    isSplitButton = false,
    variant = 'default',
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
      isPlain && 'pf-m-plain',
      isFullHeight && 'pf-m-full-height',
      isSplitButton && 'pf-m-split-button',
      variant !== 'default' && `pf-m-${variant}`,
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  function handleClick() {
    if (!isDisabled && onClick) {
      onClick();
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
  <span class="pf-v6-c-menu-toggle__text">
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </span>
  <span class="pf-v6-c-menu-toggle__controls">
    <span class="pf-v6-c-menu-toggle__toggle-icon">
      <AngleDownIcon />
    </span>
  </span>
</button>

