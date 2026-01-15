<script lang="ts">
  import Table from './Table.svelte';
  import Caption from './Caption.svelte';
  import Thead from './Thead.svelte';
  import Tbody from './Tbody.svelte';
  import Tr from './Tr.svelte';
  import Th from './Th.svelte';
  import Td from './Td.svelte';
  import type { SortDirection } from './types';

  interface Props {
    variant?: string;
  }

  let { variant = 'basic' }: Props = $props();

  interface Repository {
    name: string;
    branches: string;
    prs: string;
    workspaces: string;
    lastCommit: string;
  }

  const repositories: Repository[] = [
    { name: 'Repository 1', branches: '10', prs: '25', workspaces: '5', lastCommit: '2 days ago' },
    { name: 'Repository 2', branches: '10', prs: '25', workspaces: '5', lastCommit: '2 days ago' },
    { name: 'Repository 3', branches: '10', prs: '25', workspaces: '5', lastCommit: '2 days ago' },
    { name: 'Repository 4', branches: '10', prs: '25', workspaces: '5', lastCommit: '2 days ago' }
  ];

  const columnNames = {
    name: 'Repositories',
    branches: 'Branches',
    prs: 'Pull requests',
    workspaces: 'Workspaces',
    lastCommit: 'Last commit'
  };

  // For sortable example
  let sortColumn = $state<number | undefined>(undefined);
  let sortDirection = $state<SortDirection>('none');

  function handleSort(event: MouseEvent, columnIndex: number, direction: SortDirection) {
    sortColumn = columnIndex;
    sortDirection = direction;
  }

  // For selectable example
  let selectedRows = $state<Set<number>>(new Set());

  function handleSelectRow(rowIndex: number, isSelected: boolean) {
    if (isSelected) {
      selectedRows = new Set([...selectedRows, rowIndex]);
    } else {
      const newSet = new Set(selectedRows);
      newSet.delete(rowIndex);
      selectedRows = newSet;
    }
  }

  // For expandable example
  let expandedRows = $state<Set<number>>(new Set());

  function handleToggleExpand(rowIndex: number) {
    if (expandedRows.has(rowIndex)) {
      const newSet = new Set(expandedRows);
      newSet.delete(rowIndex);
      expandedRows = newSet;
    } else {
      expandedRows = new Set([...expandedRows, rowIndex]);
    }
  }
</script>

