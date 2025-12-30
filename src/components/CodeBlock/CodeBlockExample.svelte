<script lang="ts">
  import CodeBlock from './CodeBlock.svelte';
  import CodeBlockCode from './CodeBlockCode.svelte';
  import CodeBlockAction from './CodeBlockAction.svelte';
  import Button from '../Button/Button.svelte';

  interface Props {
    id?: string;
    code?: string;
    copied?: boolean;
    isRunning?: boolean;
    onCopy?: () => void;
    onRun?: () => void;
  }

  let {
    id = 'code-block-basic-example',
    code = `apiVersion: helm.openshift.io/v1beta1/
kind: HelmChartRepository
metadata:
name: azure-sample-repo
spec:
connectionConfig:
url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs`,
    copied = $bindable(false),
    isRunning = $bindable(false),
    onCopy,
    onRun
  }: Props = $props();

  const codeId = `${id}-code-content`;

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 1500);
    onCopy?.();
  }

  function handleRun() {
    isRunning = !isRunning;
    onRun?.();
  }
</script>

<CodeBlock {id}>
  {#snippet actions()}
    <CodeBlockAction>
      <Button
        variant="plain"
        aria-label="Copy to clipboard basic example code block"
        onclick={handleCopy}
      >
        <span class="pf-v6-c-button__icon">
          <i class="fas fa-copy" aria-hidden="true"></i>
        </span>
      </Button>
    </CodeBlockAction>
    <CodeBlockAction>
      <Button variant="plain" aria-label="Run in web terminal" onclick={handleRun}>
        <span class="pf-v6-c-button__icon">
          <i class="fas fa-play" aria-hidden="true"></i>
        </span>
      </Button>
    </CodeBlockAction>
  {/snippet}

  {#snippet children()}
    <CodeBlockCode id={codeId}>
      {code}
    </CodeBlockCode>
  {/snippet}
</CodeBlock>
