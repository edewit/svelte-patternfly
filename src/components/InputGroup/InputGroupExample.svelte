<script lang="ts">
  import InputGroup from './InputGroup.svelte';
  import InputGroupItem from './InputGroupItem.svelte';
  import InputGroupText from './InputGroupText.svelte';
  import TextInput from '../TextInput/TextInput.svelte';
  import Icon from '../Icon/Icon.svelte';

  let emailValue = $state('');
  let usernameValue = $state('');
  let percentageValue = $state('');

  function handleEmailChange(event: Event, newValue: string) {
    emailValue = newValue;
  }

  function handleUsernameChange(event: Event, newValue: string) {
    usernameValue = newValue;
  }

  function handlePercentageChange(event: Event, newValue: string) {
    percentageValue = newValue;
  }
</script>

<InputGroup>
  <InputGroupItem isFill>
    <TextInput id="textInput-basic-1" type="email" aria-label="email input field" value={emailValue} onChange={handleEmailChange} />
  </InputGroupItem>
  <InputGroupItem isBox>
    <InputGroupText id="email-example">@example.com</InputGroupText>
  </InputGroupItem>
</InputGroup>

<br />

<InputGroup>
  <InputGroupItem isBox>
    <InputGroupText id="username">
      <Icon icon="fas fa-at" size="sm" />
    </InputGroupText>
  </InputGroupItem>
  <InputGroupItem isFill>
    <TextInput
      validated="error"
      id="textInput-basic-2"
      type="email"
      aria-label="Error state username example"
      value={usernameValue}
      onChange={handleUsernameChange}
    />
  </InputGroupItem>
</InputGroup>

<br />

<InputGroup>
  <InputGroupItem isFill>
    <TextInput name="textInput-basic-3" id="textInput-basic-3" type="text" aria-label="percentage" value={percentageValue} onChange={handlePercentageChange} />
  </InputGroupItem>
  <InputGroupItem isPlain isBox>
    <InputGroupText id="plain-example">
      %
    </InputGroupText>
  </InputGroupItem>
</InputGroup>

