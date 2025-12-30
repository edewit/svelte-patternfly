<script lang="ts">
  import HelperText from './HelperText.svelte';
  import HelperTextItem from './HelperTextItem.svelte';

  interface Props {
    variant?: 'default' | 'indeterminate' | 'warning' | 'success' | 'error';
    icon?: string;
    text?: string;
    component?: 'div' | 'ul';
    isLiveRegion?: boolean;
    id?: string;
    'aria-label'?: string;
    multiple?: boolean;
  }

  let {
    variant = 'default',
    icon,
    text = 'This is default helper text',
    component = 'div',
    isLiveRegion = false,
    id,
    'aria-label': ariaLabel,
    multiple = false
  }: Props = $props();

  const helperTextProps = $derived({
    component,
    isLiveRegion,
    ...(id && { id }),
    ...(ariaLabel && { 'aria-label': ariaLabel })
  });
</script>

{#if multiple}
  <HelperText {...helperTextProps}>
    {#snippet children()}
      <HelperTextItem variant="default" component={component === 'ul' ? 'li' : 'div'}>
        This is default helper text
      </HelperTextItem>
      <HelperTextItem variant="default" component={component === 'ul' ? 'li' : 'div'}>
        This is another default helper text in the same HelperText block
      </HelperTextItem>
      <HelperTextItem variant="default" component={component === 'ul' ? 'li' : 'div'}>
        And this is more default text in the same HelperText block
      </HelperTextItem>
    {/snippet}
  </HelperText>
{:else}
  <HelperText {...helperTextProps}>
    {#snippet children()}
      <HelperTextItem {variant} icon={icon} component={component === 'ul' ? 'li' : 'div'}>
        {text}
      </HelperTextItem>
    {/snippet}
  </HelperText>
{/if}
