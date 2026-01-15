<script lang="ts">
  import Title from './Title.svelte';

  interface Props {
    variant?: string;
  }

  let { variant = 'default-sizes' }: Props = $props();
</script>

{#if variant === 'default-sizes'}
  <Title headingLevel="h1">H1-styled title</Title>
  <Title headingLevel="h2">H2-styled title</Title>
  <Title headingLevel="h3">H3-styled title</Title>
  <Title headingLevel="h4">H4-styled title</Title>
  <Title headingLevel="h5">H5-styled title</Title>
  <Title headingLevel="h6">H6-styled title</Title>
{:else if variant === 'custom-sizes'}
  <Title headingLevel="h1" size="4xl">4xl title</Title>
  <Title headingLevel="h1" size="3xl">3xl title</Title>
  <Title headingLevel="h1" size="2xl">2xl title</Title>
  <Title headingLevel="h1" size="xl">xl title</Title>
  <Title headingLevel="h1" size="lg">lg title</Title>
  <Title headingLevel="h1" size="md">md title</Title>
{:else if variant === 'all-sizes'}
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <Title headingLevel="h1" size="4xl">4xl title (h1)</Title>
    <Title headingLevel="h2" size="3xl">3xl title (h2)</Title>
    <Title headingLevel="h3" size="2xl">2xl title (h3)</Title>
    <Title headingLevel="h4" size="xl">xl title (h4)</Title>
    <Title headingLevel="h5" size="lg">lg title (h5)</Title>
    <Title headingLevel="h6" size="md">md title (h6)</Title>
  </div>
{/if}
