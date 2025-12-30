<script lang="ts">
  import type { DataListCellProps, DataListCellModifier } from './types';
  import '@patternfly/patternfly/components/DataList/data-list.css';

  interface Props extends DataListCellProps {
    id?: string;
    width?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
    modifier?: DataListCellModifier | DataListCellModifier[];
    isIcon?: boolean;
    isFilled?: boolean;
    isPlain?: boolean;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    id,
    width,
    modifier,
    isIcon = false,
    isFilled = true,
    isPlain = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Normalize modifier to array
  const modifiers = $derived(Array.isArray(modifier) ? modifier : modifier ? [modifier] : []);

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-data-list__cell',
      width && `pf-m-${width}`,
      ...modifiers.map((m) => `pf-m-${m}`),
      isIcon && 'pf-m-icon',
      !isFilled && 'pf-m-no-fill',
      isPlain && 'pf-m-plain',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {id} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
