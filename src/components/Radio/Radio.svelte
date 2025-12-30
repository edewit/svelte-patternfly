<script lang="ts">
  import type { RadioProps } from './types';
  import '@patternfly/patternfly/components/Radio/radio.css';

  interface Props extends RadioProps {
    id: string;
    name: string;
    'aria-label'?: string;
    body?: import('svelte').Snippet;
    checked?: boolean;
    className?: string;
    component?: string | import('svelte').ComponentType;
    description?: import('svelte').Snippet | string;
    inputClassName?: string;
    isChecked?: boolean;
    isDisabled?: boolean;
    isLabelWrapped?: boolean;
    isValid?: boolean;
    label?: import('svelte').Snippet | string;
    onChange?: (_event: Event, _checked: boolean) => void;
    class?: string;
  }

  let {
    id,
    name,
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
    isValid = true,
    label,
    onChange,
    class: classProp = '',
    ...restProps
  }: Props = $props();

  // Use isChecked prop if provided, otherwise fall back to checked prop
  const isChecked = $derived(isCheckedProp !== undefined ? isCheckedProp : (checked ?? false));

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
      'pf-v6-c-radio',
      isDisabled && 'pf-m-disabled',
      !isValid && 'pf-m-error',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build input CSS classes
  const inputClasses = $derived(['pf-v6-c-radio__input', inputClassName].filter(Boolean).join(' '));

  // Build label CSS classes
  const labelClasses = $derived(
    ['pf-v6-c-radio__label', isDisabled && 'pf-m-disabled'].filter(Boolean).join(' ')
  );

  // Handle change event
  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    onChange?.(event, target.checked);
  }
</script>

{#if wrapperComponent === 'label'}
  <label class={wrapperClasses} {...restProps}>
    <input
      class={inputClasses}
      type="radio"
      {id}
      {name}
      checked={isChecked}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-invalid={!isValid ? 'true' : undefined}
      onchange={handleChange}
    />
    {#if label}
      <span class={labelClasses}>
        {#if typeof label === 'string'}
          {label}
        {:else}
          {@render label()}
        {/if}
      </span>
    {/if}
    {#if description}
      <span class="pf-v6-c-radio__description">
        {#if typeof description === 'string'}
          {description}
        {:else}
          {@render description()}
        {/if}
      </span>
    {/if}
    {#if body}
      <div class="pf-v6-c-radio__body">
        {@render body()}
      </div>
    {/if}
  </label>
{:else}
  <div class={wrapperClasses} {...restProps}>
    <input
      class={inputClasses}
      type="radio"
      {id}
      {name}
      checked={isChecked}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-invalid={!isValid ? 'true' : undefined}
      onchange={handleChange}
    />
    {#if label}
      <label class={labelClasses} for={id}>
        {#if typeof label === 'string'}
          {label}
        {:else}
          {@render label()}
        {/if}
      </label>
    {/if}
    {#if description}
      <span class="pf-v6-c-radio__description">
        {#if typeof description === 'string'}
          {description}
        {:else}
          {@render description()}
        {/if}
      </span>
    {/if}
    {#if body}
      <div class="pf-v6-c-radio__body">
        {@render body()}
      </div>
    {/if}
  </div>
{/if}
