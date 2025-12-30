<script lang="ts">
  import InputGroup from './InputGroup.svelte';
  import InputGroupItem from './InputGroupItem.svelte';
  import InputGroupText from './InputGroupText.svelte';
  import TextInput from '../TextInput/TextInput.svelte';
</script>

<InputGroup>
  <InputGroupItem isFill isDisabled>
    <TextInput aria-label="disabled input" isDisabled />
  </InputGroupItem>
  <InputGroupItem isBox isDisabled>
    <InputGroupText>
      @example.com
    </InputGroupText>
  </InputGroupItem>
</InputGroup>

