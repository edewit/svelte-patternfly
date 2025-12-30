<script lang="ts">
  import type { MastheadProps, MastheadDisplayBreakpoints, MastheadInsetBreakpoints } from './types';
  import '@patternfly/patternfly/components/Masthead/masthead.css';

  interface Props extends MastheadProps {
    id?: string;
    display?: MastheadDisplayBreakpoints;
    inset?: MastheadInsetBreakpoints;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    id,
    display,
    inset,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build display classes for responsive breakpoints
  const displayClasses = $derived.by(() => {
    if (!display) return [];
    const classes: string[] = [];
    const breakpoints: Array<keyof MastheadDisplayBreakpoints> = ['default', 'sm', 'md', 'lg', 'xl', '2xl'];

    for (const bp of breakpoints) {
      const value = display[bp];
      if (value) {
        if (bp === 'default') {
          classes.push(`pf-m-display-${value}`);
        } else {
          classes.push(`pf-m-display-${value}-on-${bp}`);
        }
      }
    }

    return classes;
  });

  // Build inset classes for responsive breakpoints
  const insetClasses = $derived.by(() => {
    if (!inset) return [];
    const classes: string[] = [];
    const breakpoints: Array<keyof MastheadInsetBreakpoints> = ['default', 'sm', 'md', 'lg', 'xl', '2xl'];

    for (const bp of breakpoints) {
      const value = inset[bp];
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

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-masthead',
      ...displayClasses,
      ...insetClasses,
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<header class={classes} {id} {...restProps}>
  {@render children?.()}
</header>

