<script lang="ts">
  import type { DualListSelectorToolsFilterProps } from './types';
  import '@patternfly/patternfly/components/DualListSelector/dual-list-selector.css';
  import '@patternfly/patternfly/components/TextInputGroup/text-input-group.css';

  interface Props extends DualListSelectorToolsFilterProps {
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-dual-list-selector__tools-filter', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
