<script>
  import { Card, CardTitle, CardBody, CardFooter } from 'svelte-patternfly';

  let selected = '';
  function toggle(id) {
    if (selected !== id) {
      selected = id;
    } else {
      selected = '';
    }
  }
</script>

<Card
  id="first-card"
  isSelectable
  isSelected={selected === 'first-card'}
  on:click={event => toggle(event.currentTarget.id)}>
  <CardTitle>First card</CardTitle>
  <CardBody>
    This is a selectable card. Click me to select me. Click again to deselect
    me.
  </CardBody>
</Card>
<br />
<Card
  id="second-card"
  isSelectable
  isSelected={selected === 'second-card'}
  on:click={event => toggle(event.currentTarget.id)}>
  <CardTitle>Second card</CardTitle>
  <CardBody>
    This is a selectable card. Click me to select me. Click again to deselect
    me.
  </CardBody>
</Card>
