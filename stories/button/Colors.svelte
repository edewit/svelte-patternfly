<script>
  import { Button } from 'svelte-patternfly';
  import { capitalize } from '../../src/utils';

  const variants = [
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'link',
    'plain',
    'control'
  ];
</script>

{#each variants as variant}
  <Button {variant}>{capitalize(variant)}</Button>
  {' '}
{/each}
<Button variant="link" isInline>Inline Link Button</Button>
