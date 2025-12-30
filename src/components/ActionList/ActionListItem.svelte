<script lang="ts">
  import type { ActionListItemProps } from './types';
  import '@patternfly/patternfly/components/ActionList/action-list.css';

  interface Props extends ActionListItemProps {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-action-list__item', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
