<script lang="ts">
  import type { WizardProps, WizardStep, WizardStepFooter } from './types';
  import { setContext } from 'svelte';
  import WizardHeader from './WizardHeader.svelte';
  import WizardNav from './WizardNav.svelte';
  import WizardNavItem from './WizardNavItem.svelte';
  import WizardFooter from './WizardFooter.svelte';
  import WizardToggle from './WizardToggle.svelte';
  import '@patternfly/patternfly/components/Wizard/wizard.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends WizardProps {
    title?: string;
    description?: string;
    height?: number | string;
    width?: number | string;
    activeStepId?: string;
    onStepChange?: (event: Event, currentStep: WizardStep, prevStep: WizardStep) => void;
    onClose?: () => void;
    onSave?: () => void;
    hasCloseButton?: boolean;
    hasHeader?: boolean;
    isNavExpanded?: boolean;
    nextButtonText?: string;
    backButtonText?: string;
    cancelButtonText?: string;
    navAriaLabel?: string;
    mainAriaLabel?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    title,
    description,
    height,
    width,
    activeStepId,
    onStepChange,
    onClose,
    onSave,
    hasCloseButton = true,
    hasHeader = true,
    isNavExpanded: isNavExpandedProp = false,
    nextButtonText = 'Next',
    backButtonText = 'Back',
    cancelButtonText = 'Cancel',
    navAriaLabel = 'Steps',
    mainAriaLabel,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Internal state
  let steps: WizardStep[] = $state([]);
  let currentStepIndex = $state(0);
  let isNavExpanded = $state(isNavExpandedProp);

  // Computed values
  const currentStep = $derived(steps[currentStepIndex]);
  const isFirstStep = $derived(currentStepIndex === 0);
  const isLastStep = $derived(currentStepIndex === steps.length - 1);

  // Get footer config for current step
  const currentFooter = $derived<WizardStepFooter>({
    nextButtonText: currentStep?.footer?.nextButtonText || (isLastStep ? 'Finish' : nextButtonText),
    backButtonText: currentStep?.footer?.backButtonText || backButtonText,
    cancelButtonText: currentStep?.footer?.cancelButtonText || cancelButtonText,
    hideCancelButton: currentStep?.footer?.hideCancelButton || false,
    isNextDisabled: currentStep?.footer?.isNextDisabled || false,
    isBackDisabled: currentStep?.footer?.isBackDisabled || false
  });

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-wizard', className].filter(Boolean).join(' ')
  );

  // Build styles
  const styles = $derived(
    [
      height && `height: ${typeof height === 'number' ? `${height}px` : height}`,
      width && `width: ${typeof width === 'number' ? `${width}px` : width}`
    ]
      .filter(Boolean)
      .join('; ')
  );

  // Register a step
  function registerStep(step: WizardStep) {
    steps = [...steps, { ...step, index: steps.length }];
    
    // Set initial active step
    if (activeStepId && step.id === activeStepId) {
      currentStepIndex = steps.length - 1;
    }
  }

  // Unregister a step
  function unregisterStep(stepId: string) {
    steps = steps.filter((s) => s.id !== stepId);
  }

  // Go to a specific step
  function goToStep(stepId: string, event?: Event) {
    const stepIndex = steps.findIndex((s) => s.id === stepId);
    if (stepIndex !== -1 && !steps[stepIndex].isDisabled) {
      const prevStep = currentStep;
      currentStepIndex = stepIndex;
      if (onStepChange && event) {
        onStepChange(event, steps[stepIndex], prevStep);
      }
    }
  }

  // Go to next step
  function goToNextStep(event: MouseEvent) {
    if (isLastStep) {
      onSave?.();
    } else {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < steps.length && !steps[nextIndex].isDisabled) {
        const prevStep = currentStep;
        currentStepIndex = nextIndex;
        if (onStepChange) {
          onStepChange(event, steps[nextIndex], prevStep);
        }
      }
    }
  }

  // Go to previous step
  function goToPrevStep(event: MouseEvent) {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0 && !steps[prevIndex].isDisabled) {
      const prevStep = currentStep;
      currentStepIndex = prevIndex;
      if (onStepChange) {
        onStepChange(event, steps[prevIndex], prevStep);
      }
    }
  }

  // Handle cancel
  function handleCancel(event: MouseEvent) {
    onClose?.();
  }

  // Toggle nav on mobile
  function toggleNav() {
    isNavExpanded = !isNavExpanded;
  }

  // Handle nav item click
  function handleNavItemClick(event: MouseEvent, stepId: string) {
    goToStep(stepId, event);
    isNavExpanded = false;
  }

  // Create context for children
  setContext('wizard', {
    registerStep,
    unregisterStep,
    goToStep,
    get currentStepId() {
      return currentStep?.id;
    },
    get steps() {
      return steps;
    }
  });
</script>

<div class={classes} style={styles || undefined} {...restProps}>
  {#if hasHeader && (title || description)}
    <WizardHeader
      {title}
      {description}
      hasCloseButton={hasCloseButton}
      onClose={onClose}
    />
  {/if}

  <WizardToggle
    currentStepName={currentStep?.name}
    currentStepNumber={currentStepIndex + 1}
    isExpanded={isNavExpanded}
    onToggle={toggleNav}
  />

  <div class="pf-v6-c-wizard__outer-wrap">
    <div class="pf-v6-c-wizard__inner-wrap">
      <WizardNav aria-label={navAriaLabel} isExpanded={isNavExpanded}>
        {#each steps as step, index}
          {#if !step.isHidden}
            <WizardNavItem
              stepId={step.id}
              content={step.name}
              isCurrent={currentStep?.id === step.id}
              isDisabled={step.isDisabled}
              stepIndex={index + 1}
              status={step.status}
              onClick={handleNavItemClick}
            />
          {/if}
        {/each}
      </WizardNav>

      <main class="pf-v6-c-wizard__main" aria-label={mainAriaLabel} tabindex={0}>
        <div class="pf-v6-c-wizard__main-body">
          {@render children?.()}
        </div>
      </main>
    </div>

    <WizardFooter
      nextButtonText={currentFooter.nextButtonText}
      backButtonText={currentFooter.backButtonText}
      cancelButtonText={currentFooter.cancelButtonText}
      hideCancelButton={currentFooter.hideCancelButton}
      isNextDisabled={currentFooter.isNextDisabled}
      isBackDisabled={currentFooter.isBackDisabled || isFirstStep}
      {isFirstStep}
      {isLastStep}
      onNext={goToNextStep}
      onBack={goToPrevStep}
      onCancel={handleCancel}
    />
  </div>
</div>
