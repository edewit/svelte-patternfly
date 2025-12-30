<script lang="ts">
  import Nav from './Nav.svelte';
  import NavList from './NavList.svelte';
  import NavItem from './NavItem.svelte';

  let activeItem = $state(0);

  function onSelect(_event: Event, result: { itemId: number | string }) {
    activeItem = result.itemId as number;
  }
</script>

<Nav onSelect={onSelect} variant="horizontal-subnav" aria-label="Horizontal subnav local">
  <NavList>
    <NavItem preventDefault to="#subnav-1" itemId={0} isActive={activeItem === 0}>
      Horizontal subnav item 1
    </NavItem>
    <NavItem preventDefault to="#subnav-2" itemId={1} isActive={activeItem === 1}>
      Horizontal subnav item 2
    </NavItem>
    <NavItem preventDefault to="#subnav-3" itemId={2} isActive={activeItem === 2}>
      Horizontal subnav item 3
    </NavItem>
    <NavItem preventDefault to="#subnav-4" itemId={3} isActive={activeItem === 3}>
      Horizontal subnav item 4
    </NavItem>
    <NavItem preventDefault to="#subnav-5" itemId={4} isActive={activeItem === 4}>
      Horizontal subnav item 5
    </NavItem>
    <NavItem preventDefault to="#subnav-6" itemId={5} isActive={activeItem === 5}>
      Horizontal subnav item 6
    </NavItem>
    <NavItem preventDefault to="#subnav-7" itemId={6} isActive={activeItem === 6}>
      Horizontal subnav item 7
    </NavItem>
    <NavItem preventDefault to="#subnav-8" itemId={7} isActive={activeItem === 7}>
      Horizontal subnav item 8
    </NavItem>
    <NavItem preventDefault to="#subnav-9" itemId={8} isActive={activeItem === 8}>
      Horizontal subnav item 9
    </NavItem>
    <NavItem preventDefault to="#subnav-10" itemId={9} isActive={activeItem === 9}>
      Horizontal subnav item 10
    </NavItem>
  </NavList>
</Nav>

