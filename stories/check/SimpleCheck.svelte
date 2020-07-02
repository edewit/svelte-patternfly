<script>
  import { Checkbox } from 'svelte-patternfly';
</script>

<Checkbox
  label="Uncontrolled CheckBox"
  aria-label="uncontrolled checkbox example"
  id="check-5" />

<Checkbox
  id="check-7"
  label="Disabled CheckBox"
  aria-label="disabled checked checkbox example"
  defaultChecked
  isDisabled />

<Checkbox
  id="check-8"
  label="CheckBox with description"
  aria-label="Checkbox with description example"
  description="Description" />
