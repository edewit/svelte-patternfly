<script lang="ts">
  import type { TimestampProps, TimestampFormat, TimestampTooltip, TimestampTooltipVariant } from './types';
  import '@patternfly/patternfly/components/Timestamp/timestamp.css';
  import '@patternfly/patternfly/components/Tooltip/tooltip.css';

  interface Props extends TimestampProps {
    date?: Date;
    dateFormat?: TimestampFormat;
    timeFormat?: TimestampFormat;
    isDateOnly?: boolean;
    isTimeOnly?: boolean;
    locale?: string;
    timezone?: string;
    is12Hour?: boolean;
    tooltip?: TimestampTooltip;
    customFormat?: string;
    class?: string;
    children?: import('svelte').Snippet | string;
    [key: string]: unknown;
  }

  let {
    date = new Date(),
    dateFormat,
    timeFormat,
    isDateOnly = false,
    isTimeOnly = false,
    locale = 'en-US',
    timezone,
    is12Hour = true,
    tooltip,
    customFormat,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  let showTooltip = $state(false);

  // Convert TimestampFormat to Intl.DateTimeFormatOptions style
  function formatToStyle(format: TimestampFormat | undefined): 'full' | 'long' | 'medium' | 'short' | undefined {
    if (!format) return undefined;
    return format as 'full' | 'long' | 'medium' | 'short';
  }

  // Format the date for display
  function formatDate(d: Date): string {
    const options: Intl.DateTimeFormatOptions = {};

    if (timezone) {
      options.timeZone = timezone;
    }

    if (!isTimeOnly) {
      const dateStyle = formatToStyle(dateFormat);
      if (dateStyle) {
        options.dateStyle = dateStyle;
      } else {
        // Default date formatting
        options.weekday = 'long';
        options.year = 'numeric';
        options.month = 'long';
        options.day = 'numeric';
      }
    }

    if (!isDateOnly) {
      const timeStyle = formatToStyle(timeFormat);
      if (timeStyle) {
        options.timeStyle = timeStyle;
      } else if (!isTimeOnly || !dateFormat) {
        // Default time formatting
        options.hour = 'numeric';
        options.minute = '2-digit';
        options.hour12 = is12Hour;
        if (timezone) {
          options.timeZoneName = 'short';
        }
      }
    }

    // If we have both dateStyle and timeStyle, use them
    if (options.dateStyle && !isDateOnly && !options.timeStyle) {
      const timeStyle = formatToStyle(timeFormat) || 'short';
      options.timeStyle = timeStyle;
    }

    try {
      return new Intl.DateTimeFormat(locale, options).format(d);
    } catch {
      return d.toLocaleString(locale);
    }
  }

  // Format the datetime attribute (ISO format)
  function formatDatetime(d: Date): string {
    if (customFormat) {
      return customFormat;
    }

    if (isDateOnly) {
      return d.toISOString().split('T')[0];
    }

    // Format as YYYY-MM-DDTHH:MM
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    if (isTimeOnly) {
      return `${hours}:${minutes}`;
    }

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // Format tooltip content
  function formatTooltipContent(d: Date): string {
    if (tooltip?.variant === 'custom' && tooltip.content) {
      return tooltip.content;
    }

    const options: Intl.DateTimeFormatOptions = {
      dateStyle: formatToStyle(tooltip?.dateFormat) || 'full',
      timeStyle: formatToStyle(tooltip?.timeFormat) || 'long'
    };

    if (timezone) {
      options.timeZone = timezone;
    }

    let formatted = new Intl.DateTimeFormat(locale, options).format(d);

    if (tooltip?.suffix) {
      formatted += ` ${tooltip.suffix}`;
    }

    return formatted;
  }

  // Computed values
  const displayText = $derived(() => {
    if (children) {
      return null; // Will render children instead
    }
    return formatDate(date);
  });

  const datetimeAttr = $derived(formatDatetime(date));
  const tooltipContent = $derived(tooltip ? formatTooltipContent(date) : '');
  const hasTooltip = $derived(!!tooltip);

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-timestamp', hasTooltip && 'pf-m-help-text', className].filter(Boolean).join(' ')
  );

  // Handle hover for tooltip
  function handleMouseEnter() {
    if (hasTooltip) {
      showTooltip = true;
    }
  }

  function handleMouseLeave() {
    showTooltip = false;
  }

  function handleFocus() {
    if (hasTooltip) {
      showTooltip = true;
    }
  }

  function handleBlur() {
    showTooltip = false;
  }
</script>

<span
  class={classes}
  style="position: relative; display: inline-block;"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  onfocus={handleFocus}
  onblur={handleBlur}
  tabindex={hasTooltip ? 0 : undefined}
  {...restProps}
>
  <time class="pf-v6-c-timestamp__text" datetime={datetimeAttr}>
    {#if children}
      {#if typeof children === 'string'}
        {children}
      {:else}
        {@render children()}
      {/if}
    {:else}
      {displayText()}
    {/if}
  </time>

  {#if hasTooltip && showTooltip}
    <div
      class="pf-v6-c-tooltip pf-m-top"
      role="tooltip"
      style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px; white-space: nowrap; z-index: 1000;"
    >
      <div class="pf-v6-c-tooltip__arrow"></div>
      <div class="pf-v6-c-tooltip__content">{tooltipContent}</div>
    </div>
  {/if}
</span>
