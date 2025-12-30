<script lang="ts">
  import type { MultipleFileUploadStatusProps } from './types';
  import '@patternfly/patternfly/components/MultipleFileUpload/multiple-file-upload.css';
  import '@patternfly/patternfly/components/ExpandableSection/expandable-section.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends MultipleFileUploadStatusProps {}

  let {
    statusToggleText,
    statusToggleIcon = 'inProgress',
    'aria-label': ariaLabel = 'Current uploads',
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  let isExpanded = $state(true);

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-multiple-file-upload__status', className].filter(Boolean).join(' ')
  );

  // Get icon based on status
  const statusIcon = $derived(() => {
    switch (statusToggleIcon) {
      case 'success':
        return 'fas fa-check-circle';
      case 'danger':
        return 'fas fa-exclamation-circle';
      case 'inProgress':
      default:
        return 'fas fa-spinner fa-spin';
    }
  });

  function handleToggle() {
    isExpanded = !isExpanded;
  }

  // Generate unique ID for this status component
  const statusId = $derived(
    `multiple-file-upload-status-${Math.random().toString(36).substring(2, 11)}`
  );
  const toggleId = $derived(`${statusId}-toggle`);
  const contentId = $derived(`${statusId}-content`);
</script>

<div class={classes} {...restProps}>
  {#if statusToggleText}
    <div class="pf-v6-c-expandable-section pf-m-expanded" class:pf-m-expanded={isExpanded}>
      <div class="pf-v6-c-expandable-section__toggle">
        <button
          class="pf-v6-c-button pf-m-link"
          id={toggleId}
          type="button"
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onclick={handleToggle}
        >
          <span class="pf-v6-c-button__icon pf-m-start">
            <span class="pf-v6-c-expandable-section__toggle-icon">
              <i class="fas fa-angle-right" aria-hidden="true"></i>
            </span>
          </span>
          <span class="pf-v6-c-button__text">
            <div class="pf-v6-c-multiple-file-upload__status-progress">
              <div class="pf-v6-c-multiple-file-upload__status-progress-icon">
                <i class={statusIcon()} aria-hidden="true"></i>
              </div>
              <div class="pf-v6-c-multiple-file-upload__status-progress-text">
                {statusToggleText}
              </div>
            </div>
          </span>
        </button>
      </div>
      <div
        class="pf-v6-c-expandable-section__content"
        id={contentId}
        role="region"
        aria-labelledby={toggleId}
        hidden={!isExpanded}
      >
        {#if children}
          <ul class="pf-v6-c-multiple-file-upload__status-list" role="list" aria-label={ariaLabel}>
            {@render children()}
          </ul>
        {/if}
      </div>
    </div>
  {:else if children}
    <ul class="pf-v6-c-multiple-file-upload__status-list" role="list" aria-label={ariaLabel}>
      {@render children()}
    </ul>
  {/if}
</div>
