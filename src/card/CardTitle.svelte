<script>
  import clsx from 'clsx';
  import { clean } from '../utils';

  let className = '';
  export { className as class };
  $: classes = clsx(className, 'pf-c-card__title');
</script>

<div {...$$restProps} class={classes}>
  <slot />
</div>
