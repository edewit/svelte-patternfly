<script lang="ts">
  import type { DropdownGroupProps } from './types';
  import '@patternfly/patternfly/components/Menu/menu.css';

  interface Props extends DropdownGroupProps {
    label?: string;
    labelHeadingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    label,
    labelHeadingLevel = 'h1',
    class: className = '',
    children
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-menu__group', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes}>
  {#if label}
    {#if labelHeadingLevel === 'h1'}
      <h1 class="pf-v6-c-menu__group-title">{label}</h1>
    {:else if labelHeadingLevel === 'h2'}
      <h2 class="pf-v6-c-menu__group-title">{label}</h2>
    {:else if labelHeadingLevel === 'h3'}
      <h3 class="pf-v6-c-menu__group-title">{label}</h3>
    {:else if labelHeadingLevel === 'h4'}
      <h4 class="pf-v6-c-menu__group-title">{label}</h4>
    {:else if labelHeadingLevel === 'h5'}
      <h5 class="pf-v6-c-menu__group-title">{label}</h5>
    {:else if labelHeadingLevel === 'h6'}
      <h6 class="pf-v6-c-menu__group-title">{label}</h6>
    {/if}
  {/if}
  <ul class="pf-v6-c-menu__list" role="menu">
    {@render children?.()}
  </ul>
</div>

