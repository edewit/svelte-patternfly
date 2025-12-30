<script lang="ts">
  import type { ModalProps, ModalAppendToElement } from './types';
  import '@patternfly/patternfly/components/ModalBox/modal-box.css';
  import '@patternfly/patternfly/components/Backdrop/backdrop.css';
  import '@patternfly/patternfly/components/Button/button.css';
  import '@patternfly/patternfly/layouts/Bullseye/bullseye.css';
  import TimesIcon from '../Icon/icons/TimesIcon.svelte';

  interface Props extends ModalProps {
    isOpen?: boolean;
    onClose?: (event?: KeyboardEvent | MouseEvent) => void;
    ouiaId?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-label'?: string;
    appendTo?: ModalAppendToElement;
    variant?: 'small' | 'medium' | 'large' | 'default';
    position?: 'top' | 'default';
    width?: string;
    elementToFocus?: string | HTMLElement;
    showClose?: boolean;
    hasNoBodyWrapper?: boolean;
    disableFocusTrap?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    isOpen = false,
    onClose,
    ouiaId,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'aria-label': ariaLabel,
    appendTo,
    variant = 'default',
    position = 'default',
    width,
    elementToFocus,
    showClose = true,
    hasNoBodyWrapper = false,
    disableFocusTrap = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Modal element references
  let modalElement: HTMLElement | null = $state(null);
  let modalWrapperElement: HTMLElement | null = $state(null);
  let backdropElement: HTMLElement | null = $state(null);

  // Generate unique ID
  const modalId = $derived(ouiaId || `modal-${Math.random().toString(36).substring(2, 11)}`);

  // Build CSS classes
  const modalClasses = $derived(
    [
      'pf-v6-c-modal-box',
      variant !== 'default' && `pf-m-${variant}`,
      position === 'top' && 'pf-m-top',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Handle close
  function handleClose(event?: KeyboardEvent | MouseEvent) {
    if (onClose) {
      onClose(event);
    }
  }

  // Handle ESC key
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      handleClose(event);
    }
  }

  // Handle backdrop click
  function handleBackdropClick(event: MouseEvent) {
    if (event.target === backdropElement) {
      handleClose(event);
    }
  }

  // Focus management
  $effect(() => {
    if (isOpen && modalElement) {
      // Focus the modal or specified element
      if (elementToFocus) {
        const focusElement =
          typeof elementToFocus === 'string'
            ? (modalElement.querySelector(elementToFocus) as HTMLElement)
            : elementToFocus;
        if (focusElement) {
          focusElement.focus();
        }
      } else {
        // Focus the first focusable element in the modal
        const firstFocusable = modalElement.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }
    }
  });

  // Handle ESC key listener
  $effect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  });

  // Store target element for cleanup
  let targetElement: HTMLElement | null = $state(null);
  let frameId: number | null = $state(null);

  // Append to external container (portal)
  $effect(() => {
    // Determine target element
    if (appendTo === undefined || appendTo === null) {
      // Default to document.body
      targetElement = document.body;
    } else if (typeof appendTo === 'function') {
      try {
        targetElement = appendTo();
      } catch (error) {
        console.warn('Failed to get appendTo target:', error);
        targetElement = null;
      }
    } else if (appendTo instanceof HTMLElement) {
      targetElement = appendTo;
    } else {
      targetElement = document.body;
    }

    if (!isOpen || !modalWrapperElement || !backdropElement || !targetElement) {
      // Cleanup if modal is closing
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      if (backdropElement && targetElement && targetElement.contains(backdropElement)) {
        try {
          targetElement.removeChild(backdropElement);
        } catch (error) {
          // Element might have been removed already
        }
      }
      if (modalWrapperElement && targetElement && targetElement.contains(modalWrapperElement)) {
        try {
          targetElement.removeChild(modalWrapperElement);
        } catch (error) {
          // Element might have been removed already
        }
      }
      return;
    }

    // Use requestAnimationFrame to ensure DOM is ready
    frameId = requestAnimationFrame(() => {
      try {
        // Append backdrop first, then modal wrapper (only if not already appended)
        if (backdropElement && targetElement && !targetElement.contains(backdropElement)) {
          targetElement.appendChild(backdropElement);
        }
        if (modalWrapperElement && targetElement && !targetElement.contains(modalWrapperElement)) {
          targetElement.appendChild(modalWrapperElement);
        }
      } catch (error) {
        console.warn('Failed to append modal:', error);
      }
      frameId = null;
    });

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      if (backdropElement && targetElement && targetElement.contains(backdropElement)) {
        try {
          targetElement.removeChild(backdropElement);
        } catch (error) {
          // Element might have been removed already
        }
      }
      if (modalWrapperElement && targetElement && targetElement.contains(modalWrapperElement)) {
        try {
          targetElement.removeChild(modalWrapperElement);
        } catch (error) {
          // Element might have been removed already
        }
      }
    };
  });
</script>

{#if isOpen}
  <!-- Backdrop -->
  <div
    bind:this={backdropElement}
    class="pf-v6-c-backdrop"
    onclick={handleBackdropClick}
    aria-hidden="true"
  ></div>

  <!-- Modal wrapper with bullseye layout for centering -->
  <div bind:this={modalWrapperElement} class="pf-v6-l-bullseye" style="position: fixed; inset: 0; z-index: var(--pf-t--global--z-index--xl);">
    <!-- Modal -->
    <div
      bind:this={modalElement}
      class={modalClasses}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      data-ouia-component-id={ouiaId}
      style={width ? `--pf-v6-c-modal-box--Width: ${width}` : undefined}
      {...restProps}
    >
      {#if showClose}
        <div class="pf-v6-c-modal-box__close">
          <button
            class="pf-v6-c-button pf-m-plain"
            type="button"
            aria-label="Close"
            onclick={(e) => handleClose(e)}
          >
            <span class="pf-v6-c-button__icon">
              <TimesIcon />
            </span>
          </button>
        </div>
      {/if}
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
{/if}

