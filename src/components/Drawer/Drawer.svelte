<script lang="ts">
  import type { DrawerProps, DrawerPosition, DrawerVariant } from './types';
  import '@patternfly/patternfly/components/Drawer/drawer.css';

  interface Props extends DrawerProps {
    isExpanded?: boolean;
    position?: DrawerPosition;
    variant?: DrawerVariant;
    isInline?: boolean;
    isStatic?: boolean;
    onExpand?: () => void;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    isExpanded = false,
    position = 'right',
    variant = 'default',
    isInline = false,
    isStatic = false,
    onExpand,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-drawer',
      position && `pf-m-panel-${position}`,
      variant === 'inline' || isInline ? 'pf-m-inline' : '',
      variant === 'static' || isStatic ? 'pf-m-static' : '',
      isExpanded && 'pf-m-expanded',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Handle expand event
  function _handleExpand() {
    if (onExpand) {
      onExpand();
    }
  }
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
