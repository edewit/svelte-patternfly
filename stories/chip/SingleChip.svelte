<script>
  import { Badge, Chip } from 'svelte-patternfly';

  let chips = {
    chip: {
      name: 'Chip 1'
    },
    longchip: {
      name: 'Really long Chip that goes on and on'
    },
    badgechip: {
      name: 'Chip',
      isRead: true,
      count: 7
    },
    readonlychip: {
      name: 'Read-only Chip'
    },
    overflowchip: {
      name: 'Overflow Chip'
    }
  };

  let deleteItem = id => {
    chips[id] = null;
  };
</script>

{#if chips.chip}
  <Chip key="chip1" on:click={() => deleteItem('chip')}>{chips.chip.name}</Chip>
  <br />
  <br />
{/if}

{#if chips.longchip}
  <Chip key="chip2" on:click={() => deleteItem('longchip')}>
    {chips.longchip.name}
  </Chip>
  <br />
  <br />
{/if}

{#if chips.badgechip}
  <Chip key="chip3" on:click={() => deleteItem('badgechip')}>
    {chips.badgechip.name}
    <Badge isRead={chips.badgechip.isRead}>{chips.badgechip.count}</Badge>
  </Chip>
  <br />
  <br />
{/if}

<Chip key="chip4" on:click={() => deleteItem('readonlychip')} isReadOnly>
  {chips.readonlychip.name}
</Chip>

{#if chips.overflowchip}
  <Chip
    key="chip5"
    component="button"
    onClick={() => deleteItem('overflowchip')}
    isOverflowChip>
    {chips.overflowchip.name}
  </Chip>
{/if}
