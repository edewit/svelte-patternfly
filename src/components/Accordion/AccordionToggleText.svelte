<script lang="ts">
  import '@patternfly/patternfly/components/Accordion/accordion.css';

  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  const classes = $derived(['pf-v6-c-accordion__toggle-text', className].filter(Boolean).join(' '));
</script>

<span class={classes} {...restProps}>
  {@render children?.()}
</span>
