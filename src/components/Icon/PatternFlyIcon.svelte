<script lang="ts">
  import type { PatternFlyIconName } from './icons';
  import { getPficonClass } from './icons';

  interface Props {
    name: PatternFlyIconName;
    class?: string;
  }

  let { name, class: className = '' }: Props = $props();

  const iconClass = $derived(() => getPficonClass(name));
</script>

<i class="{iconClass()} {className}" aria-hidden="true"></i>


