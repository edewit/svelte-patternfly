<script lang="ts">
  import Wizard from './Wizard.svelte';
  import WizardStep from './WizardStep.svelte';

  interface Props {
    variant?:
      | 'basic'
      | 'with-header'
      | 'with-description'
      | 'custom-footer'
      | 'disabled-steps';
  }

  let { variant = 'basic' }: Props = $props();

  function handleClose() {
    console.log('Wizard closed');
  }

  function handleSave() {
    console.log('Wizard saved');
  }
</script>

{#if variant === 'basic'}
  <Wizard height={400} title="Basic wizard" onClose={handleClose} onSave={handleSave}>
    <WizardStep name="Step 1" id="basic-first-step">
      <p>
        The content of this step overflows and creates a scrollbar, which causes a tabindex of "0", a role of "region",
        and an aria-label or aria-labelledby to be applied.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum in neque nec pharetra. Duis lacinia
        vel sapien ut imperdiet. Nunc ultrices mollis dictum. Duis tempus, massa nec tincidunt tempor, enim ex porttitor
        odio, eu facilisis dolor tortor id sapien.
      </p>
    </WizardStep>
    <WizardStep name="Step 2" id="basic-second-step">
      Step 2 content
    </WizardStep>
    <WizardStep name="Review" id="basic-review-step" footer={{ nextButtonText: 'Finish' }}>
      Review step content
    </WizardStep>
  </Wizard>
{:else if variant === 'with-header'}
  <Wizard
    height={400}
    title="Wizard with header"
    hasHeader={true}
    hasCloseButton={true}
    onClose={handleClose}
    onSave={handleSave}
  >
    <WizardStep name="Step 1" id="header-first-step">
      Step 1 content
    </WizardStep>
    <WizardStep name="Step 2" id="header-second-step">
      Step 2 content
    </WizardStep>
    <WizardStep name="Review" id="header-review-step" footer={{ nextButtonText: 'Finish' }}>
      Review step content
    </WizardStep>
  </Wizard>
{:else if variant === 'with-description'}
  <Wizard
    height={400}
    title="Wizard with description"
    description="Here is where the description goes"
    onClose={handleClose}
    onSave={handleSave}
  >
    <WizardStep name="Information" id="desc-info-step">
      Information step content
    </WizardStep>
    <WizardStep name="Configuration" id="desc-config-step">
      Configuration step content
    </WizardStep>
    <WizardStep name="Review" id="desc-review-step" footer={{ nextButtonText: 'Finish' }}>
      Review step content
    </WizardStep>
  </Wizard>
{:else if variant === 'custom-footer'}
  <Wizard
    height={400}
    title="Custom footer text"
    nextButtonText="Continue"
    backButtonText="Previous"
    cancelButtonText="Exit"
    onClose={handleClose}
    onSave={handleSave}
  >
    <WizardStep name="Step 1" id="custom-first-step">
      Step 1 content
    </WizardStep>
    <WizardStep name="Step 2" id="custom-second-step">
      Step 2 content
    </WizardStep>
    <WizardStep name="Review" id="custom-review-step" footer={{ nextButtonText: 'Submit' }}>
      Review step content
    </WizardStep>
  </Wizard>
{:else if variant === 'disabled-steps'}
  <Wizard height={400} title="Wizard with disabled steps" onClose={handleClose} onSave={handleSave}>
    <WizardStep name="Step 1" id="disabled-first-step">
      Step 1 content
    </WizardStep>
    <WizardStep name="Step 2" id="disabled-second-step">
      Step 2 content
    </WizardStep>
    <WizardStep name="Step 3 (Disabled)" id="disabled-third-step" isDisabled>
      This step is disabled
    </WizardStep>
    <WizardStep name="Review" id="disabled-review-step" footer={{ nextButtonText: 'Finish' }}>
      Review step content
    </WizardStep>
  </Wizard>
{/if}
