<script lang="ts">
  import type { ActionListGroupProps } from './types';
  import '@patternfly/patternfly/components/ActionList/action-list.css';

  interface Props extends ActionListGroupProps {
    isIcons?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    isIcons: _isIcons = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-action-list__group', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
