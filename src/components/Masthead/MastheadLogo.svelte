<script lang="ts">
  import type { MastheadLogoProps } from './types';
  import '@patternfly/patternfly/components/Masthead/masthead.css';

  interface Props extends MastheadLogoProps {
    component?: string;
    href?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    component = 'a',
    href,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(['pf-v6-c-masthead__logo', className].filter(Boolean).join(' '));

  // Determine the tag to render
  const tag = $derived(component || 'a');
</script>

{#if tag === 'a'}
  <a class={classes} {href} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </a>
{:else if tag === 'div'}
  <div class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </div>
{:else if tag === 'span'}
  <span class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </span>
{:else}
  <!-- Default to anchor tag if unknown component -->
  <a class={classes} {href} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </a>
{/if}

