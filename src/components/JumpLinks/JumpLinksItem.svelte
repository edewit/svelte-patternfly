<script lang="ts">
  import type { JumpLinksItemProps } from './types';

  interface Props extends JumpLinksItemProps {
    href?: string;
    isActive?: boolean;
    'aria-label'?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    href = '#',
    isActive = false,
    'aria-label': ariaLabel,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const itemClasses = $derived(
    ['pf-v6-c-jump-links__item', isActive && 'pf-m-current', className]
      .filter(Boolean)
      .join(' ')
  );
</script>

<li class={itemClasses} aria-current={isActive ? 'location' : undefined} {...restProps}>
  <span class="pf-v6-c-jump-links__link">
    <a class="pf-v6-c-button pf-m-link" href={href} aria-label={ariaLabel}>
      <span class="pf-v6-c-button__text">
        <span class="pf-v6-c-jump-links__link-text">
          {#if typeof children === 'string'}
            {children}
          {:else if children}
            {@render children()}
          {/if}
        </span>
      </span>
    </a>
  </span>
</li>

