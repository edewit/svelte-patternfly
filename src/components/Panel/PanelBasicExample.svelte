<script lang="ts">
  import Panel from './Panel.svelte';
  import PanelMain from './PanelMain.svelte';
  import PanelMainBody from './PanelMainBody.svelte';

  interface Props {
    variant?: 'raised' | 'bordered' | 'secondary';
  }

  let { variant }: Props = $props();
</script>

<Panel {variant}>
  <PanelMain>
    <PanelMainBody>Main content</PanelMainBody>
  </PanelMain>
</Panel>

