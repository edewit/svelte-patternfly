<script lang="ts">
  import Nav from './Nav.svelte';
  import NavList from './NavList.svelte';
  import NavItem from './NavItem.svelte';

  let activeItem = $state(0);

  function onSelect(_event: Event, result: { itemId: number | string }) {
    activeItem = result.itemId as number;
  }
</script>

<Nav onSelect={onSelect} variant="horizontal" aria-label="Horizontal nav local">
  <NavList>
    <NavItem preventDefault to="#horizontal-nav-1" itemId={0} isActive={activeItem === 0}>
      Horizontal navigation item 1
    </NavItem>
    <NavItem preventDefault to="#horizontal-nav-2" itemId={1} isActive={activeItem === 1}>
      Horizontal navigation item 2
    </NavItem>
    <NavItem preventDefault to="#horizontal-nav-3" itemId={2} isActive={activeItem === 2}>
      Horizontal navigation item 3
    </NavItem>
    <NavItem preventDefault to="#horizontal-nav-4" itemId={3} isActive={activeItem === 3}>
      Horizontal navigation item 4
    </NavItem>
    <NavItem preventDefault to="#horizontal-nav-5" itemId={4} isActive={activeItem === 4}>
      Horizontal navigation item 5
    </NavItem>
    <NavItem preventDefault to="#horizontal-nav-6" itemId={5} isActive={activeItem === 5}>
      Horizontal navigation item 6
    </NavItem>
    <NavItem preventDefault to="#horizontal-nav-7" itemId={6} isActive={activeItem === 6}>
      Horizontal navigation item 7
    </NavItem>
    <NavItem preventDefault to="#horizontal-nav-8" itemId={7} isActive={activeItem === 7}>
      Horizontal navigation item 8
    </NavItem>
    <NavItem preventDefault to="#horizontal-nav-9" itemId={8} isActive={activeItem === 8}>
      Horizontal navigation item 9
    </NavItem>
    <NavItem preventDefault to="#horizontal-nav-10" itemId={9} isActive={activeItem === 9}>
      Horizontal navigation item 10
    </NavItem>
  </NavList>
</Nav>

