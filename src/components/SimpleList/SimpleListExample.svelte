<script lang="ts">
  import SimpleList from './SimpleList.svelte';
  import SimpleListItem from './SimpleListItem.svelte';
  import SimpleListGroup from './SimpleListGroup.svelte';

  interface Props {
    variant?: string;
  }

  let { variant = 'basic' }: Props = $props();
</script>

{#if variant === 'basic'}
  <SimpleList aria-label="Simple list example">
    {#snippet children()}
      <SimpleListItem itemId="item1" isActive={true}>List item 1</SimpleListItem>
      <SimpleListItem itemId="item2">List item 2</SimpleListItem>
      <SimpleListItem itemId="item3">List item 3</SimpleListItem>
    {/snippet}
  </SimpleList>
{:else if variant === 'uncontrolled'}
  <SimpleList aria-label="Uncontrolled simple list example">
    {#snippet children()}
      <SimpleListItem itemId="item1">List item 1</SimpleListItem>
      <SimpleListItem itemId="item2">List item 2</SimpleListItem>
      <SimpleListItem itemId="item3">List item 3</SimpleListItem>
    {/snippet}
  </SimpleList>
{:else if variant === 'links'}
  <SimpleList aria-label="Simple list with links">
    {#snippet children()}
      <SimpleListItem itemId="link1" component="a" href="#">Link 1</SimpleListItem>
      <SimpleListItem itemId="link2" component="a" href="#">Link 2</SimpleListItem>
      <SimpleListItem itemId="link3" component="a" href="#">Link 3</SimpleListItem>
    {/snippet}
  </SimpleList>
{:else if variant === 'grouped'}
  <SimpleList aria-label="Grouped simple list example">
    {#snippet children()}
      <SimpleListGroup title="Group 1" id="group-1">
        {#snippet children()}
          <SimpleListItem itemId="g1-item1">List item 1</SimpleListItem>
          <SimpleListItem itemId="g1-item2">List item 2</SimpleListItem>
        {/snippet}
      </SimpleListGroup>
      <SimpleListGroup title="Group 2" id="group-2">
        {#snippet children()}
          <SimpleListItem itemId="g2-item1">List item 1</SimpleListItem>
          <SimpleListItem itemId="g2-item2">List item 2</SimpleListItem>
        {/snippet}
      </SimpleListGroup>
    {/snippet}
  </SimpleList>
{:else if variant === 'controlled'}
  <SimpleList aria-label="Controlled simple list example" isControlled={true}>
    {#snippet children()}
      <SimpleListItem itemId="item1" isActive={true}>List item 1 (active)</SimpleListItem>
      <SimpleListItem itemId="item2" isActive={false}>List item 2</SimpleListItem>
      <SimpleListItem itemId="item3" isActive={false}>List item 3</SimpleListItem>
    {/snippet}
  </SimpleList>
{/if}
