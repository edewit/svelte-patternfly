<script lang="ts">
  import type { SelectGroupProps } from './types';
  import '@patternfly/patternfly/components/Menu/menu.css';

  interface Props extends SelectGroupProps {
    label?: import('svelte').Snippet | string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    label,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-menu__group', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if label}
    <h1 class="pf-v6-c-menu__group-title">
      {#if typeof label === 'string'}
        {label}
      {:else if label}
        {@render label()}
      {/if}
    </h1>
  {/if}
  <ul class="pf-v6-c-menu__list" role="menu">
    {@render children?.()}
  </ul>
</div>



