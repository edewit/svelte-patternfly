<script lang="ts">
  import ActionList from './ActionList.svelte';
  import ActionListGroup from './ActionListGroup.svelte';
  import ActionListItem from './ActionListItem.svelte';
  import Button from '../Button/Button.svelte';
  import type { ActionListProps } from './types';

  interface Props extends ActionListProps {
    variant?: 'single-group' | 'with-kebab' | 'multiple-groups' | 'with-icons';
  }

  let { variant = 'single-group', isIcons = false, class: className = '' }: Props = $props();
</script>

<ActionList {isIcons} class={className}>
  {#if variant === 'single-group' || variant === 'with-kebab'}
    <ActionListGroup>
      <ActionListItem>
        <Button variant="primary">Next</Button>
      </ActionListItem>
      <ActionListItem>
        <Button variant="secondary">Back</Button>
      </ActionListItem>
      {#if variant === 'with-kebab'}
        <ActionListItem>
          <Button variant="plain" aria-label="Toggle">
            <span class="pf-v6-c-button__icon">
              <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
            </span>
          </Button>
        </ActionListItem>
      {/if}
    </ActionListGroup>
  {:else if variant === 'multiple-groups'}
    <ActionListGroup>
      <ActionListItem>
        <Button variant="primary">Next</Button>
      </ActionListItem>
      <ActionListItem>
        <Button variant="secondary">Back</Button>
      </ActionListItem>
    </ActionListGroup>
    <ActionListGroup>
      <ActionListItem>
        <Button variant="primary">Submit</Button>
      </ActionListItem>
      <ActionListItem>
        <Button variant="secondary">Cancel</Button>
      </ActionListItem>
    </ActionListGroup>
  {:else if variant === 'with-icons'}
    <ActionListGroup>
      <ActionListItem>
        <Button variant="plain" aria-label="Action 1">
          <span class="pf-v6-c-button__icon">
            <i class="fas fa-check" aria-hidden="true"></i>
          </span>
        </Button>
      </ActionListItem>
      <ActionListItem>
        <Button variant="plain" aria-label="Action 2">
          <span class="pf-v6-c-button__icon">
            <i class="fas fa-times" aria-hidden="true"></i>
          </span>
        </Button>
      </ActionListItem>
    </ActionListGroup>
  {/if}
</ActionList>
