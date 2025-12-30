<script lang="ts">
  import type { HelperTextProps } from './types';
  import '@patternfly/patternfly/components/HelperText/helper-text.css';

  interface Props extends HelperTextProps {
    children?: import('svelte').Snippet;
  }

  let {
    id,
    component = 'div',
    isLiveRegion = false,
    'aria-label': ariaLabel,
    className = '',
    class: classProp = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-helper-text',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Determine the HTML tag to render
  const tag = $derived(component);
</script>

{#if tag === 'ul'}
  <ul
    class={classes}
    {id}
    aria-label={ariaLabel}
    aria-live={isLiveRegion ? 'polite' : undefined}
    {...restProps}
  >
    {#if children}
      {@render children()}
    {/if}
  </ul>
{:else}
  <div
    class={classes}
    {id}
    aria-label={ariaLabel}
    aria-live={isLiveRegion ? 'polite' : undefined}
    {...restProps}
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
