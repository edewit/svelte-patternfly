<script lang="ts">
  import Icon from './Icon.svelte';
  import LongArrowAltDownIcon from './icons/LongArrowAltDownIcon.svelte';
  import AngleRightIcon from './icons/AngleRightIcon.svelte';
  import AngleDownIcon from './icons/AngleDownIcon.svelte';
  import CogIcon from './icons/CogIcon.svelte';
</script>

<!-- Basic usage with icon components -->
<Icon>
  <LongArrowAltDownIcon />
</Icon>
{' '}
<Icon>
  <AngleRightIcon />
</Icon>
{' '}
<Icon>
  <AngleDownIcon />
</Icon>
{' '}
<Icon>
  <CogIcon />
</Icon>

<!-- Usage with icon class strings -->
<Icon icon="fas fa-long-arrow-alt-down" />
{' '}
<Icon icon="fas fa-angle-right" />
{' '}
<Icon icon="fas fa-angle-down" />
{' '}
<Icon icon="fas fa-cog" />


