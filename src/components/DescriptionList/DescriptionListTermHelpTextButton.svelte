<script lang="ts">
  import type { DescriptionListTermHelpTextButtonProps } from './types';
  import '@patternfly/patternfly/components/DescriptionList/description-list.css';

  interface Props extends DescriptionListTermHelpTextButtonProps {
    id?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    tabindex?: number;
    onclick?: (_event: MouseEvent) => void;
    onkeydown?: (_event: KeyboardEvent) => void;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    id,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    tabindex = 0,
    onclick: onclickProp,
    onkeydown,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-description-list__text', 'pf-m-help-text', className].filter(Boolean).join(' ')
  );

  // Handle click - use provided handler, but don't stop propagation
  // so Popover wrapper can handle it
  function handleClick(event: MouseEvent) {
    if (onclickProp) {
      onclickProp(event);
      // Only stop propagation if custom handler is provided
      event.stopPropagation();
    }
    // Otherwise let the event bubble to Popover wrapper
  }

  // Handle keyboard events for accessibility
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onclickProp) {
        onclickProp(event as unknown as MouseEvent);
        event.stopPropagation();
      }
      // Otherwise let the event bubble to Popover wrapper
    }
    if (onkeydown) {
      onkeydown(event);
    }
  }
</script>

<span
  class={classes}
  role="button"
  type="button"
  {tabindex}
  {id}
  aria-label={ariaLabel}
  aria-describedby={ariaDescribedBy}
  onclick={handleClick}
  onkeydown={handleKeyDown}
  {...restProps}
>
  {@render children?.()}
</span>
