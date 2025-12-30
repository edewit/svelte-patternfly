<script lang="ts">
  import FormSelect from './FormSelect.svelte';
  import FormSelectOption from './FormSelectOption.svelte';
  import FormSelectOptionGroup from './FormSelectOptionGroup.svelte';

  let {
    'aria-label': ariaLabel = 'FormSelect Input',
    value = 'option2',
    ouiaId = 'GroupedFormSelect',
    ...restProps
  } = $props();
</script>

<FormSelect aria-label={ariaLabel} {value} {ouiaId} {...restProps}>
  <FormSelectOption value="option1" label="The first option" />
  <FormSelectOption value="option2" label="Second option is selected by default" />
  <FormSelectOption value="option3" label="The third option" />
  <FormSelectOptionGroup label="Group 1">
    <FormSelectOption value="option4" label="The fourth option" />
    <FormSelectOption value="option5" label="The fifth option" />
  </FormSelectOptionGroup>
  <FormSelectOptionGroup label="Group 2">
    <FormSelectOption value="option6" label="The sixth option" />
  </FormSelectOptionGroup>
</FormSelect>
