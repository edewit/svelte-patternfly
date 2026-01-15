<script lang="ts">
  import type { TextInputGroupProps } from './types';
  import '@patternfly/patternfly/components/TextInputGroup/text-input-group.css';

  interface Props extends TextInputGroupProps {
    className?: string;
    class?: string;
    isDisabled?: boolean;
    isPlain?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    className = '',
    class: classProp = '',
    isDisabled = false,
    isPlain = false,
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-text-input-group',
      isDisabled && 'pf-m-disabled',
      isPlain && 'pf-m-plain',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>
