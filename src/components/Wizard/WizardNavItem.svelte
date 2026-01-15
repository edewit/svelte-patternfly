<script lang="ts">
  import type { WizardNavItemProps } from './types';
  import AngleRightIcon from '../Icon/icons/AngleRightIcon.svelte';
  import CheckCircleIcon from '../Icon/icons/CheckCircleIcon.svelte';
  import ExclamationCircleIcon from '../Icon/icons/ExclamationCircleIcon.svelte';
  import ExclamationTriangleIcon from '../Icon/icons/ExclamationTriangleIcon.svelte';

  interface Props extends WizardNavItemProps {
    stepId: string;
    content?: string;
    isCurrent?: boolean;
    isDisabled?: boolean;
    isExpandable?: boolean;
    isExpanded?: boolean;
    stepIndex?: number;
    status?: 'default' | 'error' | 'success' | 'warning';
    onClick?: (event: MouseEvent, stepId: string) => void;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    stepId,
    content,
    isCurrent = false,
    isDisabled = false,
    isExpandable = false,
    isExpanded = false,
    stepIndex,
    status = 'default',
    onClick,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes for item
  const itemClasses = $derived(
    [
      'pf-v6-c-wizard__nav-item',
      isExpandable && 'pf-m-expandable',
      isExpanded && 'pf-m-expanded',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build CSS classes for link
  const linkClasses = $derived(
    [
      'pf-v6-c-wizard__nav-link',
      isCurrent && 'pf-m-current',
      status === 'error' && 'pf-m-danger',
      status === 'warning' && 'pf-m-warning',
      status === 'success' && 'pf-m-success'
    ]
      .filter(Boolean)
      .join(' ')
  );

  function handleClick(event: MouseEvent) {
    if (!isDisabled && onClick) {
      onClick(event, stepId);
    }
  }
</script>

<li class={itemClasses}>
  <button
    type="button"
    class={linkClasses}
    disabled={isDisabled}
    aria-current={isCurrent ? 'step' : undefined}
    aria-expanded={isExpandable ? isExpanded : undefined}
    onclick={handleClick}
    {...restProps}
  >
    <span class="pf-v6-c-wizard__nav-link-main">
      {#if status === 'success'}
        <span class="pf-v6-c-wizard__nav-link-status">
          <CheckCircleIcon />
        </span>
      {:else if status === 'error'}
        <span class="pf-v6-c-wizard__nav-link-status">
          <ExclamationCircleIcon />
        </span>
      {:else if status === 'warning'}
        <span class="pf-v6-c-wizard__nav-link-status">
          <ExclamationTriangleIcon />
        </span>
      {/if}
      <span class="pf-v6-c-wizard__nav-link-text">{content}</span>
      {#if isExpandable}
        <span class="pf-v6-c-wizard__nav-link-toggle">
          <span class="pf-v6-c-wizard__nav-link-toggle-icon">
            <AngleRightIcon />
          </span>
        </span>
      {/if}
    </span>
  </button>
  {#if children && isExpandable && isExpanded}
    <ol class="pf-v6-c-wizard__nav-list" role="list">
      {@render children()}
    </ol>
  {/if}
</li>
