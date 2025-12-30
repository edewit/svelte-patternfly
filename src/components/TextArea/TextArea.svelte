<script lang="ts">
  import type { TextAreaProps } from './types';
  import Icon from '../Icon/Icon.svelte';
  import '@patternfly/patternfly/components/FormControl/form-control.css';

  interface Props extends TextAreaProps {
    children?: import('svelte').Snippet;
  }

  let {
    'aria-label': ariaLabel,
    autoResize = false,
    className = '',
    customIcon,
    isDisabled = false,
    isRequired = false,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    readOnlyVariant,
    resizeOrientation = 'both',
    validated = 'default',
    value: valueProp,
    id,
    name,
    class: classProp = '',
    ...restProps
  }: Props = $props();

  // Internal value state - initialize from prop
  let internalValue = $state(valueProp !== undefined ? String(valueProp) : '');
  let textareaElement: HTMLTextAreaElement | null = $state(null);

  // Sync with prop value - always update when prop changes
  $effect(() => {
    // Track valueProp to ensure reactivity
    if (valueProp !== undefined) {
      const newValue = String(valueProp);
      if (newValue !== internalValue) {
        internalValue = newValue;
      }
    } else {
      if (internalValue !== '') {
        internalValue = '';
      }
    }
  });

  // Auto-resize functionality
  $effect(() => {
    if (autoResize && textareaElement) {
      textareaElement.style.height = 'auto';
      textareaElement.style.height = `${textareaElement.scrollHeight}px`;
    }
  });

  // Generate unique ID if not provided
  const textareaId = $derived(id || `textarea-${Math.random().toString(36).substring(2, 11)}`);

  // Build CSS classes for form control wrapper
  const formControlClasses = $derived(
    [
      'pf-v6-c-form-control',
      'pf-m-textarea',
      resizeOrientation === 'horizontal' && 'pf-m-resize-horizontal',
      resizeOrientation === 'vertical' && 'pf-m-resize-vertical',
      resizeOrientation === 'both' && 'pf-m-resize-both',
      readOnlyVariant === 'plain' && 'pf-m-plain',
      readOnlyVariant === 'default' && 'pf-m-readonly',
      validated === 'success' && 'pf-m-success',
      validated === 'warning' && 'pf-m-warning',
      validated === 'error' && 'pf-m-error',
      (customIcon || validated !== 'default') && 'pf-m-icon',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Handle resize style for 'none' case (not supported by PatternFly CSS, use inline style)
  const resizeStyle = $derived(resizeOrientation === 'none' ? 'resize: none;' : undefined);

  // Determine aria-invalid based on validated prop
  const ariaInvalid = $derived(
    validated === 'error'
      ? 'true'
      : validated === 'success' || validated === 'warning'
        ? 'false'
        : undefined
  );

  // Handle textarea change
  function handleChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    const newValue = target.value;
    internalValue = newValue;

    // Auto-resize on change
    if (autoResize && target) {
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
    }

    onChange?.(event, newValue);
  }

  // Handle textarea blur
  function handleBlur(event: Event) {
    onBlur?.(event);
  }

  // Handle textarea focus
  function handleFocus(event: Event) {
    onFocus?.(event);
  }

  // Get validation icon
  const validationIcon = $derived.by(() => {
    if (validated === 'success') {
      return 'check-circle';
    } else if (validated === 'warning') {
      return 'exclamation-triangle';
    } else if (validated === 'error') {
      return 'exclamation-circle';
    }
    return null;
  });
</script>

<span class={formControlClasses}>
  <textarea
    bind:this={textareaElement}
    id={textareaId}
    {name}
    style={resizeStyle}
    aria-label={ariaLabel}
    aria-invalid={ariaInvalid}
    aria-required={isRequired ? 'true' : undefined}
    {placeholder}
    value={internalValue}
    disabled={isDisabled}
    readonly={readOnlyVariant !== undefined}
    oninput={handleChange}
    onblur={handleBlur}
    onfocus={handleFocus}
    {...restProps}
  ></textarea>
  {#if customIcon || validationIcon}
    <span class="pf-v6-c-form-control__utilities">
      {#if customIcon}
        <span class="pf-v6-c-form-control__icon">
          {@render customIcon()}
        </span>
      {/if}
      {#if validationIcon}
        <span class="pf-v6-c-form-control__icon pf-m-status">
          <Icon icon={`fas fa-${validationIcon}`} size="sm" />
        </span>
      {/if}
    </span>
  {/if}
</span>
