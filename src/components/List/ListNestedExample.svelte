<script lang="ts">
  import List from './List.svelte';
  import ListItem from './ListItem.svelte';
</script>

<List component="ol">
  {#snippet children()}
    <ListItem>Donec blandit a lorem id convallis.</ListItem>
    <ListItem>Cras gravida arcu at diam gravida gravida.</ListItem>
    <ListItem>Integer in volutpat libero.</ListItem>
    <ListItem>Donec a diam tellus.</ListItem>
    <ListItem>
      {#snippet children()}
        Etiam auctor nisl et.
        <List component="ul">
          {#snippet children()}
            <ListItem>Donec blandit a lorem id convallis.</ListItem>
            <ListItem>Cras gravida arcu at diam gravida gravida.</ListItem>
            <ListItem>
              {#snippet children()}
                Integer in volutpat libero.
                <List component="ol">
                  {#snippet children()}
                    <ListItem>Donec blandit a lorem id convallis.</ListItem>
                    <ListItem>Cras gravida arcu at diam gravida gravida.</ListItem>
                  {/snippet}
                </List>
              {/snippet}
            </ListItem>
          {/snippet}
        </List>
      {/snippet}
    </ListItem>
    <ListItem>Aenean nec tortor orci.</ListItem>
    <ListItem>Quisque aliquam cursus urna, non bibendum massa viverra eget.</ListItem>
    <ListItem>Vivamus maximus ultricies pulvinar.</ListItem>
  {/snippet}
</List>

