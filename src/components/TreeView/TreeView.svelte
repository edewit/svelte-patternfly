<script lang="ts">
  import type { TreeViewProps, TreeViewDataItem } from './types';
  import TreeViewListItem from './TreeViewListItem.svelte';
  import '@patternfly/patternfly/components/TreeView/tree-view.css';

  interface Props extends TreeViewProps {
    'aria-label'?: string;
    data: TreeViewDataItem[];
    activeItems?: TreeViewDataItem[];
    allExpanded?: boolean;
    className?: string;
    class?: string;
    hasCheckboxes?: boolean;
    hasGuides?: boolean;
    isCompact?: boolean;
    onSelect?: (_event: MouseEvent, _item: TreeViewDataItem) => void;
    onCheck?: (_event: Event, _item: TreeViewDataItem, _checked: boolean) => void;
    onExpand?: (_event: MouseEvent, _item: TreeViewDataItem, _isExpanded: boolean) => void;
    hasAnimations?: boolean;
    ouiaId?: string;
    ouiaSafe?: boolean;
  }

  let {
    'aria-label': ariaLabel,
    data,
    activeItems = [],
    allExpanded,
    className = '',
    class: classProp = '',
    hasCheckboxes = false,
    hasGuides = false,
    isCompact = false,
    onSelect,
    onCheck,
    onExpand,
    hasAnimations = false,
    ouiaId,
    ouiaSafe = true,
    ...restProps
  }: Props = $props();

  // Build wrapper classes
  const wrapperClasses = $derived(
    [
      'pf-v6-c-tree-view',
      hasGuides && 'pf-m-guides',
      isCompact && 'pf-m-compact',
      hasAnimations && 'pf-m-animations',
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div
  class={wrapperClasses}
  data-ouia-component-type="PF6/TreeView"
  data-ouia-safe={ouiaSafe}
  data-ouia-component-id={ouiaId}
  {...restProps}
>
  <ul class="pf-v6-c-tree-view__list" role="tree" aria-label={ariaLabel}>
    {#each data as item (item.id)}
      <TreeViewListItem
        {item}
        level={0}
        {activeItems}
        {allExpanded}
        {hasCheckboxes}
        {onSelect}
        {onCheck}
        {onExpand}
        {hasAnimations}
      />
    {/each}
  </ul>
</div>
