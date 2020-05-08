<script>
  import { Alert, AlertAction } from "svelte-patternfly";

  let visible = true;
</script>

{#if visible}
<Alert variant="info" title="Closable / dismissable action">
  <span slot="action">
    <AlertAction on:click={() => visible = false}/>
  </span>
  I am an alert and I can be dismissed!
</Alert>
{/if}
