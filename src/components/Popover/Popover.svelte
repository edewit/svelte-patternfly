<script lang="ts">
  import type {
    PopoverProps,
    AppendToElement,
    PopoverPosition,
    PopoverTriggerAction
  } from './types';
  import '@patternfly/patternfly/components/Popover/popover.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends PopoverProps {
    id?: string;
    headerContent?: import('svelte').Snippet | string;
    bodyContent: import('svelte').Snippet | string;
    footerContent?: import('svelte').Snippet | string;
    showClose?: boolean;
    isVisible?: boolean;
    onClose?: () => void;
    position?: PopoverPosition;
    appendTo?: AppendToElement;
    triggerAction?: PopoverTriggerAction;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
    ariaModal?: boolean;
    hasNoPadding?: boolean;
    width?: string | 'auto';
    minWidth?: string;
    maxWidth?: string;
    elementToFocus?: string | HTMLElement;
    enableFlip?: boolean;
    flipBehavior?: 'flip' | 'clock' | 'counter';
    distance?: number;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    id,
    headerContent,
    bodyContent,
    footerContent,
    showClose = false,
    isVisible: controlledIsVisible,
    onClose,
    position = 'top',
    appendTo,
    triggerAction = 'click',
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaModal = true,
    hasNoPadding = false,
    width,
    minWidth,
    maxWidth,
    elementToFocus,
    enableFlip: _enableFlip = true,
    flipBehavior: _flipBehavior = 'flip',
    distance = 8,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Internal visibility state (used when isVisible is not controlled)
  let internalIsVisible = $state(false);

  // Determine if visibility is controlled
  const isControlled = controlledIsVisible !== undefined;
  const isVisible = $derived(isControlled ? controlledIsVisible! : internalIsVisible);

  // Trigger element reference
  let triggerElement: HTMLElement | null = $state(null);

  // Generate unique IDs
  const popoverId = $derived(id || `popover-${Math.random().toString(36).substring(2, 11)}`);
  const headerId = $derived(ariaLabelledBy || `${popoverId}-header`);
  const bodyId = $derived(ariaDescribedBy || `${popoverId}-body`);

  // Hover timeout for delayed closing
  let hoverTimeout: ReturnType<typeof setTimeout> | null = $state(null);

  // Toggle popover visibility
  function togglePopover() {
    if (!isControlled && triggerAction === 'click') {
      internalIsVisible = !internalIsVisible;
    }
  }

  function handleClose() {
    if (!isControlled) {
      internalIsVisible = false;
    }
    if (onClose) {
      onClose();
    }
  }

  // Handle hover open
  function handleMouseEnter() {
    if (triggerAction === 'hover' && !isControlled) {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }
      internalIsVisible = true;
    }
  }

  // Handle hover close with delay
  function handleMouseLeave() {
    if (triggerAction === 'hover' && !isControlled) {
      // Clear any existing timeout
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      // Delay closing to allow moving mouse to popover
      hoverTimeout = setTimeout(() => {
        internalIsVisible = false;
        hoverTimeout = null;
      }, 100);
    }
  }

  // Clean up timeout on unmount
  $effect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  });

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-popover',
      position !== 'auto' && `pf-m-${position}`,
      hasNoPadding && 'pf-m-no-padding',
      width === 'auto' && 'pf-m-width-auto',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Handle appendTo - append popover to external container if specified
  // Default to document.body if not specified
  let popoverElement: HTMLDivElement | null = $state(null);
  let popoverPosition = $state({ top: 0, left: 0 });

  // Build content styles
  const contentStyles = $derived(
    [
      width && width !== 'auto' && `width: ${width};`,
      minWidth && `min-width: ${minWidth};`,
      maxWidth && `max-width: ${maxWidth};`
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Determine if popover should be appended to external container
  const shouldAppendToExternal = $derived(appendTo !== 'parent' && appendTo !== 'inline');

  // Build trigger wrapper styles
  const triggerWrapperStyles = $derived(
    shouldAppendToExternal ? 'display: inline-block;' : 'display: inline-block; position: relative;'
  );

  // Build popover styles
  const popoverStyles = $derived(
    shouldAppendToExternal
      ? `position: absolute; top: ${popoverPosition.top}px; left: ${popoverPosition.left}px; z-index: 1000; ${contentStyles}`
      : `position: absolute; ${contentStyles}`
  );

  // Calculate popover position relative to trigger
  function calculatePosition() {
    if (!triggerElement || !popoverElement) return;

    const triggerRect = triggerElement.getBoundingClientRect();
    const popoverRect = popoverElement.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollY - popoverRect.height - distance;
        left = triggerRect.left + scrollX + triggerRect.width / 2 - popoverRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + distance;
        left = triggerRect.left + scrollX + triggerRect.width / 2 - popoverRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + scrollY + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.left + scrollX - popoverRect.width - distance;
        break;
      case 'right':
        top = triggerRect.top + scrollY + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.right + scrollX + distance;
        break;
      case 'top-start':
        top = triggerRect.top + scrollY - popoverRect.height - distance;
        left = triggerRect.left + scrollX;
        break;
      case 'top-end':
        top = triggerRect.top + scrollY - popoverRect.height - distance;
        left = triggerRect.right + scrollX - popoverRect.width;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + scrollY + distance;
        left = triggerRect.left + scrollX;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + scrollY + distance;
        left = triggerRect.right + scrollX - popoverRect.width;
        break;
      case 'left-start':
        top = triggerRect.top + scrollY;
        left = triggerRect.left + scrollX - popoverRect.width - distance;
        break;
      case 'left-end':
        top = triggerRect.bottom + scrollY - popoverRect.height;
        left = triggerRect.left + scrollX - popoverRect.width - distance;
        break;
      case 'right-start':
        top = triggerRect.top + scrollY;
        left = triggerRect.right + scrollX + distance;
        break;
      case 'right-end':
        top = triggerRect.bottom + scrollY - popoverRect.height;
        left = triggerRect.right + scrollX + distance;
        break;
      default:
        // 'auto' - default to top
        top = triggerRect.top + scrollY - popoverRect.height - distance;
        left = triggerRect.left + scrollX + triggerRect.width / 2 - popoverRect.width / 2;
    }

    popoverPosition = { top, left };
  }

  // Update position when visible or position changes
  // For inline mode, we still need to calculate position but use CSS transforms instead of absolute positioning
  $effect(() => {
    if (isVisible && triggerElement && popoverElement) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (shouldAppendToExternal) {
          calculatePosition();
        } else {
          // For inline mode, calculate position and apply via CSS transform
          // Apply transform for inline positioning
          if (popoverElement && triggerElement) {
            const triggerRect = triggerElement.getBoundingClientRect();
            const popoverRect = popoverElement.getBoundingClientRect();

            let translateX = 0;
            let translateY = 0;

            switch (position) {
              case 'top':
                translateX = triggerRect.width / 2 - popoverRect.width / 2;
                translateY = -popoverRect.height - distance;
                break;
              case 'bottom':
                translateX = triggerRect.width / 2 - popoverRect.width / 2;
                translateY = triggerRect.height + distance;
                break;
              case 'left':
                translateX = -popoverRect.width - distance;
                translateY = triggerRect.height / 2 - popoverRect.height / 2;
                break;
              case 'right':
                translateX = triggerRect.width + distance;
                translateY = triggerRect.height / 2 - popoverRect.height / 2;
                break;
              default:
                translateX = triggerRect.width / 2 - popoverRect.width / 2;
                translateY = -popoverRect.height - distance;
            }

            popoverElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
          }
        }
      });

      // Update position on scroll and resize
      const updatePosition = () => {
        if (isVisible && triggerElement && popoverElement) {
          if (shouldAppendToExternal) {
            calculatePosition();
          } else {
            // Recalculate transform for inline mode
            if (triggerElement && popoverElement) {
              const triggerRect = triggerElement.getBoundingClientRect();
              const popoverRect = popoverElement.getBoundingClientRect();

              let translateX = 0;
              let translateY = 0;

              switch (position) {
                case 'top':
                  translateX = triggerRect.width / 2 - popoverRect.width / 2;
                  translateY = -popoverRect.height - distance;
                  break;
                case 'bottom':
                  translateX = triggerRect.width / 2 - popoverRect.width / 2;
                  translateY = triggerRect.height + distance;
                  break;
                case 'left':
                  translateX = -popoverRect.width - distance;
                  translateY = triggerRect.height / 2 - popoverRect.height / 2;
                  break;
                case 'right':
                  translateX = triggerRect.width + distance;
                  translateY = triggerRect.height / 2 - popoverRect.height / 2;
                  break;
                default:
                  translateX = triggerRect.width / 2 - popoverRect.width / 2;
                  translateY = -popoverRect.height - distance;
              }

              popoverElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
            }
          }
        }
      };

      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  });

  // Handle click outside to close popover
  $effect(() => {
    if (!isVisible || isControlled) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        popoverElement &&
        triggerElement &&
        !popoverElement.contains(target) &&
        !triggerElement.contains(target)
      ) {
        handleClose();
      }
    }

    // Use setTimeout to avoid immediate trigger
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  });

  // Append to external container
  // Default to document.body if not specified, unless appendTo is 'parent' or 'inline'
  $effect(() => {
    // Skip if popover is not visible or element not bound yet
    if (!isVisible || !popoverElement) {
      return;
    }

    // Determine target element
    let targetElement: HTMLElement | null = null;

    // If appendTo is 'parent' or 'inline', render inline (don't append)
    if (appendTo === 'parent' || appendTo === 'inline') {
      return;
    }

    // Determine target element
    if (appendTo === undefined || appendTo === null) {
      // Default to document.body
      targetElement = document.body;
    } else if (typeof appendTo === 'function') {
      try {
        targetElement = appendTo();
      } catch (error) {
        console.warn('Failed to get appendTo target:', error);
        return;
      }
    } else if (appendTo instanceof HTMLElement) {
      targetElement = appendTo;
    }

    if (!targetElement) {
      return;
    }

    // Use requestAnimationFrame to ensure DOM is ready
    const frameId = requestAnimationFrame(() => {
      if (popoverElement && targetElement && !targetElement.contains(popoverElement)) {
        try {
          targetElement.appendChild(popoverElement);
          // Recalculate position after appending
          calculatePosition();
        } catch (error) {
          console.warn('Failed to append popover:', error);
        }
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
      if (popoverElement && targetElement && targetElement.contains(popoverElement)) {
        try {
          targetElement.removeChild(popoverElement);
        } catch (error) {
          // Element might have been removed already
        }
      }
    };
  });

  // Focus management
  $effect(() => {
    if (isVisible && popoverElement && elementToFocus) {
      const focusElement =
        typeof elementToFocus === 'string'
          ? (popoverElement.querySelector(elementToFocus) as HTMLElement)
          : elementToFocus;
      if (focusElement) {
        focusElement.focus();
      }
    }
  });
</script>

<!-- Trigger element wrapper -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={triggerElement}
  style={triggerWrapperStyles}
  onclick={(_e) => {
    // Toggle popover when clicking anywhere within the trigger element
    // The children (e.g., Button) will handle its own accessibility
    togglePopover();
  }}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  {@render children?.()}
</div>

<!-- Popover content (rendered in portal when visible) -->
{#if isVisible}
  <div
    bind:this={popoverElement}
    class={classes}
    id={popoverId}
    role="dialog"
    aria-modal={ariaModal}
    aria-label={ariaLabel}
    aria-labelledby={headerContent ? headerId : undefined}
    aria-describedby={bodyId}
    style={popoverStyles}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    {...restProps}
  >
    <div class="pf-v6-c-popover__arrow"></div>
    <div class="pf-v6-c-popover__content">
      {#if showClose}
        <div class="pf-v6-c-popover__close">
          <button
            class="pf-v6-c-button pf-m-plain"
            type="button"
            aria-label="Close"
            onclick={handleClose}
          >
            <span class="pf-v6-c-button__icon">
              <i class="fas fa-times" aria-hidden="true"></i>
            </span>
          </button>
        </div>
      {/if}
      {#if headerContent}
        <header class="pf-v6-c-popover__header">
          <div class="pf-v6-c-popover__title" id={headerId}>
            <h1 class="pf-v6-c-popover__title-text">
              {#if typeof headerContent === 'string'}
                {headerContent}
              {:else}
                {@render headerContent()}
              {/if}
            </h1>
          </div>
        </header>
      {/if}
      <div class="pf-v6-c-popover__body" id={bodyId}>
        {#if typeof bodyContent === 'string'}
          {bodyContent}
        {:else}
          {@render bodyContent()}
        {/if}
      </div>
      {#if footerContent}
        <footer class="pf-v6-c-popover__footer">
          {#if typeof footerContent === 'string'}
            {footerContent}
          {:else}
            {@render footerContent()}
          {/if}
        </footer>
      {/if}
    </div>
  </div>
{/if}
