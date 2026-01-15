<script lang="ts">
  import type { WizardNavProps } from './types';

  interface Props extends WizardNavProps {
    'aria-label'?: string;
    isExpanded?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    'aria-label': ariaLabel = 'Steps',
    isExpanded = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(
    [
      'pf-v6-c-wizard__nav',
      isExpanded && 'pf-m-expanded',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<nav class={classes} aria-label={ariaLabel} {...restProps}>
  <ol class="pf-v6-c-wizard__nav-list" role="list">
    {@render children?.()}
  </ol>
</nav>
