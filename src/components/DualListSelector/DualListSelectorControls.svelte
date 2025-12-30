<script lang="ts">
  import type { DualListSelectorControlsProps } from './types';
  import '@patternfly/patternfly/components/DualListSelector/dual-list-selector.css';

  interface Props extends DualListSelectorControlsProps {
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-dual-list-selector__controls', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
