<script lang="ts">
  import ProgressStepper from './ProgressStepper.svelte';
  import ProgressStep from './ProgressStep.svelte';
</script>

<ProgressStepper isCompact aria-label="Compact progress stepper">
  <ProgressStep
    variant="success"
    id="compact-step1"
    titleId="compact-step1-title"
    aria-label="completed step"
  >
    First step
  </ProgressStep>
  <ProgressStep
    variant="info"
    isCurrent
    id="compact-step2"
    titleId="compact-step2-title"
    aria-label="current step"
  >
    Second step
  </ProgressStep>
  <ProgressStep
    variant="pending"
    id="compact-step3"
    titleId="compact-step3-title"
    aria-label="pending step"
  >
    Third step
  </ProgressStep>
</ProgressStepper>

