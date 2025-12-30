<script lang="ts">
  import ProgressStepper from './ProgressStepper.svelte';
  import ProgressStep from './ProgressStep.svelte';
</script>

<ProgressStepper aria-label="Progress stepper with issue">
  <ProgressStep
    variant="success"
    id="issue-step1"
    titleId="issue-step1-title"
    aria-label="completed step"
  >
    First step
  </ProgressStep>
  <ProgressStep
    variant="success"
    id="issue-step2"
    titleId="issue-step2-title"
    aria-label="completed step"
  >
    Second step
  </ProgressStep>
  <ProgressStep
    variant="warning"
    isCurrent
    id="issue-step3"
    titleId="issue-step3-title"
    aria-label="step with warning"
  >
    Third step
  </ProgressStep>
  <ProgressStep
    variant="pending"
    id="issue-step4"
    titleId="issue-step4-title"
    aria-label="pending step"
  >
    Fourth step
  </ProgressStep>
  <ProgressStep
    variant="pending"
    id="issue-step5"
    titleId="issue-step5-title"
    aria-label="pending step"
  >
    Fifth step
  </ProgressStep>
</ProgressStepper>

