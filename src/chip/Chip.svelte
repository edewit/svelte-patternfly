<script>
  import Button from '../Button.svelte';
  import TimesIcon from '../icon/TimesIcon.svelte'

  import clsx from 'clsx';
  import { clean } from '../utils';

  let className = '';
  export { className as class };
  export let isReadOnly = false;

  const props = clean($$props);

  $: classes = clsx(className, 'pf-c-chip');
</script>

<div class={classes} {...props}>
  <span class="pf-c-chip__text">
    <slot/>
  </span>
  {#if !isReadOnly}
    <Button on:click variant="plain">
      <TimesIcon/>
    </Button>
  {/if}
</div>
