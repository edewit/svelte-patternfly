<script lang="ts">
  import ProgressStepper from './ProgressStepper.svelte';
  import ProgressStep from './ProgressStep.svelte';
</script>

<ProgressStepper aria-label="Progress stepper with descriptions">
  <ProgressStep
    variant="success"
    id="desc-step1"
    titleId="desc-step1-title"
    aria-label="completed step"
    description="This is the first thing to happen"
  >
    First step
  </ProgressStep>
  <ProgressStep
    variant="info"
    isCurrent
    id="desc-step2"
    titleId="desc-step2-title"
    aria-label="current step"
    description="This is the second thing to happen"
  >
    Second step
  </ProgressStep>
  <ProgressStep
    variant="pending"
    id="desc-step3"
    titleId="desc-step3-title"
    aria-label="pending step"
    description="This is the last thing to happen"
  >
    Third step
  </ProgressStep>
</ProgressStepper>

