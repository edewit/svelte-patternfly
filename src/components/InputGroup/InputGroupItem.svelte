<script lang="ts">
  import type { InputGroupItemProps } from './types';
  import '@patternfly/patternfly/components/InputGroup/input-group.css';

  interface Props extends InputGroupItemProps {
    children?: import('svelte').Snippet;
  }

  let {
    className = '',
    class: classProp = '',
    isBox = false,
    isDisabled = false,
    isFill = false,
    isPlain = false,
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-input-group__item',
      isBox && 'pf-m-box',
      isDisabled && 'pf-m-disabled',
      isFill && 'pf-m-fill',
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

