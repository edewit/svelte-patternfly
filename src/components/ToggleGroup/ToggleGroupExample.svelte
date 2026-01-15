<script lang="ts">
  import ToggleGroup from './ToggleGroup.svelte';
  import ToggleGroupItem from './ToggleGroupItem.svelte';
  import CogIcon from '../Icon/icons/CogIcon.svelte';

  interface Props {
    variant?:
      | 'single-select'
      | 'multi-select'
      | 'disabled'
      | 'compact'
      | 'with-icons'
      | 'icons-only';
  }

  let { variant = 'single-select' }: Props = $props();

  // Single select state
  let selectedSingle = $state('');

  // Multi select state
  let selectedMulti = $state<string[]>([]);

  function handleSingleSelect(event: MouseEvent, _isSelected: boolean) {
    const id = (event.currentTarget as HTMLElement).id;
    selectedSingle = id;
  }

  function handleMultiSelect(event: MouseEvent, isSelected: boolean) {
    const id = (event.currentTarget as HTMLElement).id;
    if (isSelected) {
      selectedMulti = [...selectedMulti, id];
    } else {
      selectedMulti = selectedMulti.filter((item) => item !== id);
    }
  }
</script>

{#if variant === 'single-select'}
  <ToggleGroup aria-label="Default with single selectable">
    <ToggleGroupItem
      text="Option 1"
      buttonId="toggle-group-single-1"
      isSelected={selectedSingle === 'toggle-group-single-1'}
      onChange={handleSingleSelect}
    />
    <ToggleGroupItem
      text="Option 2"
      buttonId="toggle-group-single-2"
      isSelected={selectedSingle === 'toggle-group-single-2'}
      onChange={handleSingleSelect}
    />
    <ToggleGroupItem
      text="Option 3"
      buttonId="toggle-group-single-3"
      isSelected={selectedSingle === 'toggle-group-single-3'}
      onChange={handleSingleSelect}
    />
  </ToggleGroup>
{:else if variant === 'multi-select'}
  <ToggleGroup aria-label="Default with multiple selectable">
    <ToggleGroupItem
      text="Option 1"
      buttonId="toggle-group-multi-1"
      isSelected={selectedMulti.includes('toggle-group-multi-1')}
      onChange={handleMultiSelect}
    />
    <ToggleGroupItem
      text="Option 2"
      buttonId="toggle-group-multi-2"
      isSelected={selectedMulti.includes('toggle-group-multi-2')}
      onChange={handleMultiSelect}
    />
    <ToggleGroupItem
      text="Option 3"
      buttonId="toggle-group-multi-3"
      isSelected={selectedMulti.includes('toggle-group-multi-3')}
      onChange={handleMultiSelect}
    />
  </ToggleGroup>
{:else if variant === 'disabled'}
  <ToggleGroup aria-label="Toggle group with disabled item">
    <ToggleGroupItem
      text="Option 1"
      buttonId="toggle-group-disabled-1"
      isSelected={selectedSingle === 'toggle-group-disabled-1'}
      onChange={handleSingleSelect}
    />
    <ToggleGroupItem
      text="Option 2"
      buttonId="toggle-group-disabled-2"
      isSelected={selectedSingle === 'toggle-group-disabled-2'}
      onChange={handleSingleSelect}
    />
    <ToggleGroupItem
      text="Option 3"
      buttonId="toggle-group-disabled-3"
      isDisabled
    />
  </ToggleGroup>
{:else if variant === 'compact'}
  <ToggleGroup aria-label="Compact toggle group" isCompact>
    <ToggleGroupItem
      text="Option 1"
      buttonId="toggle-group-compact-1"
      isSelected={selectedSingle === 'toggle-group-compact-1'}
      onChange={handleSingleSelect}
    />
    <ToggleGroupItem
      text="Option 2"
      buttonId="toggle-group-compact-2"
      isSelected={selectedSingle === 'toggle-group-compact-2'}
      onChange={handleSingleSelect}
    />
    <ToggleGroupItem
      text="Option 3"
      buttonId="toggle-group-compact-3"
      isSelected={selectedSingle === 'toggle-group-compact-3'}
      onChange={handleSingleSelect}
    />
  </ToggleGroup>
{:else if variant === 'with-icons'}
  <ToggleGroup aria-label="Toggle group with icons">
    <ToggleGroupItem
      text="Option 1"
      buttonId="toggle-group-icons-1"
      isSelected={selectedSingle === 'toggle-group-icons-1'}
      onChange={handleSingleSelect}
    >
      {#snippet icon()}<CogIcon />{/snippet}
    </ToggleGroupItem>
    <ToggleGroupItem
      text="Option 2"
      buttonId="toggle-group-icons-2"
      isSelected={selectedSingle === 'toggle-group-icons-2'}
      onChange={handleSingleSelect}
    >
      {#snippet icon()}<CogIcon />{/snippet}
    </ToggleGroupItem>
    <ToggleGroupItem
      text="Option 3"
      buttonId="toggle-group-icons-3"
      isSelected={selectedSingle === 'toggle-group-icons-3'}
      onChange={handleSingleSelect}
    >
      {#snippet icon()}<CogIcon />{/snippet}
    </ToggleGroupItem>
  </ToggleGroup>
{:else if variant === 'icons-only'}
  <ToggleGroup aria-label="Toggle group with icons only">
    <ToggleGroupItem
      buttonId="toggle-group-icons-only-1"
      aria-label="Option 1"
      isSelected={selectedSingle === 'toggle-group-icons-only-1'}
      onChange={handleSingleSelect}
    >
      {#snippet icon()}<CogIcon />{/snippet}
    </ToggleGroupItem>
    <ToggleGroupItem
      buttonId="toggle-group-icons-only-2"
      aria-label="Option 2"
      isSelected={selectedSingle === 'toggle-group-icons-only-2'}
      onChange={handleSingleSelect}
    >
      {#snippet icon()}<CogIcon />{/snippet}
    </ToggleGroupItem>
    <ToggleGroupItem
      buttonId="toggle-group-icons-only-3"
      aria-label="Option 3"
      isSelected={selectedSingle === 'toggle-group-icons-only-3'}
      onChange={handleSingleSelect}
    >
      {#snippet icon()}<CogIcon />{/snippet}
    </ToggleGroupItem>
  </ToggleGroup>
{/if}
