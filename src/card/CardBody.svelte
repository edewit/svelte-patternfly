<script>
  import clsx from 'clsx';
  import { clean } from '../utils';

  let className = '';
  export { className as class };
  export let isFilled = true;
  $: classes = clsx(className, 'pf-c-card__body', !isFilled && 'pf-m-no-fill');
</script>

<div {...$$restProps} class={classes}>
  <slot />
</div>
