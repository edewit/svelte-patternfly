<script>
  import clsx from 'clsx';
  import { clean } from './utils';

  const variants = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    danger: 'danger',
    link: 'link',
    plain: 'plain',
    control: 'control'
  };

  let className = '';
  export { className as class };
  export let isActive = false;
  export let isAriaDisabled = false;
  export let isBlock = false;
  export let isInline = false;
  export let isDisabled = false;
  export let children = undefined;
  export let variant = variants.primary;

  const props = clean($$props);

  $: ariaLabel = $$props['aria-label'];

  $: classes = clsx(
    className,
    'pf-c-button',
    `pf-m-${variant}`,
    isAriaDisabled && 'pf-m-aria-disabled',
    isBlock && 'pf-m-block',
    isDisabled && 'pf-m-disabled',
    isActive && 'pf-m-active',
    isInline && variant === variants.link && 'pf-m-inline'
  );

</script>

<button
  {...props}
  class={classes}
  disabled={isDisabled}
  aria-disabled={isAriaDisabled}
  on:click
  aria-label={ariaLabel}>
    {#if children}
      {children}
    {:else}
      <slot />
    {/if}
</button>
