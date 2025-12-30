<script lang="ts">
  import Menu from './Menu.svelte';
  import MenuContent from './MenuContent.svelte';
  import MenuList from './MenuList.svelte';
  import MenuItem from './MenuItem.svelte';
  import Divider from '../Dropdown/Divider.svelte';
  import Checkbox from '../Checkbox/Checkbox.svelte';

  interface Props {
    variant?: string;
  }

  let { variant = 'basic' }: Props = $props();

  let activeItem = $state(0);
  let isPlain = $state(false);
  let expandedItems = $state<Set<string>>(new Set(['edit']));

  function onSelect(_event: MouseEvent | undefined, itemId: string | number | undefined) {
    const item = itemId as number;
    console.log(`clicked ${itemId}`);
    activeItem = item;
  }

  function togglePlain(_event: Event, checked: boolean) {
    isPlain = checked;
  }

  function handleToggle(_event: MouseEvent, itemId: string, isExpanded: boolean) {
    const newSet = new Set(expandedItems);
    if (isExpanded) {
      newSet.add(itemId);
    } else {
      newSet.delete(itemId);
    }
    expandedItems = newSet;
  }
</script>

{#snippet addStorageSubmenu()}
  <MenuContent>
    <MenuList>
      <MenuItem itemId="app-grouping">Application grouping</MenuItem>
      <MenuItem itemId="count">Count</MenuItem>
      <MenuItem itemId="labels">Labels</MenuItem>
      <MenuItem itemId="annotations">Annotations</MenuItem>
    </MenuList>
  </MenuContent>
{/snippet}

{#snippet editSubmenu()}
  <MenuContent>
    <MenuList>
      <MenuItem itemId="app-grouping-edit">Application grouping</MenuItem>
      <MenuItem itemId="count-edit">Count</MenuItem>
      <MenuItem itemId="labels-edit">Labels</MenuItem>
      <MenuItem itemId="annotations-edit">Annotations</MenuItem>
    </MenuList>
  </MenuContent>
{/snippet}

{#if variant === 'basic'}
  <Menu activeItemId={activeItem} onSelect={onSelect} isPlain={isPlain}>
    <MenuContent>
      <MenuList>
        <MenuItem itemId={0}>Action</MenuItem>
        <MenuItem
          itemId={1}
          to="#default-link2"
          onClick={(event) => event.preventDefault()}
        >
          Link
        </MenuItem>
        <MenuItem isDisabled>Disabled action</MenuItem>
        <MenuItem isDisabled to="#default-link4">
          Disabled link
        </MenuItem>
        <MenuItem
          isAriaDisabled
          tooltipProps={{ content: 'aria-disabled action', position: 'top' }}
        >
          Aria-disabled action
        </MenuItem>
        <MenuItem
          isAriaDisabled
          to="#default-link5"
          tooltipProps={{ content: 'aria-disabled link', position: 'top' }}
        >
          Aria-disabled link
        </MenuItem>
      </MenuList>
    </MenuContent>
  </Menu>
  <div style="margin-top: 20px;">
    <Checkbox
      label="Plain menu"
      isChecked={isPlain}
      onChange={togglePlain}
      aria-label="plain menu checkbox"
      id="toggle-plain"
      name="toggle-plain"
    />
  </div>
{:else if variant === 'danger'}
  <Menu>
    <MenuContent>
      <MenuList>
        <MenuItem itemId={0}>Action 1</MenuItem>
        <MenuItem itemId={1}>Action 2</MenuItem>
        <Divider component="li" />
        <MenuItem itemId={2} isDanger>Delete</MenuItem>
      </MenuList>
    </MenuContent>
  </Menu>
{:else if variant === 'flyout'}
  <Menu isFlyout>
    <MenuContent>
      <MenuList>
        <MenuItem itemId="start">Start rollout</MenuItem>
        <MenuItem itemId="pause">Pause rollouts</MenuItem>
        <MenuItem
          itemId="add-storage"
          isExpanded={expandedItems.has('add-storage')}
          onToggle={(e, expanded) => handleToggle(e, 'add-storage', expanded)}
          submenu={addStorageSubmenu}
        >
          Add storage
        </MenuItem>
        <MenuItem
          itemId="edit"
          description="Description"
          isExpanded={expandedItems.has('edit')}
          onToggle={(e, expanded) => handleToggle(e, 'edit', expanded)}
          submenu={editSubmenu}
        >
          Edit
        </MenuItem>
        <MenuItem itemId="delete">Delete deployment config</MenuItem>
      </MenuList>
    </MenuContent>
  </Menu>
{/if}

