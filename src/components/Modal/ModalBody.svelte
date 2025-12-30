<script lang="ts">
  import type { ModalBodyProps } from './types';
  import '@patternfly/patternfly/components/ModalBox/modal-box.css';

  interface Props extends ModalBodyProps {
    id?: string;
    tabIndex?: number;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    id,
    tabIndex,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-modal-box__body',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} id={id} tabindex={tabIndex} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>

