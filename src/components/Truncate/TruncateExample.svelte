<script lang="ts">
  import Truncate from './Truncate.svelte';

  interface Props {
    variant?: string;
  }

  let { variant = 'default' }: Props = $props();

  const longContent = 'redhat_logo_black_and_white_reversed_simple_with_fedora_container.zip';
  const veryLongContent = 'This is a very long string of text that will need to be truncated somewhere in order to fit within the available space provided by the container element.';
</script>

{#if variant === 'default'}
  <div style="width: 300px; border: 1px dashed #ccc; padding: 8px;">
    <Truncate content={longContent} />
  </div>
{:else if variant === 'start'}
  <div style="width: 300px; border: 1px dashed #ccc; padding: 8px;">
    <Truncate content={longContent} position="start" />
  </div>
{:else if variant === 'middle'}
  <div style="width: 300px; border: 1px dashed #ccc; padding: 8px;">
    <Truncate content={longContent} position="middle" />
  </div>
{:else if variant === 'middle-custom'}
  <div style="width: 300px; border: 1px dashed #ccc; padding: 8px;">
    <Truncate content={longContent} position="middle" trailingNumChars={15} />
  </div>
{:else if variant === 'long-text'}
  <div style="width: 400px; border: 1px dashed #ccc; padding: 8px;">
    <Truncate content={veryLongContent} />
  </div>
{:else if variant === 'tooltip-bottom'}
  <div style="width: 300px; border: 1px dashed #ccc; padding: 8px; margin-top: 50px;">
    <Truncate content={longContent} tooltipPosition="bottom" />
  </div>
{/if}
