<script lang="ts">
  import type { ActionGroupProps } from './types';
  import '@patternfly/patternfly/components/Form/form.css';

  interface Props extends ActionGroupProps {
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
      'pf-v6-c-form__group',
      'pf-m-action',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {...restProps}>
  <div class="pf-v6-c-form__group-control">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>








