<script>
  import Example from '../Example.svelte';
  import Colors from './Colors.svelte';
  import Disabled from './Disabled.svelte';
  import Groups from './Groups.svelte';
  import Outline from './Outline.svelte';
  import Sizes from './Sizes.svelte';
  import Block from './Block.svelte';
  import blockSource from './Block.svelte?raw'
  import disabledSource from './Disabled.svelte?raw';
  import groupsSource from './Groups.svelte?raw';
  import outlineSource from './Outline.svelte?raw';
  import sizesSource from './Sizes.svelte?raw';
  import source from './Colors.svelte?raw';
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

