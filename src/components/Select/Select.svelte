<script lang="ts">
  import type { SelectProps } from './types';
  import { setContext } from 'svelte';
  import '@patternfly/patternfly/components/Menu/menu.css';
  import '@patternfly/patternfly/components/MenuToggle/menu-toggle.css';

  interface Props extends SelectProps {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    onSelect?: (event?: MouseEvent, value?: any) => void;
    toggle: import('svelte').Snippet;
    isPlain?: boolean;
    isScrollable?: boolean;
    maxMenuHeight?: string;
    menuHeight?: string;
    onOpenChangeKeys?: string[];
    onToggleKeydown?: (event: KeyboardEvent) => void;
    shouldFocusToggleOnSelect?: boolean;
    shouldFocusFirstItemOnOpen?: boolean;
    shouldPreventScrollOnItemFocus?: boolean;
    focusTimeoutDelay?: number;
    selected?: any | any[];
    role?: string;
    variant?: 'default' | 'typeahead';
    zIndex?: number;
    popperProps?: Record<string, unknown>;
    id?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
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
    shouldFocusFirstItemOnOpen = false,
    shouldPreventScrollOnItemFocus = false,
    focusTimeoutDelay = 0,
    selected,
    role = 'listbox',
    variant = 'default',
    zIndex = 1000,
    popperProps = {},
    id,
    class: className = '',
    children
  }: Props = $props();

  // Internal visibility state
  let internalIsOpen = $state(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = $derived(isControlled ? controlledIsOpen! : internalIsOpen);

  // References
  let selectElement: HTMLDivElement | null = $state(null);
  let menuElement: HTMLDivElement | null = $state(null);
  let toggleElement: HTMLElement | null = $state(null);

  // Generate unique IDs
  const selectId = $derived(
    id || `select-${Math.random().toString(36).substring(2, 11)}`
  );
  const menuId = $derived(`${selectId}-menu`);

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-menu',
      isPlain && 'pf-m-plain',
      isScrollable && 'pf-m-scrollable',
      isOpen && 'pf-m-flyout',
      variant !== 'default' && `pf-m-${variant}`,
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build menu styles
  const menuStyles = $derived(
    [
      'position: absolute;',
      `z-index: ${zIndex};`,
      'top: 100%;',
      'left: 0;',
      'min-width: max-content;',
      maxMenuHeight && `max-height: ${maxMenuHeight};`,
      menuHeight && `height: ${menuHeight};`
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Toggle select
  function toggleSelect() {
    const newState = !isOpen;
    if (!isControlled) {
      internalIsOpen = newState;
    }
    if (onOpenChange) {
      onOpenChange(newState);
    }
  }

  // Handle select
  function handleSelect(event: MouseEvent, value?: any) {
    onSelect?.(event, value);
    // Close select after selection (unless multi-select)
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
      selectElement &&
      !selectElement.contains(target) &&
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

    // Handle arrow keys for navigation (only for default variant)
    if (isOpen && menuElement && variant === 'default') {
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
      if (isOpen && variant === 'default' && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
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
      if (shouldFocusFirstItemOnOpen) {
        setTimeout(() => {
          const menuItems = menuElement?.querySelectorAll<HTMLElement>(
            '.pf-v6-c-menu__item:not(.pf-m-disabled):not(.pf-m-aria-disabled)'
          );
          if (menuItems && menuItems.length > 0) {
            if (shouldPreventScrollOnItemFocus) {
              menuItems[0]?.focus({ preventScroll: true });
            } else {
              menuItems[0]?.focus();
            }
          }
        }, 0);
      }
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  // Create context for children to access handleSelect, selected, and role
  setContext('select', {
    handleSelect,
    get selected() {
      return selected;
    },
    get role() {
      return role;
    }
  });

</script>

<div
  bind:this={selectElement}
  class="pf-v6-c-select"
  style="position: relative; display: inline-block;"
  id={selectId}
>
  <!-- Toggle -->
  <div
    bind:this={toggleElement}
    onclick={toggleSelect}
    onkeydown={handleKeydown}
    role="button"
    tabindex="-1"
  >
    {@render toggle()}
  </div>

  <!-- Menu -->
  {#if isOpen}
    <div
      bind:this={menuElement}
      id={menuId}
      class={classes}
      style={menuStyles}
      role={role}
    >
      {@render children?.()}
    </div>
  {/if}
</div>

