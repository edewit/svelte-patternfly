<script lang="ts">
  import TextArea from './TextArea.svelte';

  let value = $state('');

  function handleChange(event: Event, newValue: string) {
    value = newValue;
  }
</script>

<TextArea {value} onChange={handleChange} aria-label="text area example" />
