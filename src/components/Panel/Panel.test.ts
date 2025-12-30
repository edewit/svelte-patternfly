import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import Panel from './Panel.svelte';
import PanelMain from './PanelMain.svelte';
import PanelMainBody from './PanelMainBody.svelte';
import PanelHeader from './PanelHeader.svelte';
import PanelFooter from './PanelFooter.svelte';

describe('Panel', () => {
  it('should render with default class', () => {
    const { container } = render(Panel);
    expect(container.querySelector('.pf-v6-c-panel')).toBeInTheDocument();
  });

  it('should apply raised variant', () => {
    const { container } = render(Panel, { props: { variant: 'raised' } });
    expect(container.querySelector('.pf-v6-c-panel')).toHaveClass('pf-m-raised');
  });

  it('should apply bordered variant', () => {
    const { container } = render(Panel, { props: { variant: 'bordered' } });
    expect(container.querySelector('.pf-v6-c-panel')).toHaveClass('pf-m-bordered');
  });

  it('should apply secondary variant', () => {
    const { container } = render(Panel, { props: { variant: 'secondary' } });
    expect(container.querySelector('.pf-v6-c-panel')).toHaveClass('pf-m-secondary');
  });

  it('should apply scrollable class', () => {
    const { container } = render(Panel, { props: { isScrollable: true } });
    expect(container.querySelector('.pf-v6-c-panel')).toHaveClass('pf-m-scrollable');
  });

  it('should apply custom class', () => {
    const { container } = render(Panel, { props: { class: 'custom-class' } });
    expect(container.querySelector('.pf-v6-c-panel')).toHaveClass('custom-class');
  });
});

describe('PanelMain', () => {
  it('should render with default class', () => {
    const { container } = render(PanelMain);
    expect(container.querySelector('.pf-v6-c-panel__main')).toBeInTheDocument();
  });

  it('should apply maxHeight style', () => {
    const { container } = render(PanelMain, { props: { maxHeight: '200px' } });
    const element = container.querySelector('.pf-v6-c-panel__main');
    expect(element).toHaveStyle('max-height: 200px');
  });

  it('should apply custom class', () => {
    const { container } = render(PanelMain, { props: { class: 'custom-class' } });
    expect(container.querySelector('.pf-v6-c-panel__main')).toHaveClass('custom-class');
  });
});

describe('PanelMainBody', () => {
  it('should render with default class', () => {
    const { container } = render(PanelMainBody);
    expect(container.querySelector('.pf-v6-c-panel__main-body')).toBeInTheDocument();
  });

  it('should apply custom class', () => {
    const { container } = render(PanelMainBody, { props: { class: 'custom-class' } });
    expect(container.querySelector('.pf-v6-c-panel__main-body')).toHaveClass('custom-class');
  });
});

describe('PanelHeader', () => {
  it('should render with default class', () => {
    const { container } = render(PanelHeader);
    expect(container.querySelector('.pf-v6-c-panel__header')).toBeInTheDocument();
  });

  it('should apply custom class', () => {
    const { container } = render(PanelHeader, { props: { class: 'custom-class' } });
    expect(container.querySelector('.pf-v6-c-panel__header')).toHaveClass('custom-class');
  });
});

describe('PanelFooter', () => {
  it('should render with default class', () => {
    const { container } = render(PanelFooter);
    expect(container.querySelector('.pf-v6-c-panel__footer')).toBeInTheDocument();
  });

  it('should apply custom class', () => {
    const { container } = render(PanelFooter, { props: { class: 'custom-class' } });
    expect(container.querySelector('.pf-v6-c-panel__footer')).toHaveClass('custom-class');
  });
});

