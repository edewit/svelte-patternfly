<script lang="ts">
  import type { DescriptionListDescriptionProps } from './types';
  import '@patternfly/patternfly/components/DescriptionList/description-list.css';

  interface Props extends DescriptionListDescriptionProps {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-description-list__description', className].filter(Boolean).join(' ')
  );
</script>

<dd class={classes} {...restProps}>
  <div class="pf-v6-c-description-list__text">
    {@render children?.()}
  </div>
</dd>
