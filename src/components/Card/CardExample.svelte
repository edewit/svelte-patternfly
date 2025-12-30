<script lang="ts">
  import Card from './Card.svelte';
</script>

<Card id="card-basic-example" title="Title">
  Body
  {#snippet footerSlot()}
    Footer
  {/snippet}
</Card>
