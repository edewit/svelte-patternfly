<script lang="ts">
  import InputGroup from './InputGroup.svelte';
  import InputGroupItem from './InputGroupItem.svelte';
  import TextInput from '../TextInput/TextInput.svelte';
  import Button from '../Button/Button.svelte';
</script>

<InputGroup>
  <InputGroupItem isBox>
    <Button variant="control">Button</Button>
  </InputGroupItem>
  <InputGroupItem isFill>
    <TextInput aria-label="input with box button" />
  </InputGroupItem>
</InputGroup>

