<script lang="ts">
  import SearchInput from './SearchInput.svelte';

  let value = $state('test');
  const resultsCount = 3;

  function onChange(_event: Event, newValue: string) {
    value = newValue;
  }

  function onClear() {
    value = '';
  }
</script>

<SearchInput
  aria-label="Match with result count"
  placeholder="Find by name"
  {value}
  {onChange}
  {onClear}
  {resultsCount}
/>
