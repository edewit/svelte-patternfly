<script lang="ts">
  import type { SwitchProps } from './types';
  import '@patternfly/patternfly/components/Switch/switch.css';

  interface Props extends SwitchProps {
    id: string;
    'aria-label'?: string;
    className?: string;
    isChecked?: boolean;
    isDisabled?: boolean;
    isReversed?: boolean;
    label?: import('svelte').Snippet | string;
    labelOff?: import('svelte').Snippet | string;
    name?: string;
    onChange?: (_event: Event, _checked: boolean) => void;
    ouiaId?: string;
    ouiaSafe?: boolean;
    class?: string;
  }

  let {
    id,
    'aria-label': ariaLabel,
    className = '',
    isChecked = false,
    isDisabled = false,
    isReversed = false,
    label,
    labelOff,
    name,
    onChange,
    ouiaId,
    ouiaSafe = true,
    class: classProp = '',
    ...restProps
  }: Props = $props();

  // Build wrapper CSS classes
  const wrapperClasses = $derived(
    [
      'pf-v6-c-switch',
      isReversed && 'pf-m-reverse',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Determine the current label to display
  const currentLabel = $derived(isChecked ? label : (labelOff || label));

  // Handle change event
  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    onChange?.(event, target.checked);
  }

  // Generate label id for aria-labelledby
  const labelId = $derived(`${id}-text`);
</script>

<label
  class={wrapperClasses}
  for={id}
  data-ouia-component-type="PF6/Switch"
  data-ouia-safe={ouiaSafe}
  data-ouia-component-id={ouiaId}
  {...restProps}
>
  <input
    class="pf-v6-c-switch__input"
    type="checkbox"
    role="switch"
    {id}
    name={name || id}
    checked={isChecked}
    disabled={isDisabled}
    aria-label={!currentLabel ? ariaLabel : undefined}
    aria-labelledby={currentLabel ? labelId : undefined}
    onchange={handleChange}
  />

  <span class="pf-v6-c-switch__toggle"></span>

  {#if currentLabel}
    <span
      class="pf-v6-c-switch__label"
      id={labelId}
      aria-hidden="true"
    >
      {#if typeof currentLabel === 'string'}
        {currentLabel}
      {:else}
        {@render currentLabel()}
      {/if}
    </span>
  {/if}
</label>
