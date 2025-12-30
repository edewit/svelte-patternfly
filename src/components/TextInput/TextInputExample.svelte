<script lang="ts">
  import TextInput from './TextInput.svelte';

  let value = $state('');

  function handleChange(event: Event, newValue: string) {
    value = newValue;
  }
</script>

<TextInput {value} type="text" onChange={handleChange} aria-label="text input example" />
