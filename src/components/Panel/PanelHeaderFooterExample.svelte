<script lang="ts">
  import Panel from './Panel.svelte';
  import PanelMain from './PanelMain.svelte';
  import PanelMainBody from './PanelMainBody.svelte';
  import PanelHeader from './PanelHeader.svelte';
  import PanelFooter from './PanelFooter.svelte';
</script>

<Panel>
  <PanelHeader>Header content</PanelHeader>
  <hr class="pf-v6-c-divider" />
  <PanelMain>
    <PanelMainBody>Main content</PanelMainBody>
  </PanelMain>
  <PanelFooter>Footer content</PanelFooter>
</Panel>