{#if variant === 'basic'}
  <Table aria-label="Simple table example" id="table-basic">
    {#snippet children()}
      <Caption>This is the table caption</Caption>
      <Thead>
        {#snippet children()}
          <Tr>
            {#snippet children()}
              <Th>{columnNames.name}</Th>
              <Th>{columnNames.branches}</Th>
              <Th>{columnNames.prs}</Th>
              <Th>{columnNames.workspaces}</Th>
              <Th>{columnNames.lastCommit}</Th>
            {/snippet}
          </Tr>
        {/snippet}
      </Thead>
      <Tbody>
        {#snippet children()}
          {#each repositories as repo}
            <Tr>
              {#snippet children()}
                <Td dataLabel={columnNames.name}>{repo.name}</Td>
                <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
                <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
                <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
                <Td dataLabel={columnNames.lastCommit}>{repo.lastCommit}</Td>
              {/snippet}
            </Tr>
          {/each}
        {/snippet}
      </Tbody>
    {/snippet}
  </Table>
{:else if variant === 'compact'}
  <Table aria-label="Compact table example" variant="compact">
    {#snippet children()}
      <Thead>
        {#snippet children()}
          <Tr>
            {#snippet children()}
              <Th>{columnNames.name}</Th>
              <Th>{columnNames.branches}</Th>
              <Th>{columnNames.prs}</Th>
              <Th>{columnNames.workspaces}</Th>
              <Th>{columnNames.lastCommit}</Th>
            {/snippet}
          </Tr>
        {/snippet}
      </Thead>
      <Tbody>
        {#snippet children()}
          {#each repositories as repo}
            <Tr>
              {#snippet children()}
                <Td dataLabel={columnNames.name}>{repo.name}</Td>
                <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
                <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
                <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
                <Td dataLabel={columnNames.lastCommit}>{repo.lastCommit}</Td>
              {/snippet}
            </Tr>
          {/each}
        {/snippet}
      </Tbody>
    {/snippet}
  </Table>
{:else if variant === 'striped'}
  <Table aria-label="Striped table example" isStriped>
    {#snippet children()}
      <Thead>
        {#snippet children()}
          <Tr>
            {#snippet children()}
              <Th>{columnNames.name}</Th>
              <Th>{columnNames.branches}</Th>
              <Th>{columnNames.prs}</Th>
              <Th>{columnNames.workspaces}</Th>
              <Th>{columnNames.lastCommit}</Th>
            {/snippet}
          </Tr>
        {/snippet}
      </Thead>
      <Tbody>
        {#snippet children()}
          {#each repositories as repo}
            <Tr>
              {#snippet children()}
                <Td dataLabel={columnNames.name}>{repo.name}</Td>
                <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
                <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
                <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
                <Td dataLabel={columnNames.lastCommit}>{repo.lastCommit}</Td>
              {/snippet}
            </Tr>
          {/each}
        {/snippet}
      </Tbody>
    {/snippet}
  </Table>
{:else if variant === 'bordered'}
  <Table aria-label="Bordered table example" isBordered>
    {#snippet children()}
      <Thead>
        {#snippet children()}
          <Tr>
            {#snippet children()}
              <Th>{columnNames.name}</Th>
              <Th>{columnNames.branches}</Th>
              <Th>{columnNames.prs}</Th>
              <Th>{columnNames.workspaces}</Th>
              <Th>{columnNames.lastCommit}</Th>
            {/snippet}
          </Tr>
        {/snippet}
      </Thead>
      <Tbody>
        {#snippet children()}
          {#each repositories as repo}
            <Tr>
              {#snippet children()}
                <Td dataLabel={columnNames.name}>{repo.name}</Td>
                <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
                <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
                <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
                <Td dataLabel={columnNames.lastCommit}>{repo.lastCommit}</Td>
              {/snippet}
            </Tr>
          {/each}
        {/snippet}
      </Tbody>
    {/snippet}
  </Table>
{:else if variant === 'sortable'}
  <Table aria-label="Sortable table example">
    {#snippet children()}
      <Thead>
        {#snippet children()}
          <Tr>
            {#snippet children()}
              <Th
                sort={{
                  sortBy: sortColumn === 0 ? sortDirection : 'none',
                  columnIndex: 0,
                  onSort: handleSort
                }}
              >
                {columnNames.name}
              </Th>
              <Th
                sort={{
                  sortBy: sortColumn === 1 ? sortDirection : 'none',
                  columnIndex: 1,
                  onSort: handleSort
                }}
              >
                {columnNames.branches}
              </Th>
              <Th>{columnNames.prs}</Th>
              <Th>{columnNames.workspaces}</Th>
              <Th>{columnNames.lastCommit}</Th>
            {/snippet}
          </Tr>
        {/snippet}
      </Thead>
      <Tbody>
        {#snippet children()}
          {#each repositories as repo}
            <Tr>
              {#snippet children()}
                <Td dataLabel={columnNames.name}>{repo.name}</Td>
                <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
                <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
                <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
                <Td dataLabel={columnNames.lastCommit}>{repo.lastCommit}</Td>
              {/snippet}
            </Tr>
          {/each}
        {/snippet}
      </Tbody>
    {/snippet}
  </Table>
{:else if variant === 'selectable'}
  <Table aria-label="Selectable table example">
    {#snippet children()}
      <Thead>
        {#snippet children()}
          <Tr>
            {#snippet children()}
              <Th></Th>
              <Th>{columnNames.name}</Th>
              <Th>{columnNames.branches}</Th>
              <Th>{columnNames.prs}</Th>
              <Th>{columnNames.workspaces}</Th>
              <Th>{columnNames.lastCommit}</Th>
            {/snippet}
          </Tr>
        {/snippet}
      </Thead>
      <Tbody>
        {#snippet children()}
          {#each repositories as repo, rowIndex}
            <Tr isSelected={selectedRows.has(rowIndex)}>
              {#snippet children()}
                <Td
                  select={{
                    isSelected: selectedRows.has(rowIndex),
                    onSelect: (event, isSelected) => handleSelectRow(rowIndex, isSelected),
                    rowIndex
                  }}
                />
                <Td dataLabel={columnNames.name}>{repo.name}</Td>
                <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
                <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
                <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
                <Td dataLabel={columnNames.lastCommit}>{repo.lastCommit}</Td>
              {/snippet}
            </Tr>
          {/each}
        {/snippet}
      </Tbody>
    {/snippet}
  </Table>
{:else if variant === 'expandable'}
  <Table aria-label="Expandable table example" isExpandable>
    {#snippet children()}
      <Thead>
        {#snippet children()}
          <Tr>
            {#snippet children()}
              <Th></Th>
              <Th>{columnNames.name}</Th>
              <Th>{columnNames.branches}</Th>
              <Th>{columnNames.prs}</Th>
              <Th>{columnNames.workspaces}</Th>
              <Th>{columnNames.lastCommit}</Th>
            {/snippet}
          </Tr>
        {/snippet}
      </Thead>
      <Tbody>
        {#snippet children()}
          {#each repositories as repo, rowIndex}
            <Tr isExpanded={expandedRows.has(rowIndex)}>
              {#snippet children()}
                <Td
                  expand={{
                    isExpanded: expandedRows.has(rowIndex),
                    onToggle: () => handleToggleExpand(rowIndex),
                    rowIndex
                  }}
                />
                <Td dataLabel={columnNames.name}>{repo.name}</Td>
                <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
                <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
                <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
                <Td dataLabel={columnNames.lastCommit}>{repo.lastCommit}</Td>
              {/snippet}
            </Tr>
            {#if expandedRows.has(rowIndex)}
              <Tr isExpandableRow>
                {#snippet children()}
                  <Td colSpan={6}>
                    <div style="padding: 1rem;">
                      Expanded content for {repo.name}. This is additional information about the repository.
                    </div>
                  </Td>
                {/snippet}
              </Tr>
            {/if}
          {/each}
        {/snippet}
      </Tbody>
    {/snippet}
  </Table>
{:else if variant === 'text-center'}
  <Table aria-label="Text center table example">
    {#snippet children()}
      <Thead>
        {#snippet children()}
          <Tr>
            {#snippet children()}
              <Th>{columnNames.name}</Th>
              <Th>{columnNames.branches}</Th>
              <Th>{columnNames.prs}</Th>
              <Th>{columnNames.workspaces}</Th>
              <Th textCenter>{columnNames.lastCommit}</Th>
            {/snippet}
          </Tr>
        {/snippet}
      </Thead>
      <Tbody>
        {#snippet children()}
          {#each repositories as repo}
            <Tr>
              {#snippet children()}
                <Td dataLabel={columnNames.name}>{repo.name}</Td>
                <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
                <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
                <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
                <Td dataLabel={columnNames.lastCommit} textCenter>{repo.lastCommit}</Td>
              {/snippet}
            </Tr>
          {/each}
        {/snippet}
      </Tbody>
    {/snippet}
  </Table>
{/if}
