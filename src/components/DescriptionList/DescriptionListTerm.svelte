<script lang="ts">
  import type { DescriptionListTermProps } from './types';
  import '@patternfly/patternfly/components/DescriptionList/description-list.css';

  interface Props extends DescriptionListTermProps {
    hasHelpText?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { hasHelpText = false, class: className = '', children, ...restProps }: Props = $props();

  // Build CSS classes for term
  const termClasses = $derived(
    ['pf-v6-c-description-list__term', className].filter(Boolean).join(' ')
  );

  // Build CSS classes for text wrapper
  const textClasses = $derived(
    ['pf-v6-c-description-list__text', hasHelpText && 'pf-m-help-text'].filter(Boolean).join(' ')
  );
</script>

<dt class={termClasses} {...restProps}>
  <span class={textClasses}>
    {@render children?.()}
  </span>
</dt>
