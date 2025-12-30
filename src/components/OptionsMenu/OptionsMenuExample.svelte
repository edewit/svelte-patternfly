<script lang="ts">
  import OptionsMenu from './OptionsMenu.svelte';
  import SelectList from '../Select/SelectList.svelte';
  import SelectOption from '../Select/SelectOption.svelte';
  import SelectGroup from '../Select/SelectGroup.svelte';
  import Divider from '../Dropdown/Divider.svelte';

  export interface Props {
    isOpen?: boolean;
    selected?: string;
  }

  let {
    isOpen: isOpenProp,
    selected: selectedProp
  }: Props = $props();

  let isOpen = $state(isOpenProp ?? false);
  let selected = $state<string>(selectedProp ?? '');

  // Sync with props
  $effect(() => {
    if (isOpenProp !== undefined) {
      isOpen = isOpenProp;
    }
  });

  $effect(() => {
    if (selectedProp !== undefined) {
      selected = selectedProp;
    }
  });

  function handleOpenChange(newIsOpen: boolean) {
    isOpen = newIsOpen;
  }

  function handleSelect(event: MouseEvent | undefined, value: any) {
    if (value !== undefined) {
      selected = value.toString();
    }
  }
</script>

<OptionsMenu
  isOpen={isOpen}
  onOpenChange={handleOpenChange}
  selected={selected}
  onSelect={handleSelect}
  id="options-menu"
  toggleLabel="Options menu"
>
  <SelectList>
    <SelectOption value="0" isSelected={selected === '0'}>
      Option 1
    </SelectOption>
    <SelectOption value="1" isSelected={selected === '1'} isDisabled>
      Disabled Option
    </SelectOption>
    <Divider component="li" />
    <SelectGroup label="Group 1">
      <SelectList>
        <SelectOption value="2" isSelected={selected === '2'}>
          Option 1
        </SelectOption>
        <SelectOption value="3" isSelected={selected === '3'}>
          Option 2
        </SelectOption>
      </SelectList>
    </SelectGroup>
    <Divider component="li" />
    <SelectGroup label="Group 2">
      <SelectList>
        <SelectOption value="4" isSelected={selected === '4'}>
          Option 1
        </SelectOption>
        <SelectOption value="5" isSelected={selected === '5'}>
          Option 2
        </SelectOption>
      </SelectList>
    </SelectGroup>
  </SelectList>
</OptionsMenu>


