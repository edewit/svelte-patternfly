<script lang="ts">
  import InputGroup from './InputGroup.svelte';
  import InputGroupItem from './InputGroupItem.svelte';
  import InputGroupText from './InputGroupText.svelte';
  import TextArea from '../TextArea/TextArea.svelte';
  import Button from '../Button/Button.svelte';
</script>

<InputGroup>
  <InputGroupItem isFill>
    <TextArea aria-label="textarea example" rows={3} />
  </InputGroupItem>
  <InputGroupItem>
    <Button variant="control">Button</Button>
  </InputGroupItem>
</InputGroup>

