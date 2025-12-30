<script lang="ts">
  import type { DataListContentProps } from './types';
  import '@patternfly/patternfly/components/DataList/data-list.css';

  interface Props extends DataListContentProps {
    id?: string;
    'aria-label'?: string;
    isHidden?: boolean;
    hasNoPadding?: boolean;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    id,
    'aria-label': ariaLabel,
    isHidden = false,
    hasNoPadding = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-data-list__expandable-content', className].filter(Boolean).join(' ')
  );

  const bodyClasses = $derived(
    ['pf-v6-c-data-list__expandable-content-body', hasNoPadding && 'pf-m-no-padding']
      .filter(Boolean)
      .join(' ')
  );
</script>

<section class={classes} {id} aria-label={ariaLabel} hidden={isHidden} {...restProps}>
  <div class={bodyClasses}>
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
  </div>
</section>
