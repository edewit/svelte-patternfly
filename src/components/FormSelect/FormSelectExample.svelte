<script lang="ts">
  import FormSelect from './FormSelect.svelte';
  import FormSelectOption from './FormSelectOption.svelte';

  let formSelectValue = $state('mrs');

  function handleChange(event: Event, value: string) {
    formSelectValue = value;
  }

  const options = [
    { value: 'please choose', label: 'Select one', disabled: true },
    { value: 'mr', label: 'Mr', disabled: false },
    { value: 'miss', label: 'Miss', disabled: false },
    { value: 'mrs', label: 'Mrs', disabled: false },
    { value: 'ms', label: 'Ms', disabled: false },
    { value: 'dr', label: 'Dr', disabled: false },
    { value: 'other', label: 'Other', disabled: false }
  ];
</script>

<FormSelect
  value={formSelectValue}
  onChange={handleChange}
  aria-label="FormSelect Input"
  ouiaId="BasicFormSelect"
>
  {#each options as option}
    <FormSelectOption isDisabled={option.disabled} value={option.value} label={option.label} />
  {/each}
</FormSelect>
