<script lang="ts">
  import Radio from './Radio.svelte';
  import { createRawSnippet } from 'svelte';

  let check1 = $state(false);

  function handleChange(event: Event, checked: boolean) {
    check1 = checked;
  }

  const label1 = createRawSnippet(() => ({ render: () => 'Controlled Radio' }));
</script>

<Radio
  isChecked={check1}
  name="radio-1"
  onChange={handleChange}
  label={label1}
  id="radio-controlled"
/>
