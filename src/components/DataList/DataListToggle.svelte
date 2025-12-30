<script lang="ts">
  import type { DataListToggleProps } from './types';
  import '@patternfly/patternfly/components/DataList/data-list.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends DataListToggleProps {
    id?: string;
    'aria-labelledby'?: string;
    'aria-label'?: string;
    'aria-controls'?: string;
    isExpanded?: boolean;
    onClick?: () => void;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    id,
    'aria-labelledby': ariaLabelledBy,
    'aria-label': ariaLabel,
    'aria-controls': ariaControls,
    isExpanded = false,
    onClick,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-data-list__toggle', className].filter(Boolean).join(' '));

  const iconClasses = $derived(['pf-v6-c-data-list__toggle-icon'].filter(Boolean).join(' '));

  function handleClick() {
    onClick?.();
  }
</script>

<div class={classes}>
  <button
    class="pf-v6-c-button pf-m-plain"
    type="button"
    {id}
    aria-labelledby={ariaLabelledBy}
    aria-label={ariaLabel}
    aria-controls={ariaControls}
    aria-expanded={isExpanded}
    onclick={handleClick}
    {...restProps}
  >
    <span class="pf-v6-c-button__icon pf-m-start">
      <div class={iconClasses}>
        <i class="fas fa-angle-right" aria-hidden="true"></i>
      </div>
    </span>
  </button>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
