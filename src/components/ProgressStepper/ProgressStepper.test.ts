import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import ProgressStepper from './ProgressStepper.svelte';
import ProgressStep from './ProgressStep.svelte';

describe('ProgressStepper', () => {
  it('should render with default class', () => {
    const { container } = render(ProgressStepper);
    expect(container.querySelector('.pf-v6-c-progress-stepper')).toBeInTheDocument();
  });

  it('should render as ordered list with role="list"', () => {
    const { container } = render(ProgressStepper);
    const ol = container.querySelector('ol.pf-v6-c-progress-stepper');
    expect(ol).toBeInTheDocument();
    expect(ol).toHaveAttribute('role', 'list');
  });

  it('should apply aria-label', () => {
    const { container } = render(ProgressStepper, { props: { 'aria-label': 'My stepper' } });
    expect(container.querySelector('.pf-v6-c-progress-stepper')).toHaveAttribute('aria-label', 'My stepper');
  });

  it('should apply vertical class', () => {
    const { container } = render(ProgressStepper, { props: { isVertical: true } });
    expect(container.querySelector('.pf-v6-c-progress-stepper')).toHaveClass('pf-m-vertical');
  });

  it('should apply compact class', () => {
    const { container } = render(ProgressStepper, { props: { isCompact: true } });
    expect(container.querySelector('.pf-v6-c-progress-stepper')).toHaveClass('pf-m-compact');
  });

  it('should apply center aligned class', () => {
    const { container } = render(ProgressStepper, { props: { isCenterAligned: true } });
    expect(container.querySelector('.pf-v6-c-progress-stepper')).toHaveClass('pf-m-center');
  });

  it('should apply custom class', () => {
    const { container } = render(ProgressStepper, { props: { class: 'custom-class' } });
    expect(container.querySelector('.pf-v6-c-progress-stepper')).toHaveClass('custom-class');
  });
});

describe('ProgressStep', () => {
  it('should render with default class', () => {
    const { container } = render(ProgressStep);
    expect(container.querySelector('.pf-v6-c-progress-stepper__step')).toBeInTheDocument();
  });

  it('should render as list item with role="listitem"', () => {
    const { container } = render(ProgressStep);
    const li = container.querySelector('li.pf-v6-c-progress-stepper__step');
    expect(li).toBeInTheDocument();
    expect(li).toHaveAttribute('role', 'listitem');
  });

  it('should apply success variant class', () => {
    const { container } = render(ProgressStep, { props: { variant: 'success' } });
    expect(container.querySelector('.pf-v6-c-progress-stepper__step')).toHaveClass('pf-m-success');
  });

  it('should apply info variant class', () => {
    const { container } = render(ProgressStep, { props: { variant: 'info' } });
    expect(container.querySelector('.pf-v6-c-progress-stepper__step')).toHaveClass('pf-m-info');
  });

  it('should apply pending variant class', () => {
    const { container } = render(ProgressStep, { props: { variant: 'pending' } });
    expect(container.querySelector('.pf-v6-c-progress-stepper__step')).toHaveClass('pf-m-pending');
  });

  it('should apply warning variant class', () => {
    const { container } = render(ProgressStep, { props: { variant: 'warning' } });
    expect(container.querySelector('.pf-v6-c-progress-stepper__step')).toHaveClass('pf-m-warning');
  });

  it('should apply danger variant class', () => {
    const { container } = render(ProgressStep, { props: { variant: 'danger' } });
    expect(container.querySelector('.pf-v6-c-progress-stepper__step')).toHaveClass('pf-m-danger');
  });

  it('should apply current class when isCurrent is true', () => {
    const { container } = render(ProgressStep, { props: { isCurrent: true } });
    expect(container.querySelector('.pf-v6-c-progress-stepper__step')).toHaveClass('pf-m-current');
  });

  it('should apply aria-label', () => {
    const { container } = render(ProgressStep, { props: { 'aria-label': 'Step description' } });
    expect(container.querySelector('.pf-v6-c-progress-stepper__step')).toHaveAttribute('aria-label', 'Step description');
  });

  it('should apply id', () => {
    const { container } = render(ProgressStep, { props: { id: 'my-step' } });
    expect(container.querySelector('#my-step')).toBeInTheDocument();
  });

  it('should apply titleId to title element', () => {
    const { container } = render(ProgressStep, { props: { titleId: 'my-title' } });
    expect(container.querySelector('#my-title')).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-progress-stepper__step-title')).toHaveAttribute('id', 'my-title');
  });

  it('should render description when provided', () => {
    const { container } = render(ProgressStep, { props: { description: 'Step description text' } });
    expect(container.querySelector('.pf-v6-c-progress-stepper__step-description')).toHaveTextContent('Step description text');
  });

  it('should render default icon for success variant', () => {
    const { container } = render(ProgressStep, { props: { variant: 'success' } });
    const icon = container.querySelector('.pf-v6-c-progress-stepper__step-icon i');
    expect(icon).toHaveClass('fas');
    expect(icon).toHaveClass('fa-check-circle');
  });

  it('should render default icon for info variant', () => {
    const { container } = render(ProgressStep, { props: { variant: 'info' } });
    const icon = container.querySelector('.pf-v6-c-progress-stepper__step-icon i');
    expect(icon).toHaveClass('pf-v6-pficon');
    expect(icon).toHaveClass('pf-v6-pficon-resources-full');
  });

  it('should render default icon for warning variant', () => {
    const { container } = render(ProgressStep, { props: { variant: 'warning' } });
    const icon = container.querySelector('.pf-v6-c-progress-stepper__step-icon i');
    expect(icon).toHaveClass('fas');
    expect(icon).toHaveClass('fa-exclamation-triangle');
  });

  it('should render default icon for danger variant', () => {
    const { container } = render(ProgressStep, { props: { variant: 'danger' } });
    const icon = container.querySelector('.pf-v6-c-progress-stepper__step-icon i');
    expect(icon).toHaveClass('fas');
    expect(icon).toHaveClass('fa-times-circle');
  });

  it('should not render icon for pending variant', () => {
    const { container } = render(ProgressStep, { props: { variant: 'pending' } });
    const icon = container.querySelector('.pf-v6-c-progress-stepper__step-icon i');
    expect(icon).not.toBeInTheDocument();
  });

  it('should apply custom class', () => {
    const { container } = render(ProgressStep, { props: { class: 'custom-step-class' } });
    expect(container.querySelector('.pf-v6-c-progress-stepper__step')).toHaveClass('custom-step-class');
  });
});

