<script lang="ts">
  import InputGroup from './InputGroup.svelte';
  import InputGroupItem from './InputGroupItem.svelte';
  import InputGroupText from './InputGroupText.svelte';
  import TextInput from '../TextInput/TextInput.svelte';
  import Icon from '../Icon/Icon.svelte';
</script>

<InputGroup>
  <InputGroupItem isBox>
    <InputGroupText>
      <Icon icon="fas fa-at" size="sm" />
    </InputGroupText>
  </InputGroupItem>
  <InputGroupItem isFill>
    <TextInput type="email" aria-label="email input with icon" />
  </InputGroupItem>
</InputGroup>

