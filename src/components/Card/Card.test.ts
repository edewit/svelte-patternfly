import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import { fireEvent } from '@testing-library/dom';
import Card from './Card.svelte';

describe('Card', () => {
  it('renders a div element with card class', () => {
    const { container } = render(Card, { children: 'Body' });
    const card = container.querySelector('div.pf-v6-c-card');
    expect(card).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    const { container } = render(Card, { title: 'Test Title', children: 'Body' });
    const title = container.querySelector('.pf-v6-c-card__title');
    expect(title).toBeInTheDocument();
    expect(title?.querySelector('.pf-v6-c-card__title-text')?.textContent).toBe('Test Title');
  });

  it('renders title as h2 element', () => {
    const { container } = render(Card, { title: 'Test Title', children: 'Body' });
    const titleText = container.querySelector('h2.pf-v6-c-card__title-text');
    expect(titleText).toBeInTheDocument();
    expect(titleText?.textContent).toBe('Test Title');
  });

  it('renders body when children provided', () => {
    const { container } = render(Card, { children: 'Body Content' });
    const body = container.querySelector('.pf-v6-c-card__body');
    expect(body).toBeInTheDocument();
    expect(body?.textContent).toBe('Body Content');
  });

  it('renders footer when footerSlot provided', () => {
    const { container } = render(Card, { footerSlot: 'Footer Content', children: 'Body' });
    const footer = container.querySelector('.pf-v6-c-card__footer');
    expect(footer).toBeInTheDocument();
    expect(footer?.textContent).toBe('Footer Content');
  });

  it('applies id attribute when provided', () => {
    const { container } = render(Card, { id: 'test-card', children: 'Body' });
    const card = container.querySelector('.pf-v6-c-card');
    expect(card).toHaveAttribute('id', 'test-card');
  });

  it('applies custom class when provided', () => {
    const { container } = render(Card, { class: 'custom-class', children: 'Body' });
    const card = container.querySelector('.pf-v6-c-card');
    expect(card).toHaveClass('custom-class');
  });

  it('renders card with title, body, and footer', () => {
    const { container } = render(Card, { title: 'Title', footerSlot: 'Footer', children: 'Body' });
    const card = container.querySelector('.pf-v6-c-card');
    expect(card).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-card__title')).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-card__body')).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-card__footer')).toBeInTheDocument();
  });

  it('does not render title section when title is not provided', () => {
    const { container } = render(Card, { children: 'Body' });
    const title = container.querySelector('.pf-v6-c-card__title');
    expect(title).not.toBeInTheDocument();
  });

  it('does not render footer section when footerSlot is not provided', () => {
    const { container } = render(Card, { title: 'Title', children: 'Body' });
    const footer = container.querySelector('.pf-v6-c-card__footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('matches the basic example HTML structure', () => {
    const { container } = render(Card, {
      id: 'card-basic-example',
      title: 'Title',
      footerSlot: 'Footer',
      children: 'Body'
    });
    const card = container.querySelector('#card-basic-example.pf-v6-c-card');
    expect(card).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-card__title')).toBeInTheDocument();
    expect(container.querySelector('h2.pf-v6-c-card__title-text')).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-card__body')).toBeInTheDocument();
    expect(container.querySelector('.pf-v6-c-card__footer')).toBeInTheDocument();
  });

  describe('Selectable cards', () => {
    it('renders selectable card with checkbox when isSelectable is true', () => {
      const { container } = render(Card, {
        id: 'selectable-card',
        isSelectable: true,
        title: 'Title',
        children: 'Body'
      });
      const card = container.querySelector('.pf-v6-c-card');
      expect(card).toHaveClass('pf-m-selectable');
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it('renders header structure when selectable', () => {
      const { container } = render(Card, {
        id: 'selectable-card',
        isSelectable: true,
        title: 'Title',
        children: 'Body'
      });
      expect(container.querySelector('.pf-v6-c-card__header')).toBeInTheDocument();
      expect(container.querySelector('.pf-v6-c-card__actions')).toBeInTheDocument();
      expect(container.querySelector('.pf-v6-c-card__selectable-actions')).toBeInTheDocument();
      expect(container.querySelector('.pf-v6-c-card__header-main')).toBeInTheDocument();
    });

    it('applies selected class when isSelected is true', () => {
      const { container } = render(Card, {
        id: 'selectable-card',
        isSelectable: true,
        isSelected: true,
        title: 'Title',
        children: 'Body'
      });
      const card = container.querySelector('.pf-v6-c-card');
      expect(card).toHaveClass('pf-m-selected');
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(checkbox?.checked).toBe(true);
    });

    it('applies disabled class when isDisabled is true', () => {
      const { container } = render(Card, {
        id: 'selectable-card',
        isSelectable: true,
        isDisabled: true,
        title: 'Title',
        children: 'Body'
      });
      const card = container.querySelector('.pf-v6-c-card');
      expect(card).toHaveClass('pf-m-disabled');
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(checkbox?.disabled).toBe(true);
    });

    it('applies secondary variant class', () => {
      const { container } = render(Card, {
        id: 'selectable-card',
        isSelectable: true,
        variant: 'secondary',
        title: 'Title',
        children: 'Body'
      });
      const card = container.querySelector('.pf-v6-c-card');
      expect(card).toHaveClass('pf-m-secondary');
    });

    it('calls onSelect callback when checkbox is changed', () => {
      const onSelect = vi.fn();
      const { container } = render(Card, {
        id: 'selectable-card',
        isSelectable: true,
        title: 'Title',
        onSelect,
        children: 'Body'
      });
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      checkbox.checked = true;
      fireEvent.change(checkbox);
      expect(onSelect).toHaveBeenCalledWith(true);
    });

    it('renders disabled label class when disabled', () => {
      const { container } = render(Card, {
        id: 'selectable-card',
        isSelectable: true,
        isDisabled: true,
        title: 'Title',
        children: 'Body'
      });
      const label = container.querySelector('.pf-v6-c-check__label');
      expect(label).toHaveClass('pf-m-disabled');
    });

    it('generates unique checkbox IDs', () => {
      const { container: container1 } = render(Card, {
        id: 'card1',
        isSelectable: true,
        title: 'Title 1',
        children: 'Body'
      });
      const { container: container2 } = render(Card, {
        id: 'card2',
        isSelectable: true,
        title: 'Title 2',
        children: 'Body'
      });
      const checkbox1 = container1.querySelector('#card1-checkbox');
      const checkbox2 = container2.querySelector('#card2-checkbox');
      expect(checkbox1).toBeInTheDocument();
      expect(checkbox2).toBeInTheDocument();
      expect(checkbox1?.id).not.toBe(checkbox2?.id);
    });

    it('matches selectable secondary example structure', () => {
      const { container } = render(Card, {
        id: 'card-selectable-secondary-example',
        variant: 'secondary',
        isSelectable: true,
        title: 'Title',
        footerSlot: 'Footer',
        children: 'Body'
      });
      const card = container.querySelector('#card-selectable-secondary-example.pf-v6-c-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('pf-m-selectable', 'pf-m-secondary');
      expect(container.querySelector('.pf-v6-c-card__header')).toBeInTheDocument();
      expect(container.querySelector('.pf-v6-c-card__actions.pf-m-no-offset')).toBeInTheDocument();
      expect(container.querySelector('.pf-v6-c-card__selectable-actions')).toBeInTheDocument();
      expect(container.querySelector('.pf-v6-c-check')).toBeInTheDocument();
      expect(
        container.querySelector('input.pf-v6-c-check__input[type="checkbox"]')
      ).toBeInTheDocument();
    });

    describe('Single select (radio)', () => {
      it('renders radio button when selectType is radio', () => {
        const { container } = render(Card, {
          id: 'radio-card',
          isSelectable: true,
          selectType: 'radio',
          radioName: 'test-group',
          title: 'Title',
          children: 'Body'
        });
        const radio = container.querySelector('input[type="radio"]');
        expect(radio).toBeInTheDocument();
        expect(radio).toHaveAttribute('name', 'test-group');
      });

      it('uses default radio name when radioName is not provided', () => {
        const { container } = render(Card, {
          id: 'radio-card',
          isSelectable: true,
          selectType: 'radio',
          title: 'Title',
          children: 'Body'
        });
        const radio = container.querySelector('input[type="radio"]') as HTMLInputElement;
        expect(radio?.name).toBe('card-radio-group');
      });

      it('shares radio name across multiple cards in a group', () => {
        const { container: container1 } = render(Card, {
          id: 'radio-card-1',
          isSelectable: true,
          selectType: 'radio',
          radioName: 'test-group',
          title: 'Card 1',
          children: 'Body'
        });
        const { container: container2 } = render(Card, {
          id: 'radio-card-2',
          isSelectable: true,
          selectType: 'radio',
          radioName: 'test-group',
          title: 'Card 2',
          children: 'Body'
        });
        const radio1 = container1.querySelector('input[type="radio"]') as HTMLInputElement;
        const radio2 = container2.querySelector('input[type="radio"]') as HTMLInputElement;
        expect(radio1?.name).toBe('test-group');
        expect(radio2?.name).toBe('test-group');
        expect(radio1?.name).toBe(radio2?.name);
      });

      it('generates unique IDs for radio buttons', () => {
        const { container: container1 } = render(Card, {
          id: 'radio-card-1',
          isSelectable: true,
          selectType: 'radio',
          radioName: 'test-group',
          title: 'Card 1',
          children: 'Body'
        });
        const { container: container2 } = render(Card, {
          id: 'radio-card-2',
          isSelectable: true,
          selectType: 'radio',
          radioName: 'test-group',
          title: 'Card 2',
          children: 'Body'
        });
        const radio1 = container1.querySelector('#radio-card-1-radio');
        const radio2 = container2.querySelector('#radio-card-2-radio');
        expect(radio1).toBeInTheDocument();
        expect(radio2).toBeInTheDocument();
        expect(radio1?.id).not.toBe(radio2?.id);
      });

      it('calls onSelect callback when radio is changed', () => {
        const onSelect = vi.fn();
        const { container } = render(Card, {
          id: 'radio-card',
          isSelectable: true,
          selectType: 'radio',
          radioName: 'test-group',
          title: 'Title',
          onSelect,
          children: 'Body'
        });
        const radio = container.querySelector('input[type="radio"]') as HTMLInputElement;
        radio.checked = true;
        fireEvent.change(radio);
        expect(onSelect).toHaveBeenCalledWith(true);
      });

      it('renders selected radio button correctly', () => {
        const { container } = render(Card, {
          id: 'radio-card',
          isSelectable: true,
          selectType: 'radio',
          radioName: 'test-group',
          isSelected: true,
          title: 'Title',
          children: 'Body'
        });
        const radio = container.querySelector('input[type="radio"]') as HTMLInputElement;
        expect(radio?.checked).toBe(true);
      });

      it('renders disabled radio button correctly', () => {
        const { container } = render(Card, {
          id: 'radio-card',
          isSelectable: true,
          selectType: 'radio',
          radioName: 'test-group',
          isDisabled: true,
          title: 'Title',
          children: 'Body'
        });
        const radio = container.querySelector('input[type="radio"]') as HTMLInputElement;
        expect(radio?.disabled).toBe(true);
      });
    });
  });
});
