<script lang="ts">
  import Select from '../Select/Select.svelte';
  import MenuToggle from '../MenuToggle/MenuToggle.svelte';
  import type { SelectProps } from '../Select/types';

  interface Props extends Omit<SelectProps, 'toggle'> {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    onSelect?: (event?: MouseEvent, value?: any) => void;
    selected?: any | any[];
    toggleLabel?: string;
    id?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    isOpen,
    onOpenChange,
    onSelect,
    selected,
    toggleLabel = 'Options menu',
    id,
    class: className = '',
    children,
    ...selectProps
  }: Props = $props();

  const menuId = $derived(id ? `${id}-menu` : undefined);
</script>

{#snippet toggleSnippet()}
  <MenuToggle
    isExpanded={isOpen}
    aria-controls={menuId}
  >
    {toggleLabel}
  </MenuToggle>
{/snippet}

<Select
  {isOpen}
  {onOpenChange}
  {onSelect}
  {selected}
  {id}
  class={className}
  toggle={toggleSnippet}
  {...selectProps}
>
  {@render children?.()}
</Select>

