import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Icon from './Icon.svelte';
import CogIcon from './icons/CogIcon.svelte';

describe('Icon', () => {
  it('renders with icon component', () => {
    render(Icon, {
      children: {
        component: CogIcon
      }
    });

    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('fas', 'fa-cog');
  });

  it('renders with icon class string', () => {
    render(Icon, {
      props: {
        icon: 'fas fa-cog'
      }
    });

    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('fas', 'fa-cog');
  });

  it('applies size classes', () => {
    const { container } = render(Icon, {
      props: {
        size: 'lg',
        icon: 'fas fa-cog'
      }
    });

    const iconContainer = container.querySelector('.pf-v6-c-icon');
    expect(iconContainer).toHaveClass('pf-m-lg');
  });

  it('applies status classes', () => {
    const { container } = render(Icon, {
      props: {
        status: 'success',
        icon: 'fas fa-check-circle'
      }
    });

    const iconContent = container.querySelector('.pf-v6-c-icon__content');
    expect(iconContent).toHaveClass('pf-m-success');
  });

  it('applies inline class', () => {
    const { container } = render(Icon, {
      props: {
        isInline: true,
        icon: 'fas fa-cog'
      }
    });

    const iconContainer = container.querySelector('.pf-v6-c-icon');
    expect(iconContainer).toHaveClass('pf-m-inline');
  });

  it('shows progress spinner when in progress', () => {
    const { container } = render(Icon, {
      props: {
        isInProgress: true,
        icon: 'fas fa-cog'
      }
    });

    const spinner = container.querySelector('.pf-v6-c-spinner');
    expect(spinner).toBeInTheDocument();
  });
});


