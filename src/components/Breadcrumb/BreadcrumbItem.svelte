<script lang="ts">
  import type { BreadcrumbItemProps } from './types';
  import '@patternfly/patternfly/components/Breadcrumb/breadcrumb.css';

  interface Props extends BreadcrumbItemProps {
    isCurrent?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    isCurrent: _isCurrent = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-breadcrumb__item', className].filter(Boolean).join(' '));
</script>

<li class={classes} {...restProps}>
  {@render children?.()}
</li>
