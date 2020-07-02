<script>
  import Example from '../Example.svelte';
  import SimpleCheck from './SimpleCheck.svelte';
  import simpleCheckSource from '!!raw-loader!./SimpleCheck.svelte';
  import ControlledCheck from './ControlledCheck.svelte';
  import controlledCheckSource from '!!raw-loader!./ControlledCheck.svelte';
</script>

<h1>Check</h1>
<a href="https://www.patternfly.org/v4/documentation/core/components/check" target="_blank">
  patternfly Check
</a>

<Example source={simpleCheckSource}>
  <p slot="info">
    Simple checkboxes
  </p>
  <SimpleCheck />
</Example>

<Example source={controlledCheckSource}>
  <p slot="info">
    Controlled
  </p>
  <ControlledCheck />
</Example>
