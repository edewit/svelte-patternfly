<script lang="ts">
  import type { TextInputProps } from './types';
  import Icon from '../Icon/Icon.svelte';
  import '@patternfly/patternfly/components/FormControl/form-control.css';

  interface Props extends TextInputProps {
    children?: import('svelte').Snippet;
  }

  let {
    'aria-label': ariaLabel,
    className = '',
    customIcon,
    expandedProps,
    isDisabled = false,
    isExpanded: isExpandedDeprecated,
    isLeftTruncated: isLeftTruncatedDeprecated,
    isRequired = false,
    isStartTruncated = false,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    readOnlyVariant,
    type = 'text',
    validated = 'default',
    value: valueProp,
    id,
    name,
    class: classProp = '',
    ...restProps
  }: Props = $props();

  // Use expandedProps if provided, otherwise fall back to deprecated isExpanded
  const isExpanded = $derived(expandedProps?.isExpanded ?? isExpandedDeprecated ?? false);

  // Use isStartTruncated if provided, otherwise fall back to deprecated isLeftTruncated
  const isTruncated = $derived(isStartTruncated || isLeftTruncatedDeprecated);

  // Internal value state - initialize from prop
  let internalValue = $state(valueProp !== undefined ? String(valueProp) : '');

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

  // Generate unique ID if not provided
  const inputId = $derived(id || `text-input-${Math.random().toString(36).substring(2, 11)}`);

  // Build CSS classes for form control wrapper
  const formControlClasses = $derived(
    [
      'pf-v6-c-form-control',
      isExpanded && 'pf-m-expanded',
      isTruncated && 'pf-m-start-truncated',
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

  // Determine aria-invalid based on validated prop
  const ariaInvalid = $derived(
    validated === 'error'
      ? 'true'
      : validated === 'success' || validated === 'warning'
        ? 'false'
        : undefined
  );

  // Handle input change
  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    internalValue = newValue;
    onChange?.(event, newValue);
  }

  // Handle input blur
  function handleBlur(event: Event) {
    onBlur?.(event);
  }

  // Handle input focus
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

<span
  class={formControlClasses}
  {...expandedProps?.['aria-controls'] ? { 'aria-controls': expandedProps['aria-controls'] } : {}}
  {...expandedProps?.['aria-expanded'] !== undefined
    ? { 'aria-expanded': String(expandedProps['aria-expanded']) }
    : {}}
>
  <input
    id={inputId}
    {name}
    {type}
    class="pf-v6-c-form-control__text-input"
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
  />
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
