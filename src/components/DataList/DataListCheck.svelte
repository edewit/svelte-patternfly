<script lang="ts">
  import type { DataListCheckProps } from './types';
  import '@patternfly/patternfly/components/DataList/data-list.css';
  import '@patternfly/patternfly/components/Check/check.css';

  interface Props extends DataListCheckProps {
    id?: string;
    name?: string;
    'aria-label'?: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (_checked: boolean) => void;
    class?: string;
  }

  let {
    id,
    name,
    'aria-label': ariaLabel = 'Standalone check',
    checked = false,
    disabled = false,
    onChange,
    class: className = '',
    ...restProps
  }: Props = $props();

  // Generate input ID if not provided
  const inputId = $derived(id || `data-list-check-${Math.random().toString(36).substring(2, 11)}`);

  // Build CSS classes
  const classes = $derived(['pf-v6-c-data-list__check', className].filter(Boolean).join(' '));

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    onChange?.(target.checked);
  }
</script>

<div class={classes}>
  <label class="pf-v6-c-check pf-m-standalone" for={inputId}>
    <input
      class="pf-v6-c-check__input"
      type="checkbox"
      id={inputId}
      name={name || inputId}
      {checked}
      {disabled}
      aria-label={ariaLabel}
      onchange={handleChange}
      {...restProps}
    />
  </label>
</div>
