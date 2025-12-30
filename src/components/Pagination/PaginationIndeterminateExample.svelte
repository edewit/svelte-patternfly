<script lang="ts">
  import Pagination from './Pagination.svelte';

  let page = $state(1);
  let perPage = $state(20);

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

  function toggleTemplate(props: {
    firstIndex?: number;
    lastIndex?: number;
    itemCount?: number;
    itemsTitle?: string;
    ofWord?: string;
  }) {
    return `<b>${props.firstIndex} - ${props.lastIndex}</b>&nbsp;${props.ofWord}&nbsp;<b>many</b>`;
  }
</script>

<Pagination
  {perPage}
  {page}
  {onSetPage}
  widgetId="indeterminate-example"
  {onPerPageSelect}
  {toggleTemplate}
/>

