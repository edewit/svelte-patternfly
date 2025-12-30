<script>
  import clsx from 'clsx';
  import { clean } from '../utils';

  let className = '';
  export { className as class };
  export let ariaLabel = 'breadcrumb';

  $: listClasses = clsx('pf-c-breadcrumb__item');
</script>

<nav {...$$restProps} aria-label={ariaLabel} class={className}>
  <ol class={listClasses}>
    <slot />
  </ol>
</nav>
