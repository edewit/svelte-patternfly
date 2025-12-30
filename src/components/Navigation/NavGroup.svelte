<script lang="ts">
  import type { NavGroupProps } from './types';
  import '@patternfly/patternfly/components/Nav/nav.css';

  interface Props extends NavGroupProps {
    title?: string;
    'aria-label'?: string;
    id?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    title,
    'aria-label': ariaLabel,
    id,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-nav__section', className].filter(Boolean).join(' ')
  );

  // Use aria-label if title is not provided (for accessibility)
  const sectionAriaLabel = $derived(ariaLabel || title);
</script>

<section class={classes} aria-labelledby={title ? id : undefined} aria-label={!title ? sectionAriaLabel : undefined} {...restProps}>
  {#if title}
    <h2 class="pf-v6-c-nav__section-title" {id}>
      {title}
    </h2>
  {/if}
  {@render children?.()}
</section>

