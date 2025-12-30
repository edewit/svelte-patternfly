<script lang="ts">
  import FormSelect from './FormSelect.svelte';
  import FormSelectOption from './FormSelectOption.svelte';

  let {
    'aria-label': ariaLabel = 'FormSelect Input',
    value = '',
    validated = 'error',
    ouiaId = 'ValidatedFormSelect',
    ...restProps
  } = $props();
</script>

<FormSelect aria-label={ariaLabel} {value} {validated} {ouiaId} {...restProps}>
  <FormSelectOption value="" label="Select a number" />
  <FormSelectOption value="one" label="One" />
  <FormSelectOption value="two" label="Two" />
  <FormSelectOption value="three" label="Three - the only valid option" />
</FormSelect>
