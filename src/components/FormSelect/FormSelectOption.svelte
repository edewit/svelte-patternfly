<script lang="ts">
  import type { FormSelectOptionProps } from './types';

  interface Props extends FormSelectOptionProps {}

  let {
    label,
    className = '',
    isDisabled = false,
    isPlaceholder: _isPlaceholder = false,
    value = '',
    ...restProps
  }: Props = $props();
</script>

<option class={className} {value} disabled={isDisabled} {...restProps}>
  {label}
</option>
