<script lang="ts">
  import type { DataListActionProps, Visibility, VisibilityBreakpoint } from './types';
  import '@patternfly/patternfly/components/DataList/data-list.css';

  interface Props extends DataListActionProps {
    id?: string;
    'aria-labelledby'?: string;
    'aria-label'?: string;
    visibility?: Visibility;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    id,
    'aria-labelledby': ariaLabelledBy,
    'aria-label': ariaLabel,
    visibility,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build visibility classes
  const visibilityClasses = $derived(() => {
    if (!visibility) return [];

    const classes: string[] = [];
    const breakpoints: VisibilityBreakpoint[] = ['default', 'sm', 'md', 'lg', 'xl', '2xl'];

    for (const bp of breakpoints) {
      const value = visibility[bp];
      if (value) {
        if (bp === 'default') {
          // For default, use pf-m-hidden or pf-m-visible
          classes.push(`pf-m-${value}`);
        } else {
          // PatternFly uses format: pf-m-hidden-on-lg, pf-m-visible-on-lg
          classes.push(`pf-m-${value}-on-${bp}`);
        }
      }
    }

    // Special handling: if we have both hidden and visible at different breakpoints,
    // we need to ensure proper class ordering
    // For example: pf-m-hidden pf-m-visible-on-lg means hidden by default, visible on lg+
    return classes;
  });

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-data-list__item-action', ...visibilityClasses(), className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {id} aria-labelledby={ariaLabelledBy} aria-label={ariaLabel} {...restProps}>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</div>
