<script lang="ts">
  import type { SelectListProps } from './types';
  import { getContext } from 'svelte';
  import '@patternfly/patternfly/components/Menu/menu.css';

  interface Props extends SelectListProps {
    isAriaMultiselectable?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    isAriaMultiselectable = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get select context to determine role
  let selectContext: { role?: string } | undefined;
  try {
    selectContext = getContext<{ role?: string }>('select');
  } catch {
    selectContext = undefined;
  }

  // Determine role based on parent select role
  const listRole = $derived(selectContext?.role === 'listbox' ? 'listbox' : 'menu');

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-menu__list', className].filter(Boolean).join(' ')
  );
</script>

<ul class={classes} role={listRole} aria-multiselectable={isAriaMultiselectable ? 'true' : undefined} {...restProps}>
  {@render children?.()}
</ul>

