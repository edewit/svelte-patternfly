<script lang="ts">
  import type { PageToggleButtonProps } from './types';
  import '@patternfly/patternfly/components/Page/page.css';
  import '@patternfly/patternfly/components/Button/button.css';
  import { getContext } from 'svelte';

  interface Props extends PageToggleButtonProps {
    isHamburgerButton?: boolean;
    'aria-label'?: string;
    isSidebarOpen?: boolean;
    onSidebarToggle?: () => void;
    id?: string;
    class?: string;
  }

  let {
    isHamburgerButton = false,
    'aria-label': ariaLabel = 'Global navigation',
    isSidebarOpen: isSidebarOpenProp,
    onSidebarToggle,
    id,
    class: className = '',
    ...restProps
  }: Props = $props();

  // Get context for managed sidebar
  const pageContext = getContext<{
    isManagedSidebar?: boolean;
    toggleSidebar?: () => void;
  }>('page');

  function handleClick() {
    if (pageContext?.isManagedSidebar && pageContext?.toggleSidebar) {
      pageContext.toggleSidebar();
    } else if (onSidebarToggle) {
      onSidebarToggle();
    }
  }

  const classes = $derived(
    [
      'pf-v6-c-button',
      'pf-m-plain',
      isHamburgerButton && 'pf-m-hamburger',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<button
  class={classes}
  type="button"
  aria-label={ariaLabel}
  {id}
  onclick={handleClick}
  {...restProps}
>
  <span class="pf-v6-c-button__icon">
    {#if isHamburgerButton}
      <svg
        viewBox="0 0 10 10"
        class="pf-v6-c-button--hamburger-icon pf-v6-svg"
        width="1em"
        height="1em"
      >
        <path class="pf-v6-c-button--hamburger-icon--top" d="M1,1 L9,1" />
        <path
          class="pf-v6-c-button--hamburger-icon--middle"
          d="M1,5 L9,5"
        />
        <path
          class="pf-v6-c-button--hamburger-icon--arrow"
          d="M1,5 L1,5 L1,5"
        />
        <path
          class="pf-v6-c-button--hamburger-icon--bottom"
          d="M9,9 L1,9"
        />
      </svg>
    {/if}
  </span>
</button>

