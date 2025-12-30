<script lang="ts">
  import Nav from './Nav.svelte';
  import NavList from './NavList.svelte';
  import NavItem from './NavItem.svelte';
  import MenuContent from '../Menu/MenuContent.svelte';
  import MenuList from '../Menu/MenuList.svelte';
  import MenuItem from '../Menu/MenuItem.svelte';
  import Menu from '../Menu/Menu.svelte';

  let activeItem = $state('nav-flyout-default-link-1');

  function onSelect(_event: Event, result: { itemId: number | string }) {
    activeItem = result.itemId as string;
  }

  function onMenuSelect(_event: MouseEvent, itemId: string | number | undefined) {
    if (itemId !== undefined) {
      activeItem = itemId as string;
    }
  }

  function onMenuItemClick(event: MouseEvent) {
    event.preventDefault();
  }
</script>

{#snippet flyoutMenu()}
  <Menu containsFlyout isFlyout onSelect={(event?: MouseEvent, itemId?: string | number) => onMenuSelect(event as MouseEvent, itemId)}>
    <MenuContent>
      <MenuList>
        <MenuItem
          onClick={onMenuItemClick}
          itemId="nav-flyout-1-0"
          to="#menu-link-1-0"
          isSelected={activeItem === 'nav-flyout-1-0'}
        >
          Menu 1 item 0
        </MenuItem>
        <MenuItem
          onClick={onMenuItemClick}
          itemId="nav-flyout-1-1"
          to="#menu-link-1-1"
          isSelected={activeItem === 'nav-flyout-1-1'}
        >
          Menu 1 item 1
        </MenuItem>
        <MenuItem
          onClick={onMenuItemClick}
          itemId="nav-flyout-1-2"
          to="#menu-link-1-2"
          isSelected={activeItem === 'nav-flyout-1-2'}
        >
          Menu 1 item 2
        </MenuItem>
        <MenuItem
          onClick={onMenuItemClick}
          itemId="nav-flyout-1-3"
          to="#menu-link-1-3"
          isSelected={activeItem === 'nav-flyout-1-3'}
        >
          Menu 1 item 3
        </MenuItem>
      </MenuList>
    </MenuContent>
  </Menu>
{/snippet}

<Nav onSelect={onSelect} aria-label="Flyout global">
  <NavList>
    <NavItem
      preventDefault
      id="nav-flyout-default-link-1"
      to="#nav-flyout-default-link-1"
      itemId="nav-flyout-default-link-1"
      isActive={activeItem === 'nav-flyout-default-link-1'}
    >
      Flyout Link 1
    </NavItem>
    <NavItem
      preventDefault
      id="nav-flyout-default-link-2"
      to="#nav-flyout-default-link-2"
      itemId="nav-flyout-default-link-2"
      isActive={activeItem === 'nav-flyout-default-link-2'}
    >
      Flyout Link 2
    </NavItem>
    <NavItem
      preventDefault
      id="nav-flyout-default-link-3"
      itemId="nav-flyout-default-link-3"
      isActive={activeItem === 'nav-flyout-default-link-3'}
      flyout={flyoutMenu}
    >
      Flyout Link 3
    </NavItem>
    <NavItem
      preventDefault
      id="nav-flyout-default-link4"
      to="#nav-flyout-default-link4"
      itemId="nav-flyout-default-link-4"
      isActive={activeItem === 'nav-flyout-default-link-4'}
    >
      Flyout Link 4
    </NavItem>
  </NavList>
</Nav>

