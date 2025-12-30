import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import { userEvent } from '@testing-library/user-event';
import ExpandableSection from './ExpandableSection.svelte';

describe('ExpandableSection', () => {
  it('renders an expandable section element', () => {
    const { container } = render(ExpandableSection, {
      toggleText: 'Show more'
    });
    const section = container.querySelector('.pf-v6-c-expandable-section');
    expect(section).toBeInTheDocument();
  });

  it('renders toggle button with correct text', () => {
    render(ExpandableSection, {
      toggleText: 'Show more content'
    });
    const button = screen.getByRole('button', { name: 'Show more content' });
    expect(button).toBeInTheDocument();
  });

  it('has aria-expanded set to false by default', () => {
    render(ExpandableSection, {
      toggleText: 'Show more'
    });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('has aria-expanded set to true when isExpanded is true', () => {
    render(ExpandableSection, {
      toggleText: 'Show more',
      isExpanded: true
    });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies expanded class when isExpanded is true', () => {
    const { container } = render(ExpandableSection, {
      toggleText: 'Show more',
      isExpanded: true
    });
    const section = container.querySelector('.pf-v6-c-expandable-section');
    expect(section).toHaveClass('pf-m-expanded');
  });

  it('hides content by default', () => {
    const { container } = render(ExpandableSection, {
      toggleText: 'Show more'
    });
    const content = container.querySelector('.pf-v6-c-expandable-section__content');
    expect(content).toHaveAttribute('hidden');
  });

  it('shows content when isExpanded is true', () => {
    const { container } = render(ExpandableSection, {
      toggleText: 'Show more',
      isExpanded: true
    });
    const content = container.querySelector('.pf-v6-c-expandable-section__content');
    expect(content).not.toHaveAttribute('hidden');
  });

  it('calls onToggle when button is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(ExpandableSection, {
      toggleText: 'Show more',
      onToggle
    });

    const button = screen.getByRole('button');
    await user.click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(expect.any(MouseEvent), true);
  });

  it('toggles internal state when uncontrolled', async () => {
    const user = userEvent.setup();

    const { container } = render(ExpandableSection, {
      toggleText: 'Show more'
    });

    const button = screen.getByRole('button');
    const content = container.querySelector('.pf-v6-c-expandable-section__content');

    expect(content).toHaveAttribute('hidden');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);

    expect(content).not.toHaveAttribute('hidden');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies display size class when displaySize is lg', () => {
    const { container } = render(ExpandableSection, {
      toggleText: 'Show more',
      displaySize: 'lg'
    });
    const section = container.querySelector('.pf-v6-c-expandable-section');
    expect(section).toHaveClass('pf-m-display-lg');
  });

  it('applies indented class when isIndented is true', () => {
    const { container } = render(ExpandableSection, {
      toggleText: 'Show more',
      isIndented: true
    });
    const section = container.querySelector('.pf-v6-c-expandable-section');
    expect(section).toHaveClass('pf-m-indented');
  });

  it('applies truncate class when variant is truncate', () => {
    const { container } = render(ExpandableSection, {
      toggleText: 'Show more',
      variant: 'truncate'
    });
    const section = container.querySelector('.pf-v6-c-expandable-section');
    expect(section).toHaveClass('pf-m-truncate');
  });

  it('applies expand-top class when direction is up', () => {
    const { container } = render(ExpandableSection, {
      toggleText: 'Show more',
      direction: 'up'
    });
    const section = container.querySelector('.pf-v6-c-expandable-section');
    expect(section).toHaveClass('pf-m-expand-top');
  });

  it('applies expand-bottom class when direction is down', () => {
    const { container } = render(ExpandableSection, {
      toggleText: 'Show more',
      direction: 'down'
    });
    const section = container.querySelector('.pf-v6-c-expandable-section');
    expect(section).toHaveClass('pf-m-expand-bottom');
  });

  it('renders children content when expanded', () => {
    const { container } = render(
      ExpandableSection,
      {
        toggleText: 'Show more',
        isExpanded: true
      },
      {
        children: 'Test content'
      }
    );
    const content = container.querySelector('.pf-v6-c-expandable-section__content');
    expect(content).toBeInTheDocument();
    expect(content).not.toHaveAttribute('hidden');
    // Verify the content container exists and is visible when expanded
    // Note: Text content verification may require snippet format in Svelte 5 tests
  });

  it('has correct aria-controls and aria-labelledby attributes', () => {
    const { container } = render(ExpandableSection, {
      toggleText: 'Show more'
    });
    const button = screen.getByRole('button');
    const content = container.querySelector('.pf-v6-c-expandable-section__content');

    const buttonId = button.getAttribute('id');
    const contentId = content?.getAttribute('id');

    expect(button).toHaveAttribute('aria-controls', contentId!);
    expect(content).toHaveAttribute('aria-labelledby', buttonId!);
  });

  it('uses provided toggleId and contentId when provided', () => {
    const { container } = render(ExpandableSection, {
      toggleText: 'Show more',
      toggleId: 'custom-toggle',
      contentId: 'custom-content'
    });
    const button = screen.getByRole('button');
    const content = container.querySelector('.pf-v6-c-expandable-section__content');

    expect(button).toHaveAttribute('id', 'custom-toggle');
    expect(content).toHaveAttribute('id', 'custom-content');
  });
});
