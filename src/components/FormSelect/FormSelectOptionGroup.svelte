<script lang="ts">
  import type { FormSelectOptionGroupProps } from './types';

  interface Props extends FormSelectOptionGroupProps {
    children?: import('svelte').Snippet;
  }

  let { label, className = '', isDisabled = false, children, ...restProps }: Props = $props();
</script>

<optgroup {label} class={className} disabled={isDisabled} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</optgroup>
