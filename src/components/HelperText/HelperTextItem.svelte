<script lang="ts">
  import type { HelperTextItemProps } from './types';
  import Icon from '../Icon/Icon.svelte';
  import ExclamationCircleIcon from '../Icon/icons/ExclamationCircleIcon.svelte';
  import ExclamationTriangleIcon from '../Icon/icons/ExclamationTriangleIcon.svelte';
  import CheckCircleIcon from '../Icon/icons/CheckCircleIcon.svelte';
  import MinusIcon from '../Icon/icons/MinusIcon.svelte';
  import '@patternfly/patternfly/components/HelperText/helper-text.css';

  interface Props extends HelperTextItemProps {
    children?: import('svelte').Snippet | string;
  }

  let {
    id,
    variant = 'default',
    icon,
    component = 'div',
    screenReaderText,
    isDynamic = false,
    className = '',
    class: classProp = '',
    children,
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-helper-text__item',
      isDynamic && 'pf-m-dynamic',
      variant !== 'default' && `pf-m-${variant}`,
      className || classProp
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Determine if icon is a string (Font Awesome class) or a snippet
  const iconIsString = $derived(icon && typeof icon === 'string');
  const hasIcon = $derived(!!icon || variant !== 'default');

  // Get default screen reader text based on variant if not provided
  const defaultScreenReaderText = $derived.by(() => {
    if (screenReaderText !== undefined) return screenReaderText;
    if (variant === 'default') return undefined;
    // Capitalize first letter of variant
    return variant.charAt(0).toUpperCase() + variant.slice(1) + ':';
  });

  // Determine if we should show screen reader text
  const showScreenReaderText = $derived(
    defaultScreenReaderText !== undefined && variant !== 'default'
  );

  // Determine the HTML tag to render
  const tag = $derived(component);
</script>

{#if tag === 'li'}
  <li class={classes} {id} {...restProps}>
    {#if hasIcon}
      <span class="pf-v6-c-helper-text__item-icon">
        {#if iconIsString}
          <Icon icon={`fas fa-fw ${icon}`} size="sm" />
        {:else if icon}
          <Icon size="sm">
            {@render icon()}
          </Icon>
        {:else if variant === 'error'}
          <Icon size="sm">
            <ExclamationCircleIcon />
          </Icon>
        {:else if variant === 'warning'}
          <Icon size="sm">
            <ExclamationTriangleIcon />
          </Icon>
        {:else if variant === 'success'}
          <Icon size="sm">
            <CheckCircleIcon />
          </Icon>
        {:else if variant === 'indeterminate'}
          <Icon size="sm">
            <MinusIcon />
          </Icon>
        {/if}
      </span>
    {/if}
    <span class="pf-v6-c-helper-text__item-text">
      {#if showScreenReaderText}
        <span class="pf-v6-screen-reader">{defaultScreenReaderText}</span>
      {/if}
      {#if typeof children === 'string'}
        {children}
      {:else if children}
        {@render children()}
      {/if}
    </span>
  </li>
{:else}
  <div class={classes} {id} {...restProps}>
    {#if hasIcon}
      <span class="pf-v6-c-helper-text__item-icon">
        {#if iconIsString}
          <Icon icon={`fas fa-fw ${icon}`} size="sm" />
        {:else if icon}
          <Icon size="sm">
            {@render icon()}
          </Icon>
        {:else if variant === 'error'}
          <Icon size="sm">
            <ExclamationCircleIcon />
          </Icon>
        {:else if variant === 'warning'}
          <Icon size="sm">
            <ExclamationTriangleIcon />
          </Icon>
        {:else if variant === 'success'}
          <Icon size="sm">
            <CheckCircleIcon />
          </Icon>
        {:else if variant === 'indeterminate'}
          <Icon size="sm">
            <MinusIcon />
          </Icon>
        {/if}
      </span>
    {/if}
    <span class="pf-v6-c-helper-text__item-text">
      {#if showScreenReaderText}
        <span class="pf-v6-screen-reader">{defaultScreenReaderText}</span>
      {/if}
      {#if typeof children === 'string'}
        {children}
      {:else if children}
        {@render children()}
      {/if}
    </span>
  </div>
{/if}
