<script lang="ts">
  import FormSelect from './FormSelect.svelte';
  import FormSelectOption from './FormSelectOption.svelte';

  let {
    'aria-label': ariaLabel = 'FormSelect Input',
    value = 'mrs',
    isDisabled = false,
    isRequired = false,
    validated = 'default',
    ouiaId = 'BasicFormSelect',
    ...restProps
  } = $props();
</script>

<FormSelect
  aria-label={ariaLabel}
  {value}
  {isDisabled}
  {isRequired}
  {validated}
  {ouiaId}
  {...restProps}
>
  <FormSelectOption value="please choose" label="Select one" isDisabled={true} />
  <FormSelectOption value="mr" label="Mr" />
  <FormSelectOption value="miss" label="Miss" />
  <FormSelectOption value="mrs" label="Mrs" />
  <FormSelectOption value="ms" label="Ms" />
  <FormSelectOption value="dr" label="Dr" />
  <FormSelectOption value="other" label="Other" />
</FormSelect>
