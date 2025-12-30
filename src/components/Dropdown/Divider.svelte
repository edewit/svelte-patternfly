<script lang="ts">
  import type { DividerProps } from './types';
  import '@patternfly/patternfly/components/Divider/divider.css';

  interface Props extends DividerProps {
    component?: 'li' | 'div' | 'hr';
    class?: string;
    [key: string]: unknown;
  }

  let {
    component = 'hr',
    class: className = '',
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-divider', className].filter(Boolean).join(' ')
  );

  const tag = $derived(component);
</script>

{#if tag === 'li'}
  <li class={classes} role="separator" {...restProps}></li>
{:else if tag === 'div'}
  <div class={classes} role="separator" {...restProps}></div>
{:else}
  <hr class={classes} {...restProps} />
{/if}

