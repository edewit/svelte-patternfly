<script lang="ts">
  import type { TimePickerProps } from './types';
  import HelperText from '../HelperText/HelperText.svelte';
  import HelperTextItem from '../HelperText/HelperTextItem.svelte';
  import '@patternfly/patternfly/components/InputGroup/input-group.css';
  import '@patternfly/patternfly/components/FormControl/form-control.css';
  import '@patternfly/patternfly/components/Menu/menu.css';

  interface Props extends TimePickerProps {
    'aria-label'?: string;
    class?: string;
    delimiter?: string;
    id?: string;
    includeSeconds?: boolean;
    inputProps?: Record<string, any>;
    invalidFormatErrorMessage?: string;
    invalidMinMaxErrorMessage?: string;
    is24Hour?: boolean;
    isDisabled?: boolean;
    isOpen?: boolean;
    maxTime?: string | Date;
    menuAppendTo?: HTMLElement | (() => HTMLElement) | 'parent' | 'inline';
    minTime?: string | Date;
    onChange?: (
      _event: Event,
      _time: string,
      _hour?: number,
      _minute?: number,
      _seconds?: number,
      _isValid?: boolean
    ) => void;
    placeholder?: string;
    setIsOpen?: (_isOpen?: boolean) => void;
    stepMinutes?: number;
    time?: string | Date;
    validateTime?: (_time: string) => boolean;
    width?: string;
    zIndex?: number;
  }

  let {
    'aria-label': ariaLabel = 'Time picker',
    class: className = '',
    delimiter = ':',
    id,
    includeSeconds = false,
    inputProps = {},
    invalidFormatErrorMessage = 'Invalid time format',
    invalidMinMaxErrorMessage = 'Invalid time entered',
    is24Hour = false,
    isDisabled = false,
    isOpen: isOpenProp = false,
    maxTime,
    menuAppendTo = 'inline',
    minTime,
    onChange,
    placeholder,
    setIsOpen,
    stepMinutes = 30,
    time: timeProp,
    validateTime,
    width = '150px',
    zIndex = 9999,
    ...restProps
  }: Props = $props();

  // Generate placeholder based on format
  const defaultPlaceholder = $derived(
    placeholder ||
      (includeSeconds
        ? is24Hour
          ? `hh${delimiter}mm${delimiter}ss`
          : `hh${delimiter}mm${delimiter}ss aa`
        : is24Hour
          ? `hh${delimiter}mm`
          : `hh${delimiter}mm aa`)
  );

  // State
  let isMenuOpen = $state(isOpenProp);
  let inputValue = $state('');
  let isValid = $state(true);
  let errorMessage = $state('');

  // Generate unique ID
  const componentId = $derived(id || `time-picker-${Math.random().toString(36).substring(2, 11)}`);
  const inputId = $derived(`${componentId}-input`);

  // Parse time string or Date to time string and format it
  function parseTimeProp(time: string | Date | undefined): string {
    if (!time) return '';
    if (time instanceof Date) {
      return formatTime(time.getHours(), time.getMinutes(), includeSeconds ? time.getSeconds() : 0);
    }
    // Parse the time string and format it according to current settings
    const parsed = parseTimeString(String(time));
    if (parsed.isValid) {
      return formatTime(parsed.hour, parsed.minute, parsed.seconds);
    }
    // If parsing fails, return the original string (user might be typing)
    return String(time);
  }

  // Initialize input value from prop and react to format changes
  $effect(() => {
    if (timeProp !== undefined) {
      // Format settings are accessed via parseTimeProp -> formatTime, so effect will track them
      inputValue = parseTimeProp(timeProp);
    }
  });

  // Update menu open state from prop
  $effect(() => {
    isMenuOpen = isOpenProp;
  });

  // Parse time string to hours, minutes, seconds
  function parseTimeString(timeStr: string): {
    hour: number;
    minute: number;
    seconds: number;
    isValid: boolean;
  } {
    if (!timeStr.trim()) {
      return { hour: 0, minute: 0, seconds: 0, isValid: false };
    }

    // Handle 12-hour format with AM/PM
    if (!is24Hour) {
      const amPmMatch = timeStr.match(
        /(\d{1,2})\s*[:.]\s*(\d{1,2})(?:\s*[:.]\s*(\d{1,2}))?\s*(am|pm)/i
      );
      if (amPmMatch) {
        let hour = parseInt(amPmMatch[1], 10);
        const minute = parseInt(amPmMatch[2], 10);
        const seconds = amPmMatch[3] ? parseInt(amPmMatch[3], 10) : 0;
        const isPM = amPmMatch[4].toLowerCase() === 'pm';

        if (hour === 12) {
          hour = isPM ? 12 : 0;
        } else {
          hour = isPM ? hour + 12 : hour;
        }

        if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60 && seconds >= 0 && seconds < 60) {
          return { hour, minute, seconds, isValid: true };
        }
      }
    }

    // Handle 24-hour format or numeric format
    const parts = timeStr.split(/[:.]/).map((p) => parseInt(p.trim(), 10));
    if (parts.length < 2) {
      return { hour: 0, minute: 0, seconds: 0, isValid: false };
    }

    const hour = parts[0];
    const minute = parts[1];
    const seconds = parts[2] || 0;

    if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60 && seconds >= 0 && seconds < 60) {
      return { hour, minute, seconds, isValid: true };
    }

    return { hour: 0, minute: 0, seconds: 0, isValid: false };
  }

  // Format time for display
  function formatTime(hour: number, minute: number, seconds: number = 0): string {
    if (is24Hour) {
      const h = String(hour).padStart(2, '0');
      const m = String(minute).padStart(2, '0');
      if (includeSeconds) {
        const s = String(seconds).padStart(2, '0');
        return `${h}${delimiter}${m}${delimiter}${s}`;
      }
      return `${h}${delimiter}${m}`;
    } else {
      let displayHour = hour;
      const amPm = hour >= 12 ? 'PM' : 'AM';
      if (hour === 0) {
        displayHour = 12;
      } else if (hour > 12) {
        displayHour = hour - 12;
      }
      const h = String(displayHour).padStart(2, '0');
      const m = String(minute).padStart(2, '0');
      if (includeSeconds) {
        const s = String(seconds).padStart(2, '0');
        return `${h}${delimiter}${m}${delimiter}${s} ${amPm}`;
      }
      return `${h}${delimiter}${m} ${amPm}`;
    }
  }

  // Parse min/max time
  function parseMinMaxTime(time: string | Date | undefined): number | null {
    if (!time) return null;
    if (time instanceof Date) {
      return time.getHours() * 60 + time.getMinutes();
    }
    const parsed = parseTimeString(String(time));
    if (parsed.isValid) {
      return parsed.hour * 60 + parsed.minute;
    }
    return null;
  }

  const minTimeMinutes = $derived(parseMinMaxTime(minTime));
  const maxTimeMinutes = $derived(parseMinMaxTime(maxTime));

  // Generate time options
  const timeOptions = $derived.by(() => {
    const options: string[] = [];
    const startMinutes = minTimeMinutes ?? 0;
    const endMinutes = maxTimeMinutes ?? (is24Hour ? 24 * 60 : 12 * 60);
    const maxMinutes = is24Hour ? 24 * 60 : 12 * 60;

    // Guard against invalid stepMinutes to prevent infinite loops
    if (stepMinutes <= 0 || stepMinutes > maxMinutes) {
      return options;
    }

    // Limit the number of iterations to prevent performance issues
    const maxIterations = 1000;
    let iterations = 0;

    for (
      let minutes = startMinutes;
      minutes < endMinutes && minutes < maxMinutes && iterations < maxIterations;
      minutes += stepMinutes
    ) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      options.push(formatTime(hour, minute, 0));
      iterations++;
    }

    return options;
  });

  // Validate time
  function validateTimeInput(timeStr: string): boolean {
    if (!timeStr.trim()) {
      return true; // Empty is valid
    }

    // Use custom validator if provided
    if (validateTime) {
      return validateTime(timeStr);
    }

    const parsed = parseTimeString(timeStr);
    if (!parsed.isValid) {
      return false;
    }

    // Check min/max constraints
    const timeMinutes = parsed.hour * 60 + parsed.minute;
    if (minTimeMinutes !== null && timeMinutes < minTimeMinutes) {
      return false;
    }
    if (maxTimeMinutes !== null && timeMinutes > maxTimeMinutes) {
      return false;
    }

    return true;
  }

  // Handle input change
  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    inputValue = newValue;

    const isValidTime = validateTimeInput(newValue);
    isValid = isValidTime;

    if (!isValidTime && newValue.trim()) {
      const parsed = parseTimeString(newValue);
      if (!parsed.isValid) {
        errorMessage = invalidFormatErrorMessage;
      } else {
        errorMessage = invalidMinMaxErrorMessage;
      }
    } else {
      errorMessage = '';
    }

    const parsed = parseTimeString(newValue);
    onChange?.(event, newValue, parsed.hour, parsed.minute, parsed.seconds, isValidTime);
  }

  // Handle input blur
  function handleInputBlur(_event: Event) {
    // Validate on blur
    const isValidTime = validateTimeInput(inputValue);
    isValid = isValidTime;
    if (!isValidTime && inputValue.trim()) {
      const parsed = parseTimeString(inputValue);
      if (!parsed.isValid) {
        errorMessage = invalidFormatErrorMessage;
      } else {
        errorMessage = invalidMinMaxErrorMessage;
      }
    } else {
      errorMessage = '';
    }
  }

  // Handle menu toggle
  function toggleMenu() {
    if (isDisabled) return;
    const newState = !isMenuOpen;
    isMenuOpen = newState;
    setIsOpen?.(newState);
  }

  // Handle input focus - open menu on focus
  function handleInputFocus() {
    if (!isDisabled && !isMenuOpen) {
      isMenuOpen = true;
      setIsOpen?.(true);
    }
  }

  // Handle time selection from menu
  function selectTime(time: string) {
    inputValue = time;
    isValid = true;
    errorMessage = '';
    isMenuOpen = false;
    setIsOpen?.(false);

    const parsed = parseTimeString(time);
    const syntheticEvent = new Event('change', { bubbles: true });
    onChange?.(syntheticEvent, time, parsed.hour, parsed.minute, parsed.seconds, true);
  }

  // Close menu when clicking outside
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest(`#${componentId}`)) {
      isMenuOpen = false;
      setIsOpen?.(false);
    }
  }

  // Add click outside listener
  $effect(() => {
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  });

  // Get menu container element
  const menuContainer = $derived.by(() => {
    if (menuAppendTo === 'inline') {
      return null;
    }
    if (menuAppendTo === 'parent') {
      return null; // Will use parent element
    }
    if (typeof menuAppendTo === 'function') {
      return menuAppendTo();
    }
    return menuAppendTo;
  });

  // Menu element reference
  let menuElement: HTMLDivElement | null = $state(null);
  let containerElement: HTMLDivElement | null = $state(null);

  // Handle menu appendTo - append menu to external container if specified
  $effect(() => {
    if (isMenuOpen && menuElement && menuContainer) {
      menuContainer.appendChild(menuElement);
      return () => {
        if (menuElement && menuContainer && menuContainer.contains(menuElement)) {
          menuContainer.removeChild(menuElement);
        }
      };
    }
  });
