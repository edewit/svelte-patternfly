<script lang="ts">
  import Spinner from './Spinner.svelte';

  interface Props {
    variant?:
      | 'basic'
      | 'size-sm'
      | 'size-md'
      | 'size-lg'
      | 'size-xl'
      | 'custom-size'
      | 'inline';
  }

  let { variant = 'basic' }: Props = $props();
</script>

{#if variant === 'basic'}
  <Spinner aria-label="Contents of the basic example" />
{:else if variant === 'size-sm'}
  <Spinner size="sm" aria-label="Small spinner" />
{:else if variant === 'size-md'}
  <Spinner size="md" aria-label="Medium spinner" />
{:else if variant === 'size-lg'}
  <Spinner size="lg" aria-label="Large spinner" />
{:else if variant === 'size-xl'}
  <Spinner size="xl" aria-label="Extra large spinner" />
{:else if variant === 'custom-size'}
  <Spinner diameter="80px" aria-label="Custom size spinner" />
{:else if variant === 'inline'}
  <p>
    Loading <Spinner isInline aria-label="Loading inline" size="sm" /> content...
  </p>
{/if}
