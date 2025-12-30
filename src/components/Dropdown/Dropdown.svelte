<script lang="ts">
  import type { DropdownProps } from './types';
  import { setContext } from 'svelte';
  import AngleDownIcon from '../Icon/icons/AngleDownIcon.svelte';
  import '@patternfly/patternfly/components/Menu/menu.css';
  import '@patternfly/patternfly/components/MenuToggle/menu-toggle.css';

  interface Props extends DropdownProps {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    onSelect?: (event?: MouseEvent, value?: string | number) => void;
    toggle: import('svelte').Snippet | string;
    isPlain?: boolean;
    isScrollable?: boolean;
    maxMenuHeight?: string;
    menuHeight?: string;
    onOpenChangeKeys?: string[];
    onToggleKeydown?: (event: KeyboardEvent) => void;
    shouldFocusToggleOnSelect?: boolean;
    focusTimeoutDelay?: number;
    ouiaId?: string | number;
    ouiaSafe?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    isOpen: controlledIsOpen,
    onOpenChange,
    onSelect,
    toggle,
    isPlain = false,
    isScrollable = false,
    maxMenuHeight,
    menuHeight,
    onOpenChangeKeys = ['Escape', 'Tab'],
    onToggleKeydown,
    shouldFocusToggleOnSelect = false,
    focusTimeoutDelay = 0,
    ouiaId,
    ouiaSafe = true,
    class: className = '',
    children
  }: Props = $props();

  // Internal visibility state
  let internalIsOpen = $state(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = $derived(isControlled ? controlledIsOpen! : internalIsOpen);

  // References
  let dropdownElement: HTMLDivElement | null = $state(null);
  let menuElement: HTMLDivElement | null = $state(null);
  let toggleElement: HTMLElement | null = $state(null);

  // Generate unique IDs
  const dropdownId = $derived(
    ouiaId ? `dropdown-${ouiaId}` : `dropdown-${Math.random().toString(36).substring(2, 11)}`
  );
  const menuId = $derived(`${dropdownId}-menu`);

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-menu',
      isPlain && 'pf-m-plain',
      isScrollable && 'pf-m-scrollable',
      isOpen && 'pf-m-flyout',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build menu styles
  const menuStyles = $derived(
    [
      'position: absolute;',
      'z-index: 1000;',
      'top: 100%;',
      'left: 0;',
      'min-width: max-content;',
      maxMenuHeight && `max-height: ${maxMenuHeight};`,
      menuHeight && `height: ${menuHeight};`
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Toggle dropdown
  function toggleDropdown() {
    const newState = !isOpen;
    if (!isControlled) {
      internalIsOpen = newState;
    }
    if (onOpenChange) {
      onOpenChange(newState);
    }
  }

  // Handle select
  function handleSelect(event: MouseEvent, value?: string | number) {
    onSelect?.(event, value);
    // Close dropdown after selection
    if (!isControlled) {
      internalIsOpen = false;
    }
    onOpenChange?.(false);
    // Focus toggle if needed
    if (shouldFocusToggleOnSelect && toggleElement) {
      setTimeout(() => {
        toggleElement?.focus();
      }, focusTimeoutDelay);
    }
  }

  // Handle click outside
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      dropdownElement &&
      !dropdownElement.contains(target) &&
      isOpen
    ) {
      if (!isControlled) {
        internalIsOpen = false;
      }
      onOpenChange?.(false);
    }
  }

  // Handle keyboard events
  function handleKeydown(event: KeyboardEvent) {
    if (onOpenChangeKeys.includes(event.key)) {
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        if (!isControlled) {
          internalIsOpen = false;
        }
        onOpenChange?.(false);
        toggleElement?.focus();
      } else if (event.key === 'Tab' && isOpen) {
        if (!isControlled) {
          internalIsOpen = false;
        }
        onOpenChange?.(false);
      }
    }

    // Handle arrow keys for navigation
    if (isOpen && menuElement) {
      const menuItems = menuElement.querySelectorAll<HTMLElement>(
        '.pf-v6-c-menu__item:not(.pf-m-disabled):not(.pf-m-aria-disabled)'
      );
      const currentIndex = Array.from(menuItems).findIndex((item) => item === document.activeElement);

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        menuItems[nextIndex]?.focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        menuItems[prevIndex]?.focus();
      } else if (event.key === 'Home') {
        event.preventDefault();
        menuItems[0]?.focus();
      } else if (event.key === 'End') {
        event.preventDefault();
        menuItems[menuItems.length - 1]?.focus();
      }
    }

    // Handle toggle keydown
    if (onToggleKeydown && toggleElement?.contains(event.target as Node)) {
      if (isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
        const menuItems = menuElement?.querySelectorAll<HTMLElement>(
          '.pf-v6-c-menu__item:not(.pf-m-disabled):not(.pf-m-aria-disabled)'
        );
        if (menuItems && menuItems.length > 0) {
          if (event.key === 'ArrowDown') {
            menuItems[0]?.focus();
          } else {
            menuItems[menuItems.length - 1]?.focus();
          }
        }
      }
    }

    if (onToggleKeydown) {
      onToggleKeydown(event);
    }
  }

  // Add event listeners
  $effect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeydown);
      // Focus first menu item when opened
      setTimeout(() => {
        const menuItems = menuElement?.querySelectorAll<HTMLElement>(
          '.pf-v6-c-menu__item:not(.pf-m-disabled):not(.pf-m-aria-disabled)'
        );
        if (menuItems && menuItems.length > 0) {
          menuItems[0]?.focus();
        }
      }, 0);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  // Create context for children to access handleSelect
  setContext('dropdown-select', handleSelect);
</script>

<div
  bind:this={dropdownElement}
  class="pf-v6-c-dropdown"
  style="position: relative; display: inline-block;"
  data-ouia-component-type="PF6/Dropdown"
  data-ouia-safe={ouiaSafe}
  data-ouia-component-id={ouiaId}
>
  <!-- Toggle -->
  <div
    bind:this={toggleElement}
    onclick={toggleDropdown}
    onkeydown={handleKeydown}
    role="button"
    tabindex="-1"
  >
    {#if typeof toggle === 'string'}
      <button
        class="pf-v6-c-menu-toggle"
        class:pf-m-expanded={isOpen}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
      >
        <span class="pf-v6-c-menu-toggle__text">{toggle}</span>
        <span class="pf-v6-c-menu-toggle__controls">
          <span class="pf-v6-c-menu-toggle__toggle-icon">
            <AngleDownIcon />
          </span>
        </span>
      </button>
    {:else}
      {@render toggle()}
    {/if}
  </div>

  <!-- Menu -->
  {#if isOpen}
    <div
      bind:this={menuElement}
      id={menuId}
      class={classes}
      style={menuStyles}
      role="menu"
    >
      {@render children?.()}
    </div>
  {/if}
</div>

