<script lang="ts">
  import Panel from './Panel.svelte';
  import PanelMain from './PanelMain.svelte';
  import PanelMainBody from './PanelMainBody.svelte';
  import PanelFooter from './PanelFooter.svelte';
</script>

<Panel>
  <PanelMain>
    <PanelMainBody>Main content</PanelMainBody>
  </PanelMain>
  <PanelFooter>Footer content</PanelFooter>
</Panel>

