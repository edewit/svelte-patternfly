<script lang="ts">
  import DataList from './DataList.svelte';
  import DataListItem from './DataListItem.svelte';
  import DataListItemRow from './DataListItemRow.svelte';
  import DataListItemCells from './DataListItemCells.svelte';
  import DataListCell from './DataListCell.svelte';
  import DataListControl from './DataListControl.svelte';
  import DataListCheck from './DataListCheck.svelte';
  import DataListAction from './DataListAction.svelte';
  import DataListToggle from './DataListToggle.svelte';
  import DataListContent from './DataListContent.svelte';
  import Button from '../Button/Button.svelte';

  interface Props {
    variant?: 'basic' | 'compact' | 'checkboxes' | 'expandable';
  }

  let { variant = 'basic' }: Props = $props();

  let expandedItems = $state<Set<string>>(new Set());
  let checkedItems = $state<Set<string>>(new Set());

  function toggleExpanded(itemId: string) {
    if (expandedItems.has(itemId)) {
      expandedItems.delete(itemId);
    } else {
      expandedItems.add(itemId);
    }
    expandedItems = new Set(expandedItems);
  }

  function toggleChecked(itemId: string) {
    if (checkedItems.has(itemId)) {
      checkedItems.delete(itemId);
    } else {
      checkedItems.add(itemId);
    }
    checkedItems = new Set(checkedItems);
  }
</script>

