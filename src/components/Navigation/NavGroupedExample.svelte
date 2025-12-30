<script lang="ts">
  import Nav from './Nav.svelte';
  import NavList from './NavList.svelte';
  import NavGroup from './NavGroup.svelte';
  import NavItem from './NavItem.svelte';

  let activeItem = $state(0);

  function onSelect(_event: Event, result: { itemId: number | string }) {
    activeItem = result.itemId as number;
  }
</script>

<Nav onSelect={onSelect} aria-label="Grouped global">
  <NavList>
    <NavGroup title="Section title 1" id="nav-group-1">
      <NavItem preventDefault to="#group1-link1" itemId={0} isActive={activeItem === 0}>
        Group 1 Link 1
      </NavItem>
      <NavItem preventDefault to="#group1-link2" itemId={1} isActive={activeItem === 1}>
        Group 1 Link 2
      </NavItem>
      <NavItem preventDefault to="#group1-link3" itemId={2} isActive={activeItem === 2}>
        Group 1 Link 3
      </NavItem>
    </NavGroup>
    <NavGroup title="Section title 2" id="nav-group-2">
      <NavItem preventDefault to="#group2-link1" itemId={3} isActive={activeItem === 3}>
        Group 2 Link 1
      </NavItem>
      <NavItem preventDefault to="#group2-link2" itemId={4} isActive={activeItem === 4}>
        Group 2 Link 2
      </NavItem>
      <NavItem preventDefault to="#group2-link3" itemId={5} isActive={activeItem === 5}>
        Group 2 Link 3
      </NavItem>
    </NavGroup>
  </NavList>
</Nav>

