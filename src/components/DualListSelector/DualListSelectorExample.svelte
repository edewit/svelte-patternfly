<script lang="ts">
  import DualListSelector from './DualListSelector.svelte';
  import DualListSelectorPane from './DualListSelectorPane.svelte';
  import DualListSelectorHeader from './DualListSelectorHeader.svelte';
  import DualListSelectorTitle from './DualListSelectorTitle.svelte';
  import DualListSelectorTitleText from './DualListSelectorTitleText.svelte';
  import DualListSelectorTools from './DualListSelectorTools.svelte';
  import DualListSelectorToolsFilter from './DualListSelectorToolsFilter.svelte';
  import DualListSelectorToolsActions from './DualListSelectorToolsActions.svelte';
  import DualListSelectorStatus from './DualListSelectorStatus.svelte';
  import DualListSelectorStatusText from './DualListSelectorStatusText.svelte';
  import DualListSelectorMenu from './DualListSelectorMenu.svelte';
  import DualListSelectorList from './DualListSelectorList.svelte';
  import DualListSelectorListItem from './DualListSelectorListItem.svelte';
  import DualListSelectorListItemRow from './DualListSelectorListItemRow.svelte';
  import DualListSelectorItem from './DualListSelectorItem.svelte';
  import DualListSelectorItemMain from './DualListSelectorItemMain.svelte';
  import DualListSelectorItemText from './DualListSelectorItemText.svelte';
  import DualListSelectorControls from './DualListSelectorControls.svelte';
  import DualListSelectorControlsItem from './DualListSelectorControlsItem.svelte';
  import DualListSelectorControl from './DualListSelectorControl.svelte';
  import Button from '../Button/Button.svelte';
  import '@patternfly/patternfly/components/TextInputGroup/text-input-group.css';
  import '@patternfly/patternfly/components/MenuToggle/menu-toggle.css';

  interface Props {
    variant?: 'basic' | 'withSearch' | 'withTooltips';
  }

  let { variant = 'basic' }: Props = $props();

  let availableItems = $state(['Item1', 'Item2', 'Item3 (disabled)', 'Item4', 'Item5']);
  let chosenItems = $state<string[]>([]);
  let selectedAvailable = $state<Set<number>>(new Set());
  let selectedChosen = $state<Set<number>>(new Set());
  let availableSearch = $state('');
  let chosenSearch = $state('');

  const availableStatusId = 'basic-available-status-text';
  const chosenStatusId = 'basic-chosen-status-text';

  function toggleAvailableSelection(index: number) {
    if (index === 2) return; // Item3 is disabled
    if (selectedAvailable.has(index)) {
      selectedAvailable.delete(index);
    } else {
      selectedAvailable.add(index);
    }
    selectedAvailable = new Set(selectedAvailable);
  }

  function toggleChosenSelection(index: number) {
    if (selectedChosen.has(index)) {
      selectedChosen.delete(index);
    } else {
      selectedChosen.add(index);
    }
    selectedChosen = new Set(selectedChosen);
  }

  function addSelected() {
    const itemsToAdd = Array.from(selectedAvailable)
      .sort((a, b) => b - a)
      .map((i) => availableItems[i]);
    chosenItems = [...chosenItems, ...itemsToAdd];
    availableItems = availableItems.filter((_, i) => !selectedAvailable.has(i));
    selectedAvailable = new Set();
  }

  function addAll() {
    const itemsToAdd = availableItems.filter((item, i) => i !== 2); // Skip disabled item
    chosenItems = [...chosenItems, ...itemsToAdd];
    availableItems = availableItems.filter((_, i) => i === 2); // Keep only disabled item
    selectedAvailable = new Set();
  }

  function removeSelected() {
    const itemsToRemove = Array.from(selectedChosen)
      .sort((a, b) => b - a)
      .map((i) => chosenItems[i]);
    availableItems = [...availableItems, ...itemsToRemove];
    chosenItems = chosenItems.filter((_, i) => !selectedChosen.has(i));
    selectedChosen = new Set();
  }

  function removeAll() {
    availableItems = [...availableItems, ...chosenItems];
    chosenItems = [];
    selectedChosen = new Set();
  }

  const filteredAvailable = $derived(
    availableItems.filter((item) => item.toLowerCase().includes(availableSearch.toLowerCase()))
  );

  const filteredChosen = $derived(
    chosenItems.filter((item) => item.toLowerCase().includes(chosenSearch.toLowerCase()))
  );
