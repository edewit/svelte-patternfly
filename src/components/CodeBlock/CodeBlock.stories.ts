import type { Meta, StoryObj } from '@storybook/svelte-vite';
import CodeBlockExample from './CodeBlockExample.svelte';

const meta = {
  title: 'Components/CodeBlock',
  component: CodeBlockExample,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: { type: 'text' },
      description: 'ID attribute for the code block'
    },
    code: {
      control: { type: 'text' },
      description: 'Code content to display'
    }
  }
} satisfies Meta<CodeBlockExample>;

export default meta;
type Story = StoryObj<typeof meta>;

const exampleCode = `apiVersion: helm.openshift.io/v1beta1/
kind: HelmChartRepository
metadata:
name: azure-sample-repo
spec:
connectionConfig:
url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs`;

export const Basic: Story = {
  args: {
    id: 'code-block-basic-example',
    code: exampleCode
  }
};
