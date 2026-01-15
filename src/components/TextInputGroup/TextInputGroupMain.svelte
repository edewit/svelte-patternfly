<script lang="ts">
  import type { TextInputGroupMainProps } from './types';

  interface Props extends TextInputGroupMainProps {
    className?: string;
    class?: string;
    'aria-label'?: string;
    hint?: string;
    icon?: import('svelte').Snippet;
    isDisabled?: boolean;
    name?: string;
    onChange?: (_event: Event, _value: string) => void;
    onFocus?: (_event: FocusEvent) => void;
    onBlur?: (_event: FocusEvent) => void;
    placeholder?: string;
    type?: 'text' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'time' | 'url';
    value?: string;
    children?: import('svelte').Snippet;
  }

  let {
    className = '',
    class: classProp = '',
    'aria-label': ariaLabel,
    hint,
    icon,
    isDisabled = false,
    name,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    type = 'text',
    value: valueProp = '',
    children,
    ...restProps
  }: Props = $props();

  // Internal value state
  let internalValue = $state(valueProp);

  // Sync with prop value
  $effect(() => {
    if (valueProp !== undefined && valueProp !== internalValue) {
      internalValue = valueProp;
    }
  });

  // Build CSS classes for main wrapper
  const mainClasses = $derived(
    [
      'pf-v6-c-text-input-group__main',
      icon && 'pf-m-icon',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Handle input change
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    internalValue = target.value;
    onChange?.(event, target.value);
  }

  // Handle focus
  function handleFocus(event: FocusEvent) {
    onFocus?.(event);
  }

  // Handle blur
  function handleBlur(event: FocusEvent) {
    onBlur?.(event);
  }
</script>

<div class={mainClasses} {...restProps}>
  {#if children}
    {@render children()}
  {:else}
    <span class="pf-v6-c-text-input-group__text">
      {#if hint}
        <input
          class="pf-v6-c-text-input-group__text-input pf-m-hint"
          type="text"
          disabled
          aria-hidden="true"
          value={hint}
        />
      {/if}
      {#if icon}
        <span class="pf-v6-c-text-input-group__icon">
          {@render icon()}
        </span>
      {/if}
      <input
        class="pf-v6-c-text-input-group__text-input"
        {type}
        {name}
        value={internalValue}
        {placeholder}
        aria-label={ariaLabel}
        disabled={isDisabled}
        oninput={handleInput}
        onfocus={handleFocus}
        onblur={handleBlur}
      />
    </span>
  {/if}
</div>
