<script lang="ts">
  import Sidebar from './Sidebar.svelte';
  import SidebarPanel from './SidebarPanel.svelte';
  import SidebarContent from './SidebarContent.svelte';
</script>

<Sidebar tabIndex={0} aria-label="Sidebar with sticky panel" style="height: 250px; overflow: auto;">
  {#snippet children()}
    <SidebarPanel isSticky>
      {#snippet children()}
        <div style="padding: 1rem; background: var(--pf-t--global--background--color--secondary--default);">
          Sticky sidebar panel
        </div>
      {/snippet}
    </SidebarPanel>
    <SidebarContent>
      {#snippet children()}
        <div class="pf-v6-c-content">
          <p><strong>Scroll me!</strong></p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus nulla id
            augue dictum commodo. Donec mollis arcu massa, sollicitudin venenatis est rutrum vitae.
            Integer pulvinar ligula at augue mollis, ac pulvinar arcu semper.
          </p>
          <p>
            Maecenas nisi lorem, malesuada ac lectus nec, porta pretium neque. Ut convallis libero sit
            amet metus mattis, vel facilisis lorem malesuada. Duis consectetur ante sit amet magna
            efficitur, a interdum leo vulputate.
          </p>
          <p>
            Praesent at odio nec sapien ultrices tincidunt in non mauris. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </p>
          <p>
            Duis consectetur nisl quis facilisis faucibus. Sed eu bibendum risus. Suspendisse porta
            euismod tortor, at elementum odio suscipit sed.
          </p>
        </div>
      {/snippet}
    </SidebarContent>
  {/snippet}
</Sidebar>

