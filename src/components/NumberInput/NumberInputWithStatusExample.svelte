<script lang="ts">
  import NumberInput from './NumberInput.svelte';

  let value = $state<number | ''>(5);

  const validated = $derived.by(() => {
    const numValue = Number(value);
    const distance = Math.abs(numValue - 5);
    if (distance === 0) {
      return 'success';
    } else if (distance <= 2) {
      return 'warning';
    } else {
      return 'error';
    }
  });

  function onMinus() {
    const newValue = (value || 0) - 1;
    value = newValue;
  }

  function onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;
    value = inputValue === '' ? '' : +inputValue;
  }

  function onPlus() {
    const newValue = (value || 0) + 1;
    value = newValue;
  }
</script>

<div>
  <p>In the following example, the validated status will update based on the value of the number input and how far from the number 5 it is.</p>
  <NumberInput
    {value}
    {onMinus}
    {onChange}
    {onPlus}
    validated={validated}
    inputName="input"
    inputAriaLabel="number input"
    minusBtnAriaLabel="minus"
    plusBtnAriaLabel="plus"
  />
</div>

