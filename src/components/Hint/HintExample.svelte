<script lang="ts">
  import Hint from './Hint.svelte';
  import HintTitle from './HintTitle.svelte';
  import HintBody from './HintBody.svelte';
  import HintFooter from './HintFooter.svelte';
  import Button from '../Button/Button.svelte';
  import { createRawSnippet } from 'svelte';

  interface Props {
    hasActions?: boolean;
    hasNoActionsOffset?: boolean;
    hasTitle?: boolean;
    hasBody?: boolean;
    hasFooter?: boolean;
  }

  let {
    hasActions = false,
    hasNoActionsOffset = false,
    hasTitle = true,
    hasBody = true,
    hasFooter = false
  }: Props = $props();

  const actionsButton = createRawSnippet(() => ({
    render: () => `
      <button
        class="pf-v6-c-menu-toggle pf-m-plain"
        type="button"
        aria-expanded="false"
        aria-label="Hint actions"
      >
        <span class="pf-v6-c-menu-toggle__icon">
          <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
        </span>
      </button>
    `
  }));

  const footerButton = createRawSnippet(() => ({
    render: () => 'Try it for 90 days'
  }));
</script>

<Hint actions={hasActions ? actionsButton : undefined} {hasNoActionsOffset}>
  {#if hasTitle}
    <HintTitle>Do more with Find it Fix it capabilities</HintTitle>
  {/if}
  {#if hasBody}
    <HintBody>
      Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
    </HintBody>
  {/if}
  {#if hasFooter}
    <HintFooter>
      <Button variant="link" isInline>
        {@render footerButton()}
      </Button>
    </HintFooter>
  {/if}
</Hint>
