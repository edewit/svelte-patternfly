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

  function onSelect() {
    isOpen = false;
  }
</script>

{#snippet icon()}
  <EllipsisVIcon />
{/snippet}

{#snippet toggle()}
  <MenuToggle
    aria-label="Multiple groups overflow menu"
    variant="plain"
    isExpanded={isOpen}
    icon={icon}
  />
{/snippet}

{#snippet dropdownChildren()}
  <DropdownList>
    <OverflowMenuDropdownItem itemId={0} isShared>Primary</OverflowMenuDropdownItem>
    <OverflowMenuDropdownItem itemId={1} isShared>Secondary</OverflowMenuDropdownItem>
    <OverflowMenuDropdownItem itemId={2} isShared>Tertiary</OverflowMenuDropdownItem>
  </DropdownList>
{/snippet}

<OverflowMenu breakpoint="lg">
  <OverflowMenuContent>
    <OverflowMenuGroup groupType="button">
      <OverflowMenuItem>
        <Button variant="primary">Primary</Button>
      </OverflowMenuItem>
      <OverflowMenuItem>
        <Button variant="secondary">Secondary</Button>
      </OverflowMenuItem>
      <OverflowMenuItem>
        <Button variant="tertiary">Tertiary</Button>
      </OverflowMenuItem>
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

