<script lang="ts">
  import type { CalendarMonthProps, CalendarMonthInlineProps } from './types';
  import '@patternfly/patternfly/components/CalendarMonth/calendar-month.css';
  import '@patternfly/patternfly/components/Button/button.css';
  import '@patternfly/patternfly/components/MenuToggle/menu-toggle.css';
  import '@patternfly/patternfly/components/Menu/menu.css';
  import '@patternfly/patternfly/components/InputGroup/input-group.css';
  import '@patternfly/patternfly/components/FormControl/form-control.css';

  interface Props extends CalendarMonthProps {
    date?: Date;
    onChange?: (_event: MouseEvent, _date: Date) => void;
    onMonthChange?: (_event: MouseEvent | Event | undefined, _newDate: Date) => void;
    cellAriaLabel?: (_date: Date) => string;
    className?: string;
    dayFormat?: (_date: Date) => string | number;
    inlineProps?: CalendarMonthInlineProps;
    rangeStart?: Date;
    validators?: Array<(_date: Date) => boolean>;
    'aria-label'?: string;
    class?: string;
    children?: import('svelte').Snippet;
    title?: import('svelte').Snippet;
  }

  // Helper function to normalize date (handle both Date objects and timestamps)
  function normalizeDate(d: Date | number | undefined): Date {
    if (!d) return new Date();
    if (d instanceof Date) return d;
    if (typeof d === 'number') return new Date(d);
    return new Date();
  }

  let {
    date: dateProp = $bindable(new Date()),
    onChange,
    onMonthChange,
    cellAriaLabel = (d: Date) => {
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };
      return d.toLocaleDateString(undefined, options);
    },
    className = '',
    dayFormat = (d: Date) => d.getDate(),
    inlineProps,
    rangeStart: rangeStartProp,
    validators = [],
    'aria-label': ariaLabel,
    class: classProp = '',
    children,
    title,
    ...restProps
  }: Props = $props();

  // Normalize dates (handle both Date objects and timestamps from Storybook)
  const date = $derived(normalizeDate(dateProp));
  const rangeStart = $derived(rangeStartProp ? normalizeDate(rangeStartProp) : undefined);

  // State for month/year navigation
  let currentMonth = $state(date.getMonth());
  let currentYear = $state(date.getFullYear());
  let isMonthDropdownOpen = $state(false);
  let yearInputValue = $state(currentYear.toString());

  // Update state when date prop changes
  $effect(() => {
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
    yearInputValue = date.getFullYear().toString();
  });

  // Month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // Day names
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayAbbreviations = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Get first day of month and number of days
  function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }

  function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  // Generate calendar grid
  function getCalendarDays() {
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const days: Array<{
      date: Date;
      isAdjacent: boolean;
      isCurrent: boolean;
      isSelected: boolean;
      isInRange: boolean;
      isStartRange: boolean;
      isEndRange: boolean;
      isDisabled: boolean;
    }> = [];

    // Previous month's trailing days
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    for (let i = firstDay - 1; i >= 0; i--) {
      const dayDate = new Date(prevYear, prevMonth, daysInPrevMonth - i);
      days.push({
        date: dayDate,
        isAdjacent: true,
        isCurrent: false,
        isSelected: isDateSelected(dayDate),
        isInRange: isDateInRange(dayDate),
        isStartRange: isDateStartRange(dayDate),
        isEndRange: isDateEndRange(dayDate),
        isDisabled: isDateDisabled(dayDate)
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(currentYear, currentMonth, day);
      const today = new Date();
      days.push({
        date: dayDate,
        isAdjacent: false,
        isCurrent: dayDate.toDateString() === today.toDateString(),
        isSelected: isDateSelected(dayDate),
        isInRange: isDateInRange(dayDate),
        isStartRange: isDateStartRange(dayDate),
        isEndRange: isDateEndRange(dayDate),
        isDisabled: isDateDisabled(dayDate)
      });
    }

    // Next month's leading days
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42

    for (let day = 1; day <= remainingDays; day++) {
      const dayDate = new Date(nextYear, nextMonth, day);
      days.push({
        date: dayDate,
        isAdjacent: true,
        isCurrent: false,
        isSelected: isDateSelected(dayDate),
        isInRange: isDateInRange(dayDate),
        isStartRange: isDateStartRange(dayDate),
        isEndRange: isDateEndRange(dayDate),
        isDisabled: isDateDisabled(dayDate)
      });
    }

    return days;
  }

  // Check if date is selected
  function isDateSelected(dayDate: Date): boolean {
    if (rangeStart && date) {
      const dayStr = dayDate.toDateString();
      return dayStr === rangeStart.toDateString() || dayStr === date.toDateString();
    }
    return date ? dayDate.toDateString() === date.toDateString() : false;
  }

  // Check if date is in range
  function isDateInRange(dayDate: Date): boolean {
    if (rangeStart && date) {
      const start = rangeStart < date ? rangeStart : date;
      const end = rangeStart < date ? date : rangeStart;
      // Compare dates without time
      const dayTime = new Date(
        dayDate.getFullYear(),
        dayDate.getMonth(),
        dayDate.getDate()
      ).getTime();
      const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
      const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
      return dayTime >= startTime && dayTime <= endTime;
    }
    return false;
  }

  // Check if date is start of range
  function isDateStartRange(dayDate: Date): boolean {
    return rangeStart ? dayDate.toDateString() === rangeStart.toDateString() : false;
  }

  // Check if date is end of range
  function isDateEndRange(dayDate: Date): boolean {
    if (date && rangeStart) {
      const dayStr = dayDate.toDateString();
      return dayStr === date.toDateString() && dayStr !== rangeStart.toDateString();
    }
    return false;
  }

  // Check if date is disabled
  function isDateDisabled(dayDate: Date): boolean {
    return validators.some((validator) => !validator(dayDate));
  }

  // Handle date click
  function handleDateClick(event: MouseEvent, dayDate: Date) {
    if (isDateDisabled(dayDate)) {
      return;
    }
    onChange?.(event, dayDate);
  }

  // Handle previous month
  function handlePrevMonth(event: MouseEvent) {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    const newDate = new Date(currentYear, currentMonth, 1);
    onMonthChange?.(event, newDate);
  }

  // Handle next month
  function handleNextMonth(event: MouseEvent) {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    const newDate = new Date(currentYear, currentMonth, 1);
    onMonthChange?.(event, newDate);
  }

  // Handle month selection
  function handleMonthSelect(monthIndex: number) {
    currentMonth = monthIndex;
    isMonthDropdownOpen = false;
    const newDate = new Date(currentYear, currentMonth, 1);
    onMonthChange?.(undefined, newDate);
  }

  // Handle year input change
  function handleYearChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const year = parseInt(target.value, 10);
    if (!isNaN(year) && year >= 1900 && year <= 2100) {
      currentYear = year;
      yearInputValue = year.toString();
      const newDate = new Date(currentYear, currentMonth, 1);
      onMonthChange?.(event, newDate);
    }
  }

  // Generate unique IDs
  const monthSelectId = `calendar-month-${Math.random().toString(36).substr(2, 9)}-selected-month-select`;
  const yearInputId = `calendar-month-${Math.random().toString(36).substr(2, 9)}-selected-year`;

  const calendarDays = $derived(getCalendarDays());
  const classes = $derived(
    ['pf-v6-c-calendar-month', className, classProp].filter(Boolean).join(' ')
  );
</script>

{#if inlineProps}
  {@const Component = inlineProps.component || 'div'}
  {@const inlineClasses = ['pf-v6-c-calendar-month', inlineProps.className || '']
    .filter(Boolean)
    .join(' ')}
  <svelte:element
    this={Component}
    class={inlineClasses}
    aria-labelledby={inlineProps.ariaLabelledby}
    {...restProps}
  >
    {#if title}
      {@render title()}
    {:else if inlineProps?.title}
      {@render inlineProps.title()}
    {/if}
    <div class={classes}>
      <!-- Calendar content -->
      <div class="pf-v6-c-calendar-month__header">
        <div class="pf-v6-c-calendar-month__header-nav-control pf-m-prev-month">
          <button
            class="pf-v6-c-button pf-m-plain"
            type="button"
            aria-label="Previous month"
            onclick={handlePrevMonth}
          >
            <span class="pf-v6-c-button__icon">
              <i class="fas fa-angle-left" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="pf-v6-c-input-group">
          <div class="pf-v6-c-input-group__item pf-m-fill">
            <div class="pf-v6-c-calendar-month__header-month">
              <button
                class="pf-v6-c-menu-toggle"
                class:pf-m-expanded={isMonthDropdownOpen}
                type="button"
                aria-expanded={isMonthDropdownOpen}
                id={monthSelectId}
                onclick={() => (isMonthDropdownOpen = !isMonthDropdownOpen)}
              >
                <span class="pf-v6-c-menu-toggle__text">{monthNames[currentMonth]}</span>
                <span class="pf-v6-c-menu-toggle__controls">
                  <span class="pf-v6-c-menu-toggle__toggle-icon">
                    <i class="fas fa-caret-down fa-fw" aria-hidden="true"></i>
                  </span>
                </span>
              </button>
              {#if isMonthDropdownOpen}
                <div class="pf-v6-c-menu pf-m-flyout" style="position: absolute; z-index: 1000;">
                  <ul class="pf-v6-c-menu__list" role="menu">
                    {#each monthNames as monthName, index}
                      <li class="pf-v6-c-menu__list-item" role="none">
                        <button
                          class="pf-v6-c-menu__item"
                          type="button"
                          role="menuitem"
                          onclick={() => handleMonthSelect(index)}
                        >
                          <span class="pf-v6-c-menu__item-text">{monthName}</span>
                        </button>
                      </li>
                    {/each}
                  </ul>
                </div>
              {/if}
            </div>
          </div>
          <div class="pf-v6-c-input-group__item">
            <div class="pf-v6-c-calendar-month__header-year">
              <span class="pf-v6-c-form-control">
                <input
                  type="number"
                  value={yearInputValue}
                  id={yearInputId}
                  aria-label="Select year"
                  onchange={handleYearChange}
                  oninput={(e) => (yearInputValue = (e.target as HTMLInputElement).value)}
                />
              </span>
            </div>
          </div>
        </div>
        <div class="pf-v6-c-calendar-month__header-nav-control pf-m-next-month">
          <button
            class="pf-v6-c-button pf-m-plain"
            type="button"
            aria-label="Next month"
            onclick={handleNextMonth}
          >
            <span class="pf-v6-c-button__icon">
              <i class="fas fa-angle-right" aria-hidden="true"></i>
            </span>
          </button>
        </div>
      </div>
      <table class="pf-v6-c-calendar-month__calendar">
        <thead class="pf-v6-c-calendar-month__days" scope="col">
          <tr class="pf-v6-c-calendar-month__days-row">
            {#each dayAbbreviations as abbr, index}
              <th class="pf-v6-c-calendar-month__day">
                <span class="pf-v6-screen-reader">{dayNames[index]}</span>
                <span aria-hidden="true">{abbr}</span>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="pf-v6-c-calendar-month__dates">
          {#each Array.from({ length: 6 }) as _, rowIndex}
            <tr class="pf-v6-c-calendar-month__dates-row">
              {#each Array.from({ length: 7 }) as _, colIndex}
                {@const dayIndex = rowIndex * 7 + colIndex}
                {@const day = calendarDays[dayIndex]}
                {@const cellClasses = [
                  'pf-v6-c-calendar-month__dates-cell',
                  day.isAdjacent && 'pf-m-adjacent-month',
                  day.isCurrent && 'pf-m-current',
                  day.isSelected && 'pf-m-selected',
                  day.isInRange && 'pf-m-in-range',
                  day.isStartRange && 'pf-m-start-range',
                  day.isEndRange && 'pf-m-end-range',
                  day.isDisabled && 'pf-m-disabled'
                ]
                  .filter(Boolean)
                  .join(' ')}
                <td class={cellClasses}>
                  <button
                    class="pf-v6-c-calendar-month__date"
                    type="button"
                    aria-label={cellAriaLabel(day.date)}
                    disabled={day.isDisabled}
                    onclick={(e) => handleDateClick(e, day.date)}
                  >
                    {dayFormat(day.date)}
                  </button>
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    {@render children?.()}
  </svelte:element>
{:else}
  <div class={classes} aria-label={ariaLabel} {...restProps}>
    <div class="pf-v6-c-calendar-month__header">
      <div class="pf-v6-c-calendar-month__header-nav-control pf-m-prev-month">
        <button
          class="pf-v6-c-button pf-m-plain"
          type="button"
          aria-label="Previous month"
          onclick={handlePrevMonth}
        >
          <span class="pf-v6-c-button__icon">
            <i class="fas fa-angle-left" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="pf-v6-c-input-group">
        <div class="pf-v6-c-input-group__item pf-m-fill">
          <div class="pf-v6-c-calendar-month__header-month">
            <button
              class="pf-v6-c-menu-toggle"
              class:pf-m-expanded={isMonthDropdownOpen}
              type="button"
              aria-expanded={isMonthDropdownOpen}
              id={monthSelectId}
              onclick={() => (isMonthDropdownOpen = !isMonthDropdownOpen)}
            >
              <span class="pf-v6-c-menu-toggle__text">{monthNames[currentMonth]}</span>
              <span class="pf-v6-c-menu-toggle__controls">
                <span class="pf-v6-c-menu-toggle__toggle-icon">
                  <i class="fas fa-caret-down fa-fw" aria-hidden="true"></i>
                </span>
              </span>
            </button>
            {#if isMonthDropdownOpen}
              <div class="pf-v6-c-menu pf-m-flyout" style="position: absolute; z-index: 1000;">
                <ul class="pf-v6-c-menu__list" role="menu">
                  {#each monthNames as monthName, index}
                    <li class="pf-v6-c-menu__list-item" role="none">
                      <button
                        class="pf-v6-c-menu__item"
                        type="button"
                        role="menuitem"
                        onclick={() => handleMonthSelect(index)}
                      >
                        <span class="pf-v6-c-menu__item-text">{monthName}</span>
                      </button>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        </div>
        <div class="pf-v6-c-input-group__item">
          <div class="pf-v6-c-calendar-month__header-year">
            <span class="pf-v6-c-form-control">
              <input
                type="number"
                value={yearInputValue}
                id={yearInputId}
                aria-label="Select year"
                onchange={handleYearChange}
                oninput={(e) => (yearInputValue = (e.target as HTMLInputElement).value)}
              />
            </span>
          </div>
        </div>
      </div>
      <div class="pf-v6-c-calendar-month__header-nav-control pf-m-next-month">
        <button
          class="pf-v6-c-button pf-m-plain"
          type="button"
          aria-label="Next month"
          onclick={handleNextMonth}
        >
          <span class="pf-v6-c-button__icon">
            <i class="fas fa-angle-right" aria-hidden="true"></i>
          </span>
        </button>
      </div>
    </div>
    <table class="pf-v6-c-calendar-month__calendar">
      <thead class="pf-v6-c-calendar-month__days" scope="col">
        <tr class="pf-v6-c-calendar-month__days-row">
          {#each dayAbbreviations as abbr, index}
            <th class="pf-v6-c-calendar-month__day">
              <span class="pf-v6-screen-reader">{dayNames[index]}</span>
              <span aria-hidden="true">{abbr}</span>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody class="pf-v6-c-calendar-month__dates">
        {#each Array.from({ length: 6 }) as _, rowIndex}
          <tr class="pf-v6-c-calendar-month__dates-row">
            {#each Array.from({ length: 7 }) as _, colIndex}
              {@const dayIndex = rowIndex * 7 + colIndex}
              {@const day = calendarDays[dayIndex]}
              {@const cellClasses = [
                'pf-v6-c-calendar-month__dates-cell',
                day.isAdjacent && 'pf-m-adjacent-month',
                day.isCurrent && 'pf-m-current',
                day.isSelected && 'pf-m-selected',
                day.isInRange && 'pf-m-in-range',
                day.isStartRange && 'pf-m-start-range',
                day.isEndRange && 'pf-m-end-range',
                day.isDisabled && 'pf-m-disabled'
              ]
                .filter(Boolean)
                .join(' ')}
              <td class={cellClasses}>
                <button
                  class="pf-v6-c-calendar-month__date"
                  type="button"
                  aria-label={cellAriaLabel(day.date)}
                  disabled={day.isDisabled}
                  onclick={(e) => handleDateClick(e, day.date)}
                >
                  {dayFormat(day.date)}
                </button>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
    {@render children?.()}
  </div>
{/if}
