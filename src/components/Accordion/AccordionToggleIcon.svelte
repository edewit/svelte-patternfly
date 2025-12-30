<script lang="ts">
  import '@patternfly/patternfly/components/Accordion/accordion.css';

  interface Props {
    class?: string;
  }

  let { class: className = '', ...restProps }: Props = $props();

  const classes = $derived(['pf-v6-c-accordion__toggle-icon', className].filter(Boolean).join(' '));
</script>

<span class={classes} {...restProps}>
  <i class="fas fa-angle-right" aria-hidden="true"></i>
</span>
