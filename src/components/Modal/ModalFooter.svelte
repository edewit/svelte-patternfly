<script lang="ts">
  import type { ModalFooterProps } from './types';
  import '@patternfly/patternfly/components/ModalBox/modal-box.css';

  interface Props extends ModalFooterProps {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-modal-box__footer',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<footer class={classes} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</footer>

