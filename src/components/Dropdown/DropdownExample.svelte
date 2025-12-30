<script lang="ts">
  import Dropdown from './Dropdown.svelte';
  import DropdownList from './DropdownList.svelte';
  import DropdownItem from './DropdownItem.svelte';
  import MenuToggle from './MenuToggle.svelte';
  import Divider from './Divider.svelte';

  let isOpen = $state(false);

  function onSelect(_event?: MouseEvent, value?: string | number) {
    console.log('selected', value);
    isOpen = false;
  }
</script>

<Dropdown
  {isOpen}
  onOpenChange={(open) => {
    isOpen = open;
  }}
  {onSelect}
  toggle="Dropdown"
  shouldFocusToggleOnSelect
  ouiaId="BasicDropdown"
>

  {#snippet children()}
    <DropdownList>
      <DropdownItem value={0}>Action</DropdownItem>
      <DropdownItem
        value={1}
        to="#default-link2"
        onClick={(ev) => ev.preventDefault()}
      >
        Link
      </DropdownItem>
      <DropdownItem value={2} isDisabled>
        Disabled Action
      </DropdownItem>
      <DropdownItem value={3} isDisabled to="#default-link4">
        Disabled Link
      </DropdownItem>
      <DropdownItem
        value={4}
        isAriaDisabled
        to="#default-link5"
        tooltipProps={{ content: 'aria-disabled link', position: 'top' }}
      >
        Aria-disabled Link
      </DropdownItem>
      <Divider component="li" />
      <DropdownItem value={5}>
        Separated Action
      </DropdownItem>
      <DropdownItem
        value={6}
        to="#default-link6"
        onClick={(ev) => ev.preventDefault()}
      >
        Separated Link
      </DropdownItem>
    </DropdownList>
  {/snippet}
</Dropdown>

