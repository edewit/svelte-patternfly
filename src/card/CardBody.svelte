<script>
  import clsx from 'clsx';
  import { clean } from '../utils';

  let className = '';
  export { className as class };
  export let isFilled = true;
  const props = clean($$props);

  $: classes = clsx(className, 'pf-c-card__body', !isFilled && 'pf-m-no-fill');
</script>

<div {...props} class={classes}>
  <slot />
</div>
