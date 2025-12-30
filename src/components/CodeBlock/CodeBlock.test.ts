import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte/svelte5';
import CodeBlock from './CodeBlock.svelte';
import CodeBlockCode from './CodeBlockCode.svelte';
import CodeBlockAction from './CodeBlockAction.svelte';

const exampleCode = `apiVersion: helm.openshift.io/v1beta1/
kind: HelmChartRepository
metadata:
name: azure-sample-repo
spec:
connectionConfig:
url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs`;

describe('CodeBlock', () => {
  it('renders a div element with code-block class', () => {
    const { container } = render(CodeBlock, {
      children: exampleCode
    });
    const codeBlock = container.querySelector('div.pf-v6-c-code-block');
    expect(codeBlock).toBeInTheDocument();
  });

  it('renders header with actions when actions slot is provided', () => {
    const { container } = render(CodeBlock, {
      actions: 'Action',
      children: exampleCode
    });
    const header = container.querySelector('.pf-v6-c-code-block__header');
    expect(header).toBeInTheDocument();
    const actions = container.querySelector('.pf-v6-c-code-block__actions');
    expect(actions).toBeInTheDocument();
  });

  it('does not render header when actions slot is not provided', () => {
    const { container } = render(CodeBlock, {
      children: exampleCode
    });
    const header = container.querySelector('.pf-v6-c-code-block__header');
    expect(header).not.toBeInTheDocument();
  });

  it('renders code content', () => {
    const { container } = render(CodeBlock, {
      children: exampleCode
    });
    const preElement = container.querySelector('.pf-v6-c-code-block__pre');
    expect(preElement).toBeInTheDocument();
    expect(preElement?.textContent).toContain('apiVersion: helm.openshift.io/v1beta1/');
  });

  it('renders pre element', () => {
    const { container } = render(CodeBlock, {
      children: exampleCode
    });
    const preElement = container.querySelector('.pf-v6-c-code-block__pre');
    expect(preElement).toBeInTheDocument();
  });

  it('applies id attribute when provided', () => {
    const { container } = render(CodeBlock, {
      id: 'test-code-block',
      children: exampleCode
    });
    const codeBlock = container.querySelector('.pf-v6-c-code-block');
    expect(codeBlock).toHaveAttribute('id', 'test-code-block');
  });

  it('applies custom class when provided', () => {
    const { container } = render(CodeBlock, {
      class: 'custom-class',
      children: exampleCode
    });
    const codeBlock = container.querySelector('.pf-v6-c-code-block');
    expect(codeBlock).toHaveClass('custom-class');
  });
});

describe('CodeBlockCode', () => {
  it('renders a code element with code-block__code class', () => {
    const { container } = render(CodeBlockCode, {
      children: exampleCode
    });
    const codeElement = container.querySelector('code.pf-v6-c-code-block__code');
    expect(codeElement).toBeInTheDocument();
  });

  it('applies id attribute when provided', () => {
    const { container } = render(CodeBlockCode, {
      id: 'test-code',
      children: exampleCode
    });
    const codeElement = container.querySelector('code.pf-v6-c-code-block__code');
    expect(codeElement).toHaveAttribute('id', 'test-code');
  });

  it('renders children content', () => {
    const { container } = render(CodeBlockCode, {
      children: exampleCode
    });
    const codeElement = container.querySelector('code.pf-v6-c-code-block__code');
    expect(codeElement?.textContent).toContain('apiVersion: helm.openshift.io/v1beta1/');
  });
});

describe('CodeBlockAction', () => {
  it('renders a div element with code-block__actions-item class', () => {
    const { container } = render(CodeBlockAction, {
      children: 'Action content'
    });
    const action = container.querySelector('div.pf-v6-c-code-block__actions-item');
    expect(action).toBeInTheDocument();
  });

  it('renders children content', () => {
    const { container } = render(CodeBlockAction, {
      children: 'Action content'
    });
    const action = container.querySelector('div.pf-v6-c-code-block__actions-item');
    expect(action?.textContent).toBe('Action content');
  });
});
