<script lang="ts">
  import Checkbox from './Checkbox.svelte';
  import { createRawSnippet } from 'svelte';

  let isChecked1 = $state<boolean | null>(false);
  let isChecked2 = $state(false);
  let isChecked3 = $state(false);
  let isChecked4 = $state(false);

  function handleChange(event: Event, checked: boolean) {
    const target = event.target as HTMLInputElement;
    const name = target.name;

    switch (name) {
      case 'check1':
        isChecked1 = checked;
        break;
      case 'check2':
        isChecked2 = checked;
        break;
      case 'check3':
        isChecked3 = checked;
        break;
      case 'check4':
        isChecked4 = checked;
        break;
    }
  }

  // Update parent checkbox based on children
  $effect(() => {
    if (isChecked1 !== null) {
      isChecked2 = isChecked1;
      isChecked3 = isChecked1;
    }
  });

  // Update parent checkbox based on children state
  $effect(() => {
    if (isChecked2 && isChecked3) {
      isChecked1 = true;
    } else if (!isChecked2 && !isChecked3) {
      isChecked1 = false;
    } else {
      isChecked1 = null; // indeterminate
    }
  });

  const label1 = createRawSnippet(() => ({ render: () => 'Parent CheckBox' }));
  const label2 = createRawSnippet(() => ({ render: () => 'Child CheckBox 1' }));
  const label3 = createRawSnippet(() => ({ render: () => 'Child CheckBox 2' }));
  const label4 = createRawSnippet(() => ({ render: () => 'Controlled CheckBox' }));
</script>

<div>
  <Checkbox
    label={label1}
    isChecked={isChecked1}
    onChange={handleChange}
    id="controlled-check-1"
    name="check1"
  />
  <div style="margin-left: 1.5rem;">
    <Checkbox
      label={label2}
      isChecked={isChecked2}
      onChange={handleChange}
      id="controlled-check-2"
      name="check2"
    />
    <Checkbox
      label={label3}
      isChecked={isChecked3}
      onChange={handleChange}
      id="controlled-check-3"
      name="check3"
    />
  </div>
</div>

<Checkbox
  label={label4}
  isChecked={isChecked4}
  onChange={handleChange}
  id="controlled-check-4"
  name="check4"
/>
