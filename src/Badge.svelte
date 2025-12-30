<script>
  import clsx from 'clsx';
  import { clean } from './utils';

  let className = '';
  export let isRead = false;
  export { className as class };
  $: classes = clsx(className, 'pf-c-badge', isRead ? 'pf-m-read' : 'pf-m-unread');
</script>

<span {...$$restProps} class={classes}>
  <slot/>
</span>