<script lang="ts">
  import type { SliderProps, SliderStepObject, SliderOnChangeHandler } from './types';
  import '@patternfly/patternfly/components/Slider/slider.css';
  import '@patternfly/patternfly/components/Tooltip/tooltip.css';

  interface Props extends SliderProps {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    isInputVisible?: boolean;
    inputWidth?: number | string;
    inputLabel?: string;
    inputPosition?: 'aboveThumb' | 'end';
    isDisabled?: boolean;
    hasTooltipOverThumb?: boolean;
    customSteps?: SliderStepObject[];
    areCustomStepsContinuous?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    onChange?: SliderOnChangeHandler;
    leftActions?: import('svelte').Snippet;
    rightActions?: import('svelte').Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    isInputVisible = false,
    inputWidth,
    inputLabel,
    inputPosition = 'end',
    isDisabled = false,
    hasTooltipOverThumb = false,
    customSteps,
    areCustomStepsContinuous = false,
    'aria-label': ariaLabel = 'Value',
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    onChange,
    leftActions,
    rightActions,
    class: className = '',
    ...restProps
  }: Props = $props();

  let thumbElement: HTMLDivElement | null = $state(null);
  let sliderRailElement: HTMLDivElement | null = $state(null);
  let isDragging = $state(false);
  let showTooltip = $state(false);

  // Calculate effective min/max from custom steps if provided
  const effectiveMin = $derived(
    customSteps && customSteps.length > 0
      ? Math.min(...customSteps.map((s) => s.value))
      : min
  );

  const effectiveMax = $derived(
    customSteps && customSteps.length > 0
      ? Math.max(...customSteps.map((s) => s.value))
      : max
  );

  // Calculate percentage for current value
  const percentage = $derived(() => {
    const range = effectiveMax - effectiveMin;
    if (range === 0) return 0;
    return ((value - effectiveMin) / range) * 100;
  });

  // Generate steps for display
  const displaySteps = $derived(() => {
    if (customSteps && customSteps.length > 0) {
      return customSteps.map((s) => ({
        value: s.value,
        label: s.label,
        isLabelHidden: s.isLabelHidden,
        percentage: ((s.value - effectiveMin) / (effectiveMax - effectiveMin)) * 100
      }));
    }
    return null;
  });

  // Build CSS classes
  const classes = $derived(
    ['pf-v6-c-slider', isDisabled && 'pf-m-disabled', className].filter(Boolean).join(' ')
  );

  // Build inline styles
  const sliderStyles = $derived(`--pf-v6-c-slider--value: ${percentage()}%;`);

  // Input styles
  const inputStyles = $derived(
    inputWidth ? `width: ${typeof inputWidth === 'number' ? `${inputWidth}px` : inputWidth};` : ''
  );

  // Snap value to nearest step
  function snapToStep(val: number): number {
    if (customSteps && customSteps.length > 0 && !areCustomStepsContinuous) {
      // Find nearest custom step
      let nearest = customSteps[0].value;
      let minDiff = Math.abs(val - nearest);
      for (const s of customSteps) {
        const diff = Math.abs(val - s.value);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = s.value;
        }
      }
      return nearest;
    }
    // Snap to regular step
    const steppedValue = Math.round((val - effectiveMin) / step) * step + effectiveMin;
    return Math.max(effectiveMin, Math.min(effectiveMax, steppedValue));
  }

  // Update value from percentage
  function updateValueFromPercentage(pct: number, event: Event) {
    const range = effectiveMax - effectiveMin;
    let newValue = effectiveMin + (pct / 100) * range;
    newValue = snapToStep(newValue);
    newValue = Math.max(effectiveMin, Math.min(effectiveMax, newValue));

    if (newValue !== value) {
      value = newValue;
      onChange?.(event, newValue);
    }
  }

  // Handle mouse/touch events on rail
  function handleRailClick(event: MouseEvent) {
    if (isDisabled || !sliderRailElement) return;

    const rect = sliderRailElement.getBoundingClientRect();
    const pct = ((event.clientX - rect.left) / rect.width) * 100;
    updateValueFromPercentage(pct, event);
  }

  // Handle thumb drag start
  function handleThumbMouseDown(event: MouseEvent) {
    if (isDisabled) return;
    event.preventDefault();
    isDragging = true;
    showTooltip = hasTooltipOverThumb;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isDragging || !sliderRailElement) return;

    const rect = sliderRailElement.getBoundingClientRect();
    let pct = ((event.clientX - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    updateValueFromPercentage(pct, event);
  }

  function handleMouseUp(event: MouseEvent) {
    isDragging = false;
    showTooltip = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  // Handle keyboard navigation
  function handleKeyDown(event: KeyboardEvent) {
    if (isDisabled) return;

    let newValue = value;
    const stepSize = customSteps && !areCustomStepsContinuous ? 1 : step;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        if (customSteps && !areCustomStepsContinuous) {
          // Move to next custom step
          const sortedSteps = [...customSteps].sort((a, b) => a.value - b.value);
          const currentIndex = sortedSteps.findIndex((s) => s.value === value);
          if (currentIndex < sortedSteps.length - 1) {
            newValue = sortedSteps[currentIndex + 1].value;
          }
        } else {
          newValue = Math.min(effectiveMax, value + stepSize);
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        if (customSteps && !areCustomStepsContinuous) {
          // Move to previous custom step
          const sortedSteps = [...customSteps].sort((a, b) => a.value - b.value);
          const currentIndex = sortedSteps.findIndex((s) => s.value === value);
          if (currentIndex > 0) {
            newValue = sortedSteps[currentIndex - 1].value;
          }
        } else {
          newValue = Math.max(effectiveMin, value - stepSize);
        }
        break;
      case 'Home':
        event.preventDefault();
        newValue = effectiveMin;
        break;
      case 'End':
        event.preventDefault();
        newValue = effectiveMax;
        break;
      default:
        return;
    }

    if (newValue !== value) {
      value = newValue;
      onChange?.(event, newValue);
    }
  }

  // Handle input change
  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    let newValue = parseFloat(target.value);

    if (isNaN(newValue)) return;

    newValue = snapToStep(newValue);
    newValue = Math.max(effectiveMin, Math.min(effectiveMax, newValue));

    if (newValue !== value) {
      value = newValue;
      onChange?.(event, newValue);
    }
  }

  // Handle thumb focus/blur for tooltip
  function handleThumbFocus() {
    if (hasTooltipOverThumb) {
      showTooltip = true;
    }
  }

  function handleThumbBlur() {
    if (!isDragging) {
      showTooltip = false;
    }
  }

  // Handle thumb hover
  function handleThumbMouseEnter() {
    if (hasTooltipOverThumb && !isDragging) {
      showTooltip = true;
    }
  }

  function handleThumbMouseLeave() {
    if (!isDragging) {
      showTooltip = false;
    }
  }
</script>

<div class={classes} style={sliderStyles} {...restProps}>
  {#if leftActions}
    <div class="pf-v6-c-slider__actions">
      {@render leftActions()}
    </div>
  {/if}

  <div class="pf-v6-c-slider__main">
    <div
      class="pf-v6-c-slider__rail"
      bind:this={sliderRailElement}
      onclick={handleRailClick}
      role="presentation"
    >
      <div class="pf-v6-c-slider__rail-track"></div>
    </div>

    {#if displaySteps()}
      <div class="pf-v6-c-slider__steps" aria-hidden="true">
        {#each displaySteps()! as stepItem}
          <div
            class="pf-v6-c-slider__step{stepItem.percentage <= percentage() ? ' pf-m-active' : ''}"
            style="--pf-v6-c-slider__step--InsetInlineStart: {stepItem.percentage}%;"
          >
            <div class="pf-v6-c-slider__step-tick"></div>
            {#if stepItem.label && !stepItem.isLabelHidden}
              <div class="pf-v6-c-slider__step-label">{stepItem.label}</div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}

    {#if isInputVisible && inputPosition === 'aboveThumb'}
      <div class="pf-v6-c-slider__value pf-m-floating">
        <div class="pf-v6-c-input-group">
          <div class="pf-v6-c-input-group__item">
            <input
              class="pf-v6-c-form-control"
              type="number"
              value={value}
              {min}
              {max}
              {step}
              aria-label={inputLabel || ariaLabel}
              disabled={isDisabled}
              style={inputStyles}
              onchange={handleInputChange}
            />
          </div>
        </div>
      </div>
    {/if}

    <div
      class="pf-v6-c-slider__thumb"
      role="slider"
      aria-valuemin={effectiveMin}
      aria-valuemax={effectiveMax}
      aria-valuenow={value}
      aria-label={ariaLabelledby ? undefined : ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-disabled={isDisabled ? 'true' : undefined}
      tabindex={isDisabled ? -1 : 0}
      bind:this={thumbElement}
      onmousedown={handleThumbMouseDown}
      onkeydown={handleKeyDown}
      onfocus={handleThumbFocus}
      onblur={handleThumbBlur}
      onmouseenter={handleThumbMouseEnter}
      onmouseleave={handleThumbMouseLeave}
    >
      {#if hasTooltipOverThumb && showTooltip}
        <div class="pf-v6-c-tooltip pf-m-top" role="tooltip" style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px; white-space: nowrap;">
          <div class="pf-v6-c-tooltip__arrow"></div>
          <div class="pf-v6-c-tooltip__content">{value}</div>
        </div>
      {/if}
    </div>
  </div>

  {#if isInputVisible && inputPosition === 'end'}
    <div class="pf-v6-c-slider__value">
      <div class="pf-v6-c-input-group">
        <div class="pf-v6-c-input-group__item">
          <input
            class="pf-v6-c-form-control"
            type="number"
            value={value}
            min={effectiveMin}
            max={effectiveMax}
            {step}
            aria-label={inputLabel || ariaLabel}
            disabled={isDisabled}
            style={inputStyles}
            onchange={handleInputChange}
          />
        </div>
      </div>
    </div>
  {/if}

  {#if rightActions}
    <div class="pf-v6-c-slider__actions">
      {@render rightActions()}
    </div>
  {/if}
</div>
