<script lang="ts">
  import type { DatePickerProps } from './types';
  import CalendarMonth from '../CalendarMonth/CalendarMonth.svelte';
  import Button from '../Button/Button.svelte';
  import HelperText from '../HelperText/HelperText.svelte';
  import HelperTextItem from '../HelperText/HelperTextItem.svelte';
  import '@patternfly/patternfly/components/DatePicker/date-picker.css';
  import '@patternfly/patternfly/components/InputGroup/input-group.css';
  import '@patternfly/patternfly/components/FormControl/form-control.css';
  import '@patternfly/patternfly/components/Popover/popover.css';
  import '@patternfly/patternfly/components/CalendarMonth/calendar-month.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends DatePickerProps {
    value?: string;
    onChange?: (_event: Event, _value: string, _date: Date | null) => void;
    onBlur?: (_event: Event, _value: string, _date: Date | null) => void;
    'aria-label'?: string;
    id?: string;
    name?: string;
    class?: string;
    helperText?: string;
    isInvalid?: boolean;
    isExpanded?: boolean;
    calendarPosition?: 'top' | 'bottom';
    calendarAlign?: 'left' | 'right';
  }

  let {
    value: valueProp = '',
    onChange,
    onBlur,
    'aria-label': ariaLabel = 'Date picker',
    id,
    name,
    class: className = '',
    helperText,
    isInvalid = false,
    isExpanded: isExpandedProp = false,
    calendarPosition = 'bottom',
    calendarAlign = 'left',
    ...restProps
  }: Props = $props();

  // State
  let isCalendarOpen = $state(isExpandedProp);
  let inputValue = $state(valueProp);
  let selectedDate = $state<Date | null>(valueProp ? parseDate(valueProp) : null);

  // Update when props change
  $effect(() => {
    inputValue = valueProp;
    selectedDate = valueProp ? parseDate(valueProp) : null;
  });

  $effect(() => {
    isCalendarOpen = isExpandedProp;
  });

  // Generate unique ID
  const componentId = $derived(id || `date-picker-${Math.random().toString(36).substring(2, 11)}`);
  const inputId = $derived(`${componentId}-input`);

  // Format date as YYYY-MM-DD
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Parse date from YYYY-MM-DD string
  function parseDate(dateString: string): Date | null {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date;
  }

  // Handle input change
  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    inputValue = newValue;
    const parsedDate = parseDate(newValue);
    selectedDate = parsedDate;
    onChange?.(event, newValue, parsedDate);
  }

  // Handle input blur
  function handleInputBlur(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const parsedDate = parseDate(value);
    onBlur?.(event, value, parsedDate);
  }

  // Handle calendar toggle
  function onToggleCalendar() {
    isCalendarOpen = !isCalendarOpen;
  }

  // Handle calendar date selection
  function onSelectCalendar(event: MouseEvent, newDate: Date) {
    const newValue = formatDate(newDate);
    inputValue = newValue;
    selectedDate = newDate;
    isCalendarOpen = false;

    // Create a synthetic event for onChange
    const syntheticEvent = new Event('change', { bubbles: true });
    onChange?.(syntheticEvent, newValue, newDate);
  }

  // Close calendar when clicking outside
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest(`#${componentId}`)) {
      isCalendarOpen = false;
    }
  }

  // Add click outside listener
  $effect(() => {
    if (isCalendarOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  });

  // Build CSS classes
  const datePickerClasses = $derived(
    ['pf-v6-c-date-picker', calendarPosition === 'top' && 'pf-m-top', className]
      .filter(Boolean)
      .join(' ')
  );

  const calendarClasses = $derived(
    ['pf-v6-c-date-picker__calendar', calendarAlign === 'right' && 'pf-m-align-right']
      .filter(Boolean)
      .join(' ')
  );
</script>

<div id={componentId} class={datePickerClasses} style="position: relative;" {...restProps}>
  <div class="pf-v6-c-date-picker__input">
    <div class="pf-v6-c-input-group">
      <div class="pf-v6-c-input-group__item pf-m-fill">
        <span class="pf-v6-c-form-control" class:pf-m-error={isInvalid}>
          <input
            type="text"
            id={inputId}
            {name}
            aria-label={ariaLabel}
            aria-invalid={isInvalid ? 'true' : undefined}
            bind:value={inputValue}
            oninput={handleInputChange}
            onblur={handleInputBlur}
            class="pf-v6-c-form-control__text-input"
          />
          {#if isInvalid}
            <span class="pf-v6-c-form-control__utilities">
              <span class="pf-v6-c-form-control__icon pf-m-status">
                <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
              </span>
            </span>
          {/if}
        </span>
      </div>
      <div class="pf-v6-c-input-group__item">
        <Button variant="control" aria-label="Toggle date picker" onclick={onToggleCalendar}>
          {#snippet children()}
            <span class="pf-v6-c-button__icon">
              <i class="fas fa-calendar-alt" aria-hidden="true"></i>
            </span>
          {/snippet}
        </Button>
      </div>
    </div>
  </div>
  {#if helperText}
    <div class="pf-v6-c-date-picker__helper-text">
      <HelperText>
        <HelperTextItem variant={isInvalid ? 'error' : 'default'}>
          {helperText}
        </HelperTextItem>
      </HelperText>
    </div>
  {/if}
  {#if isCalendarOpen}
    <div class={calendarClasses} style="position: absolute; z-index: 200;">
      <CalendarMonth date={selectedDate || new Date()} onChange={onSelectCalendar} />
    </div>
  {/if}
</div>
