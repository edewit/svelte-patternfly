<script lang="ts">
  import type { LabelProps, LabelColor, LabelStatus, LabelVariant } from './types';
  import '@patternfly/patternfly/components/Label/label.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends LabelProps {
    color?: LabelColor;
    status?: LabelStatus;
    variant?: LabelVariant;
    isCompact?: boolean;
    isDisabled?: boolean;
    icon?: import('svelte').Snippet | string;
    onClose?: () => void;
    onClick?: (event: MouseEvent) => void;
    href?: string;
    textMaxWidth?: string;
    id?: string;
    'aria-label'?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    color,
    status,
    variant = 'filled',
    isCompact = false,
    isDisabled = false,
    icon,
    onClose,
    onClick,
    href,
    textMaxWidth,
    id,
    'aria-label': ariaLabel,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Generate IDs for accessibility
  const labelId = $derived(id || `label-${Math.random().toString(36).substring(2, 11)}`);
  const textId = $derived(`${labelId}-text`);
  const closeButtonId = $derived(`${labelId}-button`);

  // Determine if label is clickable
  const isClickable = $derived(!!(onClick || href));

  // Determine content element (a, button, or span)
  const contentTag = $derived(() => {
    if (href) return 'a';
    if (onClick) return 'button';
    return 'span';
  });

  // Build CSS classes for the label
  const labelClasses = $derived(
    [
      'pf-v6-c-label',
      `pf-m-${variant}`,
      color && `pf-m-${color}`,
      status && `pf-m-${status}`,
      isCompact && 'pf-m-compact',
      isDisabled && 'pf-m-disabled',
      isClickable && 'pf-m-clickable',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build CSS classes for the content
  const contentClasses = $derived(
    ['pf-v6-c-label__content', isClickable && 'pf-m-clickable'].filter(Boolean).join(' ')
  );

  // Build style for text element (for textMaxWidth)
  const textStyle = $derived(
    textMaxWidth ? `--pf-v6-c-label__text--MaxWidth: ${textMaxWidth}` : ''
  );

  // Handle click events
  function handleClick(event: MouseEvent) {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (onClick) {
      onClick(event);
    }
  }

  // Handle close button click
  function handleClose(event: MouseEvent) {
    event.stopPropagation();
    if (!isDisabled && onClose) {
      onClose();
    }
  }

  // Determine if icon is a string (class) or snippet
  const iconIsString = $derived(typeof icon === 'string');
  const iconIsSnippet = $derived(!!icon && typeof icon !== 'string');
</script>

<span class={labelClasses} id={labelId} {...restProps}>
  {#if contentTag === 'a'}
    <a
      class={contentClasses}
      href={isDisabled ? undefined : href}
      tabindex={isDisabled ? -1 : undefined}
      aria-disabled={isDisabled ? 'true' : undefined}
      aria-label={ariaLabel}
      onclick={handleClick}
    >
      {#if icon}
        <span class="pf-v6-c-label__icon">
          {#if iconIsString}
            <i class={icon} aria-hidden="true"></i>
          {:else if iconIsSnippet}
            {@render icon()}
          {/if}
        </span>
      {/if}
      <span class="pf-v6-c-label__text" id={textId} style={textStyle}>
        {#if typeof children === 'string'}
          {children}
        {:else if children}
          {@render children()}
        {/if}
      </span>
    </a>
  {:else if contentTag === 'button'}
    <button
      class={contentClasses}
      type="button"
      disabled={isDisabled}
      aria-label={ariaLabel}
      onclick={handleClick}
    >
      {#if icon}
        <span class="pf-v6-c-label__icon">
          {#if iconIsString}
            <i class={icon} aria-hidden="true"></i>
          {:else if iconIsSnippet}
            {@render icon()}
          {/if}
        </span>
      {/if}
      <span class="pf-v6-c-label__text" id={textId} style={textStyle}>
        {#if typeof children === 'string'}
          {children}
        {:else if children}
          {@render children()}
        {/if}
      </span>
    </button>
  {:else}
    <span class={contentClasses}>
      {#if icon}
        <span class="pf-v6-c-label__icon">
          {#if iconIsString}
            <i class={icon} aria-hidden="true"></i>
          {:else if iconIsSnippet}
            {@render icon()}
          {/if}
        </span>
      {/if}
      <span class="pf-v6-c-label__text" id={textId} style={textStyle}>
        {#if typeof children === 'string'}
          {children}
        {:else if children}
          {@render children()}
        {/if}
      </span>
    </span>
  {/if}

  {#if onClose}
    <span class="pf-v6-c-label__actions">
      <button
        class="pf-v6-c-button pf-m-no-padding pf-m-plain"
        type="button"
        id={closeButtonId}
        aria-label="Remove"
        aria-labelledby="{closeButtonId} {textId}"
        disabled={isDisabled}
        onclick={handleClose}
      >
        <span class="pf-v6-c-button__icon">
          <i class="fas fa-times fa-fw" aria-hidden="true"></i>
        </span>
      </button>
    </span>
  {/if}
</span>

