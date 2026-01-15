<script lang="ts">
  import type { ToggleGroupItemProps, ToggleGroupItemChangeHandler } from './types';

  interface Props extends ToggleGroupItemProps {
    text?: string;
    icon?: import('svelte').Snippet;
    isDisabled?: boolean;
    isSelected?: boolean;
    onChange?: ToggleGroupItemChangeHandler;
    buttonId?: string;
    'aria-label'?: string;
    class?: string;
    [key: string]: unknown;
  }

  let {
    text,
    icon,
    isDisabled = false,
    isSelected = false,
    onChange,
    buttonId,
    'aria-label': ariaLabel,
    class: className = '',
    ...restProps
  }: Props = $props();

  // Build CSS classes for button
  const buttonClasses = $derived(
    [
      'pf-v6-c-toggle-group__button',
      isSelected && 'pf-m-selected',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Handle click
  function handleClick(event: MouseEvent) {
    if (!isDisabled && onChange) {
      onChange(event, !isSelected);
    }
  }
</script>

<div class="pf-v6-c-toggle-group__item">
  <button
    type="button"
    class={buttonClasses}
    id={buttonId}
    aria-label={ariaLabel}
    aria-pressed={isSelected}
    disabled={isDisabled}
    onclick={handleClick}
    {...restProps}
  >
    {#if icon}
      <span class="pf-v6-c-toggle-group__icon">
        {@render icon()}
      </span>
    {/if}
    {#if text}
      <span class="pf-v6-c-toggle-group__text">{text}</span>
    {/if}
  </button>
</div>
