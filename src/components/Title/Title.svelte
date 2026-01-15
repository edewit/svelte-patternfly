<script lang="ts">
  import type { TitleProps, TitleHeadingLevel, TitleSize } from './types';
  import '@patternfly/patternfly/components/Title/title.css';

  interface Props extends TitleProps {
    headingLevel: TitleHeadingLevel;
    size?: TitleSize;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    headingLevel,
    size,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Default sizes for each heading level
  const defaultSizes: Record<TitleHeadingLevel, TitleSize> = {
    h1: '2xl',
    h2: 'xl',
    h3: 'lg',
    h4: 'md',
    h5: 'md',
    h6: 'md'
  };

  // Get the effective size
  const effectiveSize = $derived(size || defaultSizes[headingLevel]);

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-title', `pf-m-${effectiveSize}`, className].filter(Boolean).join(' ')
  );
</script>

{#if headingLevel === 'h1'}
  <h1 class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </h1>
{:else if headingLevel === 'h2'}
  <h2 class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </h2>
{:else if headingLevel === 'h3'}
  <h3 class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </h3>
{:else if headingLevel === 'h4'}
  <h4 class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </h4>
{:else if headingLevel === 'h5'}
  <h5 class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </h5>
{:else if headingLevel === 'h6'}
  <h6 class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </h6>
{/if}
