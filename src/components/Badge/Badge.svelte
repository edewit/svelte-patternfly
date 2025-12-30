<script lang="ts">
  import type { BadgeProps, BadgeVariant } from './types';
  import '@patternfly/patternfly/components/Badge/badge.css';

  interface Props extends BadgeProps {
    variant?: BadgeVariant;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let { variant = 'read', class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-badge', `pf-m-${variant}`, className].filter(Boolean).join(' ')
  );
</script>

<span class={classes} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</span>
