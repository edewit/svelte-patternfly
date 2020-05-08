<script>
  import clsx from 'clsx';
  import { clean } from './utils';

  let className = '';
  export let isRead = false;
  export { className as class };
  const props = clean($$props);

  $: classes = clsx(className, 'pf-c-badge', isRead ? 'pf-m-read' : 'pf-m-unread');
</script>

<span {...props} class={classes}>
  <slot/>
</span>