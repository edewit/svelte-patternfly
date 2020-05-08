<script>
  import Example from '../Example.svelte';
  import Colors from './Colors.svelte';
  import colorsSource from '!!raw-loader!./Colors.svelte';
  import Dismissable from './Dismissable.svelte';
  import dismissableSource from '!!raw-loader!./Dismissable.svelte';
</script>

<h1>Alerts</h1>
<a href="https://www.patternfly.org/v4/documentation/core/components/alert" target="_blank">
  patternfly Alerts
</a>

<Example title="Colors" source={colorsSource}>
  <Colors />
</Example>

<Example title="Dismissable" source={dismissableSource}>
  <Dismissable />
</Example>
