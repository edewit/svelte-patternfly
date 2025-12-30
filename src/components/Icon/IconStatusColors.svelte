<script lang="ts">
  import Icon from './Icon.svelte';
  import CheckCircleIcon from './icons/CheckCircleIcon.svelte';
  import ExclamationCircleIcon from './icons/ExclamationCircleIcon.svelte';
  import ExclamationTriangleIcon from './icons/ExclamationTriangleIcon.svelte';
  import InfoCircleIcon from './icons/InfoCircleIcon.svelte';
</script>

<Icon status="success">
  <CheckCircleIcon />
</Icon>
{' '}
<Icon status="danger">
  <ExclamationCircleIcon />
</Icon>
{' '}
<Icon status="warning">
  <ExclamationTriangleIcon />
</Icon>
{' '}
<Icon status="info">
  <InfoCircleIcon />
</Icon>


