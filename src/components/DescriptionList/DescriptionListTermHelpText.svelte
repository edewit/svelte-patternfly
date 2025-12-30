<script lang="ts">
  import type { DescriptionListTermHelpTextProps } from './types';
  import Popover from '../Popover/Popover.svelte';
  import '@patternfly/patternfly/components/DescriptionList/description-list.css';
  import '@patternfly/patternfly/components/Popover/popover.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends DescriptionListTermHelpTextProps {
    headerContent?: import('svelte').Snippet;
    bodyContent?: import('svelte').Snippet;
    footerContent?: import('svelte').Snippet;
    showClose?: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    headerContent,
    bodyContent,
    footerContent,
    showClose = true,
    position = 'top',
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-description-list__term', className].filter(Boolean).join(' '));

  // Generate unique ID for popover
  const popoverId = $derived(`popover-${Math.random().toString(36).substring(2, 11)}`);
</script>

<dt class={classes} {...restProps}>
  {#if headerContent || bodyContent || footerContent}
    <Popover
      id={popoverId}
      {headerContent}
      {bodyContent}
      {footerContent}
      {showClose}
      {position}
      appendTo="inline"
    >
      {@render children?.()}
    </Popover>
  {:else}
    {@render children?.()}
  {/if}
</dt>
