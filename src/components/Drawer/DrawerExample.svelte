<script lang="ts">
  import Drawer from './Drawer.svelte';
  import DrawerContent from './DrawerContent.svelte';
  import DrawerContentBody from './DrawerContentBody.svelte';
  import DrawerPanelContent from './DrawerPanelContent.svelte';
  import DrawerHead from './DrawerHead.svelte';
  import DrawerActions from './DrawerActions.svelte';
  import DrawerCloseButton from './DrawerCloseButton.svelte';
  import DrawerPanelDescription from './DrawerPanelDescription.svelte';
  import DrawerPanelBody from './DrawerPanelBody.svelte';
  import Button from '../Button/Button.svelte';
  import type { DrawerProps } from './types';

  interface Props extends DrawerProps {
    drawerContent?: string;
  }

  let {
    drawerContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium est a porttitor vehicula. Quisque vel commodo urna. Morbi mattis rutrum ante, id vehicula ex accumsan ut. Morbi viverra, eros vel porttitor facilisis, eros purus aliquet erat, nec lobortis felis elit pulvinar sem. Vivamus vulputate, risus eget commodo eleifend, eros nibh porta quam, vitae lacinia leo libero at magna. Maecenas aliquam sagittis orci, et posuere nisi ultrices sit amet. Aliquam ex odio, malesuada sed posuere quis, pellentesque at mauris. Phasellus venenatis massa ex, eget pulvinar libero auctor pretium. Aliquam erat volutpat. Duis euismod justo in quam ullamcorper, in commodo massa vulputate.',
    isExpanded: initialExpanded = false,
    position = 'right',
    variant = 'default',
    isInline = false,
    isStatic = false,
    onExpand,
    class: className = ''
  }: Props = $props();

  let isExpanded = $state(initialExpanded);
  let drawerRef: HTMLSpanElement | null = $state(null);

  function handleExpand() {
    if (onExpand) {
      onExpand();
    }
    if (drawerRef) {
      drawerRef.focus();
    }
  }

  function handleClick() {
    isExpanded = !isExpanded;
  }

  function handleCloseClick() {
    isExpanded = false;
  }
</script>

<Button aria-expanded={isExpanded} onclick={handleClick}>Toggle drawer</Button>

<Drawer
  {isExpanded}
  {position}
  {variant}
  {isInline}
  {isStatic}
  onExpand={handleExpand}
  class={className}
>
  <DrawerContent {isExpanded}>
    {#snippet panelContent()}
      <DrawerPanelContent>
        <DrawerHead>
          <span tabIndex={isExpanded ? 0 : -1} bind:this={drawerRef}>
            Drawer panel header content
          </span>
          <DrawerActions>
            <DrawerCloseButton onClick={handleCloseClick} />
          </DrawerActions>
        </DrawerHead>
        <DrawerPanelDescription
          >This is a helpful description of the drawer panel.</DrawerPanelDescription
        >
        <DrawerPanelBody>Drawer panel body content</DrawerPanelBody>
      </DrawerPanelContent>
    {/snippet}
    {#snippet children()}
      <DrawerContentBody>{drawerContent}</DrawerContentBody>
    {/snippet}
  </DrawerContent>
</Drawer>
