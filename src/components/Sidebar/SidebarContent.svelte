<script lang="ts">
  import type { SidebarContentProps } from './types';

  interface Props extends SidebarContentProps {}

  let {
    class: className = '',
    hasNoBackground = false,
    hasPadding = false,
    isSecondary = false,
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes for the content
  const contentClasses = $derived(
    [
      'pf-v6-c-sidebar__content',
      hasNoBackground && 'pf-m-no-background',
      hasPadding && 'pf-m-padding',
      isSecondary && 'pf-m-secondary',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={contentClasses} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>

