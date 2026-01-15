<script lang="ts">
  import Timestamp from './Timestamp.svelte';
  import { TimestampFormat, TimestampTooltipVariant } from './types';

  interface Props {
    variant?: string;
  }

  let { variant = 'default' }: Props = $props();

  const sampleDate = new Date(2019, 0, 21, 21, 38, 0);
  const recentDate = new Date(2022, 6, 15, 10, 0, 0);
  const tomorrowDate = new Date(2022, 6, 21);
</script>

{#if variant === 'default'}
  <Timestamp date={sampleDate} />
{:else if variant === 'long'}
  <Timestamp date={sampleDate} dateFormat={TimestampFormat.long} timeFormat={TimestampFormat.short} />
{:else if variant === 'medium'}
  <Timestamp date={sampleDate} dateFormat={TimestampFormat.medium} timeFormat={TimestampFormat.short} />
{:else if variant === 'short'}
  <Timestamp date={sampleDate} dateFormat={TimestampFormat.short} timeFormat={TimestampFormat.short} />
{:else if variant === 'custom-content'}
  <Timestamp date={recentDate} tooltip={{ variant: TimestampTooltipVariant.default }}>
    1 hour ago
  </Timestamp>
{:else if variant === 'custom-content-detailed'}
  <Timestamp
    date={new Date(2022, 7, 9, 14, 57, 0)}
    dateFormat={TimestampFormat.medium}
    timeFormat={TimestampFormat.short}
    tooltip={{ variant: TimestampTooltipVariant.default }}
  >
    Last updated August 9th, 2022 at 2:57 PM EDT
  </Timestamp>
{:else if variant === 'date-only'}
  <Timestamp date={sampleDate} isDateOnly />
{:else if variant === 'time-only'}
  <Timestamp date={sampleDate} isTimeOnly />
{:else if variant === 'with-tooltip'}
  <Timestamp date={tomorrowDate} tooltip={{ variant: TimestampTooltipVariant.default }}>
    Tomorrow
  </Timestamp>
{:else if variant === 'custom-tooltip'}
  <Timestamp
    date={sampleDate}
    tooltip={{
      variant: TimestampTooltipVariant.custom,
      content: 'Custom tooltip content here'
    }}
  >
    Hover for custom tooltip
  </Timestamp>
{:else if variant === '24-hour'}
  <Timestamp date={sampleDate} is12Hour={false} />
{:else if variant === 'all-formats'}
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div>
      <strong>Full format:</strong>
      <Timestamp date={sampleDate} dateFormat={TimestampFormat.full} timeFormat={TimestampFormat.full} />
    </div>
    <div>
      <strong>Long format:</strong>
      <Timestamp date={sampleDate} dateFormat={TimestampFormat.long} timeFormat={TimestampFormat.long} />
    </div>
    <div>
      <strong>Medium format:</strong>
      <Timestamp date={sampleDate} dateFormat={TimestampFormat.medium} timeFormat={TimestampFormat.medium} />
    </div>
    <div>
      <strong>Short format:</strong>
      <Timestamp date={sampleDate} dateFormat={TimestampFormat.short} timeFormat={TimestampFormat.short} />
    </div>
  </div>
{/if}
