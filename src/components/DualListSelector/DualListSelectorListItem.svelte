<script lang="ts">
  import type { DualListSelectorListItemProps } from './types';
  import '@patternfly/patternfly/components/DualListSelector/dual-list-selector.css';

  interface Props extends DualListSelectorListItemProps {
    role?: string;
    isDisabled?: boolean;
    isSelected?: boolean;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    role = 'option',
    isDisabled = false,
    isSelected = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-dual-list-selector__list-item',
      isDisabled && 'pf-m-disabled',
      isSelected && 'pf-m-selected',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<li class={classes} {role} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</li>
