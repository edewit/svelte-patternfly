<script lang="ts">
  import type { InputGroupTextProps } from './types';
  import '@patternfly/patternfly/components/InputGroup/input-group.css';

  interface Props extends InputGroupTextProps {
    children?: import('svelte').Snippet | string;
  }

  let {
    className = '',
    class: classProp = '',
    component = 'span',
    isDisabled = false,
    isPlain = false,
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-input-group__text',
      isDisabled && 'pf-m-disabled',
      isPlain && 'pf-m-plain',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Get the HTML tag to render
  const tag = $derived(component);
</script>

{#if tag === 'div'}
  <div class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </div>
{:else if tag === 'label'}
  <label class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </label>
{:else if tag === 'button'}
  <button class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </button>
{:else}
  <span class={classes} {...restProps}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </span>
{/if}

