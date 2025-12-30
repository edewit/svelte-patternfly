<script lang="ts">
  import type { DrawerPanelContentProps } from './types';
  import { getContext } from 'svelte';
  import '@patternfly/patternfly/components/Drawer/drawer.css';

  interface Props extends DrawerPanelContentProps {
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    hasNoPadding?: boolean;
    isResizable?: boolean;
    defaultSize?: string;
    isExpanded?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    width,
    minWidth,
    maxWidth,
    hasNoPadding = false,
    isResizable = false,
    defaultSize,
    isExpanded: propIsExpanded,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get isExpanded from context (provided by DrawerContent) or use prop
  let contextIsExpanded: boolean | undefined;
  try {
    contextIsExpanded = getContext<boolean | undefined>('drawer-is-expanded');
  } catch {
    // Context not available (e.g., in tests)
    contextIsExpanded = undefined;
  }
  const isExpanded = $derived(propIsExpanded ?? contextIsExpanded ?? false);

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-drawer__panel',
      hasNoPadding && 'pf-m-no-padding',
      isResizable && 'pf-m-resizable',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build inline styles
  const styles = $derived(
    [
      width && `--pf-v6-c-drawer__panel--Width: ${width};`,
      minWidth && `--pf-v6-c-drawer__panel--MinWidth: ${minWidth};`,
      maxWidth && `--pf-v6-c-drawer__panel--MaxWidth: ${maxWidth};`,
      defaultSize && `--pf-v6-c-drawer__panel--FlexBasis: ${defaultSize};`
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} style={styles} hidden={!isExpanded} {...restProps}>
  {@render children?.()}
</div>
