<script lang="ts">
  import Pagination from './Pagination.svelte';

  let page = $state(1);
  let perPage = $state(20);
  const itemCount = 523;

  function onSetPage(_event: MouseEvent | KeyboardEvent, newPage: number) {
    page = newPage;
  }

  function onPerPageSelect(
    _event: MouseEvent | KeyboardEvent,
    newPerPage: number,
    newPage: number
  ) {
    perPage = newPerPage;
    page = newPage;
  }
</script>

<Pagination
  {itemCount}
  {perPage}
  {page}
  {onSetPage}
  widgetId="compact-example"
  {onPerPageSelect}
  isCompact={true}
/>

