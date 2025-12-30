<script lang="ts">
  import OverflowMenu from './OverflowMenu.svelte';
  import OverflowMenuContent from './OverflowMenuContent.svelte';
  import OverflowMenuControl from './OverflowMenuControl.svelte';
  import OverflowMenuItem from './OverflowMenuItem.svelte';
  import OverflowMenuDropdownItem from './OverflowMenuDropdownItem.svelte';
  import Dropdown from '../Dropdown/Dropdown.svelte';
  import DropdownList from '../Dropdown/DropdownList.svelte';
  import MenuToggle from '../MenuToggle/MenuToggle.svelte';
  import EllipsisVIcon from '../Icon/icons/EllipsisVIcon.svelte';

  let isOpen = $state(false);

  function onSelect() {
    isOpen = false;
  }

  const dropdownItems = [
    { itemId: 0, key: 'item1', label: 'Item' },
    { itemId: 1, key: 'item2', label: 'Item' },
    { itemId: 2, key: 'item3', label: 'Item' },
    { itemId: 3, key: 'item4', label: 'Item' },
    { itemId: 4, key: 'item5', label: 'Item' }
  ];
</script>

{#snippet icon()}
  <EllipsisVIcon />
{/snippet}

{#snippet toggle()}
  <MenuToggle
    aria-label="Simple overflow menu"
    variant="plain"
    isExpanded={isOpen}
    icon={icon}
  />
{/snippet}

{#snippet dropdownChildren()}
  <DropdownList>
    {#each dropdownItems as item}
      <OverflowMenuDropdownItem itemId={item.itemId} isShared>
        {item.label}
      </OverflowMenuDropdownItem>
    {/each}
  </DropdownList>
{/snippet}

<OverflowMenu breakpoint="lg">
  <OverflowMenuContent>
    <OverflowMenuItem>Item</OverflowMenuItem>
    <OverflowMenuItem>Item</OverflowMenuItem>
    <OverflowMenuItem>Item</OverflowMenuItem>
    <OverflowMenuItem>Item</OverflowMenuItem>
    <OverflowMenuItem>Item</OverflowMenuItem>
  </OverflowMenuContent>
  <OverflowMenuControl>
    <Dropdown
      {isOpen}
      onOpenChange={(open) => {
        isOpen = open;
      }}
      onSelect={onSelect}
      toggle={toggle}
    >
      {@render dropdownChildren()}
    </Dropdown>
  </OverflowMenuControl>
</OverflowMenu>

