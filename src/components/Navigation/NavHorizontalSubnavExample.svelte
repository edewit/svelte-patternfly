<script lang="ts">
  import Nav from './Nav.svelte';
  import NavList from './NavList.svelte';
  import NavItem from './NavItem.svelte';

  let activeItem = $state(0);

  function onSelect(_event: Event, result: { itemId: number | string }) {
    activeItem = result.itemId as number;
  }
</script>

<Nav onSelect={onSelect} variant="horizontal-subnav" aria-label="Local">
  <NavList>
    <NavItem preventDefault to="#item1" itemId={0} isActive={activeItem === 0}>
      Item 1
    </NavItem>
    <NavItem preventDefault to="#item2" itemId={1} isActive={activeItem === 1}>
      Item 2
    </NavItem>
    <NavItem preventDefault to="#item3" itemId={2} isActive={activeItem === 2}>
      Item 3
    </NavItem>
  </NavList>
</Nav>

