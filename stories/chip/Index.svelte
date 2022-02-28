<script>
  import Example from '../Example.svelte';
  import SingleChip from './SingleChip.svelte';
  import singleChipSource from '!!raw-loader!./SingleChip.svelte';
</script>

<h1>Chip</h1>
<a href="https://www.patternfly.org/v4/documentation/core/components/chip" target="_blank">
  patternfly Chip
</a>

<Example source={singleChipSource}>
  <p slot="info">
    Single
  </p>
  <SingleChip />
</Example>
