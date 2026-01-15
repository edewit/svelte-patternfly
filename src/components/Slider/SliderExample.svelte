<script lang="ts">
  import Slider from './Slider.svelte';

  interface Props {
    variant?: string;
  }

  let { variant = 'continuous' }: Props = $props();

  let continuousValue = $state(50);
  let discreteValue = $state(50);
  let customStepsValue = $state(50);
  let inputValue = $state(50);
  let disabledValue = $state(50);
</script>

{#if variant === 'continuous'}
  <div>
    <p>Slider Value is: {continuousValue}</p>
    <Slider
      bind:value={continuousValue}
      aria-label="Continuous slider"
    />
  </div>
{:else if variant === 'continuous-with-tooltip'}
  <div>
    <p>Slider Value is: {continuousValue}</p>
    <Slider
      bind:value={continuousValue}
      hasTooltipOverThumb={true}
      aria-label="Continuous slider with tooltip"
    />
  </div>
{:else if variant === 'discrete'}
  <div>
    <p>Slider Value is: {discreteValue}</p>
    <Slider
      bind:value={discreteValue}
      min={0}
      max={100}
      step={25}
      customSteps={[
        { value: 0, label: '0' },
        { value: 25, label: '25' },
        { value: 50, label: '50' },
        { value: 75, label: '75' },
        { value: 100, label: '100' }
      ]}
      aria-label="Discrete slider"
    />
  </div>
{:else if variant === 'custom-steps'}
  <div>
    <p>Slider value is: {customStepsValue}</p>
    <Slider
      bind:value={customStepsValue}
      areCustomStepsContinuous={true}
      customSteps={[
        { value: 0, label: '0%' },
        { value: 100, label: '100%' }
      ]}
      aria-label="Custom steps slider"
    />
  </div>
{:else if variant === 'with-input'}
  <div>
    <p>Slider Value is: {inputValue}</p>
    <Slider
      bind:value={inputValue}
      isInputVisible={true}
      inputLabel="Slider value"
      aria-label="Slider with input"
    />
  </div>
{:else if variant === 'with-input-above-thumb'}
  <div>
    <p>Slider Value is: {inputValue}</p>
    <Slider
      bind:value={inputValue}
      isInputVisible={true}
      inputPosition="aboveThumb"
      inputLabel="Slider value"
      aria-label="Slider with input above thumb"
    />
  </div>
{:else if variant === 'disabled'}
  <div>
    <p>Slider Value is: {disabledValue}</p>
    <Slider
      bind:value={disabledValue}
      isDisabled={true}
      aria-label="Disabled slider"
    />
  </div>
{:else if variant === 'with-steps'}
  <div>
    <p>Slider Value is: {discreteValue}</p>
    <Slider
      bind:value={discreteValue}
      min={0}
      max={8}
      step={1}
      customSteps={[
        { value: 0, label: '0' },
        { value: 1 },
        { value: 2, label: '2' },
        { value: 3 },
        { value: 4, label: '4' },
        { value: 5 },
        { value: 6, label: '6' },
        { value: 7 },
        { value: 8, label: '8' }
      ]}
      aria-label="Slider with steps"
    />
  </div>
{/if}
