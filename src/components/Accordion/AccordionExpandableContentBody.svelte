<script lang="ts">
  import type { AccordionExpandableContentBodyProps } from './types';
  import '@patternfly/patternfly/components/Accordion/accordion.css';

  interface Props extends AccordionExpandableContentBodyProps {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-accordion__expandable-content-body', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
