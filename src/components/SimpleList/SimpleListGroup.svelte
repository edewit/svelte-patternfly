<script lang="ts">
  import type { SimpleListGroupProps } from './types';
  import '@patternfly/patternfly/components/SimpleList/simple-list.css';

  interface Props extends SimpleListGroupProps {
    title?: string;
    id?: string;
    class?: string;
    titleClassName?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    title,
    id,
    class: className = '',
    titleClassName = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes for the group
  const groupClasses = $derived(
    ['pf-v6-c-simple-list__section', className].filter(Boolean).join(' ')
  );

  // Build CSS classes for the title
  const titleClasses = $derived(
    ['pf-v6-c-simple-list__title', titleClassName].filter(Boolean).join(' ')
  );
</script>

<section class={groupClasses} aria-labelledby={id} {...restProps}>
  {#if title}
    <h2 class={titleClasses} {id}>
      {title}
    </h2>
  {/if}
  <ul class="pf-v6-c-simple-list__list" role="list">
    {@render children?.()}
  </ul>
</section>
