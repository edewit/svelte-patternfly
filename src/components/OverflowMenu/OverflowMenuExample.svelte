<script lang="ts">
  import OverflowMenu from './OverflowMenu.svelte';
  import OverflowMenuContent from './OverflowMenuContent.svelte';
  import OverflowMenuControl from './OverflowMenuControl.svelte';
  import OverflowMenuItem from './OverflowMenuItem.svelte';
  import OverflowMenuGroup from './OverflowMenuGroup.svelte';
  import OverflowMenuDropdownItem from './OverflowMenuDropdownItem.svelte';
  import Dropdown from '../Dropdown/Dropdown.svelte';
  import DropdownList from '../Dropdown/DropdownList.svelte';
  import MenuToggle from '../MenuToggle/MenuToggle.svelte';
  import EllipsisVIcon from '../Icon/icons/EllipsisVIcon.svelte';
  import Button from '../Button/Button.svelte';

  let isOpen = $state(false);
  let containerRef: HTMLDivElement | null = $state(null);
  let containerWidth = $state(100);

  function onToggle() {
    isOpen = !isOpen;
  }

  function onSelect() {
    isOpen = false;
  }

  const dropdownItems = [
    { itemId: 0, key: 'item1', label: 'Item 1' },
    { itemId: 1, key: 'item2', label: 'Item 2' },
    { itemId: 2, key: 'item3', label: 'Item 3' },
    { itemId: 3, key: 'item4', label: 'Item 4' },
    { itemId: 4, key: 'item5', label: 'Item 5' }
  ];
</script>

{#snippet icon()}
  <EllipsisVIcon />
{/snippet}

{#snippet toggle()}
  <MenuToggle
    aria-label="Simple example overflow menu"
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

<div bind:this={containerRef} style="width: {containerWidth}%; padding: 1rem; border: 1px solid #ccc;">
  <p>Current container width: {containerWidth}%</p>
  <input type="range" min="20" max="100" bind:value={containerWidth} />
  
  <OverflowMenu breakpoint="lg" breakpointReference={containerRef}>
    <OverflowMenuContent>
      <OverflowMenuItem>Item</OverflowMenuItem>
      <OverflowMenuItem>Item</OverflowMenuItem>
      <OverflowMenuGroup>
        <OverflowMenuItem>Item</OverflowMenuItem>
        <OverflowMenuItem>Item</OverflowMenuItem>
        <OverflowMenuItem>Item</OverflowMenuItem>
      </OverflowMenuGroup>
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
</div>

