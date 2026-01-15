<script lang="ts">
  import type { WizardStepProps, WizardStep } from './types';
  import { getContext, onMount, onDestroy } from 'svelte';

  interface Props extends WizardStepProps {
    id: string;
    name: string;
    isDisabled?: boolean;
    isHidden?: boolean;
    status?: 'default' | 'error' | 'success' | 'warning';
    footer?: {
      nextButtonText?: string;
      backButtonText?: string;
      cancelButtonText?: string;
      hideCancelButton?: boolean;
      isNextDisabled?: boolean;
      isBackDisabled?: boolean;
    };
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    id,
    name,
    isDisabled = false,
    isHidden = false,
    status = 'default',
    footer,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get wizard context
  const wizardContext = getContext<{
    registerStep: (step: WizardStep) => void;
    unregisterStep: (stepId: string) => void;
    currentStepId?: string;
  }>('wizard');

  // Register step on mount
  onMount(() => {
    wizardContext?.registerStep({
      id,
      name,
      isDisabled,
      isHidden,
      status,
      footer
    });
  });

  // Unregister step on destroy
  onDestroy(() => {
    wizardContext?.unregisterStep(id);
  });

  // Check if this step is current
  const isCurrent = $derived(wizardContext?.currentStepId === id);

  const classes = $derived(
    ['pf-v6-c-wizard__step', className].filter(Boolean).join(' ')
  );
</script>

{#if isCurrent}
  <div class={classes} {...restProps}>
    {@render children?.()}
  </div>
{/if}
