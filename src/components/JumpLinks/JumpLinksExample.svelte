<script lang="ts">
  import JumpLinks from './JumpLinks.svelte';
  import JumpLinksItem from './JumpLinksItem.svelte';
  import type { JumpLinksProps } from './types';

  interface Props extends JumpLinksProps {
    variant?: 'basic' | 'centered' | 'with-label' | 'vertical' | 'vertical-with-label';
  }

  let {
    variant = 'basic',
    'aria-label': ariaLabel,
    class: className = ''
  }: Props = $props();

  const classes = $derived(
    [
      variant === 'centered' && 'pf-m-center',
      variant === 'with-label' && 'pf-m-label',
      variant === 'vertical' && 'pf-m-vertical',
      variant === 'vertical-with-label' && 'pf-m-vertical pf-m-label',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );
</script>

<JumpLinks aria-label={ariaLabel || 'Jump to example sections'} class={classes}>
  <JumpLinksItem href="#">Inactive section</JumpLinksItem>
  <JumpLinksItem href="#" isActive>Active section</JumpLinksItem>
  <JumpLinksItem href="#">Inactive section</JumpLinksItem>
</JumpLinks>

