<script>
  import Example from '../Example.svelte';
  import Badge from './Badge.svelte';
  import BadgeUnRead from './BadgeUnRead.svelte';
  import badgeSource from './Badge.svelte?raw';
  import badgeUnReadSource from './BadgeUnRead.svelte?raw';
</script>

<h1>Badges</h1>
<a href="https://www.patternfly.org/v4/documentation/core/components/badge" target="_blank">
  patternfly Badges
</a>

<Example source={badgeSource}>
  <p slot="info">
    Badges scale to parent.
  </p>
  <Badge />
</Example>

<Example source={badgeUnReadSource}>
  <p slot="info">
    Badges Unread.
  </p>
  <BadgeUnRead />
</Example>

