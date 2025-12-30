<script lang="ts">
  import DescriptionList from './DescriptionList.svelte';
  import DescriptionListGroup from './DescriptionListGroup.svelte';
  import DescriptionListTerm from './DescriptionListTerm.svelte';
  import DescriptionListTermHelpText from './DescriptionListTermHelpText.svelte';
  import DescriptionListTermHelpTextButton from './DescriptionListTermHelpTextButton.svelte';
  import DescriptionListDescription from './DescriptionListDescription.svelte';
  import Button from '../Button/Button.svelte';
  import { createRawSnippet } from 'svelte';

  interface Props {
    variant?:
      | 'horizontal-two-col'
      | 'default'
      | 'compact'
      | 'compact-horizontal'
      | 'term-help-text';
  }

  let { variant = 'horizontal-two-col', class: className = '' }: Props = $props();

  // Helper to create text snippets
  const textSnippet = (text: string) => createRawSnippet(() => ({ render: () => text }));
</script>

{#if variant === 'horizontal-two-col'}
  <DescriptionList
    isHorizontal
    columnModifier={{ default: '2Col' }}
    aria-label="Two-column horizontal"
    class={className}
  >
    <DescriptionListGroup>
      <DescriptionListTerm>Name</DescriptionListTerm>
      <DescriptionListDescription>Example</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Namespace</DescriptionListTerm>
      <DescriptionListDescription>
        <a href="#">mary-test</a>
      </DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Labels</DescriptionListTerm>
      <DescriptionListDescription>example</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Pod selector</DescriptionListTerm>
      <DescriptionListDescription>
        <Button variant="link" isInline>
          <span class="pf-v6-c-button__icon pf-m-start">
            <i class="fas fa-plus-circle" aria-hidden="true"></i>
          </span>
          <span class="pf-v6-c-button__text">app=MyApp</span>
        </Button>
      </DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Annotation</DescriptionListTerm>
      <DescriptionListDescription>2 Annotations</DescriptionListDescription>
    </DescriptionListGroup>
  </DescriptionList>
{:else if variant === 'compact'}
  <DescriptionList isCompact aria-label="Compact example" class={className}>
    <DescriptionListGroup>
      <DescriptionListTerm>Name</DescriptionListTerm>
      <DescriptionListDescription>Example</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Namespace</DescriptionListTerm>
      <DescriptionListDescription>
        <a href="#">mary-test</a>
      </DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Labels</DescriptionListTerm>
      <DescriptionListDescription>example</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Pod selector</DescriptionListTerm>
      <DescriptionListDescription>
        <Button variant="link" isInline>
          <span class="pf-v6-c-button__icon pf-m-start">
            <i class="fas fa-plus-circle" aria-hidden="true"></i>
          </span>
          <span class="pf-v6-c-button__text">app=MyApp</span>
        </Button>
      </DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Annotation</DescriptionListTerm>
      <DescriptionListDescription>2 Annotations</DescriptionListDescription>
    </DescriptionListGroup>
  </DescriptionList>
{:else if variant === 'compact-horizontal'}
  <DescriptionList
    isCompact
    isHorizontal
    columnModifier={{ default: '2Col' }}
    aria-label="Compact horizontal, two-column"
    class={className}
  >
    <DescriptionListGroup>
      <DescriptionListTerm>Name</DescriptionListTerm>
      <DescriptionListDescription>Example</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Namespace</DescriptionListTerm>
      <DescriptionListDescription>
        <a href="#">mary-test</a>
      </DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Labels</DescriptionListTerm>
      <DescriptionListDescription>example</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Pod selector</DescriptionListTerm>
      <DescriptionListDescription>
        <Button variant="link" isInline>
          <span class="pf-v6-c-button__icon pf-m-start">
            <i class="fas fa-plus-circle" aria-hidden="true"></i>
          </span>
          <span class="pf-v6-c-button__text">app=MyApp</span>
        </Button>
      </DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Annotation</DescriptionListTerm>
      <DescriptionListDescription>2 Annotations</DescriptionListDescription>
    </DescriptionListGroup>
  </DescriptionList>
{:else if variant === 'term-help-text'}
  <DescriptionList aria-label="Term help text example" class={className}>
    <DescriptionListGroup>
      <DescriptionListTermHelpText
        headerContent={textSnippet('Name')}
        bodyContent={textSnippet('Additional name info')}
      >
        {#snippet children()}
          <DescriptionListTermHelpTextButton>Name</DescriptionListTermHelpTextButton>
        {/snippet}
      </DescriptionListTermHelpText>
      <DescriptionListDescription>Example</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTermHelpText
        headerContent={textSnippet('Namespace')}
        bodyContent={textSnippet('Additional namespace info')}
      >
        {#snippet children()}
          <DescriptionListTermHelpTextButton>Namespace</DescriptionListTermHelpTextButton>
        {/snippet}
      </DescriptionListTermHelpText>
      <DescriptionListDescription>
        <a href="#">mary-test</a>
      </DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTermHelpText
        headerContent={textSnippet('Labels')}
        bodyContent={textSnippet('Additional labels info')}
      >
        {#snippet children()}
          <DescriptionListTermHelpTextButton>Labels</DescriptionListTermHelpTextButton>
        {/snippet}
      </DescriptionListTermHelpText>
      <DescriptionListDescription>example</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTermHelpText
        headerContent={textSnippet('Pod selector')}
        bodyContent={textSnippet('Additional pod selector info')}
      >
        {#snippet children()}
          <DescriptionListTermHelpTextButton>Pod selector</DescriptionListTermHelpTextButton>
        {/snippet}
      </DescriptionListTermHelpText>
      <DescriptionListDescription>
        <Button variant="link" isInline>
          <span class="pf-v6-c-button__icon pf-m-start">
            <i class="fas fa-plus-circle" aria-hidden="true"></i>
          </span>
          <span class="pf-v6-c-button__text">app=MyApp</span>
        </Button>
      </DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTermHelpText
        headerContent={textSnippet('Annotation')}
        bodyContent={textSnippet('Additional annotation info')}
      >
        {#snippet children()}
          <DescriptionListTermHelpTextButton>Annotation</DescriptionListTermHelpTextButton>
        {/snippet}
      </DescriptionListTermHelpText>
      <DescriptionListDescription>2 Annotations</DescriptionListDescription>
    </DescriptionListGroup>
  </DescriptionList>
{:else}
  <DescriptionList aria-label="Default example" class={className}>
    <DescriptionListGroup>
      <DescriptionListTerm>Name</DescriptionListTerm>
      <DescriptionListDescription>Example</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Namespace</DescriptionListTerm>
      <DescriptionListDescription>
        <a href="#">mary-test</a>
      </DescriptionListDescription>
    </DescriptionListGroup>
  </DescriptionList>
{/if}
