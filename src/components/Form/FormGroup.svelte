<script lang="ts">
  import type { FormGroupProps } from './types';
  import '@patternfly/patternfly/components/Form/form.css';

  interface Props extends FormGroupProps {
    children?: import('svelte').Snippet;
  }

  let {
    className = '',
    fieldId,
    hasNoPaddingTop = false,
    isInline = false,
    isRequired = false,
    isStack = false,
    label,
    labelHelp,
    labelInfo,
    role,
    class: classProp = '',
    children,
    ...restProps
  }: Props = $props();

  // Generate unique ID if not provided
  const groupId = $derived(fieldId || `form-group-${Math.random().toString(36).substring(2, 11)}`);

  // Build CSS classes for form group
  const groupClasses = $derived(
    [
      'pf-v6-c-form__group',
      hasNoPaddingTop && 'pf-m-no-padding-top',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build CSS classes for label
  const labelClasses = $derived(
    [
      'pf-v6-c-form__group-label',
      hasNoPaddingTop && 'pf-m-no-padding-top',
      labelInfo && 'pf-m-info'
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build CSS classes for control
  const controlClasses = $derived(
    [
      'pf-v6-c-form__group-control',
      isInline && 'pf-m-inline',
      isStack && 'pf-m-stack'
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Determine aria-labelledby for group role
  const ariaLabelledBy = $derived(role && label ? `${groupId}-label` : undefined);
  const labelId = $derived(ariaLabelledBy || (label ? `${groupId}-label` : undefined));
</script>

<div class={groupClasses} {role} aria-labelledby={ariaLabelledBy} {...restProps}>
  {#if label}
    <div class={labelClasses} id={labelId}>
      <label class="pf-v6-c-form__label" for={groupId}>
        <span class="pf-v6-c-form__label-text">
          {#if typeof label === 'string'}
            {label}
          {:else}
            {@render label()}
          {/if}
        </span>
        {#if isRequired}
          <span class="pf-v6-c-form__label-required" aria-hidden="true">*</span>
        {/if}
      </label>
      {#if labelHelp}
        <span class="pf-v6-c-form__group-label-help">
          {@render labelHelp()}
        </span>
      {/if}
      {#if labelInfo}
        <span class="pf-v6-c-form__group-label-info">
          {#if typeof labelInfo === 'string'}
            {labelInfo}
          {:else}
            {@render labelInfo()}
          {/if}
        </span>
      {/if}
    </div>
  {/if}
  <div class={controlClasses}>
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>








