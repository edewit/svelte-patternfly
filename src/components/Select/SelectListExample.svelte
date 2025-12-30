<script lang="ts">
  import Select from './Select.svelte';
  import SelectList from './SelectList.svelte';
  import SelectOption from './SelectOption.svelte';
  import SelectGroup from './SelectGroup.svelte';
  import MenuToggle from '../MenuToggle/MenuToggle.svelte';
  import Divider from '../Dropdown/Divider.svelte';

  export interface Props {
    variant?: 'basic' | 'with-groups' | 'multiselect' | 'with-checkboxes';
    isOpen?: boolean;
    selected?: string | string[];
  }

  let {
    variant = 'basic',
    isOpen: isOpenProp,
    selected: selectedProp
  }: Props = $props();

  let isOpen = $state(isOpenProp ?? false);
  let selected = $state<string | string[]>(selectedProp ?? (variant === 'multiselect' ? [] : ''));

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
      if (variant === 'multiselect') {
        const currentSelected = Array.isArray(selected) ? selected : [];
        const valueStr = value.toString();
        if (currentSelected.includes(valueStr)) {
          selected = currentSelected.filter((v) => v !== valueStr);
        } else {
          selected = [...currentSelected, valueStr];
        }
      } else {
        selected = value.toString();
      }
    }
  }

  const menuId = $derived('select-list-menu');
</script>

{#snippet toggleSnippet()}
  <MenuToggle
    isExpanded={isOpen}
    aria-controls={menuId}
  >
    {variant === 'multiselect'
      ? `Select (${Array.isArray(selected) ? selected.length : 0} selected)`
      : variant === 'with-checkboxes'
      ? 'Select with checkboxes'
      : 'Select'}
  </MenuToggle>
{/snippet}

<Select
  {isOpen}
  onOpenChange={handleOpenChange}
  onSelect={handleSelect}
  selected={selected}
  id="select-list"
  toggle={toggleSnippet}
>
  {#if variant === 'basic'}
    <SelectList>
      <SelectOption value="0" isSelected={selected === '0'}>
        Option 1
      </SelectOption>
      <SelectOption value="1" isSelected={selected === '1'}>
        Option 2
      </SelectOption>
      <SelectOption value="2" isSelected={selected === '2'} isDisabled>
        Disabled Option
      </SelectOption>
      <SelectOption value="3" isSelected={selected === '3'}>
        Option 4
      </SelectOption>
    </SelectList>
  {:else if variant === 'with-groups'}
    <SelectList>
      <SelectOption value="0" isSelected={selected === '0'}>
        Option 1
      </SelectOption>
      <SelectOption value="1" isSelected={selected === '1'}>
        Option 2
      </SelectOption>
      <Divider component="li" />
      <SelectGroup label="Group 1">
        <SelectList>
          <SelectOption value="2" isSelected={selected === '2'}>
            Group 1 Option 1
          </SelectOption>
          <SelectOption value="3" isSelected={selected === '3'}>
            Group 1 Option 2
          </SelectOption>
        </SelectList>
      </SelectGroup>
      <Divider component="li" />
      <SelectGroup label="Group 2">
        <SelectList>
          <SelectOption value="4" isSelected={selected === '4'}>
            Group 2 Option 1
          </SelectOption>
          <SelectOption value="5" isSelected={selected === '5'}>
            Group 2 Option 2
          </SelectOption>
        </SelectList>
      </SelectGroup>
    </SelectList>
  {:else if variant === 'multiselect'}
    <SelectList isAriaMultiselectable={true}>
      <SelectOption
        value="0"
        isSelected={Array.isArray(selected) && selected.includes('0')}
      >
        Option 1
      </SelectOption>
      <SelectOption
        value="1"
        isSelected={Array.isArray(selected) && selected.includes('1')}
      >
        Option 2
      </SelectOption>
      <SelectOption
        value="2"
        isSelected={Array.isArray(selected) && selected.includes('2')}
        isDisabled
      >
        Disabled Option
      </SelectOption>
      <SelectOption
        value="3"
        isSelected={Array.isArray(selected) && selected.includes('3')}
      >
        Option 4
      </SelectOption>
    </SelectList>
  {:else if variant === 'with-checkboxes'}
    <SelectList role="menu">
      <SelectOption
        value="0"
        isSelected={selected === '0'}
        hasCheckbox={true}
      >
        Option 1
      </SelectOption>
      <SelectOption
        value="1"
        isSelected={selected === '1'}
        hasCheckbox={true}
      >
        Option 2
      </SelectOption>
      <SelectOption
        value="2"
        isSelected={selected === '2'}
        hasCheckbox={true}
        isDisabled
      >
        Disabled Option
      </SelectOption>
      <SelectOption
        value="3"
        isSelected={selected === '3'}
        hasCheckbox={true}
      >
        Option 4
      </SelectOption>
    </SelectList>
  {/if}
</Select>

