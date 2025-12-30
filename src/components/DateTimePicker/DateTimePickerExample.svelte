<script lang="ts">
  import DateTimePicker from './DateTimePicker.svelte';

  let selectedDate = $state(new Date(2020, 10, 24));
  let selectedTime = $state('HH:MM');

  function handleChange(date: Date, time: string) {
    selectedDate = date;
    selectedTime = time;
    console.log('Date and time selected:', date, time);
  }
</script>

<div>
  <DateTimePicker date={selectedDate} time={selectedTime} onChange={handleChange} />
  <pre style="margin-top: 1rem;">
    Selected date: {selectedDate.toString()}
    Selected time: {selectedTime}
  </pre>
</div>
