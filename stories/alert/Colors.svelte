<script>
  import { Alert, AlertAction } from "svelte-patternfly";
  import { capitalize } from '../../src/utils';

  const variants = [
    { type: 'success', show: true },
    { type: 'danger', show: true },
    { type: 'warning', show: true },
    { type: 'info', show: true },
    { type: 'default', show: true }
  ];
</script>

{#each variants as variant}
  {#if variant.show}
    <Alert
      variant={variant.type}
      title="{capitalize(variant.type)} alert title"
    >
      <span slot="action">
        <AlertAction on:click={()=> variant.show = false} />
      </span>
      Alert description <a href="tel:">This is a link</a>
    </Alert>
  {/if}
{/each}

<Alert variant='warning' title="Simple alert" />
