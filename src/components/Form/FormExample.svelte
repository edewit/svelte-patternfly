<script lang="ts">
  import Form from './Form.svelte';
  import FormGroup from './FormGroup.svelte';
  import FormHelperText from './FormHelperText.svelte';
  import HelperText from '../HelperText/HelperText.svelte';
  import HelperTextItem from '../HelperText/HelperTextItem.svelte';
  import TextInput from '../TextInput/TextInput.svelte';
</script>

<Form>
  <FormGroup label="Full name" isRequired fieldId="simple-form-name-01">
    <TextInput
      id="simple-form-name-01"
      name="simple-form-name-01"
      aria-describedby="simple-form-name-01-helper"
    />
    <FormHelperText>
      <HelperText>
        <HelperTextItem>Include your middle name if you have one.</HelperTextItem>
      </HelperText>
    </FormHelperText>
  </FormGroup>
  <FormGroup label="Email" isRequired fieldId="simple-form-email-01">
    <TextInput type="email" id="simple-form-email-01" name="simple-form-email-01" />
  </FormGroup>
  <FormGroup label="Phone number" isRequired fieldId="simple-form-phone-01">
    <TextInput type="tel" id="simple-form-phone-01" name="simple-form-phone-01" placeholder="555-555-5555" />
  </FormGroup>
</Form>
