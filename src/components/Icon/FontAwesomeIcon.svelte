<script lang="ts">
  import type { FontAwesomeIconName, FontAwesomeRegularIconName } from './icons';
  import { getFasIconClass, getFarIconClass } from './icons';

  interface Props {
    name: FontAwesomeIconName | FontAwesomeRegularIconName;
    style?: 'solid' | 'regular';
    class?: string;
  }

  let { name, style = 'solid', class: className = '' }: Props = $props();

  const iconClass = $derived(() => {
    if (style === 'regular') {
      return getFarIconClass(name as FontAwesomeRegularIconName);
    }
    return getFasIconClass(name as FontAwesomeIconName);
  });
</script>

<i class="{iconClass()} {className}" aria-hidden="true"></i>


