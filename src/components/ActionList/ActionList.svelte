<script lang="ts">
  import type { ActionListProps } from './types';
  import '@patternfly/patternfly/components/ActionList/action-list.css';

  interface Props extends ActionListProps {
    isIcons?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { isIcons = false, class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-action-list', isIcons && 'pf-m-icons', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
