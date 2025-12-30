<script lang="ts">
  import CalendarMonth from './CalendarMonth.svelte';
  import Content from '../Content/Content.svelte';

  let selectedDate = $state(new Date(2020, 10, 24));

  function handleDateChange(event: MouseEvent, date: Date) {
    selectedDate = date;
    console.log('Selected date:', date);
  }

  function handleMonthChange(_event: MouseEvent | Event | undefined, newDate: Date) {
    console.log(`updated month: ${newDate.getMonth()}, updated year: ${newDate.getFullYear()}`);
  }

  const inlineProps = {
    component: 'article',
    ariaLabelledby: 'favorite-date'
  };
</script>

<div>
  <CalendarMonth
    date={selectedDate}
    onChange={handleDateChange}
    onMonthChange={handleMonthChange}
    {inlineProps}
  >
    {#snippet title()}
      <Content component="h4" id="favorite-date">Select your favorite date</Content>
    {/snippet}
    {#snippet children()}{/snippet}
  </CalendarMonth>
  <pre>Selected date: {selectedDate.toString()}</pre>
</div>
