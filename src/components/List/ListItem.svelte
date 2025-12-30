<script lang="ts">
  import type { ListItemProps } from './types';
  import '@patternfly/patternfly/components/List/list.css';

  interface Props extends ListItemProps {
    icon?: import('svelte').Snippet;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let { icon, class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes - only add pf-v6-c-list__item when there's an icon
  const classes = $derived(
    [icon && 'pf-v6-c-list__item', className].filter(Boolean).join(' ')
  );
</script>

<li class={classes} {...restProps}>
  {#if icon}
    <span class="pf-v6-c-list__item-icon">
      {@render icon()}
    </span>
  {/if}
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</li>

