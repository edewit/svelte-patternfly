<script lang="ts">
  import ProgressStepper from './ProgressStepper.svelte';
  import ProgressStep from './ProgressStep.svelte';
</script>

<ProgressStepper aria-label="Progress stepper with failure">
  <ProgressStep
    variant="success"
    id="failure-step1"
    titleId="failure-step1-title"
    aria-label="completed step"
  >
    First step
  </ProgressStep>
  <ProgressStep
    variant="success"
    id="failure-step2"
    titleId="failure-step2-title"
    aria-label="completed step"
  >
    Second step
  </ProgressStep>
  <ProgressStep
    variant="danger"
    isCurrent
    id="failure-step3"
    titleId="failure-step3-title"
    aria-label="step with failure"
  >
    Third step
  </ProgressStep>
  <ProgressStep
    variant="pending"
    id="failure-step4"
    titleId="failure-step4-title"
    aria-label="pending step"
  >
    Fourth step
  </ProgressStep>
  <ProgressStep
    variant="pending"
    id="failure-step5"
    titleId="failure-step5-title"
    aria-label="pending step"
  >
    Fifth step
  </ProgressStep>
</ProgressStepper>

