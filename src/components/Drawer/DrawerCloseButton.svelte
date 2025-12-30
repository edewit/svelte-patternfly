<script lang="ts">
  import type { DrawerCloseButtonProps } from './types';
  import '@patternfly/patternfly/components/Drawer/drawer.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends DrawerCloseButtonProps {
    'aria-label'?: string;
    onClick?: () => void;
    class?: string;
  }

  let {
    'aria-label': ariaLabel = 'Close drawer panel',
    onClick,
    class: className = '',
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-drawer__close', className].filter(Boolean).join(' '));

  function handleClick(_event: MouseEvent) {
    if (onClick) {
      onClick();
    }
  }
</script>

<div class={classes}>
  <button
    class="pf-v6-c-button pf-m-plain"
    type="button"
    aria-label={ariaLabel}
    onclick={handleClick}
    {...restProps}
  >
    <span class="pf-v6-c-button__icon">
      <i class="fas fa-times" aria-hidden="true"></i>
    </span>
  </button>
</div>