</script>

<DualListSelector id="basic-dual-list-selector">
  <DualListSelectorPane>
    <DualListSelectorHeader>
      <DualListSelectorTitle>
        <DualListSelectorTitleText>Available options</DualListSelectorTitleText>
      </DualListSelectorTitle>
    </DualListSelectorHeader>

    {#if variant === 'withSearch' || variant === 'withTooltips'}
      <DualListSelectorTools>
        <DualListSelectorToolsFilter>
          <div class="pf-v6-c-text-input-group">
            <div class="pf-v6-c-text-input-group__main pf-m-icon">
              <span class="pf-v6-c-text-input-group__text">
                <span class="pf-v6-c-text-input-group__icon">
                  <i class="fas fa-fw fa-search"></i>
                </span>
                <input
                  class="pf-v6-c-text-input-group__text-input"
                  type="text"
                  bind:value={availableSearch}
                  aria-label="Search input"
                />
              </span>
            </div>
          </div>
        </DualListSelectorToolsFilter>
        <DualListSelectorToolsActions>
          <Button variant="plain" aria-label="Sort">
            <span class="pf-v6-c-button__icon pf-m-start">
              <i class="fas fa-sort-amount-down pf-v6-m-mirror-inline-rtl" aria-hidden="true"></i>
            </span>
          </Button>
          <button
            class="pf-v6-c-menu-toggle pf-m-plain"
            type="button"
            aria-expanded="false"
            aria-label="Dual list item menu toggle"
            id="basic-available-menu-toggle"
          >
            <span class="pf-v6-c-menu-toggle__icon">
              <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
            </span>
          </button>
        </DualListSelectorToolsActions>
      </DualListSelectorTools>
    {/if}

    <DualListSelectorStatus>
      <DualListSelectorStatusText id={availableStatusId}>
        {selectedAvailable.size} of {availableItems.length} items selected
      </DualListSelectorStatusText>
    </DualListSelectorStatus>

    <DualListSelectorMenu tabindex="0">
      <DualListSelectorList
        role="listbox"
        aria-labelledby={availableStatusId}
        aria-multiselectable="true"
      >
        {#each filteredAvailable as item, _index}
          {@const originalIndex = availableItems.indexOf(item)}
          {@const isSelected = selectedAvailable.has(originalIndex)}
          <DualListSelectorListItem
            role="option"
            isDisabled={originalIndex === 2}
            {isSelected}
            onclick={() => toggleAvailableSelection(originalIndex)}
          >
            <DualListSelectorListItemRow {isSelected}>
              <DualListSelectorItem>
                <DualListSelectorItemMain>
                  <DualListSelectorItemText>{item}</DualListSelectorItemText>
                </DualListSelectorItemMain>
              </DualListSelectorItem>
            </DualListSelectorListItemRow>
          </DualListSelectorListItem>
        {/each}
      </DualListSelectorList>
    </DualListSelectorMenu>
  </DualListSelectorPane>

  <DualListSelectorControls>
    <DualListSelectorControlsItem>
      <DualListSelectorControl
        aria-label="Add selected"
        isDisabled={selectedAvailable.size === 0}
        onClick={addSelected}
      >
        <span class="pf-v6-c-button__icon">
          <i class="fas fa-angle-right fa-fw" aria-hidden="true"></i>
        </span>
      </DualListSelectorControl>
    </DualListSelectorControlsItem>
    <DualListSelectorControlsItem>
      <DualListSelectorControl
        aria-label="Add all"
        isDisabled={availableItems.length === 0 ||
          (availableItems.length === 1 && availableItems[0].includes('disabled'))}
        onClick={addAll}
      >
        <span class="pf-v6-c-button__icon">
          <i class="fas fa-angle-double-right fa-fw" aria-hidden="true"></i>
        </span>
      </DualListSelectorControl>
    </DualListSelectorControlsItem>
    <DualListSelectorControlsItem>
      <DualListSelectorControl
        aria-label="Remove all"
        isDisabled={chosenItems.length === 0}
        onClick={removeAll}
      >
        <span class="pf-v6-c-button__icon">
          <i class="fas fa-angle-double-left fa-fw" aria-hidden="true"></i>
        </span>
      </DualListSelectorControl>
    </DualListSelectorControlsItem>
    <DualListSelectorControlsItem>
      <DualListSelectorControl
        aria-label="Remove selected"
        isDisabled={selectedChosen.size === 0}
        onClick={removeSelected}
      >
        <span class="pf-v6-c-button__icon">
          <i class="fas fa-angle-left fa-fw" aria-hidden="true"></i>
        </span>
      </DualListSelectorControl>
    </DualListSelectorControlsItem>
  </DualListSelectorControls>

  <DualListSelectorPane isChosen={true}>
    <DualListSelectorHeader>
      <DualListSelectorTitle>
        <DualListSelectorTitleText>Chosen options</DualListSelectorTitleText>
      </DualListSelectorTitle>
    </DualListSelectorHeader>

    {#if variant === 'withSearch' || variant === 'withTooltips'}
      <DualListSelectorTools>
        <DualListSelectorToolsFilter>
          <div class="pf-v6-c-text-input-group">
            <div class="pf-v6-c-text-input-group__main pf-m-icon">
              <span class="pf-v6-c-text-input-group__text">
                <span class="pf-v6-c-text-input-group__icon">
                  <i class="fas fa-fw fa-search"></i>
                </span>
                <input
                  class="pf-v6-c-text-input-group__text-input"
                  type="text"
                  bind:value={chosenSearch}
                  aria-label="Search input"
                />
              </span>
            </div>
          </div>
        </DualListSelectorToolsFilter>
        <DualListSelectorToolsActions>
          <Button variant="plain" aria-label="Sort">
            <span class="pf-v6-c-button__icon pf-m-start">
              <i class="fas fa-sort-amount-down pf-v6-m-mirror-inline-rtl" aria-hidden="true"></i>
            </span>
          </Button>
          <button
            class="pf-v6-c-menu-toggle pf-m-plain"
            type="button"
            aria-expanded="false"
            aria-label="Dual list item menu toggle"
            id="basic-chosen-menu-toggle"
          >
            <span class="pf-v6-c-menu-toggle__icon">
              <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
            </span>
          </button>
        </DualListSelectorToolsActions>
      </DualListSelectorTools>
    {/if}

    <DualListSelectorStatus>
      <DualListSelectorStatusText id={chosenStatusId}>
        {selectedChosen.size} of {chosenItems.length} items selected
      </DualListSelectorStatusText>
    </DualListSelectorStatus>

    <DualListSelectorMenu tabindex="0">
      <DualListSelectorList
        role="listbox"
        aria-labelledby={chosenStatusId}
        aria-multiselectable="true"
      >
        {#each filteredChosen as item, _index}
          {@const originalIndex = chosenItems.indexOf(item)}
          {@const isSelected = selectedChosen.has(originalIndex)}
          <DualListSelectorListItem
            role="option"
            {isSelected}
            onclick={() => toggleChosenSelection(originalIndex)}
          >
            <DualListSelectorListItemRow {isSelected}>
              <DualListSelectorItem>
                <DualListSelectorItemMain>
                  <DualListSelectorItemText>{item}</DualListSelectorItemText>
                </DualListSelectorItemMain>
              </DualListSelectorItem>
            </DualListSelectorListItemRow>
          </DualListSelectorListItem>
        {/each}
      </DualListSelectorList>
    </DualListSelectorMenu>
  </DualListSelectorPane>
</DualListSelector>
