<script lang="ts">
  import type { AccordionProps, AccordionDisplaySize, AccordionToggleIconPosition } from './types';
  import '@patternfly/patternfly/components/Accordion/accordion.css';

  interface Props extends AccordionProps {
    asDefinitionList?: boolean;
    isBordered?: boolean;
    displaySize?: AccordionDisplaySize;
    toggleIconPosition?: AccordionToggleIconPosition;
    isMultipleExpandable?: boolean;
    isFixed?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    asDefinitionList = false,
    isBordered = false,
    displaySize,
    toggleIconPosition,
    isMultipleExpandable = false,
    isFixed = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-accordion',
      isBordered && 'pf-m-bordered',
      displaySize && `pf-m-display-${displaySize}`,
      toggleIconPosition && `pf-m-toggle-${toggleIconPosition}`,
      isMultipleExpandable && 'pf-m-multiple-expandable',
      isFixed && 'pf-m-fixed',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Determine the HTML element to use
  const tag = $derived(asDefinitionList ? 'dl' : 'div');
</script>

{#if tag === 'dl'}
  <dl class={classes} {...restProps}>
    {@render children?.()}
  </dl>
{:else}
  <div class={classes} {...restProps}>
    {@render children?.()}
  </div>
{/if}