{#if variant === 'basic'}
  <DataList aria-label="Basic data list example" id="data-list-basic">
    <DataListItem aria-labelledby="data-list-basic-item-1">
      <DataListItemRow>
        <DataListItemCells>
          <DataListCell>
            <span id="data-list-basic-item-1">Primary content</span>
          </DataListCell>
          <DataListCell>Secondary content</DataListCell>
        </DataListItemCells>
      </DataListItemRow>
    </DataListItem>
    <DataListItem aria-labelledby="data-list-basic-item-2">
      <DataListItemRow>
        <DataListItemCells>
          <DataListCell modifier="no-fill">
            <span id="data-list-basic-item-2">Secondary content (pf-m-no-fill)</span>
          </DataListCell>
          <DataListCell modifier={['align-right', 'no-fill']}>
            Secondary content (pf-m-align-right pf-m-no-fill)
          </DataListCell>
        </DataListItemCells>
      </DataListItemRow>
    </DataListItem>
  </DataList>
{:else if variant === 'compact'}
  <DataList aria-label="Compact data list example" id="data-list-compact" isCompact={true}>
    <DataListItem aria-labelledby="data-list-compact-item-1">
      <DataListItemRow>
        <DataListItemCells>
          <DataListCell>
            <span id="data-list-compact-item-1">Primary content</span>
          </DataListCell>
          <DataListCell>Secondary content</DataListCell>
        </DataListItemCells>
      </DataListItemRow>
    </DataListItem>
    <DataListItem aria-labelledby="data-list-compact-item-2">
      <DataListItemRow>
        <DataListItemCells>
          <DataListCell modifier="no-fill">
            <span id="data-list-compact-item-2">Secondary content (pf-m-no-fill)</span>
          </DataListCell>
          <DataListCell modifier={['align-right', 'no-fill']}>
            Secondary content (pf-m-align-right pf-m-no-fill)
          </DataListCell>
        </DataListItemCells>
      </DataListItemRow>
    </DataListItem>
  </DataList>
{:else if variant === 'checkboxes'}
  <DataList aria-label="Checkbox and action data list example">
    <DataListItem aria-labelledby="check-action-item1">
      <DataListItemRow>
        <DataListControl>
          <DataListCheck
            id="check-item1"
            name="check-action-check1"
            checked={checkedItems.has('item1')}
            onChange={() => toggleChecked('item1')}
          />
        </DataListControl>
        <DataListItemCells>
          <DataListCell>
            <span id="check-action-item1">Primary content</span> Dolor sit amet, consectetur adipisicing
            elit, sed do eiusmod.
          </DataListCell>
          <DataListCell
            >Secondary content. Dolor sit amet, consectetur adipisicing elit, sed do eiusmod.</DataListCell
          >
        </DataListItemCells>
        <DataListAction
          aria-labelledby="check-action-item1 check-action-action1"
          id="check-action-action1"
          aria-label="Actions"
        >
          <Button variant="plain" aria-label="Delete">Delete</Button>
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
    <DataListItem aria-labelledby="check-action-item2">
      <DataListItemRow>
        <DataListControl>
          <DataListCheck
            id="check-item2"
            name="check-action-check2"
            checked={checkedItems.has('item2')}
            onChange={() => toggleChecked('item2')}
          />
        </DataListControl>
        <DataListItemCells>
          <DataListCell>
            <span id="check-action-item2">Primary content - Lorem ipsum</span> dolor sit amet, consectetur
            adipisicing elit, sed do eiusmod.
          </DataListCell>
          <DataListCell
            >Secondary content. Dolor sit amet, consectetur adipisicing elit, sed do eiusmod.</DataListCell
          >
        </DataListItemCells>
        <DataListAction
          visibility={{ lg: 'hidden' }}
          aria-labelledby="check-action-item2 check-action-action2"
          id="check-action-action2"
          aria-label="Actions"
        >
          <Button variant="plain" aria-label="Actions">Actions</Button>
        </DataListAction>
        <DataListAction
          visibility={{ default: 'hidden', lg: 'visible' }}
          aria-labelledby="check-action-item2 check-action-action2a"
          id="check-action-action2a"
          aria-label="Actions"
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
    <DataListItem aria-labelledby="check-action-item3">
      <DataListItemRow>
        <DataListControl>
          <DataListCheck
            id="check-item3"
            name="check-action-check3"
            checked={checkedItems.has('item3')}
            onChange={() => toggleChecked('item3')}
          />
        </DataListControl>
        <DataListItemCells>
          <DataListCell>
            <span id="check-action-item3">Primary content - Lorem ipsum</span> dolor sit amet, consectetur
            adipisicing elit, sed do eiusmod.
          </DataListCell>
          <DataListCell
            >Secondary content. Dolor sit amet, consectetur adipisicing elit, sed do eiusmod.</DataListCell
          >
        </DataListItemCells>
        <DataListAction
          visibility={{ xl: 'hidden' }}
          aria-labelledby="check-action-item3 check-action-action3"
          id="check-action-action3"
          aria-label="Actions"
        >
          <Button variant="plain" aria-label="Actions">Actions</Button>
        </DataListAction>
        <DataListAction
          visibility={{ default: 'hidden', xl: 'visible' }}
          aria-labelledby="check-action-item3 check-action-action3a"
          id="check-action-action3a"
          aria-label="Actions"
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="secondary">Secondary</Button>
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
  </DataList>
{:else if variant === 'expandable'}
  <DataList aria-label="Expandable data list example">
    <DataListItem aria-labelledby="expandable-item1" isExpanded={expandedItems.has('item1')}>
      <DataListItemRow>
        <DataListControl>
          <DataListToggle
            id="toggle-item1"
            aria-labelledby="expandable-item1 toggle-item1"
            aria-label="Toggle details for"
            aria-controls="expand-content1"
            isExpanded={expandedItems.has('item1')}
            onClick={() => toggleExpanded('item1')}
          />
        </DataListControl>
        <DataListItemCells>
          <DataListCell>
            <span id="expandable-item1">Primary content</span>
          </DataListCell>
          <DataListCell>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</DataListCell>
        </DataListItemCells>
      </DataListItemRow>
      <DataListContent
        id="expand-content1"
        aria-label="Primary content details"
        isHidden={!expandedItems.has('item1')}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
      </DataListContent>
    </DataListItem>
    <DataListItem aria-labelledby="expandable-item2" isExpanded={expandedItems.has('item2')}>
      <DataListItemRow>
        <DataListControl>
          <DataListToggle
            id="toggle-item2"
            aria-labelledby="expandable-item2 toggle-item2"
            aria-label="Toggle details for"
            aria-controls="expand-content2"
            isExpanded={expandedItems.has('item2')}
            onClick={() => toggleExpanded('item2')}
          />
        </DataListControl>
        <DataListItemCells>
          <DataListCell>
            <span id="expandable-item2">Secondary content</span>
          </DataListCell>
          <DataListCell>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</DataListCell>
        </DataListItemCells>
      </DataListItemRow>
      <DataListContent
        id="expand-content2"
        aria-label="Secondary content details"
        isHidden={!expandedItems.has('item2')}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
      </DataListContent>
    </DataListItem>
    <DataListItem aria-labelledby="expandable-item3" isExpanded={expandedItems.has('item3')}>
      <DataListItemRow>
        <DataListControl>
          <DataListToggle
            id="toggle-item3"
            aria-labelledby="expandable-item3 toggle-item3"
            aria-label="Toggle details for"
            aria-controls="expand-content3"
            isExpanded={expandedItems.has('item3')}
            onClick={() => toggleExpanded('item3')}
          />
        </DataListControl>
        <DataListItemCells>
          <DataListCell>
            <span id="expandable-item3">Tertiary content</span>
          </DataListCell>
          <DataListCell>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</DataListCell>
        </DataListItemCells>
      </DataListItemRow>
      <DataListContent
        id="expand-content3"
        aria-label="Tertiary content details"
        isHidden={!expandedItems.has('item3')}
        hasNoPadding={true}
      >
        This expanded section has no padding.
      </DataListContent>
    </DataListItem>
  </DataList>
{/if}
