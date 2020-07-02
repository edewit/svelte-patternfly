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
  <Button isDisabled {variant}>{capitalize(variant)}</Button>
  {' '}
{/each}

<h3>Aria-disabled buttons are like disabled buttons, but focusable.</h3>
{#each variants as variant}
  <Button isAriaDisabled {variant}>{capitalize(variant)}</Button>
  {' '}
{/each}