<script lang="ts">
  import type { ListProps, ListComponent, ListVariant, ListIconSize, OrderType } from './types';
  import '@patternfly/patternfly/components/List/list.css';

  interface Props extends ListProps {
    component?: ListComponent;
    isBordered?: boolean;
    isPlain?: boolean;
    variant?: ListVariant;
    iconSize?: ListIconSize;
    type?: OrderType;
    'aria-label'?: string;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    component = 'ul',
    isBordered = false,
    isPlain = false,
    variant,
    iconSize = 'default',
    type,
    'aria-label': ariaLabel,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-list',
      isBordered && 'pf-m-bordered',
      isPlain && 'pf-m-plain',
      variant === 'inline' && 'pf-m-inline',
      iconSize === 'large' && 'pf-m-icon-lg',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Determine the HTML tag to render
  const tag = $derived(component);
</script>

{#if tag === 'ol'}
  <ol class={classes} role="list" aria-label={ariaLabel} type={type} {...restProps}>
    {@render children?.()}
  </ol>
{:else}
  <ul class={classes} role="list" aria-label={ariaLabel} {...restProps}>
    {@render children?.()}
  </ul>
{/if}

