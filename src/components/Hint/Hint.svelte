<script lang="ts">
  import type { HintProps } from './types';
  import '@patternfly/patternfly/components/Hint/hint.css';

  interface Props extends HintProps {
    actions?: import('svelte').Snippet;
    hasNoActionsOffset?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    actions,
    hasNoActionsOffset = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-hint', className].filter(Boolean).join(' ')
  );

  const actionsClasses = $derived(
    [
      'pf-v6-c-hint__actions',
      hasNoActionsOffset && 'pf-m-no-offset'
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if actions}
    <div class={actionsClasses}>
      {@render actions()}
    </div>
  {/if}
  {@render children?.()}
</div>
