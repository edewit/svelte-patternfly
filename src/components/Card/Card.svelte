<script lang="ts">
  import type { CardProps } from './types';
  import '@patternfly/patternfly/components/Card/card.css';
  import '@patternfly/patternfly/components/Check/check.css';

  interface Props extends CardProps {
    id?: string;
    class?: string;
    variant?: 'default' | 'secondary' | 'plain';
    isSelectable?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    selectType?: 'checkbox' | 'radio';
    checkboxName?: string;
    radioName?: string;
    onSelect?: (_selected: boolean) => void;
    title?: string;
    titleSlot?: import('svelte').Snippet | string;
    bodySlot?: import('svelte').Snippet | string;
    footerSlot?: import('svelte').Snippet | string;
    children?: import('svelte').Snippet | string;
  }

  let {
    id,
    class: className = '',
    variant = 'default',
    isSelectable = false,
    isSelected = false,
    isDisabled = false,
    selectType = 'checkbox',
    checkboxName,
    radioName,
    onSelect,
    title,
    titleSlot,
    bodySlot,
    footerSlot,
    children,
    ...restProps
  }: Props = $props();

  // Generate IDs for input
  const cardId = $derived(id || `card-${Math.random().toString(36).substring(2, 11)}`);
  const inputId = $derived(`${cardId}-${selectType}`);
  const inputLabelId = $derived(`${inputId}-label`);

  // Determine input name: for radio, use radioName (required for grouping), for checkbox use checkboxName or inputId
  const inputName = $derived(
    selectType === 'radio' ? radioName || 'card-radio-group' : checkboxName || inputId
  );

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-card',
      isSelectable && 'pf-m-selectable',
      isSelected && 'pf-m-selected',
      isDisabled && 'pf-m-disabled',
      variant === 'secondary' && 'pf-m-secondary',
      variant === 'plain' && 'pf-m-plain',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    onSelect?.(target.checked);
  }
</script>

<div class={classes} id={cardId} {...restProps}>
  {#if isSelectable && (titleSlot || title)}
    <div class="pf-v6-c-card__header">
      <div class="pf-v6-c-card__actions pf-m-no-offset">
        <div class="pf-v6-c-card__selectable-actions">
          <div class="pf-v6-c-check">
            <input
              class="pf-v6-c-check__input"
              type={selectType}
              id={inputId}
              name={inputName}
              checked={isSelected}
              disabled={isDisabled}
              aria-labelledby={cardId}
              onchange={handleInputChange}
            />
            <label
              class="pf-v6-c-check__label"
              class:pf-m-disabled={isDisabled}
              for={inputId}
              id={inputLabelId}
              name={inputName}
            ></label>
          </div>
        </div>
      </div>
      <div class="pf-v6-c-card__header-main">
        <div class="pf-v6-c-card__title" id={isDisabled ? `${cardId}-title` : undefined}>
          <h2 class="pf-v6-c-card__title-text">
            {#if typeof titleSlot === 'string'}
              {titleSlot}
            {:else if titleSlot}
              {@render titleSlot()}
            {:else}
              {title}
            {/if}
          </h2>
        </div>
      </div>
    </div>
  {:else if titleSlot || title}
    <div class="pf-v6-c-card__title">
      <h2 class="pf-v6-c-card__title-text">
        {#if titleSlot}
          {@render titleSlot()}
        {:else}
          {title}
        {/if}
      </h2>
    </div>
  {/if}

  {#if bodySlot || children}
    <div class="pf-v6-c-card__body">
      {#if typeof bodySlot === 'string'}
        {bodySlot}
      {:else if bodySlot}
        {@render bodySlot()}
      {:else if typeof children === 'string'}
        {children}
      {:else if children}
        {@render children()}
      {/if}
    </div>
  {/if}

  {#if footerSlot}
    <div class="pf-v6-c-card__footer">
      {#if typeof footerSlot === 'string'}
        {footerSlot}
      {:else}
        {@render footerSlot()}
      {/if}
    </div>
  {/if}
</div>
