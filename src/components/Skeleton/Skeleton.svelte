<script lang="ts">
  import type { SkeletonProps, SkeletonShape, SkeletonFontSize } from './types';
  import '@patternfly/patternfly/components/Skeleton/skeleton.css';

  interface Props extends SkeletonProps {
    width?: string;
    height?: string;
    fontSize?: SkeletonFontSize;
    shape?: SkeletonShape;
    screenreaderText?: string;
    class?: string;
    [key: string]: unknown;
  }

  let {
    width,
    height,
    fontSize,
    shape,
    screenreaderText,
    class: className = '',
    ...restProps
  }: Props = $props();

  // Build CSS classes
  const classes = $derived(
    [
      'pf-v6-c-skeleton',
      shape === 'circle' && 'pf-m-circle',
      shape === 'square' && 'pf-m-square',
      fontSize && `pf-m-text-${fontSize}`,
      className
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Build inline styles
  const styles = $derived(
    [width && `--pf-v6-c-skeleton--Width: ${width}`, height && `--pf-v6-c-skeleton--Height: ${height}`]
      .filter(Boolean)
      .join('; ')
  );
</script>

<div class={classes} style={styles || undefined} {...restProps}>
  {#if screenreaderText}
    <span class="pf-v6-screen-reader">{screenreaderText}</span>
  {/if}
</div>
