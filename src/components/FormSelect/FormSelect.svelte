<script lang="ts">
  import type { FormSelectProps } from './types';
  import Icon from '../Icon/Icon.svelte';
  import '@patternfly/patternfly/components/FormControl/form-control.css';
  import FormSelectOption from './FormSelectOption.svelte';

  interface Props extends FormSelectProps {
    children?: import('svelte').Snippet;
    options?: Array<{ value: string; label: string; disabled?: boolean; isPlaceholder?: boolean }>;
  }

  let {
    'aria-label': ariaLabel,
    className = '',
    isDisabled = false,
    isRequired = false,
    onBlur,
    onChange,
    onFocus,
    ouiaId,
    ouiaSafe = true,
    validated = 'default',
    value: valueProp,
    id,
    name,
    class: classProp = '',
    children,
    options,
    ...restProps
  }: Props = $props();

  // Internal value state
  let internalValue = $state(valueProp !== undefined ? String(valueProp) : '');

  // Sync with prop value
  $effect(() => {
    if (valueProp !== undefined) {
      internalValue = String(valueProp);
    }
  });

  // Generate unique ID if not provided
  const selectId = $derived(id || `form-select-${Math.random().toString(36).substring(2, 11)}`);

  // Generate OUIA ID if not provided
  const ouiaComponentId = $derived(
    ouiaId !== undefined
      ? String(ouiaId)
      : `form-select-${Math.random().toString(36).substring(2, 11)}`
  );

  // Build CSS classes for form control wrapper
  const formControlClasses = $derived(
    [
      'pf-v6-c-form-control',
      validated === 'success' && 'pf-m-success',
      validated === 'warning' && 'pf-m-warning',
      validated === 'error' && 'pf-m-error',
      validated !== 'default' && 'pf-m-icon',
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

  // Handle select change
  function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newValue = target.value;
    internalValue = newValue;
    onChange?.(event, newValue);
  }

  // Handle select blur
  function handleBlur(event: Event) {
    onBlur?.(event);
  }

  // Handle select focus
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
  <select
    id={selectId}
    {name}
    class="pf-v6-c-form-control__select"
    aria-label={ariaLabel}
    aria-invalid={ariaInvalid}
    aria-required={isRequired ? 'true' : undefined}
    data-ouia-component-type="PF6/FormSelect"
    data-ouia-component-id={ouiaComponentId}
    data-ouia-safe={ouiaSafe ? 'true' : 'false'}
    value={internalValue}
    disabled={isDisabled}
    onchange={handleChange}
    onblur={handleBlur}
    onfocus={handleFocus}
    {...restProps}
  >
    {#if options}
      {#each options as option}
        <FormSelectOption
          value={option.value}
          label={option.label}
          isDisabled={option.disabled}
          isPlaceholder={option.isPlaceholder}
        />
      {/each}
    {:else if children}
      {@render children()}
    {/if}
  </select>
  <span class="pf-v6-c-form-control__utilities">
    <span class="pf-v6-c-form-control__toggle-icon">
      <svg
        class="pf-v6-svg"
        viewBox="0 0 320 512"
        fill="currentColor"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
      >
        <path
          d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
        ></path>
      </svg>
    </span>
    {#if validationIcon}
      <span class="pf-v6-c-form-control__icon pf-m-status">
        <Icon icon={`fas fa-${validationIcon}`} size="sm" />
      </span>
    {/if}
  </span>
</span>
