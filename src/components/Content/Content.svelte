<script lang="ts">
  import type { ContentProps, ContentVariant } from './types';
  import '@patternfly/patternfly/components/Content/content.css';

  interface Props extends ContentProps {
    component?: ContentVariant;
    isPageTitle?: boolean;
    isPlain?: boolean;
    isEditorial?: boolean;
    href?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    component,
    isPageTitle = false,
    isPlain = false,
    isEditorial = false,
    href,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // When component is not provided, render as wrapper
  const isWrapper = $derived(!component);

  // Build CSS classes based on component type
  const classes = $derived(
    isWrapper
      ? ['pf-v6-c-content', isEditorial && 'pf-m-editorial', className].filter(Boolean).join(' ')
      : [
          `pf-v6-c-content--${component}`,
          component === 'h1' && isPageTitle && 'pf-m-page-title',
          (component === 'ul' || component === 'ol' || component === 'a') &&
            isPlain &&
            'pf-m-plain',
          className
        ]
          .filter(Boolean)
          .join(' ')
  );

  // Get the HTML tag to render
  const tag = $derived(component || 'div');
</script>

{#if isWrapper}
  <!-- Wrapper mode: render as div with pf-v6-c-content class -->
  <div class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </div>
{:else if tag === 'hr'}
  <!-- Self-closing hr element -->
  <hr class={classes} {...restProps} />
{:else if tag === 'a'}
  <!-- Anchor element with href -->
  <a class={classes} {href} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </a>
{:else if tag === 'h1'}
  <h1 class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </h1>
{:else if tag === 'h2'}
  <h2 class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </h2>
{:else if tag === 'h3'}
  <h3 class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </h3>
{:else if tag === 'h4'}
  <h4 class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </h4>
{:else if tag === 'h5'}
  <h5 class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </h5>
{:else if tag === 'h6'}
  <h6 class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </h6>
{:else if tag === 'p'}
  <p class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </p>
{:else if tag === 'ul'}
  <ul class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </ul>
{:else if tag === 'ol'}
  <ol class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </ol>
{:else if tag === 'li'}
  <li class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </li>
{:else if tag === 'blockquote'}
  <blockquote class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </blockquote>
{:else if tag === 'dl'}
  <dl class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </dl>
{:else if tag === 'dt'}
  <dt class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </dt>
{:else if tag === 'dd'}
  <dd class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </dd>
{:else if tag === 'small'}
  <small class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </small>
{:else if tag === 'pre'}
  <pre class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </pre>
{:else if tag === 'strong'}
  <strong class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </strong>
{:else if tag === 'em'}
  <em class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </em>
{:else if tag === 'sub'}
  <sub class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </sub>
{:else if tag === 'sup'}
  <sup class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </sup>
{/if}
