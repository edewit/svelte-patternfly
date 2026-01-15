<script lang="ts">
  import type { WizardToggleProps } from './types';
  import AngleDownIcon from '../Icon/icons/AngleDownIcon.svelte';

  interface Props extends WizardToggleProps {
    currentStepName?: string;
    currentStepNumber?: number;
    isExpanded?: boolean;
    onToggle?: () => void;
    class?: string;
    [key: string]: unknown;
  }

  let {
    currentStepName,
    currentStepNumber,
    isExpanded = false,
    onToggle,
    class: className = '',
    ...restProps
  }: Props = $props();

  const classes = $derived(
    [
      'pf-v6-c-wizard__toggle',
      isExpanded && 'pf-m-expanded',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<button
  aria-label="Wizard Header Toggle"
  class={classes}
  aria-expanded={isExpanded}
  onclick={onToggle}
  type="button"
  {...restProps}
>
  <span class="pf-v6-c-wizard__toggle-list">
    <span class="pf-v6-c-wizard__toggle-list-item">
      {#if currentStepNumber}
        <span class="pf-v6-c-wizard__toggle-num">{currentStepNumber}</span>
      {/if}
      {currentStepName}
    </span>
  </span>
  <span class="pf-v6-c-wizard__toggle-icon">
    <AngleDownIcon />
  </span>
</button>
