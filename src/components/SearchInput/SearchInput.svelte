<script lang="ts">
  import type { SearchInputProps } from './types';
  import Button from '../Button/Button.svelte';
  import '@patternfly/patternfly/components/TextInputGroup/text-input-group.css';
  import '@patternfly/patternfly/components/Button/button.css';
  import '@patternfly/patternfly/components/Badge/badge.css';

  interface Props extends SearchInputProps {
    children?: import('svelte').Snippet;
  }

  let {
    'aria-label': ariaLabel,
    class: className = '',
    customIcon,
    expandableInput,
    id,
    isDisabled = false,
    name,
    onChange,
    onClear,
    onSearch,
    placeholder,
    resultsCount,
    value: valueProp = '',
    ...restProps
  }: Props = $props();

  // Internal value state
  let internalValue = $state(valueProp);

  // Sync with prop value
  $effect(() => {
    if (valueProp !== undefined) {
      internalValue = valueProp;
    }
  });

  // Generate unique ID if not provided
  const inputId = $derived(id || `search-input-${Math.random().toString(36).substring(2, 11)}`);

  // Check if the input has a value to show clear button
  const hasValue = $derived(internalValue && internalValue.length > 0);

  // Check if we should show results count
  const showResultsCount = $derived(resultsCount !== undefined);

  // Build CSS classes for the container
  const containerClasses = $derived(
    ['pf-v6-c-text-input-group', isDisabled && 'pf-m-disabled', className]
      .filter(Boolean)
      .join(' ')
  );

  // Handle input change
  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    internalValue = newValue;
    onChange?.(event, newValue);
  }

  // Handle clear/reset button click
  function handleClear(event: MouseEvent | KeyboardEvent) {
    internalValue = '';
    onClear?.(event);
  }

  // Handle search/submit
  function handleSearch(event: MouseEvent | KeyboardEvent) {
    onSearch?.(event, internalValue, {});
  }

  // Handle key down for Enter key
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  }
</script>

<div class={containerClasses} {...restProps}>
  <div class="pf-v6-c-text-input-group__main pf-m-icon">
    <span class="pf-v6-c-text-input-group__text">
      <span class="pf-v6-c-text-input-group__icon">
        {#if customIcon}
          {@render customIcon()}
        {:else}
          <i class="fas fa-search" aria-hidden="true"></i>
        {/if}
      </span>
      <input
        id={inputId}
        {name}
        type="text"
        class="pf-v6-c-text-input-group__text-input"
        aria-label={ariaLabel}
        {placeholder}
        value={internalValue}
        disabled={isDisabled}
        oninput={handleChange}
        onkeydown={handleKeyDown}
      />
    </span>
  </div>

  {#if showResultsCount || hasValue}
    <div class="pf-v6-c-text-input-group__utilities">
      {#if showResultsCount}
        <span class="pf-v6-c-badge pf-m-read">
          {resultsCount}<span class="pf-v6-screen-reader"> results</span>
        </span>
      {/if}

      {#if hasValue && onClear}
        <Button
          variant="plain"
          aria-label="Reset"
          isDisabled={isDisabled}
          onclick={(e: MouseEvent) => handleClear(e)}
        >
          <span class="pf-v6-c-button__icon">
            <i class="fas fa-times" aria-hidden="true"></i>
          </span>
        </Button>
      {/if}
    </div>
  {/if}
</div>
