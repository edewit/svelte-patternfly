<script lang="ts">
  import type { WizardHeaderProps } from './types';
  import TimesIcon from '../Icon/icons/TimesIcon.svelte';

  interface Props extends WizardHeaderProps {
    title?: string;
    description?: string;
    hasCloseButton?: boolean;
    onClose?: () => void;
    class?: string;
    [key: string]: unknown;
  }

  let {
    title,
    description,
    hasCloseButton = true,
    onClose,
    class: className = '',
    ...restProps
  }: Props = $props();

  const classes = $derived(
    ['pf-v6-c-wizard__header', className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if hasCloseButton && onClose}
    <div class="pf-v6-c-wizard__close">
      <button
        class="pf-v6-c-button pf-m-plain"
        type="button"
        aria-label="Close"
        onclick={onClose}
      >
        <span class="pf-v6-c-button__icon">
          <TimesIcon />
        </span>
      </button>
    </div>
  {/if}
  {#if title}
    <div class="pf-v6-c-wizard__title">
      <h1 class="pf-v6-c-wizard__title-text">{title}</h1>
    </div>
  {/if}
  {#if description}
    <div class="pf-v6-c-wizard__description">{description}</div>
  {/if}
</div>
