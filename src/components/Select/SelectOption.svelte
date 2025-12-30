<script lang="ts">
  import type { SelectOptionProps } from './types';
  import { getContext } from 'svelte';
  import '@patternfly/patternfly/components/Menu/menu.css';

  interface Props extends SelectOptionProps {
    value?: any;
    isSelected?: boolean;
    isDisabled?: boolean;
    isFocused?: boolean;
    hasCheckbox?: boolean;
    icon?: import('svelte').Snippet;
    description?: import('svelte').Snippet | string;
    isExternalLink?: boolean;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    value,
    isSelected: isSelectedProp,
    isDisabled = false,
    isFocused = false,
    hasCheckbox = false,
    icon,
    description,
    isExternalLink = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get select context
  const selectContext = getContext<{
    handleSelect?: (event: MouseEvent, value?: any) => void;
    selected?: any | any[];
    role?: string;
  }>('select');

  // Determine role based on parent select role
  const itemRole = $derived.by(() => {
    if (hasCheckbox) {
      return 'menuitemcheckbox';
    }
    if (selectContext?.role === 'listbox') {
      return 'option';
    }
    return 'menuitem';
  });

  // Determine if item is selected
  const isSelected = $derived.by(() => {
    if (isSelectedProp !== undefined) return isSelectedProp;
    if (selectContext?.selected !== undefined && value !== undefined) {
      if (Array.isArray(selectContext.selected)) {
        return selectContext.selected.includes(value);
      }
      return selectContext.selected === value;
    }
    return false;
  });

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-menu__item',
      isDisabled && 'pf-m-disabled',
      isSelected && 'pf-m-selected',
      isFocused && 'pf-m-focus',
      hasCheckbox && 'pf-m-check',
      description && 'pf-m-description',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  function handleClick(event: MouseEvent) {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Call select handler
    if (selectContext?.handleSelect && !event.defaultPrevented) {
      selectContext.handleSelect(event, value);
    }
  }
</script>

<li class="pf-v6-c-menu__list-item" role="none">
  <button
    class={classes}
    type="button"
    role={itemRole}
    aria-checked={hasCheckbox ? (isSelected ? 'true' : 'false') : undefined}
    aria-selected={!hasCheckbox ? (isSelected ? 'true' : 'false') : undefined}
    disabled={isDisabled}
    onclick={handleClick}
    {...restProps}
  >
    <span class="pf-v6-c-menu__item-main">
      {#if hasCheckbox}
        <span class="pf-v6-c-menu__item-check">
          {#if isSelected}
            <svg
              class="pf-v6-svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
            >
              <path
                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
              ></path>
            </svg>
          {/if}
        </span>
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
      {#if isExternalLink}
        <span class="pf-v6-c-menu__item-external-icon">
          <svg
            class="pf-v6-svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
          >
            <path
              d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.28,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"
            ></path>
          </svg>
        </span>
      {/if}
    </span>
    {#if description}
      <span class="pf-v6-c-menu__item-description">
        {#if typeof description === 'string'}
          {description}
        {:else if description}
          {@render description()}
        {/if}
      </span>
    {/if}
  </button>
</li>

