import { fireEvent, render } from '@testing-library/svelte/svelte5';
import { describe, expect, it, vi } from 'vitest';
import Popover from './Popover.svelte';

describe('Popover', () => {
  it('renders the popover when isVisible is true', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content'
    });
    const popover = container.querySelector('.pf-v6-c-popover');
    expect(popover).toBeInTheDocument();
  });

  it('does not render when isVisible is false', () => {
    const { container } = render(Popover, {
      isVisible: false,
      bodyContent: 'Test content'
    });
    const popover = container.querySelector('.pf-v6-c-popover');
    expect(popover).not.toBeInTheDocument();
  });

  it('renders body content', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test body content'
    });
    const body = container.querySelector('.pf-v6-c-popover__body');
    expect(body).toBeInTheDocument();
    expect(body?.textContent).toBe('Test body content');
  });

  it('renders header content when provided', () => {
    const { container } = render(Popover, {
      isVisible: true,
      headerContent: 'Test header',
      bodyContent: 'Test body'
    });
    const header = container.querySelector('.pf-v6-c-popover__header');
    expect(header).toBeInTheDocument();
    const title = container.querySelector('.pf-v6-c-popover__title-text');
    expect(title?.textContent).toBe('Test header');
  });

  it('renders footer content when provided', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test body',
      footerContent: 'Test footer'
    });
    const footer = container.querySelector('.pf-v6-c-popover__footer');
    expect(footer).toBeInTheDocument();
    expect(footer?.textContent).toBe('Test footer');
  });

  it('renders close button when showClose is true', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content',
      showClose: true
    });
    const closeButton = container.querySelector('.pf-v6-c-popover__close button');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-label', 'Close');
  });

  it('does not render close button when showClose is false', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content',
      showClose: false
    });
    const closeButton = container.querySelector('.pf-v6-c-popover__close');
    expect(closeButton).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content',
      showClose: true,
      onClose
    });
    const closeButton = container.querySelector(
      '.pf-v6-c-popover__close button'
    ) as HTMLButtonElement;
    await fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies position classes correctly', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content',
      position: 'bottom'
    });
    const popover = container.querySelector('.pf-v6-c-popover');
    expect(popover).toHaveClass('pf-m-bottom');
  });

  it('applies no-padding class when hasNoPadding is true', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content',
      hasNoPadding: true
    });
    const popover = container.querySelector('.pf-v6-c-popover');
    expect(popover).toHaveClass('pf-m-no-padding');
  });

  it('applies width-auto class when width is auto', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content',
      width: 'auto'
    });
    const popover = container.querySelector('.pf-v6-c-popover');
    expect(popover).toHaveClass('pf-m-width-auto');
  });

  it('applies custom width styles', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content',
      width: '300px'
    });
    const popover = container.querySelector('.pf-v6-c-popover') as HTMLElement;
    expect(popover?.style.width).toBe('300px');
  });

  it('has role="dialog" attribute', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content'
    });
    const popover = container.querySelector('.pf-v6-c-popover');
    expect(popover).toHaveAttribute('role', 'dialog');
  });

  it('has aria-modal="true" by default', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content'
    });
    const popover = container.querySelector('.pf-v6-c-popover');
    expect(popover).toHaveAttribute('aria-modal', 'true');
  });

  it('can set aria-modal to false', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content',
      ariaModal: false
    });
    const popover = container.querySelector('.pf-v6-c-popover');
    expect(popover).toHaveAttribute('aria-modal', 'false');
  });

  it('has aria-labelledby when headerContent is provided', () => {
    const { container } = render(Popover, {
      isVisible: true,
      id: 'test-popover',
      headerContent: 'Test header',
      bodyContent: 'Test body'
    });
    const popover = container.querySelector('.pf-v6-c-popover');
    expect(popover).toHaveAttribute('aria-labelledby', 'test-popover-header');
  });

  it('has aria-describedby when bodyContent is provided', () => {
    const { container } = render(Popover, {
      isVisible: true,
      id: 'test-popover',
      bodyContent: 'Test body'
    });
    const popover = container.querySelector('.pf-v6-c-popover');
    expect(popover).toHaveAttribute('aria-describedby', 'test-popover-body');
  });

  it('renders arrow element', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content'
    });
    const arrow = container.querySelector('.pf-v6-c-popover__arrow');
    expect(arrow).toBeInTheDocument();
  });

  it('renders arrow before content', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content'
    });
    const popover = container.querySelector('.pf-v6-c-popover');
    const arrow = popover?.querySelector('.pf-v6-c-popover__arrow');
    const content = popover?.querySelector('.pf-v6-c-popover__content');
    expect(popover?.children[0]).toBe(arrow);
    expect(popover?.children[1]).toBe(content);
  });

  it('generates unique ID when not provided', () => {
    const { container } = render(Popover, {
      isVisible: true,
      bodyContent: 'Test content'
    });
    const popover = container.querySelector('.pf-v6-c-popover') as HTMLElement;
    expect(popover?.id).toBeTruthy();
    expect(popover?.id).toMatch(/^popover-/);
  });

  it('uses provided ID', () => {
    const { container } = render(Popover, {
      isVisible: true,
      id: 'custom-popover-id',
      bodyContent: 'Test content'
    });
    const popover = container.querySelector('.pf-v6-c-popover');
    expect(popover).toHaveAttribute('id', 'custom-popover-id');
  });
});
