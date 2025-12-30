<script lang="ts">
  import type { CheckboxProps } from './types';
  import '@patternfly/patternfly/components/Check/check.css';

  interface Props extends CheckboxProps {
    id: string;
    'aria-label'?: string;
    body?: import('svelte').Snippet;
    checked?: boolean;
    className?: string;
    component?: string | import('svelte').ComponentType;
    description?: import('svelte').Snippet | string;
    inputClassName?: string;
    isChecked?: boolean | null;
    isDisabled?: boolean;
    isLabelWrapped?: boolean;
    isRequired?: boolean;
    isValid?: boolean;
    label?: import('svelte').Snippet | string;
    name?: string;
    onChange?: (_event: Event, _checked: boolean) => void;
    class?: string;
  }

  let {
    id,
    'aria-label': ariaLabel,
    body,
    checked,
    className = '',
    component,
    description,
    inputClassName = '',
    isChecked: isCheckedProp,
    isDisabled = false,
    isLabelWrapped = false,
    isRequired = false,
    isValid = true,
    label,
    name,
    onChange,
    class: classProp = '',
    ...restProps
  }: Props = $props();

  // Use isChecked prop if provided, otherwise fall back to checked prop
  const isChecked = $derived(isCheckedProp !== undefined ? isCheckedProp : (checked ?? false));

  // Determine if checkbox is indeterminate (null means indeterminate)
  const isIndeterminate = $derived(isCheckedProp === null);

  // Determine wrapper component
  const wrapperComponent = $derived(
    component
      ? typeof component === 'string'
        ? component
        : 'div'
      : isLabelWrapped
        ? 'label'
        : 'div'
  );

  // Build wrapper CSS classes
  const wrapperClasses = $derived(
    [
      'pf-v6-c-check',
      isDisabled && 'pf-m-disabled',
      !isValid && 'pf-m-error',
      isRequired && 'pf-m-required',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build input CSS classes
  const inputClasses = $derived(['pf-v6-c-check__input', inputClassName].filter(Boolean).join(' '));

  // Build label CSS classes
  const labelClasses = $derived(
    ['pf-v6-c-check__label', isDisabled && 'pf-m-disabled'].filter(Boolean).join(' ')
  );

  // Handle change event
  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    onChange?.(event, target.checked);
  }

  // Reference to input element for setting indeterminate state
  let inputElement: HTMLInputElement;

  // Set indeterminate state when needed
  $effect(() => {
    if (inputElement) {
      inputElement.indeterminate = isIndeterminate;
    }
  });
</script>

{#if wrapperComponent === 'label'}
  <label class={wrapperClasses} {...restProps}>
    <input
      bind:this={inputElement}
      class={inputClasses}
      type="checkbox"
      {id}
      name={name || id}
      checked={isChecked && !isIndeterminate}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-invalid={!isValid ? 'true' : undefined}
      aria-required={isRequired ? 'true' : undefined}
      onchange={handleChange}
    />
    {#if label}
      <span class={labelClasses}>
        {#if typeof label === 'string'}
          {label}
        {:else}
          {@render label()}
        {/if}
        {#if isRequired}
          <span class="pf-v6-c-check__label-required" aria-label="required">*</span>
        {/if}
      </span>
    {/if}
    {#if description}
      <span class="pf-v6-c-check__description">
        {#if typeof description === 'string'}
          {description}
        {:else}
          {@render description()}
        {/if}
      </span>
    {/if}
    {#if body}
      <div class="pf-v6-c-check__body">
        {@render body()}
      </div>
    {/if}
  </label>
{:else}
  <div class={wrapperClasses} {...restProps}>
    <input
      bind:this={inputElement}
      class={inputClasses}
      type="checkbox"
      {id}
      name={name || id}
      checked={isChecked && !isIndeterminate}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-invalid={!isValid ? 'true' : undefined}
      aria-required={isRequired ? 'true' : undefined}
      onchange={handleChange}
    />
    {#if label}
      <label class={labelClasses} for={id}>
        {#if typeof label === 'string'}
          {label}
        {:else}
          {@render label()}
        {/if}
        {#if isRequired}
          <span class="pf-v6-c-check__label-required" aria-label="required">*</span>
        {/if}
      </label>
    {/if}
    {#if description}
      <span class="pf-v6-c-check__description">
        {#if typeof description === 'string'}
          {description}
        {:else}
          {@render description()}
        {/if}
      </span>
    {/if}
    {#if body}
      <div class="pf-v6-c-check__body">
        {@render body()}
      </div>
    {/if}
  </div>
{/if}
