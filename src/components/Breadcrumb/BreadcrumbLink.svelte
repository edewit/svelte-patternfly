<script lang="ts">
  import type { BreadcrumbLinkProps } from './types';
  import '@patternfly/patternfly/components/Breadcrumb/breadcrumb.css';

  interface Props extends BreadcrumbLinkProps {
    href?: string;
    isCurrent?: boolean;
    'aria-label'?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    href,
    isCurrent = false,
    'aria-label': ariaLabel,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-breadcrumb__link', isCurrent && 'pf-m-current', className].filter(Boolean).join(' ')
  );
</script>

{#if href}
  <a
    class={classes}
    {href}
    aria-current={isCurrent ? 'page' : undefined}
    aria-label={ariaLabel}
    {...restProps}
  >
    {@render children?.()}
  </a>
{:else}
  <span class={classes} aria-label={ariaLabel} {...restProps}>
    {@render children?.()}
  </span>
{/if}
