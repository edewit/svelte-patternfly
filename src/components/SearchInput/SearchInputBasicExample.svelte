<script lang="ts">
  import SearchInput from './SearchInput.svelte';

  let value = $state('');

  function onChange(_event: Event, newValue: string) {
    value = newValue;
  }

  function onClear() {
    value = '';
  }
</script>

<SearchInput
  aria-label="Search basic example"
  placeholder="Find by name"
  {value}
  {onChange}
  {onClear}
/>

