<script lang="ts">
  import type { DualListSelectorListProps } from './types';
  import '@patternfly/patternfly/components/DualListSelector/dual-list-selector.css';

  interface Props extends DualListSelectorListProps {
    role?: string;
    'aria-labelledby'?: string;
    'aria-multiselectable'?: boolean | string;
    'aria-activedescendant'?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    role = 'listbox',
    'aria-labelledby': ariaLabelledBy,
    'aria-multiselectable': ariaMultiselectable,
    'aria-activedescendant': ariaActiveDescendant,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-dual-list-selector__list', className].filter(Boolean).join(' ')
  );

  // Convert aria-multiselectable to string if boolean
  const ariaMultiselectableAttr = $derived(
    typeof ariaMultiselectable === 'boolean' ? ariaMultiselectable.toString() : ariaMultiselectable
  );
</script>

<ul
  class={classes}
  {role}
  aria-labelledby={ariaLabelledBy}
  aria-multiselectable={ariaMultiselectableAttr}
  aria-activedescendant={ariaActiveDescendant}
  {...restProps}
>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</ul>
