<script lang="ts">
  import Icon from './Icon.svelte';
  import CogIcon from './icons/CogIcon.svelte';
  import CheckCircleIcon from './icons/CheckCircleIcon.svelte';

  let isInProgress = $state(false);
</script>

<button onclick={() => (isInProgress = !isInProgress)}>
  Toggle in progress state
</button>

<br />
<br />

<Icon isInProgress={isInProgress}>
  <CogIcon />
</Icon>

<br />
<br />

<!-- Note: Custom progressIcon with component snippets requires createRawSnippet
     which has limitations. For now, we show the default spinner. -->
<Icon isInProgress={isInProgress}>
  <CogIcon />
</Icon>


