<script lang="ts">
  import Form from './Form.svelte';
  import FormGroup from './FormGroup.svelte';
  import TextInput from '../TextInput/TextInput.svelte';
</script>

<Form isHorizontal={true}>
  <FormGroup label="Full name" isRequired fieldId="horizontal-form-name-01">
    <TextInput id="horizontal-form-name-01" name="horizontal-form-name-01" />
  </FormGroup>
  <FormGroup label="Email" isRequired fieldId="horizontal-form-email-01">
    <TextInput type="email" id="horizontal-form-email-01" name="horizontal-form-email-01" />
  </FormGroup>
</Form>








