import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import Progress from './Progress.svelte';

describe('Progress', () => {
  it('should render with default class', () => {
    const { container } = render(Progress, { props: { value: 33 } });
    expect(container.querySelector('.pf-v6-c-progress')).toBeInTheDocument();
  });

  it('should render with title', () => {
    const { container } = render(Progress, { props: { value: 33, title: 'My Title' } });
    expect(container.querySelector('.pf-v6-c-progress__description')).toHaveTextContent('My Title');
  });

  it('should display percentage', () => {
    const { container } = render(Progress, { props: { value: 33, title: 'Title' } });
    expect(container.querySelector('.pf-v6-c-progress__measure')).toHaveTextContent('33%');
  });

  it('should display custom label instead of percentage', () => {
    const { container } = render(Progress, { props: { value: 2, label: '2 of 5', title: 'Title' } });
    expect(container.querySelector('.pf-v6-c-progress__measure')).toHaveTextContent('2 of 5');
  });

  it('should set correct width on indicator', () => {
    const { container } = render(Progress, { props: { value: 50, title: 'Title' } });
    const indicator = container.querySelector('.pf-v6-c-progress__indicator');
    expect(indicator).toHaveStyle('width: 50%');
  });

  it('should apply small size class', () => {
    const { container } = render(Progress, { props: { value: 33, size: 'sm' } });
    expect(container.querySelector('.pf-v6-c-progress')).toHaveClass('pf-m-sm');
  });

  it('should apply large size class', () => {
    const { container } = render(Progress, { props: { value: 33, size: 'lg' } });
    expect(container.querySelector('.pf-v6-c-progress')).toHaveClass('pf-m-lg');
  });

  it('should apply inside measure location class', () => {
    const { container } = render(Progress, { props: { value: 33, measureLocation: 'inside' } });
    expect(container.querySelector('.pf-v6-c-progress')).toHaveClass('pf-m-inside');
  });

  it('should apply outside measure location class', () => {
    const { container } = render(Progress, { props: { value: 33, measureLocation: 'outside' } });
    expect(container.querySelector('.pf-v6-c-progress')).toHaveClass('pf-m-outside');
  });

  it('should apply singleline class when measureLocation is none', () => {
    const { container } = render(Progress, { props: { value: 33, measureLocation: 'none' } });
    expect(container.querySelector('.pf-v6-c-progress')).toHaveClass('pf-m-singleline');
  });

  it('should apply success variant class', () => {
    const { container } = render(Progress, { props: { value: 100, variant: 'success' } });
    expect(container.querySelector('.pf-v6-c-progress')).toHaveClass('pf-m-success');
  });

  it('should apply warning variant class', () => {
    const { container } = render(Progress, { props: { value: 90, variant: 'warning' } });
    expect(container.querySelector('.pf-v6-c-progress')).toHaveClass('pf-m-warning');
  });

  it('should apply danger variant class', () => {
    const { container } = render(Progress, { props: { value: 33, variant: 'danger' } });
    expect(container.querySelector('.pf-v6-c-progress')).toHaveClass('pf-m-danger');
  });

  it('should apply truncate class when isTitleTruncated is true', () => {
    const { container } = render(Progress, { props: { value: 33, title: 'Long title', isTitleTruncated: true } });
    expect(container.querySelector('.pf-v6-c-progress')).toHaveClass('pf-m-truncate');
  });

  it('should render helper text', () => {
    const { container } = render(Progress, { props: { value: 33, helperText: 'Helper text content' } });
    expect(container.querySelector('.pf-v6-c-progress__helper-text')).toHaveTextContent('Helper text content');
  });

  it('should set aria attributes on progress bar', () => {
    const { container } = render(Progress, { props: { value: 33, min: 0, max: 100, title: 'Title', id: 'test-progress' } });
    const progressBar = container.querySelector('.pf-v6-c-progress__bar');
    expect(progressBar).toHaveAttribute('role', 'progressbar');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-valuenow', '33');
    expect(progressBar).toHaveAttribute('aria-labelledby', 'test-progress-description');
  });

  it('should calculate percentage based on min and max', () => {
    const { container } = render(Progress, { props: { value: 2, min: 0, max: 5, title: 'Title' } });
    const indicator = container.querySelector('.pf-v6-c-progress__indicator');
    // 2 out of 5 = 40%
    expect(indicator).toHaveStyle('width: 40%');
  });

  it('should clamp percentage between 0 and 100', () => {
    const { container } = render(Progress, { props: { value: 150, title: 'Title' } });
    const indicator = container.querySelector('.pf-v6-c-progress__indicator');
    expect(indicator).toHaveStyle('width: 100%');
  });

  it('should use custom id', () => {
    const { container } = render(Progress, { props: { value: 33, id: 'my-custom-id' } });
    expect(container.querySelector('#my-custom-id')).toBeInTheDocument();
  });

  it('should set OUIA attributes', () => {
    const { container } = render(Progress, { props: { value: 33, ouiaId: 'test-ouia-id', ouiaSafe: true } });
    const progressElement = container.querySelector('.pf-v6-c-progress');
    expect(progressElement).toHaveAttribute('data-ouia-component-type', 'PF6/Progress');
    expect(progressElement).toHaveAttribute('data-ouia-component-id', 'test-ouia-id');
    expect(progressElement).toHaveAttribute('data-ouia-safe', 'true');
  });

  it('should apply custom class', () => {
    const { container } = render(Progress, { props: { value: 33, class: 'custom-class' } });
    expect(container.querySelector('.pf-v6-c-progress')).toHaveClass('custom-class');
  });

  it('should render measure inside progress bar when measureLocation is inside', () => {
    const { container } = render(Progress, { props: { value: 33, measureLocation: 'inside' } });
    const indicator = container.querySelector('.pf-v6-c-progress__indicator');
    expect(indicator?.querySelector('.pf-v6-c-progress__measure')).toBeInTheDocument();
  });
});

