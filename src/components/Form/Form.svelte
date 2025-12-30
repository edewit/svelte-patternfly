<script lang="ts">
  import type { FormProps } from './types';
  import '@patternfly/patternfly/components/Form/form.css';

  interface Props extends FormProps {
    children?: import('svelte').Snippet;
  }

  let {
    className = '',
    isHorizontal = false,
    isWidthLimited = false,
    maxWidth,
    class: classProp = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-form',
      isHorizontal && 'pf-m-horizontal',
      isWidthLimited && 'pf-m-limit-width',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build inline styles for maxWidth
  const styles = $derived(maxWidth ? `max-width: ${maxWidth};` : '');
</script>

<form class={classes} style={styles} novalidate {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</form>








