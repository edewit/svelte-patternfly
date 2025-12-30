<script>
  import Example from '../Example.svelte';
  import Avatar from './Avatar.svelte';
  import avatarSource from './Avatar.svelte?raw';
</script>

<h1>Avatar</h1>
<a href="https://www.patternfly.org/v4/documentation/core/components/avatar" target="_blank">
  patternfly Avatar
</a>

<Example source={avatarSource}>
  <p slot="info">
    Avatar
  </p>
  <Avatar />
</Example>

