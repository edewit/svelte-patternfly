<script lang="ts">
  import type { FormHelperTextProps } from './types';
  import '@patternfly/patternfly/components/Form/form.css';
  import '@patternfly/patternfly/components/HelperText/helper-text.css';

  interface Props extends FormHelperTextProps {
    children?: import('svelte').Snippet;
  }

  let {
    className = '',
    class: classProp = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-form__helper-text',
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








