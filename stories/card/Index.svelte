<script>
  import Example from '../Example.svelte';
  import SimpleCard from './SimpleCard.svelte';
  import simpleCardSource from './SimpleCard.svelte?raw';

  import SelectableCard from './SelectableCard.svelte';
  import selectableCardSource from './SelectableCard.svelte?raw';

</script>

<h1>Card</h1>
<a href="https://www.patternfly.org/v4/documentation/core/components/card" target="_blank">
  patternfly Card
</a>

<Example source={simpleCardSource}>
  <p slot="info">
    SimpleCard
  </p>
  <SimpleCard />
</Example>

<Example source={selectableCardSource}>
  <p slot="info">
    Selectable Card
  </p>
  <SelectableCard />
</Example>