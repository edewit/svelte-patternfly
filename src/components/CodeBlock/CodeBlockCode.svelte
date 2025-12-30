<script lang="ts">
  import '@patternfly/patternfly/components/CodeBlock/code-block.css';
  import '@patternfly/patternfly/components/ExpandableSection/expandable-section.css';

  interface Props {
    id?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let { id, class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-code-block__code', className].filter(Boolean).join(' '));
</script>

<code class={classes} {id} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</code>
