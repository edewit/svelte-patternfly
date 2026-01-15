import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte/svelte5';
import Slider from './Slider.svelte';

describe('Slider', () => {
  it('renders a slider with correct class', () => {
    const { container } = render(Slider);
    const slider = container.querySelector('div.pf-v6-c-slider');
    expect(slider).toBeInTheDocument();
  });

  it('renders slider main structure', () => {
    const { container } = render(Slider);
    expect(container.querySelector('.pf-v6-c-slider__main')).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-slider__rail')).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-slider__rail-track')).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-slider__thumb')).toBeInTheDocument();
  });

  it('renders thumb with correct role and aria attributes', () => {
    const { container } = render(Slider, {
      value: 50,
      min: 0,
      max: 100,
      'aria-label': 'Test slider'
    });
    const thumb = container.querySelector('.pf-v6-c-slider__thumb');
    expect(thumb).toHaveAttribute('role', 'slider');
    expect(thumb).toHaveAttribute('aria-valuemin', '0');
    expect(thumb).toHaveAttribute('aria-valuemax', '100');
    expect(thumb).toHaveAttribute('aria-valuenow', '50');
    expect(thumb).toHaveAttribute('aria-label', 'Test slider');
    expect(thumb).toHaveAttribute('tabindex', '0');
  });

  it('applies value as CSS custom property', () => {
    const { container } = render(Slider, { value: 50 });
    const slider = container.querySelector('.pf-v6-c-slider');
    expect(slider?.getAttribute('style')).toContain('--pf-v6-c-slider--value: 50%');
  });

  it('applies disabled class and aria-disabled when isDisabled is true', () => {
    const { container } = render(Slider, { isDisabled: true });
    const slider = container.querySelector('.pf-v6-c-slider');
    const thumb = container.querySelector('.pf-v6-c-slider__thumb');
    expect(slider).toHaveClass('pf-m-disabled');
    expect(thumb).toHaveAttribute('aria-disabled', 'true');
    expect(thumb).toHaveAttribute('tabindex', '-1');
  });

  it('renders custom steps when provided', () => {
    const { container } = render(Slider, {
      value: 50,
      customSteps: [
        { value: 0, label: '0%' },
        { value: 50, label: '50%' },
        { value: 100, label: '100%' }
      ]
    });
    const steps = container.querySelector('.pf-v6-c-slider__steps');
    expect(steps).toBeInTheDocument();
    const stepElements = container.querySelectorAll('.pf-v6-c-slider__step');
    expect(stepElements.length).toBe(3);
    const labels = container.querySelectorAll('.pf-v6-c-slider__step-label');
    expect(labels.length).toBe(3);
    expect(labels[0].textContent).toBe('0%');
    expect(labels[1].textContent).toBe('50%');
    expect(labels[2].textContent).toBe('100%');
  });

  it('marks steps as active when below current value', () => {
    const { container } = render(Slider, {
      value: 50,
      customSteps: [
        { value: 0, label: '0%' },
        { value: 50, label: '50%' },
        { value: 100, label: '100%' }
      ]
    });
    const stepElements = container.querySelectorAll('.pf-v6-c-slider__step');
    expect(stepElements[0]).toHaveClass('pf-m-active');
    expect(stepElements[1]).toHaveClass('pf-m-active');
    expect(stepElements[2]).not.toHaveClass('pf-m-active');
  });

  it('renders input when isInputVisible is true', () => {
    const { container } = render(Slider, {
      value: 50,
      isInputVisible: true
    });
    const input = container.querySelector('input[type="number"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(50);
  });

  it('renders input in end position by default', () => {
    const { container } = render(Slider, {
      isInputVisible: true
    });
    const valueContainer = container.querySelector('.pf-v6-c-slider__value');
    expect(valueContainer).toBeInTheDocument();
    expect(valueContainer).not.toHaveClass('pf-m-floating');
  });

  it('renders input above thumb when inputPosition is aboveThumb', () => {
    const { container } = render(Slider, {
      isInputVisible: true,
      inputPosition: 'aboveThumb'
    });
    const valueContainer = container.querySelector('.pf-v6-c-slider__value');
    expect(valueContainer).toHaveClass('pf-m-floating');
  });

  it('applies custom class', () => {
    const { container } = render(Slider, { class: 'custom-class' });
    const slider = container.querySelector('.pf-v6-c-slider');
    expect(slider).toHaveClass('custom-class');
  });

  it('handles keyboard navigation - ArrowRight increases value', async () => {
    const onChange = vi.fn();
    const { container } = render(Slider, {
      value: 50,
      step: 10,
      onChange
    });
    const thumb = container.querySelector('.pf-v6-c-slider__thumb');
    await fireEvent.keyDown(thumb!, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(expect.any(KeyboardEvent), 60);
  });

  it('handles keyboard navigation - ArrowLeft decreases value', async () => {
    const onChange = vi.fn();
    const { container } = render(Slider, {
      value: 50,
      step: 10,
      onChange
    });
    const thumb = container.querySelector('.pf-v6-c-slider__thumb');
    await fireEvent.keyDown(thumb!, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(expect.any(KeyboardEvent), 40);
  });

  it('handles keyboard navigation - Home sets to min', async () => {
    const onChange = vi.fn();
    const { container } = render(Slider, {
      value: 50,
      min: 0,
      onChange
    });
    const thumb = container.querySelector('.pf-v6-c-slider__thumb');
    await fireEvent.keyDown(thumb!, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith(expect.any(KeyboardEvent), 0);
  });

  it('handles keyboard navigation - End sets to max', async () => {
    const onChange = vi.fn();
    const { container } = render(Slider, {
      value: 50,
      max: 100,
      onChange
    });
    const thumb = container.querySelector('.pf-v6-c-slider__thumb');
    await fireEvent.keyDown(thumb!, { key: 'End' });
    expect(onChange).toHaveBeenCalledWith(expect.any(KeyboardEvent), 100);
  });

  it('does not respond to keyboard when disabled', async () => {
    const onChange = vi.fn();
    const { container } = render(Slider, {
      value: 50,
      isDisabled: true,
      onChange
    });
    const thumb = container.querySelector('.pf-v6-c-slider__thumb');
    await fireEvent.keyDown(thumb!, { key: 'ArrowRight' });
    expect(onChange).not.toHaveBeenCalled();
  });
});
