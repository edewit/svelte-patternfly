<script lang="ts">
  import EmptyState from './EmptyState.svelte';
  import EmptyStateBody from './EmptyStateBody.svelte';
  import EmptyStateFooter from './EmptyStateFooter.svelte';
  import EmptyStateActions from './EmptyStateActions.svelte';
  import Button from '../Button/Button.svelte';
  import { createRawSnippet } from 'svelte';

  interface Props {
    titleText?: string;
    headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    icon?: string;
    variant?: 'xs' | 'sm' | 'lg' | 'xl' | 'full';
    status?: 'danger' | 'warning' | 'success' | 'info' | 'custom';
    isFullHeight?: boolean;
  }

  let {
    titleText = 'Empty state',
    headingLevel = 'h4',
    icon = 'fas fa-cubes',
    variant = 'full',
    status,
    isFullHeight = false
  }: Props = $props();

  const bodyText = createRawSnippet(() => ({
    render: () =>
      "This represents the empty state pattern in PatternFly. Hopefully it's simple enough to use but flexible enough to meet a variety of needs."
  }));

  const primaryButton = createRawSnippet(() => ({
    render: () => 'Primary action'
  }));

  const linkButton1 = createRawSnippet(() => ({
    render: () => 'Multiple'
  }));

  const linkButton2 = createRawSnippet(() => ({
    render: () => 'Action Buttons'
  }));

  const linkButton3 = createRawSnippet(() => ({
    render: () => 'Can'
  }));

  const linkButton4 = createRawSnippet(() => ({
    render: () => 'Go here'
  }));

  const linkButton5 = createRawSnippet(() => ({
    render: () => 'In the secondary'
  }));

  const linkButton6 = createRawSnippet(() => ({
    render: () => 'Action area'
  }));
</script>

<EmptyState {titleText} {headingLevel} {icon} {variant} {status} {isFullHeight}>
  <EmptyStateBody>
    {@render bodyText()}
  </EmptyStateBody>
  <EmptyStateFooter>
    <EmptyStateActions>
      <Button variant="primary">
        {@render primaryButton()}
      </Button>
    </EmptyStateActions>
    <EmptyStateActions>
      <Button variant="link">
        {@render linkButton1()}
      </Button>
      <Button variant="link">
        {@render linkButton2()}
      </Button>
      <Button variant="link">
        {@render linkButton3()}
      </Button>
      <Button variant="link">
        {@render linkButton4()}
      </Button>
      <Button variant="link">
        {@render linkButton5()}
      </Button>
      <Button variant="link">
        {@render linkButton6()}
      </Button>
    </EmptyStateActions>
  </EmptyStateFooter>
</EmptyState>
