<script lang="ts">
  import Popover from './Popover.svelte';
  import Button from '../Button/Button.svelte';
  import { createRawSnippet } from 'svelte';

  interface Props {
    variant?: 'basic' | 'with-header-footer' | 'with-close' | 'hover' | 'no-padding' | 'width-auto';
  }

  let { variant = 'basic' }: Props = $props();

  // Helper to create text snippets
  const textSnippet = (text: string) => createRawSnippet(() => ({ render: () => text }));
</script>

<div style="margin: 200px;">
  {#if variant === 'basic'}
    <Popover
      ariaLabel="Basic popover"
      bodyContent={textSnippet('Popovers are triggered by click rather than hover.')}
      position="top"
    >
      <Button>Toggle popover</Button>
    </Popover>
  {:else if variant === 'with-header-footer'}
    <Popover
      ariaLabel="Basic popover"
      headerContent={textSnippet('Popover header')}
      bodyContent={textSnippet('Popovers are triggered by click rather than hover.')}
      footerContent={textSnippet('Popover footer')}
      position="top"
    >
      <Button>Toggle popover</Button>
    </Popover>
  {:else if variant === 'with-close'}
    <Popover
      ariaLabel="Basic popover"
      headerContent={textSnippet('Popover header')}
      bodyContent={textSnippet('Popovers are triggered by click rather than hover.')}
      position="top"
      showClose={true}
    >
      <Button>Toggle popover</Button>
    </Popover>
  {:else if variant === 'hover'}
    <Popover
      ariaLabel="Hoverable popover"
      headerContent={textSnippet('Popover header')}
      bodyContent={textSnippet('This popover opens on hover.')}
      footerContent={textSnippet('Popover footer')}
      position="top"
      triggerAction="hover"
    >
      <Button isDisabled={true}>Hover to trigger popover</Button>
    </Popover>
  {:else if variant === 'no-padding'}
    <Popover
      ariaLabel="Basic popover"
      bodyContent={textSnippet('Popover with no padding')}
      position="top"
      showClose={true}
      hasNoPadding={true}
    >
      <Button>Toggle popover</Button>
    </Popover>
  {:else if variant === 'width-auto'}
    <Popover
      ariaLabel="Basic popover"
      bodyContent={textSnippet('Popover with auto width')}
      position="top"
      showClose={true}
      width="auto"
    >
      <Button>Toggle popover</Button>
    </Popover>
  {/if}
</div>
