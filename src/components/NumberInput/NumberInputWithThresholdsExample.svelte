<script lang="ts">
  import NumberInput from './NumberInput.svelte';

  let value = $state<number | ''>(5);

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

  function onBlur(event: Event) {
    const target = event.target as HTMLInputElement;
    const numValue = Number(target.value);
    if (numValue < 0) {
      value = 0;
    } else if (numValue > 10) {
      value = 10;
    }
  }
</script>

<div>
  <p>With a minimum value of 0 and maximum value of 10</p>
  <NumberInput
    {value}
    {onMinus}
    {onChange}
    {onPlus}
    {onBlur}
    unit="%"
    min={0}
    max={10}
    inputName="input"
    inputAriaLabel="number input"
    minusBtnAriaLabel="minus"
    plusBtnAriaLabel="plus"
  />
</div>

