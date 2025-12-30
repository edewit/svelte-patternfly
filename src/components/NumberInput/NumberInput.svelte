<script lang="ts">
  import type { NumberInputProps } from './types';
  import Button from '../Button/Button.svelte';
  import InputGroup from '../InputGroup/InputGroup.svelte';
  import InputGroupItem from '../InputGroup/InputGroupItem.svelte';
  import InputGroupText from '../InputGroup/InputGroupText.svelte';
  import PlusIcon from '../Icon/icons/PlusIcon.svelte';
  import MinusIcon from '../Icon/icons/MinusIcon.svelte';
  import '@patternfly/patternfly/components/NumberInput/number-input.css';
  import '@patternfly/patternfly/components/FormControl/form-control.css';

  interface Props extends NumberInputProps {
    children?: import('svelte').Snippet;
  }

  let {
    className = '',
    class: classProp = '',
    inputAriaLabel = 'Input',
    inputName,
    inputProps = {},
    isDisabled = false,
    max,
    min,
    minusBtnAriaLabel = 'Minus',
    minusBtnProps = {},
    onBlur,
    onChange,
    onMinus,
    onPlus,
    plusBtnAriaLabel = 'Plus',
    plusBtnProps = {},
    unit,
    unitPosition = 'after',
    validated = 'default',
    value: valueProp = '',
    widthChars,
    ...restProps
  }: Props = $props();

  // Internal value state - initialize from prop
  let internalValue = $state(valueProp !== undefined ? String(valueProp) : '');

  // Sync with prop value
  $effect(() => {
    if (valueProp !== undefined) {
      const newValue = valueProp === '' ? '' : String(valueProp);
      if (newValue !== internalValue) {
        internalValue = newValue;
      }
    } else {
      if (internalValue !== '') {
        internalValue = '';
      }
    }
  });

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-number-input', className || classProp].filter(Boolean).join(' ')
  );

  // Determine if minus button should be disabled
  const isMinusDisabled = $derived(
    isDisabled || (min !== undefined && (Number(internalValue) || 0) <= min)
  );

  // Determine if plus button should be disabled
  const isPlusDisabled = $derived(
    isDisabled || (max !== undefined && (Number(internalValue) || 0) >= max)
  );

  // Build form control classes
  const formControlClasses = $derived(
    [
      'pf-v6-c-form-control',
      validated === 'success' && 'pf-m-success',
      validated === 'warning' && 'pf-m-warning',
      validated === 'error' && 'pf-m-error',
      validated !== 'default' && 'pf-m-icon'
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Determine aria-invalid based on validated prop
  const ariaInvalid = $derived(
    validated === 'error'
      ? 'true'
      : validated === 'success' || validated === 'warning'
        ? 'false'
        : undefined
  );

  // Handle input change
  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    internalValue = newValue;
    onChange?.(event);
  }

  // Handle input blur
  function handleBlur(event: Event) {
    onBlur?.(event);
  }

  // Handle minus button click
  function handleMinus(event: MouseEvent) {
    if (isMinusDisabled) {
      return;
    }
    if (onMinus) {
      onMinus(event, inputName);
    }
  }

  // Handle plus button click
  function handlePlus(event: MouseEvent) {
    if (isPlusDisabled) {
      return;
    }
    if (onPlus) {
      onPlus(event, inputName);
    }
  }

  // Calculate input width style
  const inputStyle = $derived(
    widthChars ? `width: calc(calc(1rem * 2 + 1px * 2) + ${widthChars} * 1ch + 2rem);` : undefined
  );

  // Determine if unit is a string or snippet
  const unitIsString = $derived(typeof unit === 'string');
  const unitIsSnippet = $derived(!!unit && typeof unit !== 'string');
</script>

<div class={classes} {...restProps}>
  <InputGroup>
    {#if unit && unitPosition === 'before'}
      <InputGroupItem isFill={false}>
        <InputGroupText>
          {#if unitIsString}
            {unit}
          {:else if unitIsSnippet}
            {@render unit()}
          {/if}
        </InputGroupText>
      </InputGroupItem>
    {/if}

    <InputGroupItem>
      <Button
        variant="control"
        type="button"
        aria-label={minusBtnAriaLabel}
        isDisabled={isMinusDisabled}
        onclick={handleMinus}
        {...minusBtnProps}
      >
        <span class="pf-v6-c-button__icon">
          <span class="pf-v6-c-number-input__icon">
            <MinusIcon />
          </span>
        </span>
      </Button>
    </InputGroupItem>

    <InputGroupItem isFill={true}>
      <span class={formControlClasses} style={inputStyle}>
        <input
          type="number"
          name={inputName}
          aria-label={inputAriaLabel}
          aria-invalid={ariaInvalid}
          value={internalValue}
          disabled={isDisabled}
          min={min}
          max={max}
          oninput={handleChange}
          onblur={handleBlur}
          {...inputProps}
        />
      </span>
    </InputGroupItem>

    <InputGroupItem>
      <Button
        variant="control"
        type="button"
        aria-label={plusBtnAriaLabel}
        isDisabled={isPlusDisabled}
        onclick={handlePlus}
        {...plusBtnProps}
      >
        <span class="pf-v6-c-button__icon">
          <span class="pf-v6-c-number-input__icon">
            <PlusIcon />
          </span>
        </span>
      </Button>
    </InputGroupItem>

    {#if unit && unitPosition === 'after'}
      <InputGroupItem isFill={false}>
        <InputGroupText>
          {#if unitIsString}
            {unit}
          {:else if unitIsSnippet}
            {@render unit()}
          {/if}
        </InputGroupText>
      </InputGroupItem>
    {/if}
  </InputGroup>
</div>