</script>

<div
  id={componentId}
  bind:this={containerElement}
  class="pf-v6-c-input-group__item"
  style="width: {width}; position: relative;"
  class:className
  {...restProps}
>
  <div style="padding-left: 0px;">
    <span
      class="pf-v6-c-form-control pf-m-icon"
      class:pf-m-error={!isValid && inputValue.trim() !== ''}
    >
      <input
        aria-haspopup="menu"
        id={inputId}
        aria-label={ariaLabel}
        autocomplete="off"
        type="text"
        aria-invalid={!isValid && inputValue.trim() !== '' ? 'true' : 'false'}
        placeholder={defaultPlaceholder}
        value={inputValue}
        disabled={isDisabled}
        oninput={handleInputChange}
        onblur={handleInputBlur}
        onfocus={handleInputFocus}
        onclick={toggleMenu}
        class="pf-v6-c-form-control__text-input"
        {...inputProps}
      />
      <span class="pf-v6-c-form-control__utilities">
        <span class="pf-v6-c-form-control__icon">
          <svg
            class="pf-v6-svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
          >
            <path
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
            ></path>
          </svg>
        </span>
      </span>
    </span>
  </div>
  {#if isMenuOpen}
    <div
      bind:this={menuElement}
      class="pf-v6-c-menu pf-m-flyout"
      style="position: absolute; z-index: {zIndex}; top: 100%; left: 0; min-width: max-content; width: max-content; max-height: 300px; overflow-y: auto;"
    >
      <ul class="pf-v6-c-menu__list" role="menu">
        {#each timeOptions as timeOption}
          <li class="pf-v6-c-menu__list-item" role="none">
            <button
              class="pf-v6-c-menu__item"
              type="button"
              role="menuitem"
              onclick={() => selectTime(timeOption)}
            >
              <span class="pf-v6-c-menu__item-text">{timeOption}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  {#if errorMessage}
    <HelperText>
      <HelperTextItem variant="error">
        {errorMessage}
      </HelperTextItem>
    </HelperText>
  {/if}
</div>
