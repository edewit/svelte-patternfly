<script lang="ts">
  import type { WizardFooterProps } from './types';
  import Button from '../Button/Button.svelte';

  interface Props extends WizardFooterProps {
    nextButtonText?: string;
    backButtonText?: string;
    cancelButtonText?: string;
    hideCancelButton?: boolean;
    isNextDisabled?: boolean;
    isBackDisabled?: boolean;
    isFirstStep?: boolean;
    isLastStep?: boolean;
    onNext?: (event: MouseEvent) => void;
    onBack?: (event: MouseEvent) => void;
    onCancel?: (event: MouseEvent) => void;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    nextButtonText = 'Next',
    backButtonText = 'Back',
    cancelButtonText = 'Cancel',
    hideCancelButton = false,
    isNextDisabled = false,
    isBackDisabled = false,
    isFirstStep = false,
    isLastStep = false,
    onNext,
    onBack,
    onCancel,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(
    ['pf-v6-c-wizard__footer', className].filter(Boolean).join(' ')
  );
</script>

<footer class={classes} {...restProps}>
  {#if children}
    {@render children()}
  {:else}
    <div class="pf-v6-c-action-list">
      <div class="pf-v6-c-action-list__group">
        {#if !isFirstStep}
          <div class="pf-v6-c-action-list__item">
            <Button
              variant="secondary"
              isDisabled={isBackDisabled}
              onclick={onBack}
            >
              {backButtonText}
            </Button>
          </div>
        {/if}
        <div class="pf-v6-c-action-list__item">
          <Button
            variant="primary"
            isDisabled={isNextDisabled}
            onclick={onNext}
          >
            {nextButtonText}
          </Button>
        </div>
      </div>
      {#if !hideCancelButton}
        <div class="pf-v6-c-action-list__group">
          <div class="pf-v6-c-action-list__item">
            <Button variant="link" onclick={onCancel}>
              {cancelButtonText}
            </Button>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</footer>
