<script lang="ts">
  import type { JumpLinksProps } from './types';
  import '@patternfly/patternfly/components/JumpLinks/jump-links.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends JumpLinksProps {
    'aria-label'?: string;
    class?: string;
  }

  let {
    'aria-label': ariaLabel,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();
</script>

<nav class="pf-v6-c-jump-links {className}" aria-label={ariaLabel} {...restProps}>
  <ul class="pf-v6-c-jump-links__list" role="list" aria-label={ariaLabel}>
    {@render children?.()}
  </ul>
</nav>

