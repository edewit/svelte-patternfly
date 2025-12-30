<script lang="ts">
  import type { DescriptionListGroupProps } from './types';
  import '@patternfly/patternfly/components/DescriptionList/description-list.css';

  interface Props extends DescriptionListGroupProps {
    isCard?: boolean;
    isVertical?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    isCard = false,
    isVertical = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-description-list__group',
      isCard && 'pf-m-card',
      isVertical && 'pf-m-vertical',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
