<script lang="ts">
  import type { PageSectionProps, PagePaddingBreakpoints } from './types';
  import '@patternfly/patternfly/components/Page/page.css';
  import { getContext } from 'svelte';

  interface Props extends PageSectionProps {
    variant?: 'default' | 'secondary';
    padding?: PagePaddingBreakpoints;
    type?: 'default' | 'nav' | 'subnav' | 'tabs' | 'breadcrumb' | 'wizard';
    isFilled?: boolean;
    'aria-labelledby'?: string;
    id?: string;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    variant = 'default',
    padding,
    type = 'default',
    isFilled: isFilledProp,
    'aria-labelledby': ariaLabelledBy,
    id,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Get context for content filled behavior
  const pageContext = getContext<{
    isContentFilled?: boolean;
  }>('page');

  // Determine if filled based on prop or context
  const isFilled = $derived(isFilledProp ?? (pageContext?.isContentFilled ?? false));

  // Build padding classes for responsive breakpoints
  const paddingClasses = $derived.by(() => {
    if (!padding) return [];
    const classes: string[] = [];
    const breakpoints: Array<keyof PagePaddingBreakpoints> = ['default', 'sm', 'md', 'lg', 'xl', '2xl'];

    for (const bp of breakpoints) {
      const value = padding[bp];
      if (value) {
        if (bp === 'default') {
          classes.push(`pf-m-${value}`);
        } else {
          classes.push(`pf-m-${value}-on-${bp}`);
        }
      }
    }

    return classes;
  });

  // Determine section class based on type
  const sectionClass = $derived.by(() => {
    switch (type) {
      case 'nav':
        return 'pf-v6-c-page__main-nav';
      case 'subnav':
        return 'pf-v6-c-page__main-subnav';
      case 'tabs':
        return 'pf-v6-c-page__main-tabs';
      case 'breadcrumb':
        return 'pf-v6-c-page__main-breadcrumb';
      case 'wizard':
        return 'pf-v6-c-page__main-wizard';
      default:
        return 'pf-v6-c-page__main-section';
    }
  });

  const classes = $derived(
    [
      sectionClass,
      variant === 'secondary' && 'pf-m-secondary',
      isFilled && 'pf-m-fill',
      ...paddingClasses,
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<section class={classes} {id} aria-labelledby={ariaLabelledBy} {...restProps}>
  {#if type === 'default' || type === 'secondary'}
    <div class="pf-v6-c-page__main-body">
      {#if children}
        {@render children()}
      {/if}
    </div>
  {:else}
    {#if children}
      {@render children()}
    {/if}
  {/if}
</section>

