<script lang="ts">
  import type { DateTimePickerProps } from './types';
  import CalendarMonth from '../CalendarMonth/CalendarMonth.svelte';
  import Button from '../Button/Button.svelte';
  import '@patternfly/patternfly/components/InputGroup/input-group.css';
  import '@patternfly/patternfly/components/FormControl/form-control.css';
  import '@patternfly/patternfly/components/Popover/popover.css';
  import '@patternfly/patternfly/components/MenuToggle/menu-toggle.css';
  import '@patternfly/patternfly/components/Menu/menu.css';
  import '@patternfly/patternfly/components/CalendarMonth/calendar-month.css';
  import '@patternfly/patternfly/components/Button/button.css';

  interface Props extends DateTimePickerProps {
    date?: Date;
    time?: string;
    times?: number[];
    defaultTime?: string;
    dateFormat?: (_date: Date) => string;
    onChange?: (_date: Date, _time: string) => void;
    'aria-label'?: string;
    id?: string;
    class?: string;
    width?: string;
  }

  let {
    date: dateProp = new Date(),
    time: timeProp = 'HH:MM',
    times = Array.from(new Array(10), (_, i) => i + 8),
    defaultTime = '0:00',
    dateFormat = (date: Date) =>
      date
        .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
        .replace(/\//g, '-'),
    onChange,
    'aria-label': ariaLabel = 'date and time picker demo',
    id,
    class: className = '',
    width = '300px',
    ...restProps
  }: Props = $props();

  // State
  let isCalendarOpen = $state(false);
  let isTimeOpen = $state(false);
  let selectedDate = $state(dateProp);
  let valueDate = $state(dateFormat(dateProp));
  let valueTime = $state(timeProp);

  // Update when props change
  $effect(() => {
    selectedDate = dateProp;
    valueDate = dateFormat(dateProp);
  });

  $effect(() => {
    valueTime = timeProp;
  });

  // Generate unique ID
  const componentId = $derived(
    id || `date-time-picker-${Math.random().toString(36).substring(2, 11)}`
  );
  const inputId = $derived(`${componentId}-input`);

  // Format date
  function formatDate(date: Date): string {
    return dateFormat(date);
  }

  // Handle calendar toggle
  function onToggleCalendar() {
    isCalendarOpen = !isCalendarOpen;
    isTimeOpen = false;
  }

  // Handle time toggle
  function onToggleTime() {
    isTimeOpen = !isTimeOpen;
    isCalendarOpen = false;
  }

  // Handle calendar date selection
  function onSelectCalendar(event: MouseEvent, newValueDate: Date) {
    const newValue = formatDate(newValueDate);
    valueDate = newValue;
    selectedDate = newValueDate;
    isCalendarOpen = false;

    // Set default time when it is not picked
    if (valueTime === 'HH:MM') {
      valueTime = defaultTime;
    }

    onChange?.(newValueDate, valueTime);
  }

  // Handle time selection
  function onSelectTime(time: string) {
    valueTime = time;
    isTimeOpen = false;
    onChange?.(selectedDate, time);
  }

  // Generate time options
  const timeOptions = $derived(times.map((time) => `${time}:00`));

  // Close dropdowns when clicking outside
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest(`#${componentId}`)) {
      isCalendarOpen = false;
      isTimeOpen = false;
    }
  }

  // Add click outside listener
  $effect(() => {
    if (isCalendarOpen || isTimeOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  });
</script>

<div id={componentId} style="width: {width}; position: relative;" class={className} {...restProps}>
  <div class="pf-v6-c-input-group">
    <div class="pf-v6-c-input-group__item pf-m-fill">
      <span class="pf-v6-c-form-control pf-m-readonly">
        <input
          type="text"
          id={inputId}
          aria-label={ariaLabel}
          value="{valueDate} {valueTime}"
          readonly
          class="pf-v6-c-form-control__text-input"
        />
      </span>
    </div>
    <div class="pf-v6-c-input-group__item">
      <Button variant="control" aria-label="Toggle the calendar" onclick={onToggleCalendar}>
        {#snippet children()}
          <span class="pf-v6-c-button__icon">
            <i class="fas fa-calendar-alt" aria-hidden="true"></i>
          </span>
        {/snippet}
      </Button>
    </div>
    <div class="pf-v6-c-input-group__item" style="position: relative;">
      <button
        class="pf-v6-c-menu-toggle"
        class:pf-m-expanded={isTimeOpen}
        type="button"
        aria-expanded={isTimeOpen}
        aria-label="Time picker"
        onclick={onToggleTime}
      >
        <span class="pf-v6-c-menu-toggle__icon">
          <i class="fas fa-clock" aria-hidden="true"></i>
        </span>
        <span class="pf-v6-c-menu-toggle__controls">
          <span class="pf-v6-c-menu-toggle__toggle-icon">
            <i class="fas fa-caret-down fa-fw" aria-hidden="true"></i>
          </span>
        </span>
      </button>
      {#if isTimeOpen}
        <div
          class="pf-v6-c-menu pf-m-flyout"
          style="position: absolute; z-index: 1000; top: 100%; left: 0; min-width: max-content; width: max-content;"
        >
          <ul class="pf-v6-c-menu__list" role="menu">
            {#each timeOptions as timeOption}
              <li class="pf-v6-c-menu__list-item" role="none">
                <button
                  class="pf-v6-c-menu__item"
                  type="button"
                  role="menuitem"
                  onclick={() => onSelectTime(timeOption)}
                >
                  <span class="pf-v6-c-menu__item-text">{timeOption}</span>
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  </div>

  {#if isCalendarOpen}
    <div
      class="pf-v6-c-popover"
      style="position: absolute; z-index: 1000; top: 100%; left: 0; margin-top: 0.25rem;"
    >
      <div class="pf-v6-c-popover__content">
        <CalendarMonth date={selectedDate} onChange={onSelectCalendar} />
      </div>
    </div>
  {/if}
</div>
