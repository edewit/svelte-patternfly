<script>
  import clsx from 'clsx';
  import { clean } from '../utils';

  let className = '';
  export { className as class };
  export let to = null;
  export let target = null;
  export let isActive = false;
  export let children = undefined;

  const props = clean($$props);

  $: classes = clsx(className, isActive && 'pf-m-current', 'pf-c-breadcrumb__item');
</script>

<li {...props} class={classes} aria-current={isActive ? 'page' : undefined}>
  {#if to}
    <a
      href={to}
      target={target}
      class={clsx('pf-c-breadcrumb__link', isActive && 'pf-m-current')}
      aria-current={isActive ? 'page' : undefined}
    >
      {#if children}
        {children}
      {:else}
        <slot />
      {/if}
    </a>
  {:else}
    {#if children}
      {children}
    {:else}
      <slot />
    {/if}
  {/if}
  {#if !isActive}
    <span class="pf-c-breadcrumb__item-divider">
      <svg style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img">
        <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" transform=""></path>
      </svg>
    </span>
  {/if}
</li>
