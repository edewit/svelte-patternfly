<script lang="ts">
  import ProgressStepper from './ProgressStepper.svelte';
  import ProgressStep from './ProgressStep.svelte';
</script>

<ProgressStepper isVertical aria-label="Vertical progress stepper">
  <ProgressStep
    variant="success"
    id="vertical-step1"
    titleId="vertical-step1-title"
    aria-label="completed step"
    description="This is the first thing to happen"
  >
    First step
  </ProgressStep>
  <ProgressStep
    variant="info"
    isCurrent
    id="vertical-step2"
    titleId="vertical-step2-title"
    aria-label="current step"
    description="This is the second thing to happen"
  >
    Second step
  </ProgressStep>
  <ProgressStep
    variant="pending"
    id="vertical-step3"
    titleId="vertical-step3-title"
    aria-label="pending step"
    description="This is the last thing to happen"
  >
    Third step
  </ProgressStep>
</ProgressStepper>

