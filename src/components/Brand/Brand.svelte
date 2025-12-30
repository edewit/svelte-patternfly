<script lang="ts">
  import type { BrandProps } from './types';
  import '@patternfly/patternfly/components/Brand/brand.css';

  interface Props extends BrandProps {
    [key: string]: unknown;
  }

  let { src, alt, width, height, class: className = '', ...restProps }: Props = $props();

  // Build CSS classes
  const classes = $derived(['pf-v6-c-brand', className].filter(Boolean).join(' '));

  // Build style string for width/height
  const style = $derived(() => {
    const styles: string[] = [];
    if (width) {
      styles.push(`--pf-v6-c-brand--Width: ${typeof width === 'number' ? `${width}px` : width}`);
    }
    if (height) {
      styles.push(
        `--pf-v6-c-brand--Height: ${typeof height === 'number' ? `${height}px` : height}`
      );
    }
    return styles.length > 0 ? styles.join('; ') : undefined;
  });
</script>

<img class={classes} {src} {alt} style={style()} {...restProps} />
