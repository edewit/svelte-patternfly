<script lang="ts">
  import type { ModalHeaderProps } from './types';
  import '@patternfly/patternfly/components/ModalBox/modal-box.css';
  import '@patternfly/patternfly/components/Icon/icon.css';
  import CheckCircleIcon from '../Icon/icons/CheckCircleIcon.svelte';
  import ExclamationCircleIcon from '../Icon/icons/ExclamationCircleIcon.svelte';
  import ExclamationTriangleIcon from '../Icon/icons/ExclamationTriangleIcon.svelte';
  import InfoCircleIcon from '../Icon/icons/InfoCircleIcon.svelte';

  interface Props extends ModalHeaderProps {
    title?: string;
    labelId?: string;
    titleIconVariant?: 'success' | 'danger' | 'warning' | 'info' | 'custom';
    titleIcon?: import('svelte').Snippet;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    title,
    labelId,
    titleIconVariant,
    titleIcon,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const headerClasses = $derived(
    [
      'pf-v6-c-modal-box__header',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  const titleClasses = $derived(
    [
      'pf-v6-c-modal-box__title',
      titleIconVariant && titleIconVariant !== 'custom' && `pf-m-${titleIconVariant}`,
      titleIconVariant === 'custom' && 'pf-m-custom'
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Get icon component based on variant
  const iconComponent = $derived(() => {
    if (titleIconVariant === 'success') return CheckCircleIcon;
    if (titleIconVariant === 'danger') return ExclamationCircleIcon;
    if (titleIconVariant === 'warning') return ExclamationTriangleIcon;
    if (titleIconVariant === 'info') return InfoCircleIcon;
    return null;
  });
</script>

<header class={headerClasses} {...restProps}>
  <div class="pf-v6-c-modal-box__header-main">
    {#if children}
      <!-- Custom header content -->
      {@render children()}
    {:else if title}
      <!-- Default header with title -->
      <h1 class={titleClasses} id={labelId}>
        {#if titleIconVariant || titleIcon}
          <span class="pf-v6-c-modal-box__title-icon">
            {#if titleIcon}
              {@render titleIcon()}
            {:else if iconComponent()}
              <svelte:component this={iconComponent()} />
            {/if}
          </span>
        {/if}
        <span class="pf-v6-c-modal-box__title-text">{title}</span>
      </h1>
    {/if}
  </div>
</header>

