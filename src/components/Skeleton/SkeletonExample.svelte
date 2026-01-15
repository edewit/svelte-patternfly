<script lang="ts">
  import Skeleton from './Skeleton.svelte';

  interface Props {
    variant?: string;
  }

  let { variant = 'default' }: Props = $props();
</script>

{#if variant === 'default'}
  <Skeleton screenreaderText="Loading default content" />
{:else if variant === 'percentage-width'}
  <Skeleton width="25%" screenreaderText="Loading 25% width content" />
{:else if variant === 'percentage-height'}
  <Skeleton height="50%" screenreaderText="Loading 50% height content" />
{:else if variant === 'fixed-width'}
  <Skeleton width="200px" screenreaderText="Loading 200px width content" />
{:else if variant === 'fixed-height'}
  <Skeleton height="100px" screenreaderText="Loading 100px height content" />
{:else if variant === 'text-sm'}
  <Skeleton fontSize="sm" screenreaderText="Loading small text" />
{:else if variant === 'text-md'}
  <Skeleton fontSize="md" screenreaderText="Loading medium text" />
{:else if variant === 'text-lg'}
  <Skeleton fontSize="lg" screenreaderText="Loading large text" />
{:else if variant === 'text-xl'}
  <Skeleton fontSize="xl" screenreaderText="Loading extra large text" />
{:else if variant === 'text-2xl'}
  <Skeleton fontSize="2xl" screenreaderText="Loading 2xl text" />
{:else if variant === 'text-3xl'}
  <Skeleton fontSize="3xl" screenreaderText="Loading 3xl text" />
{:else if variant === 'text-4xl'}
  <Skeleton fontSize="4xl" screenreaderText="Loading 4xl text" />
{:else if variant === 'circle'}
  <Skeleton shape="circle" width="50px" height="50px" screenreaderText="Loading circle" />
{:else if variant === 'square'}
  <Skeleton shape="square" width="50px" height="50px" screenreaderText="Loading square" />
{/if}
