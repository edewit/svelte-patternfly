<script lang="ts">
  import Sidebar from './Sidebar.svelte';
  import SidebarPanel from './SidebarPanel.svelte';
  import SidebarContent from './SidebarContent.svelte';
</script>

<Sidebar>
  {#snippet children()}
    <SidebarPanel>
      {#snippet children()}
        Sidebar panel
      {/snippet}
    </SidebarPanel>
    <SidebarContent>
      {#snippet children()}
        <div class="pf-v6-c-content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus nulla id
            augue dictum commodo. Donec mollis arcu massa, sollicitudin venenatis est rutrum vitae.
            Integer pulvinar ligula at augue mollis, ac pulvinar arcu semper. Maecenas nisi lorem,
            malesuada ac lectus nec, porta pretium neque. Ut convallis libero sit amet metus mattis,
            vel facilisis lorem malesuada. Duis consectetur ante sit amet magna efficitur, a interdum
            leo vulputate.
          </p>
          <p>
            Praesent at odio nec sapien ultrices tincidunt in non mauris. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis consectetur nisl
            quis facilisis faucibus. Sed eu bibendum risus. Suspendisse porta euismod tortor, at
            elementum odio suscipit sed. Cras eget ultrices urna, ac feugiat lectus. Integer a
            pharetra velit, in imperdiet mi. Phasellus vel hendrerit velit. Vestibulum ut augue vitae
            erat vulputate bibendum a ut magna.
          </p>
        </div>
      {/snippet}
    </SidebarContent>
  {/snippet}
</Sidebar>

