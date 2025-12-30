<script lang="ts">
  import type { DropdownItemProps } from './types';
  import { getContext } from 'svelte';
  import '@patternfly/patternfly/components/Menu/menu.css';
  import '@patternfly/patternfly/components/Tooltip/tooltip.css';

  interface Props extends DropdownItemProps {
    value?: string | number;
    isDisabled?: boolean;
    isAriaDisabled?: boolean;
    to?: string;
    href?: string;
    component?: 'a' | 'button';
    description?: string;
    tooltipProps?: {
      content?: string;
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    onClick?: (event: MouseEvent) => void;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    value,
    isDisabled = false,
    isAriaDisabled = false,
    to,
    href,
    component,
    description,
    tooltipProps,
    onClick,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get dropdown select handler from context
  const handleSelect = getContext<(event: MouseEvent, value?: string | number) => void>('dropdown-select');

  // Determine component type
  const tag = $derived.by(() => {
    if (component) return component;
    if (to || href) return 'a';
    return 'button';
  });

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-menu__item',
      isDisabled && 'pf-m-disabled',
      isAriaDisabled && 'pf-m-aria-disabled',
      description && 'pf-m-description',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  const tooltipClasses = $derived(
    tooltipProps
      ? ['pf-v6-c-tooltip', `pf-m-${tooltipProps.position || 'top'}`].filter(Boolean).join(' ')
      : ''
  );

  // Tooltip state
  let showTooltip = $state(false);

  function handleClick(event: MouseEvent) {
    if (isDisabled || (isAriaDisabled && !tooltipProps)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (isAriaDisabled && tooltipProps) {
      event.preventDefault();
      event.stopPropagation();
      showTooltip = true;
      setTimeout(() => {
        showTooltip = false;
      }, 2000);
      return;
    }

    // Call custom onClick if provided
    if (onClick) {
      onClick(event);
    }

    // Call dropdown select handler
    if (handleSelect && !event.defaultPrevented) {
      handleSelect(event, value);
    }
  }

  function handleMouseEnter() {
    if (isAriaDisabled && tooltipProps) {
      showTooltip = true;
    }
  }

  function handleMouseLeave() {
    if (isAriaDisabled && tooltipProps) {
      showTooltip = false;
    }
  }

  const linkHref = $derived(isDisabled || isAriaDisabled ? undefined : (to || href));
</script>

<li class="pf-v6-c-menu__list-item" role="none">
  {#if tag === 'a'}
    <a
      class={classes}
      href={linkHref}
      role="menuitem"
      aria-disabled={isAriaDisabled ? 'true' : undefined}
      onclick={handleClick}
      onmouseenter={handleMouseEnter}
      onmouseleave={handleMouseLeave}
      {...restProps}
    >
      <span class="pf-v6-c-menu__item-text">
        {#if typeof children === 'string'}
          {children}
        {:else if children}
          {@render children()}
        {/if}
      </span>
      {#if description}
        <span class="pf-v6-c-menu__item-description">{description}</span>
      {/if}
      {#if tooltipProps && showTooltip}
        <div class={tooltipClasses} role="tooltip" style="display: block;">
          <div class="pf-v6-c-tooltip__arrow"></div>
          <div class="pf-v6-c-tooltip__content">
            {tooltipProps.content}
          </div>
        </div>
      {/if}
    </a>
  {:else}
    <button
      class={classes}
      type="button"
      role="menuitem"
      disabled={isDisabled}
      aria-disabled={isAriaDisabled ? 'true' : undefined}
      onclick={handleClick}
      onmouseenter={handleMouseEnter}
      onmouseleave={handleMouseLeave}
      {...restProps}
    >
      <span class="pf-v6-c-menu__item-text">
        {#if typeof children === 'string'}
          {children}
        {:else if children}
          {@render children()}
        {/if}
      </span>
      {#if description}
        <span class="pf-v6-c-menu__item-description">{description}</span>
      {/if}
      {#if tooltipProps && showTooltip}
        <div class={tooltipClasses} role="tooltip" style="display: block;">
          <div class="pf-v6-c-tooltip__arrow"></div>
          <div class="pf-v6-c-tooltip__content">
            {tooltipProps.content}
          </div>
        </div>
      {/if}
    </button>
  {/if}
</li>

