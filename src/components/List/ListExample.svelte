<script lang="ts">
  import List from './List.svelte';
  import ListItem from './ListItem.svelte';
  import Icon from '../Icon/Icon.svelte';
  import CheckCircleIcon from '../Icon/icons/CheckCircleIcon.svelte';

  interface Props {
    variant?: string;
  }

  let { variant = 'basic' }: Props = $props();
</script>

{#snippet iconSnippet()}
  <Icon>
    <CheckCircleIcon />
  </Icon>
{/snippet}

{#if variant === 'basic'}
  <List>
    {#snippet children()}
      <ListItem>First</ListItem>
      <ListItem>Second</ListItem>
      <ListItem>Third</ListItem>
    {/snippet}
  </List>
{:else if variant === 'inline'}
  <List variant="inline">
    {#snippet children()}
      <ListItem>First</ListItem>
      <ListItem>Second</ListItem>
      <ListItem>Third</ListItem>
    {/snippet}
  </List>
{:else if variant === 'ordered'}
  <List component="ol">
    {#snippet children()}
      <ListItem>First</ListItem>
      <ListItem>Second</ListItem>
      <ListItem>Third</ListItem>
    {/snippet}
  </List>
{:else if variant === 'plain'}
  <List isPlain={true}>
    {#snippet children()}
      <ListItem>First</ListItem>
      <ListItem>Second</ListItem>
      <ListItem>Third</ListItem>
    {/snippet}
  </List>
{:else if variant === 'bordered'}
  <List isBordered={true}>
    {#snippet children()}
      <ListItem>First</ListItem>
      <ListItem>Second</ListItem>
      <ListItem>Third</ListItem>
    {/snippet}
  </List>
{:else if variant === 'with-icons'}
  <List>
    {#snippet children()}
      <ListItem icon={iconSnippet}>First</ListItem>
      <ListItem icon={iconSnippet}>Second</ListItem>
      <ListItem icon={iconSnippet}>Third</ListItem>
    {/snippet}
  </List>
{:else if variant === 'with-large-icons'}
  <List iconSize="large">
    {#snippet children()}
      <ListItem icon={iconSnippet}>First</ListItem>
      <ListItem icon={iconSnippet}>Second</ListItem>
      <ListItem icon={iconSnippet}>Third</ListItem>
    {/snippet}
  </List>
{/if}

