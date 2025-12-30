<script lang="ts">
  import type { AccordionItemProps } from './types';
  import '@patternfly/patternfly/components/Accordion/accordion.css';

  interface Props extends AccordionItemProps {
    isExpanded?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { isExpanded = false, class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-accordion__item', isExpanded && 'pf-m-expanded', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
