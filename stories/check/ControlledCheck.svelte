<script>
  import { Checkbox } from 'svelte-patternfly';

  let checks = {
    check1: false,
    check2: false,
    check3: false,
    check4: false
  };

  function handleChange(event) {
    checks[event.target.name] = event.target.checked;
    if (event.target.name === 'check1') {
      checks.check2 = checks.check1;
      checks.check3 = checks.check1;
    }
    checks.check1 = (checks.check2 && checks.check3) || (checks.check2 || checks.check3 ? null : false);
  }
</script>

<Checkbox
  label="Parent CheckBox"
  isChecked={checks.check1}
  on:change={event => handleChange(event)}
  aria-label="controlled checkbox example"
  id="check-1"
  name="check1" />
<Checkbox
  class="nested"
  label="Child CheckBox 1"
  isChecked={checks.check2}
  on:change={event => handleChange(event)}
  aria-label="controlled checkbox example"
  id="check-2"
  name="check2" />
<Checkbox
  class="nested"
  label="Child CheckBox 2"
  isChecked={checks.check3}
  on:change={event => handleChange(event)}
  aria-label="controlled checkbox example"
  id="check-3"
  name="check3" />
<Checkbox
  label="Controlled CheckBox"
  isChecked={checks.check4}
  on:change={event => handleChange(event)}
  aria-label="controlled checkbox example"
  id="check-4"
  name="check4" />
