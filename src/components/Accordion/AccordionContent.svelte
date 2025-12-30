<script lang="ts">
  import type { AccordionContentProps } from './types';
  import '@patternfly/patternfly/components/Accordion/accordion.css';

  interface Props extends AccordionContentProps {
    isExpanded?: boolean;
    isFixed?: boolean;
    maxHeight?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    isExpanded = false,
    isFixed = false,
    maxHeight,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-accordion__expandable-content', isFixed && 'pf-m-fixed', className]
      .filter(Boolean)
      .join(' ')
  );

  // Build inline styles for maxHeight
  const styles = $derived(
    maxHeight ? `--pf-v6-c-accordion__expandable-content--MaxHeight: ${maxHeight};` : ''
  );
</script>

<div class={classes} style={styles} hidden={!isExpanded} {...restProps}>
  {@render children?.()}
</div>
