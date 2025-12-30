<script lang="ts">
  import type { ButtonProps, ButtonVariant, ButtonSize, ButtonStatefulState } from './types';
  import '@patternfly/patternfly/components/Button/button.css';
  import '@patternfly/patternfly/components/Spinner/spinner.css';

  interface Props extends ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isDisabled?: boolean;
    isDanger?: boolean;
    isBlock?: boolean;
    isInline?: boolean;
    isAriaDisabled?: boolean;
    component?: 'button' | 'a' | 'span';
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    inProgress?: boolean;
    statefulState?: ButtonStatefulState;
    count?: number;
    'aria-label'?: string;
    'aria-describedby'?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
  }

  let {
    variant = 'primary',
    size = 'md',
    isDisabled = false,
    isDanger = false,
    isBlock = false,
    isInline = false,
    isAriaDisabled = false,
    component = 'button',
    href,
    type = 'button',
    inProgress = false,
    statefulState,
    count,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Determine the actual component to render
  const tag = $derived(component === 'a' && href ? 'a' : component);

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-button',
      `pf-m-${variant}`,
      size !== 'md' && `pf-m-${size}`,
      isDanger && 'pf-m-danger',
      isBlock && 'pf-m-block',
      isInline && 'pf-m-inline',
      isDisabled && 'pf-m-disabled',
      isAriaDisabled && 'pf-m-aria-disabled',
      inProgress && 'pf-m-progress',
      inProgress && 'pf-m-in-progress',
      variant === 'stateful' && statefulState && `pf-m-${statefulState}`,
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Handle click events
  function handleClick(event: MouseEvent) {
    if (isDisabled || isAriaDisabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
</script>

{#if tag === 'a'}
  <a
    class={classes}
    href={isDisabled || isAriaDisabled ? undefined : href}
    aria-disabled={isAriaDisabled ? 'true' : undefined}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
    onclick={handleClick}
    {...restProps}
  >
    {#if inProgress}
      <span class="pf-v6-c-button__progress">
        <svg
          class="pf-v6-c-spinner pf-m-sm"
          role="progressbar"
          aria-valuetext="Loading"
          viewBox="0 0 100 100"
        >
          <circle class="pf-v6-c-spinner__path" cx="50" cy="50" r="45" fill="none" />
        </svg>
      </span>
    {/if}
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
    {#if count !== undefined}
      <span class="pf-v6-c-button__count">{count}</span>
    {/if}
  </a>
{:else if tag === 'span'}
  <span
    class={classes}
    aria-disabled={isAriaDisabled ? 'true' : undefined}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
    onclick={handleClick}
    {...restProps}
  >
    {#if inProgress}
      <span class="pf-v6-c-button__progress">
        <svg
          class="pf-v6-c-spinner pf-m-sm"
          role="progressbar"
          aria-valuetext="Loading"
          viewBox="0 0 100 100"
        >
          <circle class="pf-v6-c-spinner__path" cx="50" cy="50" r="45" fill="none" />
        </svg>
      </span>
    {/if}
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
    {#if count !== undefined}
      <span class="pf-v6-c-button__count">{count}</span>
    {/if}
  </span>
{:else}
  <button
    class={classes}
    {type}
    disabled={isDisabled}
    aria-disabled={isAriaDisabled ? 'true' : undefined}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
    onclick={handleClick}
    {...restProps}
  >
    {#if inProgress}
      <span class="pf-v6-c-button__progress">
        <svg
          class="pf-v6-c-spinner pf-m-sm"
          role="progressbar"
          aria-valuetext="Loading"
          viewBox="0 0 100 100"
        >
          <circle class="pf-v6-c-spinner__path" cx="50" cy="50" r="45" fill="none" />
        </svg>
      </span>
    {/if}
    {#if typeof children === 'string'}
      {children}
    {:else if children}
      {@render children()}
    {/if}
    {#if count !== undefined}
      <span class="pf-v6-c-button__count">{count}</span>
    {/if}
  </button>
{/if}
