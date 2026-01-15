<script lang="ts">
  import type { SpinnerProps, SpinnerSize } from './types';
  import '@patternfly/patternfly/components/Spinner/spinner.css';

  interface Props extends SpinnerProps {
    size?: SpinnerSize;
    diameter?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-valuetext'?: string;
    isInline?: boolean;
    class?: string;
    [key: string]: unknown;
  }

  let {
    size,
    diameter,
    'aria-label': ariaLabel = 'Loading...',
    'aria-labelledby': ariaLabelledby,
    'aria-valuetext': ariaValuetext,
    isInline = false,
    class: className = '',
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-spinner',
      size === 'sm' && 'pf-m-sm',
      size === 'md' && 'pf-m-md',
      size === 'lg' && 'pf-m-lg',
      size === 'xl' && 'pf-m-xl',
      isInline && 'pf-m-inline',
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build inline styles for custom diameter
  const styles = $derived(
    diameter ? `--pf-v6-c-spinner--diameter: ${diameter}` : undefined
  );
</script>

<svg
  class={classes}
  style={styles}
  role="progressbar"
  viewBox="0 0 100 100"
  aria-label={ariaLabelledby ? undefined : ariaLabel}
  aria-labelledby={ariaLabelledby}
  aria-valuetext={ariaValuetext}
  {...restProps}
>
  <circle class="pf-v6-c-spinner__path" cx="50" cy="50" r="45" fill="none" />
</svg>
