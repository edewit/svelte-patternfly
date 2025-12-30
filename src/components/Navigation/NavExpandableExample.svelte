<script lang="ts">
  import Nav from './Nav.svelte';
  import NavList from './NavList.svelte';
  import NavExpandable from './NavExpandable.svelte';
  import NavItem from './NavItem.svelte';

  let activeGroup = $state('nav-expandable-group-1');
  let activeItem = $state('nav-expandable-group-1_item-1');
  let expandedGroups = $state<Set<string | number>>(new Set(['nav-expandable-group-1', 'nav-expandable-group-2']));

  function onSelect(_event: Event, result: { itemId: number | string; groupId?: number | string }) {
    if (result.groupId) {
      activeGroup = result.groupId as string;
    }
    activeItem = result.itemId as string;
  }

  function onToggle(_event: MouseEvent, result: { groupId: number | string; isExpanded: boolean }) {
    const newSet = new Set(expandedGroups);
    if (result.isExpanded) {
      newSet.add(result.groupId);
    } else {
      newSet.delete(result.groupId);
    }
    expandedGroups = newSet;
    console.log(`Group ${result.groupId} expanded? ${result.isExpanded}`);
  }

  function onItemClick(_event: Event, itemId: number | string, _groupId?: number | string) {
    console.log(`Custom click handler on ${itemId}`);
  }
</script>

<Nav onSelect={onSelect} onToggle={onToggle} aria-label="Expandable global">
  <NavList>
    <NavExpandable
      title="Expandable Group 1"
      groupId="nav-expandable-group-1"
      isActive={activeGroup === 'nav-expandable-group-1'}
      isExpanded={expandedGroups.has('nav-expandable-group-1')}
    >
      <NavItem
        preventDefault
        id="expandable-1"
        to="#expandable-1"
        groupId="nav-expandable-group-1"
        itemId="nav-expandable-group-1_item-1"
        isActive={activeItem === 'nav-expandable-group-1_item-1'}
      >
        Subnav 1 Link 1
      </NavItem>
      <NavItem
        preventDefault
        id="expandable-2"
        to="#expandable-2"
        groupId="nav-expandable-group-1"
        itemId="nav-expandable-group-1_item-2"
        isActive={activeItem === 'nav-expandable-group-1_item-2'}
      >
        Subnav 1 Link 2
      </NavItem>
      <NavItem
        preventDefault
        id="expandable-3"
        to="#expandable-3"
        groupId="nav-expandable-group-1"
        itemId="nav-expandable-group-1_item-3"
        isActive={activeItem === 'nav-expandable-group-1_item-3'}
      >
        Subnav 1 Link 3
      </NavItem>
    </NavExpandable>
    <NavExpandable
      title="Expandable Group 2"
      groupId="nav-expandable-group-2"
      isActive={activeGroup === 'nav-expandable-group-2'}
      isExpanded={expandedGroups.has('nav-expandable-group-2')}
    >
      <NavItem
        preventDefault
        onClick={onItemClick}
        id="expandable-custom-click"
        to="#expandable-custom-click"
        groupId="nav-expandable-group-2"
        itemId="nav-expandable-group-2_custom-click"
        isActive={activeItem === 'nav-expandable-group-2_custom-click'}
      >
        Custom onClick Link
      </NavItem>
      <NavItem
        preventDefault
        id="expandable-4"
        to="#expandable-4"
        groupId="nav-expandable-group-2"
        itemId="nav-expandable-group-2_item-1"
        isActive={activeItem === 'nav-expandable-group-2_item-1'}
      >
        Subnav 2 Link 1
      </NavItem>
      <NavItem
        preventDefault
        id="expandable-5"
        to="#expandable-5"
        groupId="nav-expandable-group-2"
        itemId="nav-expandable-group-2_item-2"
        isActive={activeItem === 'nav-expandable-group-2_item-2'}
      >
        Subnav 2 Link 2
      </NavItem>
      <NavItem
        preventDefault
        id="expandable-6"
        to="#expandable-6"
        groupId="nav-expandable-group-2"
        itemId="nav-expandable-group-2_item-3"
        isActive={activeItem === 'nav-expandable-group-2_item-3'}
      >
        Subnav 2 Link 3
      </NavItem>
    </NavExpandable>
  </NavList>
</Nav>

