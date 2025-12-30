<script lang="ts">
  import type { NavExpandableProps } from './types';
  import { getContext } from 'svelte';
  import '@patternfly/patternfly/components/Nav/nav.css';

  interface Props extends NavExpandableProps {
    title: string;
    groupId: number | string;
    isActive?: boolean;
    isExpanded?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    title,
    groupId,
    isActive = false,
    isExpanded: controlledExpanded,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Internal state for uncontrolled mode
  let internalExpanded = $state(controlledExpanded ?? false);
  
  // Determine if component is controlled
  const isControlled = controlledExpanded !== undefined;
  const isExpanded = $derived(isControlled ? controlledExpanded! : internalExpanded);

  // Get nav context
  const navContext = getContext<{
    handleToggle?: (event: MouseEvent, groupId: number | string, isExpanded: boolean) => void;
  }>('nav');

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-nav__item',
      'pf-m-expandable',
      isExpanded && 'pf-m-expanded',
      isActive && 'pf-m-current',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  const linkClasses = $derived(
    [
      'pf-v6-c-nav__link',
      isExpanded && 'pf-m-expanded'
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Handle toggle
  function handleToggle(event: MouseEvent) {
    const newExpanded = !isExpanded;
    
    if (!isControlled) {
      internalExpanded = newExpanded;
    }
    
    if (navContext?.handleToggle) {
      navContext.handleToggle(event, groupId, newExpanded);
    }
  }
</script>

<li class={classes} {...restProps}>
  <button
    class={linkClasses}
    type="button"
    aria-expanded={isExpanded}
    onclick={handleToggle}
  >
    <span class="pf-v6-c-nav__link-text">{title}</span>
    <span class="pf-v6-c-nav__toggle">
      <span class="pf-v6-c-nav__toggle-icon">
        <i class="fas fa-angle-right" aria-hidden="true"></i>
      </span>
    </span>
  </button>
  <section class="pf-v6-c-nav__subnav" hidden={isExpanded ? undefined : true}>
    <ul class="pf-v6-c-nav__list" role="list">
      {@render children?.()}
    </ul>
  </section>
</li>

