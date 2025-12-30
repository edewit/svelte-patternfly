<script lang="ts">
  import type { DualListSelectorPaneProps } from './types';
  import '@patternfly/patternfly/components/DualListSelector/dual-list-selector.css';

  interface Props extends DualListSelectorPaneProps {
    isChosen?: boolean;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let { isChosen = false, class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-dual-list-selector__pane',
      isChosen && 'pf-m-chosen',
      !isChosen && 'pf-m-available',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
