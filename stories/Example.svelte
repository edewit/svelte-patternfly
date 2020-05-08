<script>
  import PrismCode from './PrismCode.svelte';
  //   export let stacked = false;
  export let source;
  export let title;
</script>

<div class="py-3">
  {#if title}
    <h2>{title}</h2>
  {/if}
  <slot name="info" />
  <div class="border p-3">
    <slot />
    {#if source}
      <PrismCode class="language-html h-100">{source}</PrismCode>
    {/if}
  </div>
</div>
