<script lang="ts">
  import Sidebar from './Sidebar.svelte';
  import SidebarPanel from './SidebarPanel.svelte';
  import SidebarContent from './SidebarContent.svelte';
</script>

<Sidebar>
  {#snippet children()}
    <SidebarPanel hasBorder>
      {#snippet children()}
        Sidebar panel with border
      {/snippet}
    </SidebarPanel>
    <SidebarContent>
      {#snippet children()}
        <div class="pf-v6-c-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus nulla id
            augue dictum commodo. Donec mollis arcu massa, sollicitudin venenatis est rutrum vitae.
          </p>
        </div>
      {/snippet}
    </SidebarContent>
  {/snippet}
</Sidebar>

