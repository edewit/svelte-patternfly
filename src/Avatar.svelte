<script>
  import clsx from 'clsx';
  import { clean } from './utils';

  let className = '';
  export { className as class };
  export let alt = 'Avatar image';
  export let src = '';

  const props = clean($$props);
  $: classes = clsx(className, 'pf-c-avatar' );
</script>

<img class={classes} {src} {alt} />