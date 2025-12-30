<script>
  import clsx from 'clsx';
  import { clean } from '../utils';
  let className = '';
  export { className as class };
  export let isCompact = false;
  export let isSelected = false;
  export let isSelectable = false;
  export let isFlat = false;

  $: classes = clsx(
    className,
    'pf-c-card',
    isCompact && 'pf-m-compact',
    isSelected && 'pf-m-selected',
    isSelectable && 'pf-m-selectable',
    isFlat && 'pf-m-flat'
  );
</script>

<div class={classes} {...$$restProps} on:click>
  <slot />
</div>
