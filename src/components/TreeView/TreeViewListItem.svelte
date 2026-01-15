<script lang="ts">
  import type { TreeViewListItemProps, TreeViewDataItem } from './types';

  interface Props extends TreeViewListItemProps {
    item: TreeViewDataItem;
    level?: number;
    activeItems?: TreeViewDataItem[];
    allExpanded?: boolean;
    hasCheckboxes?: boolean;
    onSelect?: (_event: MouseEvent, _item: TreeViewDataItem) => void;
    onCheck?: (_event: Event, _item: TreeViewDataItem, _checked: boolean) => void;
    onExpand?: (_event: MouseEvent, _item: TreeViewDataItem, _isExpanded: boolean) => void;
    hasAnimations?: boolean;
  }

  let {
    item,
    level = 0,
    activeItems = [],
    allExpanded,
    hasCheckboxes = false,
    onSelect,
    onCheck,
    onExpand,
    hasAnimations = false
  }: Props = $props();

  // Track expanded state - use allExpanded if defined, otherwise use item's defaultExpanded or internal state
  let internalExpanded = $state(item.defaultExpanded ?? false);
  
  const isExpanded = $derived(
    allExpanded !== undefined ? allExpanded : internalExpanded
  );

  const hasChildren = $derived(item.children && item.children.length > 0);
  
  // Check if this item is active/selected
  const isActive = $derived(
    activeItems?.some((activeItem) => activeItem.id === item.id) ?? false
  );

  // Build list item classes
  const listItemClasses = $derived(
    [
      'pf-v6-c-tree-view__list-item',
      isExpanded && hasChildren && 'pf-m-expanded'
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build node classes
  const nodeClasses = $derived(
    [
      'pf-v6-c-tree-view__node',
      isActive && 'pf-m-current'
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Handle node click
  function handleNodeClick(event: MouseEvent) {
    if (hasChildren) {
      // Toggle expansion for folders
      const newExpanded = !isExpanded;
      if (allExpanded === undefined) {
        internalExpanded = newExpanded;
      }
      onExpand?.(event, item, newExpanded);
    }
    onSelect?.(event, item);
  }

  // Handle checkbox change
  function handleCheckChange(event: Event) {
    const target = event.target as HTMLInputElement;
    onCheck?.(event, item, target.checked);
  }

  // Handle keyboard navigation
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNodeClick(event as unknown as MouseEvent);
    }
  }

  // Determine tabindex - root level items get 0, others get -1
  const tabIndex = $derived(level === 0 ? 0 : -1);
</script>

<li
  class={listItemClasses}
  role="treeitem"
  aria-selected={isActive}
  aria-expanded={hasChildren ? isExpanded : undefined}
  tabindex={tabIndex}
>
  <div class="pf-v6-c-tree-view__content">
    <button
      class={nodeClasses}
      type="button"
      onclick={handleNodeClick}
      onkeydown={handleKeyDown}
    >
      <span class="pf-v6-c-tree-view__node-container">
        {#if hasCheckboxes}
          <span class="pf-v6-c-tree-view__node-check">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <input
              type="checkbox"
              checked={item.checkProps?.checked ?? false}
              disabled={item.checkProps?.disabled ?? false}
              onclick={(e) => e.stopPropagation()}
              onchange={handleCheckChange}
            />
          </span>
        {/if}
        {#if hasChildren}
          <span class="pf-v6-c-tree-view__node-toggle">
            <span class="pf-v6-c-tree-view__node-toggle-icon">
              <i class="fas fa-angle-right" aria-hidden="true"></i>
            </span>
          </span>
        {/if}
        {#if item.icon || item.expandedIcon}
          <span class="pf-v6-c-tree-view__node-icon">
            {#if isExpanded && item.expandedIcon}
              {@render item.expandedIcon()}
            {:else if item.icon}
              {@render item.icon()}
            {/if}
          </span>
        {/if}
        <span class="pf-v6-c-tree-view__node-text">{item.name}</span>
        {#if item.customBadgeContent}
          <span class="pf-v6-c-tree-view__node-count">
            {#if typeof item.customBadgeContent === 'string'}
              <span class="pf-v6-c-badge pf-m-read">{item.customBadgeContent}</span>
            {:else}
              {@render item.customBadgeContent()}
            {/if}
          </span>
        {/if}
      </span>
    </button>
    {#if item.action}
      <span class="pf-v6-c-tree-view__node-action">
        {@render item.action()}
      </span>
    {/if}
  </div>
  {#if hasChildren && isExpanded && item.children}
    <ul class="pf-v6-c-tree-view__list" role="group">
      {#each item.children as childItem (childItem.id)}
        <svelte:self
          item={childItem}
          level={level + 1}
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
  {/if}
</li>
