<script lang="ts">
  import type { TruncateProps, TruncatePosition } from './types';
  import '@patternfly/patternfly/components/Truncate/truncate.css';
  import '@patternfly/patternfly/components/Tooltip/tooltip.css';

  interface Props extends TruncateProps {
    content: string;
    position?: TruncatePosition;
    trailingNumChars?: number;
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
    class?: string;
    [key: string]: unknown;
  }

  let {
    content,
    position = 'end',
    trailingNumChars = 7,
    tooltipPosition = 'top',
    class: className = '',
    ...restProps
  }: Props = $props();

  let showTooltip = $state(false);
  let containerElement: HTMLSpanElement | null = $state(null);
  let isTruncated = $state(false);

  // Split content for middle truncation
  const startContent = $derived(() => {
    if (position === 'middle' && content.length > trailingNumChars) {
      return content.slice(0, content.length - trailingNumChars);
    }
    return content;
  });

  const endContent = $derived(() => {
    if (position === 'middle' && content.length > trailingNumChars) {
      return content.slice(-trailingNumChars);
    }
    return '';
  });

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-truncate', className].filter(Boolean).join(' ')
  );

  // Check if content is actually truncated
  function checkTruncation() {
    if (containerElement) {
      const startEl = containerElement.querySelector('.pf-v6-c-truncate__start');
      if (startEl) {
        isTruncated = startEl.scrollWidth > startEl.clientWidth;
      }
    }
  }

  // Handle hover for tooltip
  function handleMouseEnter() {
    checkTruncation();
    if (isTruncated) {
      showTooltip = true;
    }
  }

  function handleMouseLeave() {
    showTooltip = false;
  }

  function handleFocus() {
    checkTruncation();
    if (isTruncated) {
      showTooltip = true;
    }
  }

  function handleBlur() {
    showTooltip = false;
  }

  // Tooltip position styles
  const tooltipStyles = $derived(() => {
    const base = 'position: absolute; z-index: 1000; white-space: normal; max-width: 300px;';
    switch (tooltipPosition) {
      case 'top':
        return `${base} bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px;`;
      case 'bottom':
        return `${base} top: 100%; left: 50%; transform: translateX(-50%); margin-top: 8px;`;
      case 'left':
        return `${base} right: 100%; top: 50%; transform: translateY(-50%); margin-right: 8px;`;
      case 'right':
        return `${base} left: 100%; top: 50%; transform: translateY(-50%); margin-left: 8px;`;
      default:
        return `${base} bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px;`;
    }
  });
</script>

<span
  class={classes}
  tabindex="0"
  bind:this={containerElement}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  onfocus={handleFocus}
  onblur={handleBlur}
  style="position: relative; display: inline-flex; max-width: 100%;"
  {...restProps}
>
  {#if position === 'end'}
    <span class="pf-v6-c-truncate__start">{content}</span>
  {:else if position === 'start'}
    <span class="pf-v6-c-truncate__end">{content}</span>
  {:else if position === 'middle'}
    <span class="pf-v6-c-truncate__start">{startContent()}</span>
    <span class="pf-v6-c-truncate__end">{endContent()}</span>
  {/if}

  {#if showTooltip}
    <div
      class="pf-v6-c-tooltip pf-m-{tooltipPosition}"
      role="tooltip"
      style={tooltipStyles()}
    >
      <div class="pf-v6-c-tooltip__arrow"></div>
      <div class="pf-v6-c-tooltip__content">{content}</div>
    </div>
  {/if}
</span>
