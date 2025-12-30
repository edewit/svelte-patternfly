<script lang="ts">
  import InputGroup from './InputGroup.svelte';
  import InputGroupItem from './InputGroupItem.svelte';
  import InputGroupText from './InputGroupText.svelte';
  import TextInput from '../TextInput/TextInput.svelte';
</script>

<InputGroup>
  <InputGroupItem isFill>
    <TextInput type="text" aria-label="percentage input" />
  </InputGroupItem>
  <InputGroupItem isPlain isBox>
    <InputGroupText>
      %
    </InputGroupText>
  </InputGroupItem>
</InputGroup>

