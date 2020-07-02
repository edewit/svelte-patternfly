<script>
  import Example from '../Example.svelte';
  import Colors from './Colors.svelte';
  import Disabled from './Disabled.svelte';
  import Groups from './Groups.svelte';
  import Outline from './Outline.svelte';
  import Sizes from './Sizes.svelte';
  import Block from './Block.svelte';
  import blockSource from '!!raw-loader!./Block.svelte'
  import disabledSource from '!!raw-loader!./Disabled.svelte';
  import groupsSource from '!!raw-loader!./Groups.svelte';
  import outlineSource from '!!raw-loader!./Outline.svelte';
  import sizesSource from '!!raw-loader!./Sizes.svelte';
  import source from '!!raw-loader!./Colors.svelte';
</script>

<h1>Buttons</h1>
<a href="https://www.patternfly.org/v4/documentation/core/components/button" target="_blank">
  patternfly Buttons
</a>

<Example title="Colors" source={source}>
  <Colors />
</Example>

<Example title="Block" source={blockSource}>
  <Block />
</Example>

<Example title="Disabled" source={disabledSource}>
  <Disabled />
</Example>

<!-- <Example title="Outline" source={outlineSource}>
  <Outline />
</Example>

<Example title="Sizes" source={sizesSource}>
  <Sizes />
</Example>

<Example title="ButtonGroups" source={groupsSource}>
  <Groups />
</Example> -->

