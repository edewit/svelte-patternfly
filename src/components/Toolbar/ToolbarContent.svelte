<script lang="ts">
  import type { ToolbarContentProps } from './types';

  interface Props extends ToolbarContentProps {
    id?: string;
    className?: string;
    class?: string;
    alignItems?: 'center';
    alignSelf?: 'center';
    clearAllFilters?: () => void;
    clearFiltersButtonText?: string;
    isExpanded?: boolean;
    showClearFiltersButton?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    id,
    className = '',
    class: classProp = '',
    alignItems,
    alignSelf,
    clearAllFilters,
    clearFiltersButtonText = 'Clear all filters',
    isExpanded = false,
    showClearFiltersButton = false,
    children,
    ...restProps
  }: Props = $props();

  const contentClasses = $derived(
    ['pf-v6-c-toolbar__content', className || classProp].filter(Boolean).join(' ')
  );

  const sectionClasses = $derived(
    [
      'pf-v6-c-toolbar__content-section',
      alignItems === 'center' && 'pf-m-align-items-center',
      alignSelf === 'center' && 'pf-m-align-self-center'
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={contentClasses} {id} {...restProps}>
  <div class={sectionClasses}>
    {#if children}
      {@render children()}
    {/if}
    {#if showClearFiltersButton && clearAllFilters}
      <div class="pf-v6-c-toolbar__item">
        <button class="pf-v6-c-button pf-m-link" type="button" onclick={clearAllFilters}>
          {clearFiltersButtonText}
        </button>
      </div>
    {/if}
  </div>
</div>
