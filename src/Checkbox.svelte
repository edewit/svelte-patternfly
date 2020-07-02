<script>
  import clsx from 'clsx';
  import { clean } from './utils';

  let className = '';
  export { className as class };
  export let isDisabled = false;
  export let isChecked = false;
  export let label = undefined;
  export let description = ''

  let indeterminate = false;

  const props = clean($$props);

  $: indeterminate = isChecked === null;
</script>

<div class={clsx('pf-c-check', className)}>
  <input
    disabled={isDisabled}
    bind:indeterminate
    {...props}
    on:change
    type="checkbox"
    checked={isChecked}
    class={clsx('pf-c-check__label', className)}
  />
  {#if label}
  <label class={clsx('pf-c-check__label', isDisabled && 'pf-m-disabled')} for={props.id}>
    {label}
  </label>
  {/if}
  {#if description}
    <div class="pf-c-check__description">{description}</div>
  {/if}
</div>