<script lang="ts">
  import InputGroup from './InputGroup.svelte';
  import InputGroupItem from './InputGroupItem.svelte';
  import InputGroupText from './InputGroupText.svelte';
  import TextInput from '../TextInput/TextInput.svelte';
  import Button from '../Button/Button.svelte';
</script>

<InputGroup>
  <InputGroupItem>
    <select aria-label="dropdown example">
      <option>Dropdown</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </InputGroupItem>
  <InputGroupItem isFill>
    <TextInput aria-label="text input with dropdown" />
  </InputGroupItem>
  <InputGroupItem>
    <Button variant="control">Button</Button>
  </InputGroupItem>
</InputGroup>

