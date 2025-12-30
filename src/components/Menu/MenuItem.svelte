<script lang="ts">
  import type { MenuItemProps } from './types';
  import { getContext } from 'svelte';
  import Menu from './Menu.svelte';
  import MenuContent from './MenuContent.svelte';
  import MenuList from './MenuList.svelte';
  import AngleRightIcon from '../Icon/icons/AngleRightIcon.svelte';
  import '@patternfly/patternfly/components/Menu/menu.css';
  import '@patternfly/patternfly/components/Tooltip/tooltip.css';

  interface Props extends MenuItemProps {
    itemId?: string | number;
    isDisabled?: boolean;
    isAriaDisabled?: boolean;
    isDanger?: boolean;
    isSelected?: boolean;
    to?: string;
    href?: string;
    component?: 'a' | 'button';
    description?: string;
    icon?: import('svelte').Snippet;
    tooltipProps?: {
      content?: string;
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    submenu?: import('svelte').Snippet;
    isExpanded?: boolean;
    onToggle?: (event: MouseEvent, isExpanded: boolean) => void;
    onClick?: (event: MouseEvent) => void;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    itemId,
    isDisabled = false,
    isAriaDisabled = false,
    isDanger = false,
    isSelected: isSelectedProp,
    to,
    href,
    component,
    description,
    icon,
    tooltipProps,
    submenu,
    isExpanded: isExpandedProp,
    onToggle,
    onClick,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Internal expansion state for uncontrolled mode
  let internalIsExpanded = $state(false);
  const isControlled = isExpandedProp !== undefined;
  const isExpanded = $derived(isControlled ? isExpandedProp! : internalIsExpanded);
  const hasSubmenu = $derived(submenu !== undefined);

  // Get menu context
  const menuContext = getContext<{
    handleSelect?: (event: MouseEvent, itemId?: string | number) => void;
    activeItemId?: string | number;
    selected?: (string | number)[];
  }>('menu');

  // Determine if item is selected
  const isSelected = $derived.by(() => {
    if (isSelectedProp !== undefined) return isSelectedProp;
    if (menuContext?.selected && itemId !== undefined) {
      return menuContext.selected.includes(itemId);
    }
    if (menuContext?.activeItemId !== undefined && itemId !== undefined) {
      return menuContext.activeItemId === itemId;
    }
    return false;
  });

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
      isDanger && 'pf-m-danger',
      isSelected && 'pf-m-selected',
      description && 'pf-m-description',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  const listItemClasses = $derived(
    [
      'pf-v6-c-menu__list-item',
      isDanger && 'pf-m-danger'
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

    // Handle submenu toggle
    if (hasSubmenu) {
      event.preventDefault();
      event.stopPropagation();
      const newExpanded = !isExpanded;
      if (!isControlled) {
        internalIsExpanded = newExpanded;
      }
      if (onToggle) {
        onToggle(event, newExpanded);
      }
      return;
    }

    // Call custom onClick if provided
    if (onClick) {
      onClick(event);
    }

    // Call menu select handler
    if (menuContext?.handleSelect && !event.defaultPrevented) {
      menuContext.handleSelect(event, itemId);
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

  // Tooltip styles - absolutely positioned so it doesn't take up space
  const tooltipStyles = $derived(
    showTooltip && tooltipProps
      ? 'position: absolute; z-index: 1000;'
      : 'position: absolute; visibility: hidden; pointer-events: none;'
  );
</script>

<li class={listItemClasses} role="none" style="position: relative;">
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
      <span class="pf-v6-c-menu__item-main">
        {#if isDanger}
          <span class="pf-v6-screen-reader">Danger Item:</span>
        {/if}
        {#if icon}
          <span class="pf-v6-c-menu__item-icon">
            {@render icon()}
          </span>
        {/if}
        <span class="pf-v6-c-menu__item-text">
          {#if typeof children === 'string'}
            {children}
          {:else if children}
            {@render children()}
          {/if}
        </span>
        {#if hasSubmenu}
          <span class="pf-v6-c-menu__item-toggle-icon">
            <AngleRightIcon />
          </span>
        {/if}
      </span>
      {#if description}
        <span class="pf-v6-c-menu__item-description">{description}</span>
      {/if}
    </a>
  {:else}
    <button
      class={classes}
      type="button"
      role="menuitem"
      disabled={isDisabled}
      aria-disabled={isAriaDisabled ? 'true' : undefined}
      aria-expanded={hasSubmenu ? isExpanded : undefined}
      onclick={handleClick}
      onmouseenter={handleMouseEnter}
      onmouseleave={handleMouseLeave}
      {...restProps}
    >
      <span class="pf-v6-c-menu__item-main">
        {#if isDanger}
          <span class="pf-v6-screen-reader">Danger Item:</span>
        {/if}
        {#if icon}
          <span class="pf-v6-c-menu__item-icon">
            {@render icon()}
          </span>
        {/if}
        <span class="pf-v6-c-menu__item-text">
          {#if typeof children === 'string'}
            {children}
          {:else if children}
            {@render children()}
          {/if}
        </span>
        {#if hasSubmenu}
          <span class="pf-v6-c-menu__item-toggle-icon">
            <AngleRightIcon />
          </span>
        {/if}
      </span>
      {#if description}
        <span class="pf-v6-c-menu__item-description">{description}</span>
      {/if}
    </button>
  {/if}
  {#if hasSubmenu}
    <Menu isFlyout hidden={!isExpanded}>
      {@render submenu()}
    </Menu>
  {/if}
  {#if tooltipProps}
    <div class={tooltipClasses} role="tooltip" style={tooltipStyles}>
      <div class="pf-v6-c-tooltip__arrow"></div>
      <div class="pf-v6-c-tooltip__content">
        {tooltipProps.content}
      </div>
    </div>
  {/if}
</li>

