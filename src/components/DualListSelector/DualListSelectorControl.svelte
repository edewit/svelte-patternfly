<script lang="ts">
  import type { DualListSelectorControlProps } from './types';
  import Button from '../Button/Button.svelte';
  import '@patternfly/patternfly/components/DualListSelector/dual-list-selector.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends DualListSelectorControlProps {
    'aria-label'?: string;
    isDisabled?: boolean;
    onClick?: () => void;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    'aria-label': ariaLabel,
    isDisabled = false,
    onClick,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived([className].filter(Boolean).join(' '));
</script>

<Button
  variant="plain"
  {isDisabled}
  aria-label={ariaLabel}
  onclick={onClick}
  class={classes}
  {...restProps}
>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</Button>
