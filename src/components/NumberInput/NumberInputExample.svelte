<script lang="ts">
  import NumberInput from './NumberInput.svelte';

  let value = $state<number | ''>(90);

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

<NumberInput
  {value}
  {onMinus}
  {onChange}
  {onPlus}
  inputName="input"
  inputAriaLabel="number input"
  minusBtnAriaLabel="minus"
  plusBtnAriaLabel="plus"
/>

