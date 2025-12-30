<script lang="ts">
  import Form from './Form.svelte';
  import FormGroup from './FormGroup.svelte';
  import TextInput from '../TextInput/TextInput.svelte';
</script>

<Form isWidthLimited={true}>
  <FormGroup label="Full name" isRequired fieldId="limit-width-form-name-01">
    <TextInput id="limit-width-form-name-01" name="limit-width-form-name-01" />
  </FormGroup>
  <FormGroup label="Email" isRequired fieldId="limit-width-form-email-01">
    <TextInput type="email" id="limit-width-form-email-01" name="limit-width-form-email-01" />
  </FormGroup>
</Form>








