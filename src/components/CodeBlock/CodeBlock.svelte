<script lang="ts">
  import type { CodeBlockProps } from './types';
  import '@patternfly/patternfly/components/CodeBlock/code-block.css';

  interface Props extends CodeBlockProps {
    id?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
    actions?: import('svelte').Snippet | string;
  }

  let { id, class: className = '', children, actions, ...restProps }: Props = $props();

  // Generate unique IDs if not provided
  const componentId = $derived(id || `code-block-${Math.random().toString(36).substring(2, 11)}`);

  // Build CSS classes
  const classes = $derived(['pf-v6-c-code-block', className].filter(Boolean).join(' '));
</script>

<div class={classes} id={componentId} {...restProps}>
  {#if actions}
    <div class="pf-v6-c-code-block__header">
      <div class="pf-v6-c-code-block__actions">
        {#if typeof actions === 'string'}
          {actions}
        {:else}
          {@render actions()}
        {/if}
      </div>
    </div>
  {/if}

  <div class="pf-v6-c-code-block__content">
    <pre class="pf-v6-c-code-block__pre">
      {#if typeof children === 'string'}
        {children}
      {:else if children}
        {@render children()}
      {/if}
    </pre>
  </div>
</div>
