<script lang="ts">
  import type { TabContentProps } from './types';
  import { getContext } from 'svelte';

  interface Props extends TabContentProps {
    eventKey: string | number;
    id?: string;
    hidden?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    eventKey,
    id,
    hidden,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get tabs context
  const tabsContext = getContext<{
    activeKey?: string | number;
    id?: string;
  }>('tabs');

  const isActive = $derived(tabsContext?.activeKey === eventKey);
  const panelId = $derived(id || (tabsContext?.id ? `${tabsContext.id}-${eventKey}-panel` : undefined));
  const tabId = $derived(tabsContext?.id ? `${tabsContext.id}-${eventKey}-link` : undefined);

  // Determine if content should be hidden
  const isHidden = $derived(hidden !== undefined ? hidden : !isActive);

  const classes = $derived(
    ['pf-v6-c-tab-content', className].filter(Boolean).join(' ')
  );
</script>

<section
  class={classes}
  id={panelId}
  role="tabpanel"
  aria-labelledby={tabId}
  hidden={isHidden ? true : undefined}
  tabindex={0}
  {...restProps}
>
  {@render children?.()}
</section>
